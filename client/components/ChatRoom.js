import React, { Component } from 'react'
import ChatWindow from './ChatWindow'

export default class ChatRoom extends Component {

	constructor(props) {
		super(props)

		this.state = {
			socket: io.connect(`${socketUrl}:3000`),
			roomId: roomId,
			messages: [],
			user: {	
				userId: userId,
				email: email,
				firstName: firstName,
				lastName: lastName
			}
		}
	}

	componentDidMount() {
		this.fetchMessages(this.state.roomId)
	}

	fetchMessages(roomId) {
		$.getJSON(`/rooms/${roomId}/messages`, (messages) => {
			this.setState({
				messages: messages
			})
		})
	}

	render() {
		return(
			<div id='chat-room' className='container'>
				<div className='row'>
					<ChatWindow socket={ this.state.socket }
								roomId={ this.state.roomId }
								user={ this.state.user }
								messages={ this.state.messages } />
				</div>
			</div>
		)
	}
}

