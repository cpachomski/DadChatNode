import express from 'express'
import Room from '../models/room'
import { requiresLoggedIn } from '../middleware'

const router = express.Router()

router.get('/:id/messages', requiresLoggedIn, (req, res, next) => {
	const roomId = req.params.id

	Room.findOne({ _id: roomId }, (err, room) => {
		if (err) { next(err) }

		// return most recent 100 messages 	
		let messages = room.messages.slice(1).slice(-100)
		res.send(messages);
	})
})

export default router