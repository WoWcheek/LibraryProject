import React, { useState } from "react";
import { searchBooksByAuthor } from "../services/api";
import "./SearchBooksByAuthor.css";

const SearchBooksByAuthor = () => {
  const [authorId, setAuthorId] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await searchBooksByAuthor(authorId);
      setBooks(response);
    } catch (err) {
      setError("Книги не знайдено або сталася помилка.");
      console.error(err);
      setBooks([]);
    }
  };

  return (
    <div className="search-books">
      <h2>Пошук книг за автором</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>ID автора:</label>
          <input
            type="number"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Шукати</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="books-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="card" key={book.id}>
              <h3>{book.title}</h3>
              <p><strong>Опис:</strong> {book.description || "Не вказано"}</p>
              <p><strong>Кількість сторінок:</strong> {book.pages || "Не вказано"}</p>
              <p><strong>Тема:</strong> {book.topic || "Не вказано"}</p>
              <p><strong>Тип:</strong> {book.book_type || "Не вказано"}</p>
              <p><strong>Дата написання:</strong> {book.written_on || "Не вказано"}</p>
            </div>
          ))
        ) : (
          <p>Немає книг для цього автора.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBooksByAuthor;
