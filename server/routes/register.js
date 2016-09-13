import express from 'express'
import User from '../models/user'
const router = express.Router()

router.get('/', (req, res, next) => {
	res.render('register', { title: 'register' })
})

router.post('/', (req, res, next) => {
	const { firstName,
			lastName,
			email,
			password,
			passwordConfirmation } = req.body

	if (firstName &&
		lastName  &&
		email     &&
		password  &&
		passwordConfirmation) {

		if (password !== passwordConfirmation) {
			let err = new Error('Passwords gotta be the same')
			err.status = 400
			next(err)
		}

		let userData = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		}

		User.create(userData, (err, user) => {
			if (err) {
				next(err)
			} else {
				//create user session
				req.session.userId = user._id
				return res.redirect('/rooms')
			}
		})
	}
})

export default router