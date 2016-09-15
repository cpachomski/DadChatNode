import mongoose, { Schema } from 'mongoose'

const RoomSchema = new Schema({
	users: [{ type: Number, ref: 'User' }],
	messages: [{ type: Number, ref: 'Message' }]
})

const Room = mongoose.model('Room', RoomSchema)

export default Room