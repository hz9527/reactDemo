import React from 'react'
import styles from './index.styl'
import Nav from '../common/Nav'
import Filter from './filter.js'
import axios from 'axios'

export default class Page1 extends React.Component {
	getList () {
		console.log(this.refs.hh)
		axios.get('/list')
			.then((res) => {
				console.log(res.data)
				this.x = 10
				this.setState(this.state)
				console.log(this.state, 'after setState')
			})
	}
	constructor (props) {
		super(props)
		this.state = {
			x: 10
		}
		this.x = 3
	}
	componentWillMount () {
		// console.log(333, this.x)
	}
	componentWillUpdate () {
		console.log(this.state, 'willUpdate hook')
	}
	componentDidUpdate (preProps, preState) {
		console.log(preState === this.state, 'didUpdate hook compare')
	}
	render () {
		console.log(this.state, 'render hook')
		return (
			<div className={styles.page1}>
				<Nav title={'page2'} path={'/page2'}/>
				<h2 onClick={this.getList.bind(this)}>{this.x}</h2>
				<Filter ref='hh'></Filter>
    	</div>
		)
	}
}
