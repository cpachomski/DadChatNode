import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
	res.render('login', { title: 'login' })
})

router.post('/', (req, res, next) => {
	res.send('AHHHH')
})

export default router;