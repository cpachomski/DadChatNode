import React, { Component } from 'react';
import uuid from 'node-uuid'
import UserCard from './UserCard'

export default class UserList extends Component {

	constructor() {
		super()

		this.state = {
			users: []
		}
	}

	componentDidMount() {
		const { roomId } = this.props
		this.fetchUsers(roomId)
	}

	fetchUsers(roomId) {
		$.getJSON(`/rooms/${roomId}/users`, (users) => {
			this.setState({
				users: users
			})
		})
	}

	render() {
		return (
			<div className='medium-3 columns'>
				<div className='user-search'>
					<form>
						<label>Invite users
							<input id='user-search'
								   className='validate'
								   type='text'
								   name='query'>
							</input>
						</label>
					</form>
				</div>
				<div id='users-list'>
				{
					this.state.users.map((user) => {
						let userKey = uuid.v4()
						return (
							<UserCard key={ userKey } user={ user } />
						)
					})
				}
				</div>
			</div>
		)
	}
}