import React, { Component } from 'react'
import ChatWindow from './ChatWindow'
import UserList from './UserList'

export default class ChatRoom extends Component {

	constructor(props) {
		super(props)
		this.state = {
			socket: io.connect(`${socketUrl}:3000`),
			roomId: roomId,
			user: {	
				userId: userId,
				email: email,
				firstName: firstName,
				lastName: lastName
			}
		}
	}

	componentDidMount() {
		//join chatroom
		this.state.socket.emit('join-chat', this.state.roomId)
	}

	render() {
		return(
			<div id='chat-room' className='container'>
				<div className='row'>
					<ChatWindow socket={ this.state.socket }
								roomId={ this.state.roomId }
								user={ this.state.user } />
					<UserList 	socket={ this.state.socket }
								roomId={ this.state.roomId }
								user={ this.state.user } />
				</div>
			</div>
		)
	}
}

