const express = require('express')
const { engine } = require('express-handlebars')

const handlers = require('./lib/handlers.js')
const weatherMiddleware = require('./lib/middleware/weather')

const app = express()

// Настройка механизма представлений Handlebars.
app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    }
}))
app.set('view engine', 'hbs')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.use(weatherMiddleware)

// пользовательские страницы
app.get('/', handlers.home)

app.get('/about', handlers.about)

app.get('/sections-test', handlers.sectionTest)

app.get('/foo', (req, res) => res.render('foo', {layout: 'microsite'})) // layout: null

// пользовательская страница 404
app.use(handlers.notFound)

// пользовательская страница 500
app.use(handlers.serverError)

app.listen(port, () => {
    console.log(
        `Express запущен на http://localhost:${port}; ` + '\n' +
        'нажмите Ctrl+C для завершения.'
    )
})