import React, { Component } from 'react'
import classNames from 'classnames'

export default class Message extends Component {

	isUsersMsg() {

	}

	render() {
		const { message } = this.props

		const msgClass = classNames('message', {
			'currentUser': this.isUsersMsg
		})

		return (
			<div className={ msgClass } >
				<p className='msg--userId'>{message.userId}</p>
				<p className='msg--text'><span className='msg--timestamp'>{message.sentAt}</span>: {message.message}</p>
				
				<hr />
			</div>
		)
	}
}