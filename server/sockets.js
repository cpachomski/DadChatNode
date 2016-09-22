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
	socket.on('message', (msg, cb) => {
		console.log(msg)
		socket.broadcast.to(channel).emit('broadcast', msg)
		cb()
	})
}