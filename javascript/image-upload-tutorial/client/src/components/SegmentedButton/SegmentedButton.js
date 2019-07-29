// Source
// https://moduscreate.com/blog/ext-js-react-button/

import React from "react";
import "./SegmentedButton.css";

class SegmentedButton extends React.Component {
  static defaultProps = {
    pressed: [],
    allowDepress: false
  };
  state = {
    pressed: this.props.pressed
  };
  componentWillReceiveProps({ pressed }) {
    this.setState(() => ({ pressed }));
  }
  onClick(handler, e) {
    // call the onClick handler if one was passed in
    if (handler && typeof handler === "function") {
      handler.call(this, e);
    }
    const { allowDepress } = this.props;
    const { target: btn } = e;
    const { tagName } = btn;
    let pressedState = this.state.pressed.slice(0);

    if (tagName === "BUTTON") {
      const { value } = btn;
      const valIndex = pressedState.indexOf(value);
      const isPressed = valIndex !== -1;
      // toggle the "pressed button state
      if (isPressed) {
        if (allowDepress || (!allowDepress && pressedState.length > 1)) {
          pressedState = pressedState.filter(item => item !== value);
        }
      } else {
        pressedState = [...pressedState, value];
      }
      this.setState({ pressed: pressedState });
    }
  }
  render() {
    const { pressed } = this.state;
    const { onClick } = this.props;
    return (
      <div className="button-group" onClick={this.onClick.bind(this, onClick)}>
        {this.props.children.map(btn => {
          const { props } = btn;
          const { value } = props;
          const className = pressed.includes(value) ? "btn-pressed" : "";

          /* use cloneElement to apply our own props over the button's props*/
          return React.cloneElement(btn, {
            ...props,
            key: value,
            className
          });
        })}
      </div>
    );
  }
}

export default SegmentedButton;
