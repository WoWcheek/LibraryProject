import React, { useState } from "react";
import AddBookForm from "./components/AddBookForm";

const App = () => {
    const [books, setBooks] = useState([]);

    const handleBookAdded = (newBook) => {
        setBooks([...books, newBook]);
    };

    return (
        <div>
            <h1>Бібліотека</h1>
            <AddBookForm onBookAdded={handleBookAdded} />
            <h2>Список книг</h2>
            {/* Тут буде компонент для списку книг */}
        </div>
    );
};

export default App;
