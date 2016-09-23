import Room from './models/room'


export default (io) => {
	io.sockets.on('connection', (socket) => {
		handleJoin(socket)
		handleSendInvites(socket, io)
		createPersonalSocket(socket)
	})
}

function handleJoin(socket) {
	socket.on('join-chat', (channel, cb) => {
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

		Room.findByIdAndUpdate(roomId, { $push: { 'messages': msgData }}, () => {
			socket.broadcast.to(channel).emit('broadcast', payload)
			cb()
		})
	})
}

function createPersonalSocket(socket) {
	socket.on('join-personal-channel', (channel, cb) => {
		socket.join(channel)
		console.log(`user: ${channel} just logged in`)
	})
}


function handleSendInvites(socket, io) {
	socket.on('send-invitation', (payload, cb) => {
		//join personal socket of person being invited
		console.log(payload.invitee)
		socket.broadcast.to(payload.invitee).emit('invitation', {message: 'hi'})
	})
}

//when you log in your personal channel will be created (it's name is your userId)
//when a user invites another user they will connect to the users channel and then be send them the invite
//the 

