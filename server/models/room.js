import mongoose, { Schema } from 'mongoose'

const RoomSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	admin: {
		type: Schema.Types.ObjectId,
		required: true
	},
	users: [{ type: Schema.Types.ObjectId }],
	currentUsers: [{ type: Schema.Types.ObjectId }],
	messages: Array
})

const Room = mongoose.model('Room', RoomSchema)

export default Room