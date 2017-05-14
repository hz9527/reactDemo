import React from 'react'
import styles from './index.styl'
import Nav from '../common/Nav'
import Child1 from './child1'
import Child2 from './child2'
export default class Page2 extends React.Component {
	render () {
		return (
			<div className={styles.page2}>
				<Nav title={'page1'} path={'/page1'}/>
				<h2>page2</h2>
				<Child1 />
				<Child2 />
			</div>
		)
	}
}