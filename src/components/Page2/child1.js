import React from 'react'
import mobx, {observer} from 'mobx-react'
import {test, setTest} from './store'
export default @observer class Child1 extends React.Component {
  constructor (props) {
    super(props)
    this.x = test.value
  }
  click () {
    console.log(test.value)
    setTest(test.value + 1)
  }
  componentWillRecriveProps (props) {
    console.log('receive new props', props)
  }
  shouldComponentUpdate () {
    console.log(222)
    this.x = test.value
    return false
  }
  componentWillUpdate () {
    console.log('will update')
  }
	render () {
		return (
			<div>
        <div onClick={this.click.bind(this)}>click me</div>
        <div>{this.x}</div>
      </div>
		)
	}
}