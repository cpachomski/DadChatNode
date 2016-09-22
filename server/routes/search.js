import express from 'express'
import User from '../models/user'
const router = express.Router()

router.post('/users', (req, res, next) => {
	const { query } = req.body

	User.find({$text: {$search: query}}, {score: {$meta: "textScore"}})
		.sort({score:{$meta:"textScore"}}).exec((err, results)=> {
		res.send(results)
	})
})

export default router