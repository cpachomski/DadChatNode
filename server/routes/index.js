import express from 'express'
import loginRoutes from './login'
import registrationRoutes from './register'

const router = express.Router()

router.get('/', (req, res, next) => {
	res.render('index', { title: 'index' })
})

router.get('/about', (req, res, next) => {
	res.render('about', { title: 'about' })
})

router.use('/login', loginRoutes)
router.use('/register', registrationRoutes)

export default router;