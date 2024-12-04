import React, { useState } from "react";
import { addBook } from "../services/api";

const AddBookForm = ({ onBookAdded }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        pages: "",
        topic: "",
        book_type: "prose", 
        written_on: "",
        author_id: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newBook = await addBook(formData);
            onBookAdded(newBook);
            alert("Книга додана успішно!");
            setFormData({
                title: "",
                description: "",
                pages: "",
                topic: "",
                book_type: "prose",
                written_on: "",
                author_id: "",
            });
        } catch (error) {
            alert("Помилка при додаванні книги.");
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
            <h2>Додати книгу</h2>
            <div>
                <label>Назва:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
                <label>Опис:</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div>
                <label>Кількість сторінок:</label>
                <input type="number" name="pages" value={formData.pages} onChange={handleChange} />
            </div>
            <div>
                <label>Тема:</label>
                <input type="text" name="topic" value={formData.topic} onChange={handleChange} />
            </div>
            <div>
                <label>Тип книги:</label>
                <select name="book_type" value={formData.book_type} onChange={handleChange}>
                    <option value="prose">Prose</option>
                    <option value="poetry">Poesia</option>
                </select>
            </div>
            <div>
                <label>Дата написання:</label>
                <input type="date" name="written_on" value={formData.written_on} onChange={handleChange} />
            </div>
            <div>
                <label>ID автора:</label>
                <input type="number" name="author_id" value={formData.author_id} onChange={handleChange} required />
            </div>
            <button type="submit">Додати</button>
        </form>
    );
};

export default AddBookForm;
