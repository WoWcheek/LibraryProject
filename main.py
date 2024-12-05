from enum import Enum
from uuid import uuid4
from datetime import date
from pydantic import BaseModel
from typing import List, Optional
from fastapi.responses import JSONResponse
from sqlalchemy.orm import declarative_base
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import sessionmaker, relationship, Session
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey
from fastapi import FastAPI, HTTPException, Depends, APIRouter, Query, Request

DATABASE_URL = "sqlite:///./library.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Gender(str, Enum):
    male = "Male"
    female = "Female"
    other = "Other"

class BookType(str, Enum):
    prose = "Prose"
    poetry = "Poetry"

class AuthorDB(Base):
    __tablename__ = "authors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    biography = Column(Text, nullable=True)
    birth_date = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    books = relationship("BookDB", back_populates="author", cascade="all, delete")

class BookDB(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    pages = Column(Integer, nullable=True)
    topic = Column(String, nullable=True)
    book_type = Column(String, nullable=True)
    written_on = Column(String, nullable=True)
    author_id = Column(Integer, ForeignKey("authors.id", ondelete="CASCADE"), nullable=False)
    author = relationship("AuthorDB", back_populates="books")

Base.metadata.create_all(bind=engine)

class AuthorCreateRequest(BaseModel):
    name: str
    biography: Optional[str] = None
    birth_date: Optional[date] = None
    gender: Optional[Gender] = None

class AuthorUpdateRequest(BaseModel):
    name: Optional[str] = None
    biography: Optional[str] = None
    birth_date: Optional[date] = None
    gender: Optional[Gender] = None

class BookCreateRequest(BaseModel):
    title: str
    description: Optional[str] = None
    pages: Optional[int] = None
    topic: Optional[str] = None
    book_type: Optional[BookType] = None
    written_on: Optional[date] = None
    author_id: int

class BookUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    pages: Optional[int] = None
    topic: Optional[str] = None
    book_type: Optional[BookType] = None
    written_on: Optional[date] = None
    author_id: Optional[int] = None

class AuthorResponse(BaseModel):
    id: int
    name: str
    biography: Optional[str]
    birth_date: Optional[date]
    gender: Optional[Gender]

    class Config:
        from_attributes = True

class BookResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    pages: Optional[int]
    topic: Optional[str]
    book_type: Optional[BookType]
    written_on: Optional[date]
    author_id: int

    class Config:
        from_attributes = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()


@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    if request.url.path.startswith(("/authorization", "/docs", "/openapi.json")):
        return await call_next(request)
    authorization = request.headers.get("Authorization")
    if not authorization:
        return JSONResponse(content={"detail": "Authorization header missing"}, status_code=401)
    token = authorization.split(" ")[1]
    db = SessionLocal()
    user = db.query(UserDB).filter(UserDB.token == token).first()
    if not user:
        return JSONResponse(content={"detail": "Invalid or expired token"}, status_code=401)
    response = await call_next(request)
    db.close()
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

books_router = APIRouter(prefix="/books", tags=["Books"])
authors_router = APIRouter(prefix="/authors", tags=["Authors"])

@authors_router.get("/", response_model=List[AuthorResponse])
def get_authors(db: Session = Depends(get_db)):
    return db.query(AuthorDB).all()

@authors_router.get("/{author_id}", response_model=AuthorResponse)
def get_author(author_id: int, db: Session = Depends(get_db)):
    author = db.query(AuthorDB).filter(AuthorDB.id == author_id).first()
    if not author:
        raise HTTPException(status_code=404, detail="Author not found.")
    return author

@authors_router.post("/", response_model=AuthorResponse)
def create_author(author_request: AuthorCreateRequest, db: Session = Depends(get_db)):
    new_author = AuthorDB(**author_request.dict())
    db.add(new_author)
    db.commit()
    db.refresh(new_author)
    return new_author

@authors_router.put("/{author_id}", response_model=AuthorResponse)
def update_author(author_id: int, author_request: AuthorUpdateRequest, db: Session = Depends(get_db)):
    author = db.query(AuthorDB).filter(AuthorDB.id == author_id).first()
    if not author:
        raise HTTPException(status_code=404, detail="Author not found.")
    for key, value in author_request.dict(exclude_unset=True).items():
        setattr(author, key, value)
    db.commit()
    db.refresh(author)
    return author

@authors_router.delete("/{author_id}")
def delete_author(author_id: int, db: Session = Depends(get_db)):
    author = db.query(AuthorDB).filter(AuthorDB.id == author_id).first()
    if not author:
        raise HTTPException(status_code=404, detail="Author not found.")
    db.delete(author)
    db.commit()
    return {"message": "Author deleted."}

@books_router.get("/", response_model=List[BookResponse])
def get_books(db: Session = Depends(get_db)):
    return db.query(BookDB).all()

@books_router.get("/filter", response_model=List[BookResponse])
def get_books_by_author_ids(
    author_ids: List[int] = Query(..., description="List of author IDs to filter books by"),
    db: Session = Depends(get_db)
):
    books = db.query(BookDB).filter(BookDB.author_id.in_(author_ids)).all()
    if not books:
        raise HTTPException(status_code=404, detail="No books found for the provided author IDs.")
    return books

@books_router.get("/{book_id}", response_model=BookResponse)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(BookDB).filter(BookDB.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found.")
    return book

@books_router.post("/", response_model=BookResponse)
def create_book(book_request: BookCreateRequest, db: Session = Depends(get_db)):
    author = db.query(AuthorDB).filter(AuthorDB.id == book_request.author_id).first()
    if not author:
        raise HTTPException(status_code=400, detail="Author not found.")
    new_book = BookDB(**book_request.dict())
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book

@books_router.put("/{book_id}", response_model=BookResponse)
def update_book(book_id: int, book_request: BookUpdateRequest, db: Session = Depends(get_db)):
    book = db.query(BookDB).filter(BookDB.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found.")
    for key, value in book_request.dict(exclude_unset=True).items():
        setattr(book, key, value)
    db.commit()
    db.refresh(book)
    return book

@books_router.delete("/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(BookDB).filter(BookDB.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found.")
    db.delete(book)
    db.commit()
    return {"message": "Book deleted."}

class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    token = Column(String, unique=True, nullable=True)

Base.metadata.create_all(bind=engine)

class UserRequest(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    token: Optional[str]

    class Config:
        from_attributes = True

auth_router = APIRouter(prefix="/authorization", tags=["Authorization"])
security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    user = db.query(UserDB).filter(UserDB.token == token).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid or missing token.")
    return user

@auth_router.post("/signup", response_model=UserResponse)
def sign_up(user_request: UserRequest, db: Session = Depends(get_db)):
    existing_user = db.query(UserDB).filter(UserDB.username == user_request.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists.")
    new_user = UserDB(username=user_request.username, password=user_request.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@auth_router.post("/signin", response_model=UserResponse)
def sign_in(user_request: UserRequest, db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.username == user_request.username, UserDB.password == user_request.password).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password.")
    user.token = str(uuid4())
    db.commit()
    db.refresh(user)
    return user

app.include_router(auth_router)
app.include_router(books_router)
app.include_router(authors_router)
