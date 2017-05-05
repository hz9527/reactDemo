import React from 'react'
import {Link} from 'react-router-dom'
export default class Page1 extends React.Component {
	constructor (props) {
		super(props)
	}
	render () {
		let {title, path} = this.props
		return (
			<nav>
				 <Link to={path}>{title}</Link>
	      	</nav>
		)
	}
}