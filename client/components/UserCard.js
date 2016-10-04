import React, { Component } from 'react'

export default class UserCard extends Component {
	render() {
		const { _id, email, firstName, lastName } = this.props.user

		return (
			<div className='user-card'>
				<p>{ firstName } { lastName }</p>
				<p>{ email} : {_id } </p>
			</div>
		)
	}
}