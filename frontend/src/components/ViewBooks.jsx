import React, { useState, useEffect } from "react";
import { getBooks } from "../services/api";
import "./ViewBooks.css";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response);
      } catch (error) {
        console.error("Помилка при завантаженні книг:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="view-books">
      <h2>Список книг</h2>
      {books.length > 0 ? (
        books.map((book) => (
          <div className="card" key={book.id}>
            <h3>{book.title}</h3>
            <p><strong>Опис:</strong> {book.description || "Не вказано"}</p>
            <p><strong>Кількість сторінок:</strong> {book.pages || "Не вказано"}</p>
            <p><strong>Тема:</strong> {book.topic || "Не вказано"}</p>
            <p><strong>Тип:</strong> {book.book_type}</p>
            <p><strong>Дата написання:</strong> {book.written_on || "Не вказано"}</p>
            <p><strong>ID Автора:</strong> {book.author_id}</p>
          </div>
        ))
      ) : (
        <p>Немає доступних книг.</p>
      )}
    </div>
  );
};

export default ViewBooks;
