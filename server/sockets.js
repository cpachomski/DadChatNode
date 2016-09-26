import Room from './models/room'
import User from './models/user'


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
	})
}


function handleSendInvites(socket, io) {
	socket.on('send-invitation', (payload, cb) => {
		//join personal socket of person being invited
		const { invitee, sender, roomId, roomName } = payload

		//add push roomId into user's rooms array
		User.findByIdAndUpdate( invitee, { $push: {'rooms': { _id: roomId, name: roomName  } }},
			() => {
				let invitationPayload =  {
					sender: sender,
					roomId: roomId,
					roomName: roomName
				}
				socket.broadcast.to(payload.invitee).emit('invitation', invitationPayload)
			})
	})
}
