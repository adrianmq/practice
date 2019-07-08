import React from 'react'


export default class Toggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isToggleOn: true }

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }))
  }

  render() {
    let style = {
      marginLeft: '25px',
      width: '65%',
      textAlign: 'right'
    }

    return (
      <div style={style}>
        <p>Toggle button</p>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    )
  }
}