// ===============================================
// обработчики маршрутов (handlers)
// ===============================================
const fortune = require('./fortune')

// главная страница
// res.render('home') - рендерит views/home.hbs с layout'ом main.hbs
exports.home = (req, res) => res.render('home')

// страница о нас
// Передаем данные в шаблон через объект: { fortune: '...' }
// В шаблоне доступен как {{fortune}}
exports.about = (req, res) =>
    res.render('about', { fortune: fortune.getFortune() })

// тестовая страница для демонстрации sections
exports.sectionTest = (req, res) => res.render('section-test')

// обработчик 404 (страница не найдена)
// res.status(404) - устанавливает HTTP статус
exports.notFound = (req, res) => {
    res.status(404).render('404')
}

// обработчик ошибок сервера (500)
// Принимает 4 параметра (err, req, res, next) - это важно для Express
exports.serverError = (err, req, res, next) => {
    console.log(err)
    res.status(500).render('500')
}