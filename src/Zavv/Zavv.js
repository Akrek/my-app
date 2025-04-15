import React, { useState } from "react";
import s from "./auth.module.css";

function Zavv() {
  const [car, setCar] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Очищаем предыдущие сообщения

    try {
      const response = await fetch("http://localhost:3001/zavv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ car, date, time }),
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
      <form className={s.form_auth} onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <br />
        <select value={car} onChange={(e) => setCar(e.target.value)} required>
          <option value="">Выберите машину</option>
          <option value="Range Rover">Range Rover</option>
          <option value="Audi">Audi</option>
          <option value="Jeep">Jeep</option>
        </select>
        <br />
        <button type="submit">Отправить заявку</button>
        {message && <p>{message}</p>} {/* Отображаем сообщение */}
      </form>
    </div>
  );
}

export default Zavv;
