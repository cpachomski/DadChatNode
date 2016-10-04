import React, { Component } from 'react'

export default class MessageInput extends Component {

	constructor(props) {
		super(props)

		this.state = {
			text: ''
		}
	}

	sendMessage(payload) {
		const { emitMessage } = this.props
		emitMessage(payload)
	}

	handleTextChange(e) {
		this.setState({ text: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { roomId, user } = this.props
		const { text } = this.state

		let payload = {
			message: text,
			userId: user.userId,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			sentAt: new Date(),
			roomId: roomId
		}

		this.sendMessage(payload)
		this.refs.messageText.value = ''
	}

	render() {

		return (
			<div className='chat-input'>
				<form id='message'
					  onSubmit={ this.handleSubmit.bind(this) }>
					<input className='validate'
						   ref='messageText'
						   type='text'
						   name='message-text'
						   onChange={ this.handleTextChange.bind(this) } />
					<input className='button'
						   type='submit'
						   value='Send'/>
				</form>
			</div>
		)
	}
}