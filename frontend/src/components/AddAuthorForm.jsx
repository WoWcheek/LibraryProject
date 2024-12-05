import React, { useState } from "react";
import { addAuthor } from "../services/api"; // Функція для додавання автора
import "./AddAuthorForm.css"; // Додати стилі для форми

const AddAuthorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    biography: "",
    birthDate: "",
    gender: "Male",
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
      const response = await addAuthor({
        name: formData.name,
        biography: formData.biography,
        birth_date: formData.birthDate,
        gender: formData.gender,
      });
      alert("Автор успішно доданий!");
      console.log(response);
    } catch (error) {
      alert("Помилка при додаванні автора.");
      console.error(error);
    }
  };

  return (
    <div className="card" style={{marginLeft: '20px'}}>
      <h2>Додати автора</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ім'я:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Біографія:</label>
          <textarea
            name="biography"
            value={formData.biography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Дата народження:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Стать:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Чоловік</option>
            <option value="Female">Жінка</option>
            <option value="Other">Інше</option>
          </select>
        </div>
        <button type="submit">Додати</button>
      </form>
    </div>
  );
};

export default AddAuthorForm;
