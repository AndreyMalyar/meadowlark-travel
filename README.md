# Meadowlark travel
Практика работы с Node.js и Handlebars

## Технологии
> * Node.js + Express
> * Handlebars (шаблонизатор)

## Установка и запуск
> ### Установка:
> ```bash
> npm install
> ```
> ### Запуск:
> ```bash
> npm start
> ```
 
## Структура проекта
> ### Структура
> ```
>/views              — шаблоны Handlebars
>  /layouts          — основные layout'ы
>  *.handlebars      — страницы (home, about, 404, 500)
>/public             — статические файлы (CSS, JS, изображения)
>/node_modules       — зависимости
>meadowlark.js       — точка входа приложения
> ```
>
> ### Основные маршруты
> ```
> - `/` — Главная страница
> - `/about` — О компании
> - `404` — Страница не найдена
> - `500` — Ошибка сервера 
> ```

5. Основные маршруты/функции (опционально)
   Если есть API или важные роуты
6. Конфигурация (если нужна)
   Переменные окружения, настройки
7. Разработка (опционально)
   Как вносить изменения, стиль кода
8. Лицензия (опционально)

npx eslint --init
You can also run this command directly using 'npm init @eslint/config@latest'.
Need to install the following packages:
@eslint/create-config@1.11.0
Ok to proceed? (y) y


> express_server@1.0.0 npx
> create-config

@eslint/create-config: v1.11.0

√ What do you want to lint? · javascript
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · node
i The config that you've selected requires the following dependencies:

eslint, @eslint/js, globals
√ Would you like to install them now? · No / Yes
√ Successfully created C:\Work\practica-Js\express_server\eslint.config.js file.
‼ You will need to install the dependencies yourself.