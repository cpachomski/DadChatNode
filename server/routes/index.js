import express from 'express'
import loginRoutes from './login'
import logoutRoute from './logout'
import registrationRoutes from './register'

const router = express.Router()

router.get('/', (req, res, next) => {
	res.render('index', { title: 'index' })
})

router.get('/about', (req, res, next) => {
	res.render('about', { title: 'about' })
})

router.get('/rooms', (req, res, next) => {
	res.render('rooms', {title: 'rooms' })
})

//Auth Routes
router.use('/login', loginRoutes)
router.use('/register', registrationRoutes)
router.use('/logout', logoutRoute)

export default router;