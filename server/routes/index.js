import express from 'express'
import loginRoutes from './login'
import logoutRoute from './logout'
import registrationRoutes from './register'
import roomRoutes from './rooms'

const router = express.Router()

router.get('/', (req, res, next) => {
	res.render('index', { title: 'index' })
})

router.get('/about', (req, res, next) => {
	res.render('about', { title: 'about' })
})

//Auth Routes
router.use('/login', loginRoutes)
router.use('/register', registrationRoutes)
router.use('/logout', logoutRoute)

//Logic Routes
router.use('/rooms', roomRoutes)

export default router;