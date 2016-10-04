import React, { Component } from 'react'
import uuid from 'node-uuid'
import Message from './Message'
import MessageInput from './MessageInput'

export default class ChatWindow extends Component {

	componentDidMount() {

		$('#messages').scrollTop($('#messages')[0].scrollHeight);
	}

	render() {
		const { messages, socket } = this.props

		return (
			<div id='chat-window' className='medium-6 medium-offset-1 columns'>
				<div id='messages'>
					{ messages.map((message) => {
						let msgKey = uuid.v4()

						return (
							<Message key={ msgKey } message={ message } />
						)
					})}
				</div>
				<MessageInput socket={ socket } />
			</div>
		)
	}
}