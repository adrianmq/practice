import React from 'react'


export default class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.startDate = new Date()
    this.state = {date: this.startDate}
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        <h3>Time information</h3>
        <p>Start {this.startDate.toLocaleTimeString()}</p>
        <p>Current {this.state.date.toLocaleTimeString()}</p>
      </div>
    )
  }
}