import React from "react";
import "./Navigation.css";

const Navigation = ({ onNavigate }) => {
  return (
    <div className="navigation">
      <button onClick={() => onNavigate("addBook")}>Додати нову книгу</button>
      <button onClick={() => onNavigate("addAuthor")}>Додати нового автора</button>
      <button onClick={() => onNavigate("viewBooks")}>Переглянути всі книги</button>
      <button onClick={() => onNavigate("viewAuthors")}>Переглянути всіх авторів</button>
      <button onClick={() => onNavigate("searchBooksByAuthor")}>Пошук книги по автору</button>
      <button onClick={() => onNavigate("loginForm")}>Авторизація</button>
    </div>
  );
};

export default Navigation;
