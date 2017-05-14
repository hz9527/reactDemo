import React from 'react'
import styles from './index.styl'
import Nav from '../common/Nav'
import Filter from './filter.js'
import axios from 'axios'
import mobx, {observer, inject} from 'mobx-react'
import {observable} from 'mobx'

class Count {
	@observable count = 1
}
var count = new Count()

// var list = observable([1, 2, 3])
export default @observer class Page1 extends React.Component {
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
	// @observable count = 0
	constructor (props) {
		super(props)
		this.state = {
			x: 10
		}
		this.x = 3
	}
	componentWillMount () {
		// setInterval(() => {
		// 	count.count++
		// }, 2000)
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
				<span>{count.count}</span>
				<Filter ref='hh' text={this.x}></Filter>
    	</div>
		)
	}
}
