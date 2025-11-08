import express from 'express'
import { engine } from 'express-handlebars'
import { getFortune as fortune } from './lib/fortune.js'

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
app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    res.render('about', {fortune: fortune()})
})

// пользовательская страница 404
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

// пользовательская страница 500
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `Express запущен на http://localhost:${port}; ${'\n'}` +
    'нажмите Ctrl+C для завершения'
))