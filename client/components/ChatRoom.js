import React, { Component } from 'react'
import ChatWindow from './ChatWindow'

export default class ChatRoom extends Component {

	componentWillMount() {
		this.socket = io.connect(`${socketUrl}:3000`)
		this.roomId = roomId
		this.userId = userId
		this.messages = messages
		console.log(messages)
	}

	render() {
		return(
			<div id='chat-room' className='container'>
				<div className='row'>
					<ChatWindow socket={ this.socket }
								roomId={ this.roomId }
								userId={ this.userId } />
				</div>
			</div>
		)
	}
}

