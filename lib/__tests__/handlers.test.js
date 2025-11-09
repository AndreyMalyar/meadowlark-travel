const handlers = require('../handlers')

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
            fortune: expect.stringMatching(/\W/),
        })
    )
})

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