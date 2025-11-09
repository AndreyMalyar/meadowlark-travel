import express from 'express'
import { engine } from 'express-handlebars'

import * as handlers from './lib/handlers.js'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const app = express()
const port = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(__dirname + '/public'))

// Настройка механизма представлений Handlebars.
app.engine('handlebars', engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

// пользовательские страницы
app.get('/', handlers.home)

app.get('/about', handlers.about)

// пользовательская страница 404
app.use(handlers.notFound)

// пользовательская страница 500
app.use(handlers.serverError)

// Экспортируем app для тестов
export default app

// Запускаем сервер только если файл запущен напрямую
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url)

if (isMainModule) {
    app.listen(port, () => {
        console.log(
            `Express запущен на http://localhost:${port}; ` + '\n' +
            'нажмите Ctrl+C для завершения.'
        )
    })
}