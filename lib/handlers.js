import { getFortune } from './fortune.js';

export const home = (req, res) => res.render('home')

export const about = (req, res) =>
    res.render('about', { fortune: getFortune() })

export const notFound = (req, res) => {
    res.status(404).render('404')
}

export const serverError = (err, req, res, next) => {
    console.log(err)
    res.status(500).render('500')
}