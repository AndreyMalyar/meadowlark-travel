# Meadowlark travel
Практика работы с Node.js и Handlebars

## Технологии
> * **Node.js + Express 5** — серверная часть
> * **Handlebars** — шаблонизатор
> * **Jest** — unit-тестирование
> * **Puppeteer** — E2E тестирование
> * **ESLint** — проверка качества кода
> * **ES Modules** — современный синтаксис import/export

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
> ```
>
> Сервер запустится на `http://localhost:3000`

## Тестирование
> ### Запуск тестов:
> ```bash
> npm test              # Все тесты
> npm run test:unit     # Unit-тесты (handlers)
> npm run test:e2e      # E2E тесты (Puppeteer)
> npm run test:coverage # Тесты с покрытием кода
> npm run test:watch    # Режим watch
> ```
>
> ### Проверка кода:
> ```bash
> npm run lint          # Проверка ESLint
> npm run lint:fix      # Автоисправление
> ```

## Структура проекта
> ```
> /views                    — шаблоны Handlebars
>   /layouts                — основные layout'ы
>   *.handlebars            — страницы (home, about, 404, 500)
> /public                   — статические файлы (CSS, JS, изображения)
> /lib                      — бизнес-логика
>   /__tests__              — unit-тесты
>   fortune.js              — модуль предсказаний
>   handlers.js             — обработчики маршрутов
> /integration-tests        — E2E тесты (Puppeteer)
> /node_modules             — зависимости
> meadowlark.js             — точка входа приложения
> eslint.config.js          — конфигурация ESLint
> jest.config.js            — конфигурация Jest
> ```

## Основные маршруты
> ```
> GET  /        — Главная страница
> GET  /about   — О компании (с предсказанием печенья)
>      404      — Страница не найдена
>      500      — Ошибка сервера
> ```

## Разработка
> ### Стиль кода:
> - ES Modules (import/export)
> - ESLint для проверки качества
> - 100% покрытие тестами для handlers
>
> ### Добавление новых маршрутов:
> 1. Создать handler в `lib/handlers.js`
> 2. Добавить тест в `lib/__tests__/handlers.test.js`
> 3. Подключить в `meadowlark.js`

## Автор
Malyar Andrey

## Лицензия
ISC