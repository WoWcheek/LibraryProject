import React, { useState } from "react";
import { userLogin, userRegister } from "../services/api";
import "./LoginForm.css"; // Add styles for the form

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    registerUsername: "",
    registerPassword: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State for opening the modal

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Ensure the name matches the state key
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Passing form data for login
      const response = await userLogin({
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem('auth-token', response.token);
      alert("Login successful!");
    } catch (error) {
      alert("Error during login.");
      console.error(error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userRegister({
        username: formData.registerUsername,
        password: formData.registerPassword,
      });
      alert("Registration successful!");
    } catch (error) {
      alert("Error during registration.");
      console.error(error);
    }
  };

  return (
    <div className="card" style={{ marginLeft: "20px" }}>
      <h2>Авторизація</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логін:</label>
          <input
            type="text"
            name="username" // Added name attribute
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password" // Added name attribute
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Авторизуватися</button>
      </form>

      <div>
        <span
          onClick={toggleModal}
          style={{ cursor: "pointer", color: "white" }}
        >
          У мене немає акаунту. Зареєєструватися.
        </span>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2>Реєстрація</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div>
                <label>Логін:</label>
                <input
                  type="text"
                  name="registerUsername" // Added name attribute
                  value={formData.registerUsername}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Пароль:</label>
                <input
                  type="password"
                  name="registerPassword" // Added name attribute
                  value={formData.registerPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Реєстрація</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
