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
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
})

const Room = mongoose.model('Room', RoomSchema)

export default Room