import React from "react"
import { v4 } from 'node-uuid'


const containerStyle = {
  display: "flex"
};

const buttonStyle = {
  fontSize: "1.5rem",
  width: "40px",
  height: "40px"
};

export default class ReduxCounter extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.props.counter.value}</h1>
          <div style={containerStyle}>
            <button type="button" key={v4()} style={buttonStyle} onClick={this.props.minusOne}>
              -
            </button>
            <button type="button" key={v4()} style={buttonStyle} onClick={this.props.addOne}>
              +
            </button>
          </div>
        </header>
      </div>
    );
  }
}

// Reference: https://medium.com/@bretcameron/a-beginners-guide-to-redux-with-react-50309ae09a14