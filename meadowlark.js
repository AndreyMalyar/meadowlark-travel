// ====================================================
// ОСНОВНОЙ ФАЙЛ СЕРВЕРА
// Пример настройки Express с Handlebars
// ====================================================
const express = require('express')
const { engine } = require('express-handlebars') // движок шаблонизатора handlebars
const bodyParser = require('body-parser') // парсинг тела запроса (форм и json)
const multiparty = require('multiparty') // Обработка multipart/form-data (загрузка файлов)
// подключаем модуль с обработчиками маршрутов
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
    // helpers: пользовательские функции-помощники для использования в шаблонах
    helpers: {
        // Helper 'section' - позволяет вставлять контент из страниц
        // в определенные места layout'a (например, в <head> или перед </body)
        // используется в шаблонах страницы: {{#section 'head'}}...{{//section}}
        // использование в layout {{{_section.head}}}
        section: function(name, options) {
            // Инициализируем объект _sections, если его еще нет
            if(!this._sections) this._sections = {}
            // Сохраняем содержимое секции под указанным именем
            this._sections[name] = options.fn(this)
            // возвращаем null, чтобы не чего не выводилось в месте определения секции
            return null
        }
    }
}))
// указывает Express использовать функции для шаблонов
app.set('view engine', '.hbs')

const port = process.env.PORT || 3000

// ====================================================
// MIDDLEWARE
// это функции которые выполняются между запросом и ответом
// ====================================================
// раздача статических файлов
app.use(express.static(__dirname + '/public'))
// стандартные HTML формы с методом POST
app.use(bodyParser.urlencoded({ extended: true }))
// Необходим для обработки AJAX/fetch запросов с Content-Type: application/json
app.use(bodyParser.json())

// ====================================================
// МАРШРУТЫ
// ====================================================

// пользовательские страницы
app.get('/', handlers.home)

app.get('/about', handlers.about)
// форма AJAX/fetch
app.get('/newsletter', handlers.newsletter)

// обработчики для отправки форм через браузер
// форма подписки (браузер)
app.get('/newsletter-signup', handlers.newsletterSignup)
// обрабатывает отправку форму подписки
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
// страница благодарности после подписки
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// обработчик для отправки формы через fetch (API)
// обрабатывает отправку формы подписки без перезагрузки
app.post('/api/newsletter', handlers.api.newsletterSignup)

// конкурс фотографий из отпуска
// страница с формой загрузки с фото (браузер)
app.get('/contest/vacation-photo', handlers.vacationPhotoContest)
// страница с формой загрузки с фото (AJAX/fetch)
app.get('/contest/vacation-photo-ajax', handlers.vacationPhotoContestAjax)

// parse из Multiparty, он сохраняет файлы во временный каталог на сервере, возвращается в массиве files
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    // Создаем экземпляр формы с multiparty
    const form = new multiparty.Form()

    form.parse(req, (err, fields, files) => {
        // если произошла ошибка при парсинге, возвращаем статус 500
        if(err) return res.status(500).send({ error: err.message })
        // передаем управление в handler для дальнейшей обработки
        handlers.vacationPhotoContestProcess(req, res, fields, files)
    })
})

// для API запросов (AJAX)
// возвращает json в место html, файлы сохраняются './public/uploads' (доступны публично)
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
    const form = new multiparty.Form({
            uploadDir: './public/uploads'  // своя папка
    })
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(500).send({ error: err.message })
        // возвращает json
        handlers.api.vacationPhotoContest(req, res, fields, files)
    })
})

// страница ошибки загрузки фото
app.get('/contest/vacation-photo-error', handlers.vacationPhotoContestError)

// страница благодарности после загрузки фотографии
app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoContestProcessThankYou)

// Обработчики ошибок 404 и 500
app.use(handlers.notFound)
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