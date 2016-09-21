import express from 'express'
import Room from '../models/room'
import User from '../models/user'
import { requiresLoggedIn } from '../middleware'

const router = express.Router()

router.get('/', requiresLoggedIn, (req, res, next) => {
	const { userId } = req.session
	let rooms = []

	User.findOne({ _id: userId }, (err, user) => {
		user.rooms.map((room) => {
			rooms.push(room)
		})
	}).then(() => {
		res.render('rooms', {title: 'rooms', rooms: rooms})
	})

})

router.post('/', (req, res, next) => {
	const { name } = req.body
	const userId = req.session.userId

	if (name && userId) {
		Room.create({ name: name, admin: userId }, (err, room, done) => {
			User.findOne({ _id: userId} , (err, user) => {
				user.rooms.push({_id: room._id, name: room.name })
				user.save((err) => {
					if (err) {
						next(err)
					}
					res.redirect(req.get('Referer'))
				})

			})
		})
	}

})

export default router