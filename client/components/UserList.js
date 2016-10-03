import React, { Component } from 'react';

export default class UserList extends Component {

	componentWillMount() {
		//1. get current users for this room
	}

	render() {
		console.log("users list");

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
				</div>
			</div>
		)
	}
}