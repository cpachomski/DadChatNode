import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
	if (req.session) {
		req.session.destroy((err) => {
			if (err) {
				return next(err)
			} else {
				return res.redirect('/')
			}
		})
	}
})

export default router