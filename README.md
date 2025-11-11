# Meadowlark travel
учебный проект-шпаргалка по работе с Node.js, Express и Handlebars

> ### Цель проекта 
> - Layouts и partials
> - Helpers и sections
> - передача данных в шаблоны
> - Middleware для глобальных данных

## Технологии
> * **Node.js + Express 5** — серверная часть
> * **Handlebars** — шаблонизатор
> * **Jest** — unit-тестирование

## Установка и запуск
> ### Установка:
> ```bash
> npm install
> ```
>
> ### Запуск:
> ```bash
> npm start          # Запуск продакшен-сервера
> npm run dev        # Режим разработки с автоперезагрузкой (nodemon)
> npm test           # Запуск тестов
> ```
>
> Сервер запустится на `http://localhost:3000`

## Структура проекта
> ```
> /views                    — шаблоны Handlebars
>   /layouts                — основные layout'ы
>   *.hbs                   — страницы (home, about, 404, 500)
> /public                   — статические файлы (CSS, JS, изображения)
> /lib                      — бизнес-логика
>   /__tests__              — unit-тесты
>   fortune.js              — модуль предсказаний
>   handlers.js             — обработчики маршрутов
> /node_modules             — зависимости
> meadowlark.js             — точка входа приложения
> ```

## Основные маршруты
> ```
> GET  /                — Главная страница
> GET  /about           — О компании (с предсказанием печенья)
> GET  /sections-test   — Демонстрация sections
> GET  /foo             — Пример другого layouta 
>      404              — Страница не найдена
>      500              — Ошибка сервера
> ```

## Автор
Malyar Andrey

## Лицензия
ISC