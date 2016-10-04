import React, { Component } from 'react'
import uuid from 'node-uuid'
import Message from './Message'
import MessageInput from './MessageInput'

export default class ChatWindow extends Component {

	constructor(props) {
		super(props)
		this.state = {
			messages: []
		}

	}

	scrollForNewMessage() {
		$('#messages').scrollTop($('#messages')[0].scrollHeight)
	}

	componentDidMount() {
		const { socket, roomId } = this.props

		//pull old messages and scoll to top
		this.fetchMessages(roomId)		
		
		//add received messages to state
		socket.on('broadcast', (payload) => {
			this.addMessage(payload)
		})
	}

	fetchMessages(roomId) {
		$.getJSON(`/rooms/${roomId}/messages`, (messages) => {
			this.setState({
				messages: messages
			})
		})

		this.scrollForNewMessage();
	}

	emitMessage(payload) {
		const { socket } = this.props

		socket.emit('message', payload, () => {
			this.addMessage(payload)
		})
	}

	addMessage(payload) {
		let updatedMessages = this.state.messages.concat([payload])

		this.setState({
			messages: updatedMessages
		})

		this.scrollForNewMessage()
	}

	render() {
		const { socket, roomId, user } = this.props

		return (
			<div id='chat-window' className='medium-6 medium-offset-1 columns'>
				<div id='messages'>
					{ this.state.messages.map((message) => {
						let msgKey = uuid.v4()

						return (
							<Message key={ msgKey } message={ message } />
						)
					})}
				</div>
				<MessageInput socket={ socket } emitMessage={ this.emitMessage.bind(this) } roomId={ roomId } user={ user } />
			</div>
		)
	}
}