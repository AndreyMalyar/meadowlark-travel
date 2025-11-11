// ===============================================
// Основной файл сервера
// Пример настройки Express с Handlebars
// ===============================================

const express = require('express')
const { engine } = require('express-handlebars')
const handlers = require('./lib/handlers.js')
const weatherMiddleware = require('./lib/middleware/weather')

const app = express()

// ===============================================
// Настройка Handlebars.
// ===============================================
app.engine('hbs', engine({
    // defaultLayout: основной шаблон обертки для всех страниц
    // находится в views/layouts/main.hbs
    defaultLayout: 'main',
    // extname: расширения файлов шаблонов
    // позволяет писать .hbs вместо .handlebars
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
// Указывает Express использовать Handlebars как движок шаблонов
app.set('view engine', 'hbs')

const port = process.env.PORT || 3000

// ===============================================
// middleware
// ===============================================

// раздача статических файлов (css, изображения, js)
// файлы из папки public доступны по корневому url
// Например: /public/style/style.css -> http://localhost:3000/css/style.css
app.use(express.static(__dirname + '/public'))

// middleware для добавления данных о погоде во все шаблоны
// данные будут доступны как {{partials.weatherContext}}
app.use(weatherMiddleware)

// ===============================================
// маршруты
// ===============================================

// главная страница
app.get('/', handlers.home)

// страница о нас с предсказанием
app.get('/about', handlers.about)

// тестовая страница для демонстрации sections
app.get('/sections-test', handlers.sectionTest)

// пример использования другого layout'a
// layout: 'microsite' - использует views/layouts/microsite.hbs
// layout: null - отключает layout совсем (только содержимое страницы)
app.get('/foo', (req, res) => res.render('foo', {layout: 'microsite'}))

// ===============================================
// обработка ошибок
// ===============================================

// Обработчик 404 (страница не найдена)
// Должна быть после всех маршрутов
app.use(handlers.notFound)

// Обработчик 500 (ошибка сервера)
// Должен быть последним
app.use(handlers.serverError)

// ===============================================
// запуск сервера
// ===============================================
app.listen(port, () => {
    console.log(
        `Express запущен на http://localhost:${port}; ` + '\n' +
        'нажмите Ctrl+C для завершения.'
    )
})