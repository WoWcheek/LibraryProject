import React, { useState } from "react";
import Navigation from "./components/Navigation";
import AddBookForm from "./components/AddBookForm";
import AddAuthorForm from "./components/AddAuthorForm";
import ViewBooks from "./components/ViewBooks";
import ViewAuthors from "./components/ViewAuthors";
import SearchBooksByAuthor from "./components/SearchBooksByAuthor";


const App = () => {
  const [view, setView] = useState("addBook");

  const renderView = () => {
    switch (view) {
      case "addBook":
        return <AddBookForm />;
      case "addAuthor":
        return <AddAuthorForm />; 
      case "viewBooks":
        return <ViewBooks/>; 
      case "viewAuthors":
        return <ViewAuthors/>; 
      case "searchBooksByAuthor":
        return <SearchBooksByAuthor/>; 
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
