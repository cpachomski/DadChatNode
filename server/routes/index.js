import express from 'express'

const router = express.Router()

router.get('/login', (req, res, next) => {
	return res.render('login', { title: 'login' })
})

router.get('/register', (req, res, next) => {
	return res.render('register', { title: 'register' })
})

export default router;