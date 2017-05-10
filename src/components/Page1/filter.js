import React, {Component} from 'react'
export default class Filter extends Component {
  constructor (props) {
    console.log(props)
    super(props)
    this.state = {
      m: 1
    }
  }
  componentWillUpdate (newProps, newState) {
    console.log('will update', newProps, newState)
  }
  componentWillReceiveProps (newProps) {
    console.log(newProps, 'in receive props')
    // this.setState({m: 2})
  }
  shouldComponentUpdate (newProps, newState) {
    console.log(newProps, newState, 'in should')
    return true
  }
  componentDidUpdate (newProps, newState) {
    console.log(newProps, newState, 'in did')
  }
  render () {
    // let {text} = this.props
    return (
      <p>{this.props.text + this.state.m}</p>
    )
  }
}
