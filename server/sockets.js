import Room from './models/room'


export default (io) => {
	io.sockets.on('connection', (socket) => {
		handleJoin(socket)
	})
}

function handleJoin(socket) {
	socket.on('join', (channel, cb) => {
		socket.join(channel)
		handleMessage(socket, channel)
	})
}

function handleMessage(socket, channel) {
	socket.on('message', (payload, cb) => {
		const { message, roomId, sentAt, userId } = payload
		const msgData = {
			message:message,
			userId: userId,
			sentAt: sentAt
		}

		Room.findOne({ _id: roomId }, (err, room) => {
			room.messages.push(msgData)
			room.save(() => {
				socket.broadcast.to(channel).emit('broadcast', payload)
				cb()
			})
		})
	})
}