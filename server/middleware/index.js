export const requiresLoggedIn = (req, res, next) => {
	if (req.session && req.session.userId) {
		next()
	} else {
		let err = new Error('You gotta be logged in to view this page')
		err.status = 401
		return next(err)
	}
}