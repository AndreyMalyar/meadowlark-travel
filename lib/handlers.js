// ====================================================
// ОБРАБОТЧИК МАРШРУТОВ
// принимает запрос req и отправляет ответ res
// ====================================================
// подключение модуля с предсказаниями
const fortune = require('./fortune')
// без дополнительных данных
exports.home = (req, res) => res.render('home')
// передает в него случайное предсказание
exports.about = (req, res) =>
    res.render('about', { fortune: fortune.getFortune() })

// обработчики для отправки форм через браузер
exports.newsletterSignup = (req, res) => {
    // CSRF токен используется для защиты от межсайтовой подделки запросов
    // вводим фиктивное значение
    res.render('newsletter-signup', {csrf: 'Здесь находится токен CSRF'})
}
exports.newsletterSignupProcess = (req, res) => {
    console.log('Форма (из строки запроса): ' + req.query.form)
    console.log('Токен CSRF (из скрытого поля формы): ' + req.body._csrf)
    console.log('Имя (из видимого поля формы): ' + req.body.name)
    console.log('Е-mail (из видимого поля формы): ' + req.body.email)
    // 303 (See Other) - правильный код для POST-redirect-GET паттерна
    // это предотвращает повторную отправку формы при обновлении страницы
    res.redirect(303, '/newsletter-signup/thank-you')
}
// благодарности после успешной подписки
exports.newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you')

// обработчик для отправки формы через fetch (API)
// сервер возвращает json в место html
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
    vacationPhotoContest: (req, res, fields, files) => {
      // fields - объект с текстовыми полями: {name: ['Иван']}
      // files - объект с файлами
      console.log('field data: ', fields)
      console.log('files: ', files)
      // в реальном приложении здесь было бы:
      // валидация загруженных данных (размер, тип)
      // изменение размера/оптимизация изображений
      // сохранение информации в db
      // перемещение файлов из временной папки
      res.send({ result: 'success' })
    }
}

// конкурс фотографий из отпуска (браузер)
exports.vacationPhotoContest = (req, res) => {
  const now = new Date()
  res.render('contest/vacation-photo', {
  year: now.getFullYear(),
  month: now.getMonth() // 0 - 11 (0 = январь, 11 = декабрь)
  })
}
// конкурс фотографий из отпуска (AJAX)
exports.vacationPhotoContestAjax = (req, res) => {
  const now = new Date()
  res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth() })
}

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
    console.log('данные поля: ', fields)
    console.log('файлы: ', files)

    res.redirect(303, '/contest/vacation-photo-thank-you')
}

exports.vacationPhotoContestProcessThankYou = (req, res) => {
  res.render('contest/vacation-photo-thank-you')
}

// обработка ошибок
exports.notFound = (req, res) => {
    res.status(404).render('404')
}
exports.serverError = (err, req, res, next) => {
    console.log(err)
    res.status(500).render('500')
}