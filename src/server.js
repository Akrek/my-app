const cors = require('cors'); // Установите: npm install cors
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

app.use(cors()); // Разрешить запросы со всех доменов (в продакшене нужно настроить более точно)
//или

app.use(express.json());

const db = new sqlite3.Database('./db.sql', (err) => { // Путь к файлу базы данных
  if (err) {
    console.error("Ошибка открытия базы данных: " + err.message);
  } else {
      console.log('Подключение к базе данных успешно.');
  }
});

app.post('/auth', (req, res) => {
  const { login, password } = req.body;
  
  // Логируем данные
  console.log("Received login:", login);
  console.log("Received password:", password);

  if (!login || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  const sql = `SELECT * FROM user WHERE login = ? AND password = ?`;
  db.get(sql, [login, password], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }

    if (row) {
      console.log('User found:', row); // Логируем найденного пользователя
      res.status(200).json({ message: 'Успешная авторизация' });
    } else {
      console.log('User not found');
      res.status(401).json({ message: 'Неверный логин или пароль' });
    }
  }
);
});
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});