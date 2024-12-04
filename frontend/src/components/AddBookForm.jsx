import React, { useState } from "react";
import { addBook } from "../services/api"; 

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pages: "",
    topic: "",
    type: "prose",
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
        pages: parseInt(formData.pages, 10), // Приведення до числа
        topic: formData.topic,
        book_type: formData.type,
        written_on: formData.date,
        author_id: parseInt(formData.author, 10), // Приведення до числа
      });
      alert("Книга успішно додана!");
      console.log(response);
    } catch (error) {
      console.error("Помилка при додаванні книги:", error);
      alert("Помилка при додаванні книги.");
    }
  };

  return (
    <div className="card">
      <h2>Додати книгу</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Назва:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Опис:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="pages">Кількість сторінок:</label>
        <input
          type="number"
          id="pages"
          name="pages"
          value={formData.pages}
          onChange={handleChange}
          required
        />

        <label htmlFor="topic">Тема:</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
        />

        <label htmlFor="type">Тип книги:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="prose">Проза</option>
          <option value="poetry">Поезія</option>
        </select>

        <label htmlFor="date">Дата написання:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <label htmlFor="author">ID автора:</label>
        <input
          type="number"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <button type="submit">Додати</button>
      </form>
    </div>
  );
};

export default AddBookForm;
