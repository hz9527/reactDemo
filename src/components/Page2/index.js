import React from 'react'
import styles from './index.styl'
import Nav from '../common/Nav'
export default class Page2 extends React.Component {
	render () {
		return (
			<div className={styles.page2}>
				<Nav title={'page1'} path={'/page1'}/>
				<h2>page2test v1.1</h2>
	      	</div>
		)
	}
}
