import React, { useState } from "react";
import { useMask } from "@react-input/mask";
import s from "./auth.module.css";

function Zav() {
  const [message, setMessage] = useState(""); // Для отображения сообщений
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [otherService, setOtherService] = useState("");
  const [useOtherService, setUseOtherService] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  // Обработчик изменения чекбокса "Иная услуга"
  const handleOtherServiceChange = (e) => {
    setUseOtherService(e.target.checked);
    // При снятии флажка сбрасываем значение поля "Иная услуга"
    if (!e.target.checked) {
      setOtherService("");
    }
  };

  const tel = useMask({
    mask: "+_(___)-___-__-__",
    replacement: { _: /\d/ },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Очищаем предыдущие сообщения

    try {
      const response = await fetch("http://localhost:3001/zav", {
        // Проверьте этот путь!
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          phone,
          date,
          time,
          serviceType,
          otherService,
          paymentType,
        }),
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
        {/* Адрес */}
        <input
          type="text"
          placeholder="Адрес"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required // Обязательное поле
        />
        <br />

        {/* Номер телефона */}
        <input
          type="tel"
          placeholder="+7(XXX)-XXX-XX-XX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$" // Проверка формата
          ref={tel}
          required
        />
        <br />

        {/* Дата */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />

        {/* Время */}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <br />

        {/* Вид услуги (выбор из списка) */}
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          required
        >
          <option value="">Выберите вид услуги</option>
          <option value="generalCleaning">Общий клининг</option>
          <option value="deepCleaning">Генеральная уборка</option>
          <option value="postConstructionCleaning">
            Послестроительная уборка
          </option>
          <option value="carpetCleaning">Химчистка ковров и мебели</option>
        </select>
        <br />

        {/* Чекбокс "Иная услуга" */}
        <label>
          <input
            type="checkbox"
            checked={useOtherService}
            onChange={handleOtherServiceChange}
          />
          Иная услуга
        </label>
        <br />

        {/* Поле для ввода "Иной услуги" (отображается только если чекбокс выбран) */}
        {useOtherService && (
          <input
            type="text"
            placeholder="Опишите необходимую услугу"
            value={otherService}
            onChange={(e) => setOtherService(e.target.value)}
            required // Обязательное поле, если чекбокс выбран
          />
        )}
        <br />

        {/* Тип оплаты (radio buttons) */}
        <label>
          <input
            type="radio"
            value="cash"
            checked={paymentType === "cash"}
            onChange={(e) => setPaymentType(e.target.value)}
            required
          />
          Наличные
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="card"
            checked={paymentType === "card"}
            onChange={(e) => setPaymentType(e.target.value)}
            required
          />
          Банковская карта
        </label>
        <br />
        <button type="submit">Auth</button>
        {message && <label>{message}</label>}
      </form>
    </div>
  );
}

export default Zav;
