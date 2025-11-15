const handlers = require('../handlers')

// ====================================================
// тесты основных страниц
// ====================================================
test('home page renders', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.home(req, res)
    expect(res.render).toHaveBeenCalledWith('home')
})

test('страница о нас отображается с предсказанием', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.about(req, res)
    expect(res.render).toHaveBeenCalledTimes(1)
    expect(res.render).toHaveBeenCalledWith('about',
        expect.objectContaining({
            fortune: expect.stringMatching(/.+/), // любая не пустая строка
        })
    )
})

// ====================================================
// тесты подписку на рассылку (традиционный способ)
// ====================================================
test('newsletterSignup отображает форму с CSRF токеном', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.newsletterSignup(req, res)
    expect(res.render).toHaveBeenCalledWith('newsletter-signup', {
        csrf: 'Здесь находится токен CSRF'
    })
})

test('newsletterSignupProcess обрабатывает данные и делает redirect', () => {
    // Подменяем console.log на мок, чтобы не засорять вывод
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

    const req = {
        query: { form: 'newsletter'},
        body: {
            _csrf: 'test-csrf-token',
            name: 'Иван Иванов',
            email: 'ivan@example.com'
        }
    }
    const res = { redirect: jest.fn() }

    handlers.newsletterSignupProcess(req, res)

    // проверяем, что данные залогированы
    expect(consoleLogSpy).toHaveBeenCalledWith('Форма (из строки запроса): newsletter')
    expect(consoleLogSpy).toHaveBeenCalledWith('Токен CSRF (из скрытого поля формы): test-csrf-token')
    expect(consoleLogSpy).toHaveBeenCalledWith('Имя (из видимого поля формы): Иван Иванов')
    expect(consoleLogSpy).toHaveBeenCalledWith('E-mail (из видимого поля формы): ivan@example.com')

    // проверяем redirect с правильным кодом
    expect(res.redirect).toHaveBeenCalledWith(303, '/newsletter-signup/thank-you')

    // Восстанавливаем оригинальный console.log
    consoleLogSpy.mockRestore()
})

test('newsletterSignupThankYou отображает страницу благодарности', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.newsletterSignupThankYou(req, res)
    expect(res.render).toHaveBeenCalledWith('newsletter-signup-thank-you')
})

// ====================================================
// тесты подписку через Api (современный способ)
// ====================================================
test('newsletter отображает форму с CSRF токеном', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.newsletter(req, res)
    expect(res.render).toHaveBeenCalledWith('newsletter', {
        csrf: 'Здесь находится токен CSRF'
    })
})

test('api.newsletterSignup возвращает JSON успеха', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

    const req = {
        body: {
            _csrf: 'api-csrf-token',
            name: 'Петр Петров',
            email: 'petr@example.com'
        }
    }
    const res = { send: jest.fn() }

    handlers.api.newsletterSignup(req, res)

    // проверяем логирование
    expect(consoleLogSpy).toHaveBeenCalledWith('CSRF токен (из скрытого поля формы):', 'api-csrf-token')
    expect(consoleLogSpy).toHaveBeenCalledWith('Имя:', 'Петр Петров')
    expect(consoleLogSpy).toHaveBeenCalledWith('E-mail:', 'petr@example.com')

    // Проверяем JSON ответ
    expect(res.send).toHaveBeenCalledWith({ result: 'success' })

    consoleLogSpy.mockRestore()
})

// ====================================================
// тесты конкурса фотографий
// ====================================================

test('vacationPhotoContest отображает форму с текущей датой', () => {
    const req = {}
    const res = { render: jest.fn() }

    // мокаем Date для предсказуемого результата
    const mockDate = new Date('2025-09-15')
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

    handlers.vacationPhotoContest(req, res)

    expect(res.render).toHaveBeenCalledWith('contest/vacation-photo', {
        year: 2025,
        month: 08
    })

    // Восстанавливаем оригинальный Date
    global.Date.mockRestore()
})

test('vacationPhotoContestProcess обрабатывает загрузку и делает redirect', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

    const req = {}
    const res = { redirect: jest.fn() }
    const fields = {
        name: ['Сергей Сергеев'],
        email: ['sergey@example.com']
    }
    const files = {
        photo: [{
            path: '/tmp/upload_abc123',
            originalFilename: 'vacation.jpg',
            size: 54321
        }]
    }

    handlers.vacationPhotoContestProcess(req, res, fields, files)

    // Проверяем логирование
    expect(consoleLogSpy).toHaveBeenCalledWith('данные поля: ', fields)
    expect(consoleLogSpy).toHaveBeenCalledWith('файлы: ', files)

    // Проверяем redirect
    expect(res.redirect).toHaveBeenCalledWith(303, '/contest/vacation-photo-thank-you')

    consoleLogSpy.mockRestore()
})

test('vacationPhotoContestProcessThankYou отображает страницу благодарности', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.vacationPhotoContestProcessThankYou(req, res)
    expect(res.render).toHaveBeenCalledWith('contest/vacation-photo-thank-you')
})

test('api.vacationPhotoContest возвращает JSON успеха', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

    const req = {}
    const res = { send: jest.fn() }
    const fields = {
        name: ['Мирия Иванова'],
        email: ['maria@example.com']
    }
    const files = {
        photo: [{
            path: '/public/uploads/photo_xyz789.jpg',
            originalFilename: 'beach.jpg',
            size: 98765
        }]
    }

    handlers.api.vacationPhotoContest(req, res, fields, files)

    // проверяем логирование
    expect(consoleLogSpy).toHaveBeenCalledWith('field data: ', fields)
    expect(consoleLogSpy).toHaveBeenCalledWith('files: ', files)

    // проверяем JSON ответ
    expect(res.send).toHaveBeenCalledWith({ result: 'success' })

    consoleLogSpy.mockRestore()
})

// ====================================================
// тесты обработчиков ошибок
// ====================================================

test('рендеринг обработчика ошибки 404', () => {
    const req = {}
    const res = {
        status: jest.fn().mockReturnThis(),
        render: jest.fn()
    }
    handlers.notFound(req, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.render).toHaveBeenCalledWith('404')
})

test('рендеринг обработчика ошибки 500', () => {
    // Подменяем console.log на мок
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
    const err = new Error('some error')
    const req = {}
    const res = {
        status: jest.fn().mockReturnThis(),
        render: jest.fn()
    }
    const next = jest.fn()
    handlers.serverError(err, req, res, next)
    expect(consoleLogSpy).toHaveBeenCalledWith(err)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.render).toHaveBeenCalledWith('500')

    // Восстанавливаем оригинальный console.log
    consoleLogSpy.mockRestore()
})