import React, { Component } from 'react'
import uuid from 'node-uuid'
import Message from './Message'

export default class ChatWindow extends Component {

	componentDidMount() {
		console.log($)
		$('#messages').scrollTop($('#messages')[0].scrollHeight);
	}

	render() {
		const { messages } = this.props

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
			</div>
		)
	}
}