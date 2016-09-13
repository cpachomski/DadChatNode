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
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	isDad: {
		type: Boolean,
		default: true
	}
})

UserSchema.statics.authenticate = (email, password, cb) => {
	User.findOne({ email: email })
		.exec((error, user) => {
			if (error) {
				return cb(error)
			} else if ( !user ) {
				let err = new Error('User not found.')
				err.status = 401
				return cb(err)
			}

			bcrypt.compare(password, user.password, (error, result) => {
				if (result === true) {
					return cb(null, user)
				} else {
					return cb()
				}
			})
		})
}

//hash the password so it's super safe
UserSchema.pre('save', function(next) {
	let user = this
	bcrypt.hash(user.password, 10, (err, hash) => {
		if (err) {
			next(err)
		}

		user.password = hash
		next()
	})
})

const User = mongoose.model('User', UserSchema)
module.exports = User