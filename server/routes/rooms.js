import express from 'express'
import Room from '../models/room'
import User from '../models/user'
import { IO } from '../index'
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

router.get('/:id', requiresLoggedIn, (req, res, next) => {
	const roomId = req.params.id
	const userId = req.session.userId
	const socketUrl = `${req.protocol}://${req.hostname}`

	Room.findOne({ _id: roomId }, (err, room) => {
		if (err) { next(err) }

		const messages = room.messages

		User.findOne({ _id: userId }, (err, user) => {
			if (err) {
				next(err)
			}

			res.render('room',
				{ title: 'Chat Room',
			   		roomId: roomId,
			   		roomName: room.name,
			   		socketUrl: socketUrl,
			   		email: user.email,
			   		messages: messages
				}
			)
		})
	})
})

router.post('/', (req, res, next) => {
	const { name } = req.body
	const userId = req.session.userId

	if (name && userId) {
		Room.create({ name: name, admin: userId }, (err, room) => {
			User.findByIdAndUpdate( userId, { $push: { 'rooms': { _id: room._id, name: room.name }}},
				(err) => {
					if (err) { next(err) }
					res.redirect(req.get('Referer'))
				}	
			)
		})
	}
})

export default router