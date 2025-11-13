const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')

exports.about = (req, res) =>
    res.render('about', { fortune: fortune.getFortune() })

// обработчики для отправки форм через браузер
exports.newsletterSignup = (req, res) => {
    // вводим фиктивное значение
    res.render('newsletter-signup', {csrf: 'Здесь находится токен CSRF'})
}
exports.newsletterSignupProcess = (req, res) => {
    console.log('Форма (из строки запроса): ' + req.query.form)
    console.log('Токен CSRF (из скрытого поля формы): ' + req.body._csrf)
    console.log('Имя (из видимого поля формы): ' + req.body.name)
    console.log('Е-mail (из видимого поля формы): ' + req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
}
exports.newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you')

// обработчик для отправки формы через fetch (API)
exports.newsletter = (req, res) => {
    // вводим фиктивное значение
    res.render('newsletter', {csrf: 'Здесь находится токен CSRF'})
}
exports.api = {
    newsletterSignup: (req, res) => {
        console.log('CSRF токен (из скрытого поля формы):', req.body._csrf)
        console.log('Имя:', req.body.name)
        console.log('Email:', req.body.email)

        // отправляем JSON ответ (не HTML!)
        res.send({ result: 'success' })
    },
}



exports.notFound = (req, res) => {
    res.status(404).render('404')
}

exports.serverError = (err, req, res, next) => {
    console.log(err)
    res.status(500).render('500')
}