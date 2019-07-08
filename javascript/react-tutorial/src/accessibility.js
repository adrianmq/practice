import React from 'react'


/* 
  Programmatically managing focus
*/


class CustomTextInput extends React.Component {
  constructor(props) {
    super(props)
    // Create a ref to store the textInput DOM element
    this.textInput = React.createRef()
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus()
  }

  render() {
    <input
      type="text"
      ref={this.textInput} />
  }
}

/* 
  Exposing DOM Refs to parent components
*/
function CustomTextInputChild(props) {
  return (
    <div>
      <input ref={this.inputRef} />
    </div>
  )
}

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.inputElement = React.createRef()
  }

  componentDidMount() {
    // Focus when required
    this.inputElement.current.focus()
  }

  render() {
    return (
      <CustomTextInputChild inputRef={this.inputElement} />
    )
  }
}



/* 
  Mouse and pointer events handled using keyboard alone
*/
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
    this.toggleContainer = React.createRef()

    this.onClickHandler = this.onClickHandler.bind(this)
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this)
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler)
  }

  componentWillMount() {
    window.removeEventListener('click', this.onClickOutsideHandler)
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }))
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false })
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    )
  }
}


/* 
  Blur and focus example
*/
class BlurExample extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this)
    this.onBlurHandler = this.onBlurHandler.bind(this)
    this.onFocusHandler = this.onFocusHandler.bind(this)
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }))
  }

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      })
    })
  }

  focusHandler() {
    clearTimeout(this.timeOutId)
  }

  render() {
    // React assists us by bubbling the blur and focus events to the parent
    return (
      <div
        onBlur={this.onBlurHandler}
        onFocus={this.onFocusHandler}>
        <button
          onClick={this.onClickHandler}
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    )
  }
}
















