import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; 

// Функція для отримання всіх книг
export const getBooks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/books/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

// Функція для додавання нової книги
export const addBook = async (book) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/books/`, book);
        return response.data;
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
};

// Функція для пошуку книг за автором
export const searchBooksByAuthor = async (authorId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/books/filter?author_ids=${authorId}`);
        return response.data;
    } catch (error) {
        console.error("Error searching books by author:", error);
        throw error;
    }
};
