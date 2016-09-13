import express from 'express'
import User from '../models/user'
const router = express.Router()

router.get('/', (req, res, next) => {
	res.render('login', { title: 'login' })
})

router.post('/', (req, res, next) => {
	const { email, password } = req.body

	if (email && password) {
		User.authenticate(email, password, (err, user) => {
			if (err || !user) {
				let err = new Error('Wrong email or password cmon jeez')
				err.status= 401
				return next(err)
			} else {
				//create user session
				req.session.userId = user._id
				return res.resdirect('/rooms')
			}
		})
	} else {
		let err = new Error('Gotta give me both the email and the password')
		err.status = 401
		return next(err)
	}
})

export default router;