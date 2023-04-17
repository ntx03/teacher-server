# Бэкенд для сайта учителя географии.

## Описание сервера

Сервер нужен для хранения и удаления информации на страничке учителя

## Функционал:

- Роуты для фильмов:
  - GET /news — возвращает все сохранённые новости;
  - POST /news — создает новость с переданными данными {name, description, owner, photo (array with obgect { name and link }) };
  - DELETE /news — удаляетновость по \_id.

## Стек технологий:

- JavaScript:
  - Промисы (Promise);
  - Асинхронность и оптимизация;
  - Rest API;
- Node.js;
- Express;
- MongoDB.

## Директории

- `/controllers` – содержит файлы описания моделей пользователя и карточки;
- `/models` – содержит файлы описания схем пользователя и карточки;
- `/routes` — содержит описание основных роутов для пользователя и карточки;
- `/errors` – содержит описание ошибок.
- `/middlewares` – содержит миделвары авторизации, логгера, валидации, лимитера, обработки ошибок сервера.

## Установка и запуск проекта:

Клонировать репозиторий:

    git clone https://github.com/ntx03/teacher-server.git

Установить зависимости:

    npm install

Запустить сервер:

    npm run start

Запустить сервер с hot-reload:

    npm run dev

## Языки:

- JavaScript

## Библиотеки:

- express
- cors
- mongoose
- crypto
- dotenv
- celebrate
- helmet
- jsonwebtoken
- Winston
- express-winston
- bcrypt
- validator
- body-parser
- express-rate-limit

## База данных:

- MongoDB
