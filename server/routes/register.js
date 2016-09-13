import express from 'express'
import User from '../models/user'
const router = express.Router()

router.get('/', (req, res, next) => {
	res.render('register', { title: 'register' })
})

router.post('/', (req, res, next) => {
	res.send('yo')
})

export default router