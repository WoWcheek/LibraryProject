import React, { useState, useEffect } from "react";
import { getAuthors } from "../services/api";
import "./ViewAuthors.css";

const ViewAuthors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await getAuthors();
        setAuthors(response);
      } catch (error) {
        console.error("Помилка при завантаженні авторів:", error);
      }
    };
    fetchAuthors();
  }, []);

  return (
    <div className="view-authors">
      <h2>Список авторів</h2>
      {authors.length > 0 ? (
        authors.map((author) => (
          <div className="card" key={author.id}>
            <h3>{author.name}</h3>
            <p><strong>Біографія:</strong> {author.biography || "Не вказано"}</p>
            <p><strong>Дата народження:</strong> {author.birth_date || "Не вказано"}</p>
            <p><strong>Стать:</strong> {author.gender || "Не вказано"}</p>
          </div>
        ))
      ) : (
        <p>Немає доступних авторів.</p>
      )}
    </div>
  );
};

export default ViewAuthors;
