import React, { useState } from "react";
import { addBook } from "../services/api";
import "./AddBookForm.css";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pages: "",
    topic: "",
    type: "Prose",
    date: "",
    author: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addBook({
        title: formData.title,
        description: formData.description,
        pages: parseInt(formData.pages, 10),
        topic: formData.topic,
        type: formData.type,
        date: formData.date,
        author_id: parseInt(formData.author, 10),
      });
      alert("Книга успішно додана!");
      console.log(response);
    } catch (error) {
      alert("Помилка при додаванні книги.");
      console.error(error);
    }
  };

  return (
    <div className="card">
      <h2>Додати книгу</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Назва:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Опис:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Кількість сторінок:</label>
          <input
            type="number"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Тема:</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Тип книги:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="prose">Проза</option>
            <option value="poetry">Поезія</option>
          </select>
        </div>
        <div>
          <label>Дата написання:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>ID автора:</label>
          <input
            type="number"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Додати</button>
      </form>
    </div>
  );
};

export default AddBookForm;
