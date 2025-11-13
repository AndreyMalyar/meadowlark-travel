// ====================================================
// ОСНОВНОЙ ФАЙЛ СЕРВЕРА
// Пример настройки Express с Handlebars
// ====================================================
const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')

const handlers = require('./lib/handlers.js')

const app = express()

// ====================================================
// НАСТРОЙКА HANDLEBARS
// ====================================================
app.engine('hbs', engine({
    // defaultLayout: основной шаблон обертки для всех страниц
    defaultLayout: 'main',
    // extname: расширение файлов шаблонов .handlebars -> .hbs
    extname: '.hbs',
    // helpers: пользовательские функции для шаблонов
    helpers: {
        // Helper 'section' - позволяет вставлять контент из страниц
        // в определенные места layout'a (например, в <head> или перед </body)
        // используется так: {{#section 'head'}}...{{//section}}
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    }
}))
// указывает Express использовать функции для шаблонов
app.set('view engine', '.hbs')

const port = process.env.PORT || 3000

// ====================================================
// MIDDLEWARE
// ====================================================

// раздача статических файлов
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ====================================================
// МАРШРУТЫ
// ====================================================

// пользовательские страницы
app.get('/', handlers.home)

app.get('/about', handlers.about)

app.get('/newsletter', handlers.newsletter)

// обработчики для отправки форм через браузер
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// обработчик для отправки формы через fetch (API)
app.post('/api/newsletter', handlers.api.newsletterSignup)

// Обработчик 404 (страница не найдена), должна быть после всех маршрутов
app.use(handlers.notFound)

// Обработчик 500 (ошибка сервера), должен быть последним
app.use(handlers.serverError)

// ====================================================
// ЗАПУСК СЕРВЕРА
// ====================================================

app.listen(port, () => {
    console.log(
        `Express запущен на http://localhost:${port}; ` + '\n' +
        'нажмите Ctrl+C для завершения.'
    )
})