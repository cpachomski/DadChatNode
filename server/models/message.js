import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
	user: [{ type: number, ref: 'User', required: true }],
	content: {
		type: String,
		required: true
	}
})