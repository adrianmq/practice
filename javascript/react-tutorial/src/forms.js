import React from  'react'


export default class NameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      textarea: '',
      select: ''
    }

    this.textInput = React.createRef()
    this.classComponentTextInput = React.createRef()
    this.fileInput = React.createRef()
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleChangeTextarea = this.handleChangeTextarea.bind(this)
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeText(event) {
    this.setState({text: event.target.value.toUpperCase()});
  }

  handleChangeTextarea(event) {
    console.log('textarea changed '+event);
    this.setState({textarea: event.target.value.toUpperCase()})
  }

  handleChangeSelect(event) {
    this.setState({select: event.target.value})
  }

  handleSubmit(event) {
    console.log('Submitted: ', this.state, this.textInput.current.value, this.fileInput.current.files[0].name);
    event.preventDefault();
  }

  componentDidMount() {
    console.log(this.classComponentTextInput.current, this.classComponentTextInput)
    // this.classComponentTextInput.current.focus()
  }

  render() {
    let labelStyle = {
      display: 'grid',
      margin: '15px 25%'
    }

    return (
      <form onSubmit={this.handleSubmit} style={{marginTop: '3%', display: 'grid'}}>
        <label style={labelStyle}>
          Text:
          <input type="text" value={this.state.text} onChange={this.handleChangeText} />
        </label>
        <label style={labelStyle}>
          Textarea:
          <textarea value={this.state.textarea} onChange={this.handleChangeTextarea}></textarea>
        </label>
        <label style={labelStyle}>
          Select:
          <select value={this.state.select} onChange={this.handleChangeSelect}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <label style={labelStyle}>
          Uncontrolled:
          <input type='text' defaultValue='Default Value' ref={this.textInput}></input>
        </label>
        <label htmlFor="File Upload" style={labelStyle}>
          <input type="file" ref={this.fileInput}/>
        </label>
        <label style={labelStyle}>
          Class Component Text Input
          <CustomTextInput ref={this.classComponentTextInput} defaultValue="Empty"/>
        </label>
        <input type="submit" value="Submit" style={labelStyle} />
      </form>
    );
  }
}


class CustomTextInput extends React.Component {
  /* <input type="text" defaultValue={this.props.defaultValue} /> */
  render() {
    return (
      <input type="text" ref={this.ref}/>
    )
  }
}


