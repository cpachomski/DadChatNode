import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
	},
	isDad: {
		type: Boolean,
		required: true
	}
})

//hash the password so it's super safe
UserSchema.pre('save', (next) => {
	let user = this
	bycrypt.hash(user.password, 10, (err, hash) => {
		if (err) {
			next(err)
		}

		user.password = hash
		next()
	})
})

const User = mongoose.model('User', UserSchema)
module.exports = User