import React from 'react'
import styles from './index.styl'
import Nav from '../common/Nav'
export default class Page1 extends React.Component {
	render () {
		return (
			<div className={styles.page1}>
				<Nav title={'page2'} path={'/page2'}/>
				<h2>page1test</h2>
	      	</div>
		)
	}
}
