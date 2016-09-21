import express from 'express'
import { requiresLoggedIn } from '../middleware'

const router = express.Router()

router.get('/', requiresLoggedIn, (req, res, next) => {
	res.render('rooms', {title: 'rooms' })
})

router.post('/', (req, res, next) => {
	res.send("uhhhhhh it's not quite there yet")
})

export default router