import React from 'react'
import mobx, {observer} from 'mobx-react'
import {test, setTest} from './store'
export default @observer class Child2 extends React.Component {
  click () {
    console.log(setTest)
    setTest(test.value + 1)
  }
	render () {
		return (
			<div>
        <div onClick={this.click.bind(this)}>click me</div>
        <div>{test.value}</div>
      </div>
		)
	}
}