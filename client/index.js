import React, { Component } from 'react';
import { render } from 'react-dom'

class Test extends Component {
	render() {
		console.log('yo')
		const yo = 'yo'

		return(
			<div>yo</div>
		)
	}
}

render(<Test />, document.getElementById('dashboard'))
