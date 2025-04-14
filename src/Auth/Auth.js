import React, { useState } from "react";
import s from "./auth.module.css";

function Auth() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Для отображения сообщений

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Очищаем предыдущие сообщения

    try {
      const response = await fetch("http://localhost:3001/auth", {
        // Проверьте этот путь!
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Отображаем сообщение об успехе
      } else {
        setMessage(data.message); // Отображаем сообщение об ошибке
      }
    } catch (error) {
      console.error(error);
      setMessage("Ошибка при отправке запроса"); // Отображаем сообщение об ошибке
    }
  };

  return (
    <div>
      Авторизация
      {message && <p>{message}</p>} {/* Отображаем сообщение */}
      <form className={s.form_auth} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Auth;
