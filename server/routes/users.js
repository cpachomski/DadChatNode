import express from 'express'
import Room from '../models/room'
import { requiresLoggedIn } from '../middleware'

const router = express.Router()

router.get('/:id/users', requiresLoggedIn, (req, res, next) => {
	const roomId = req.params.id

	Room.findOne({ _id: roomId }, (err, room) => {
		if (err) { next(err) }

		//return users that have access to the chatroom
		let users = room.users
		res.send(users)
	})
}) 

export default router