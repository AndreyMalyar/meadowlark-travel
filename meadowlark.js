const express = require('express')
const { engine } = require('express-handlebars')

const handlers = require('./lib/handlers.js')

const app = express()

// Настройка механизма представлений Handlebars.
app.engine('handlebars', engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

// пользовательские страницы
app.get('/', handlers.home)

app.get('/about', handlers.about)

// пользовательская страница 404
app.use(handlers.notFound)

// пользовательская страница 500
app.use(handlers.serverError)

if (require.main === module) {
    app.listen(port, () => {
        console.log(
            `Express запущен на http://localhost:${port}; ` + '\n' +
            'нажмите Ctrl+C для завершения.'
        )
    })
} else {
    module.exports = app
}