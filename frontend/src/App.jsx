import React, { useState } from "react";
import Navigation from "./components/Navigation";
import AddBookForm from "./components/AddBookForm";

const App = () => {
  const [view, setView] = useState("addBook");

  const renderView = () => {
    switch (view) {
      case "addBook":
        return <AddBookForm />;
      case "addAuthor":
        return <div>Форма додавання автора</div>; // Додайте форму для авторів тут
      case "viewBooks":
        return <div>Список книг</div>; // Додайте компонент для перегляду книг
      case "viewAuthors":
        return <div>Список авторів</div>; // Додайте компонент для перегляду авторів
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Navigation onNavigate={setView} />
      <div style={{ marginLeft: "220px", padding: "1rem", width: "100%" }}>
        {renderView()}
      </div>
    </div>
  );
};

export default App;
