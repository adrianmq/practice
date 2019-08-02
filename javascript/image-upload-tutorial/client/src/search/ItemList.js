import React, { Component } from 'react'


export default class ItemList extends Component {
  constructor(props) {
    super(props)
    this.state = { filtered: [] }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let currentList = []
    let newList = []
    if (e.target.value !== "") {
      currentList = this.props.items
      newList = currentList.filter(item => {
        const lc = item.value.toLowerCase()
        const filter = e.target.value.toLowerCase()
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter)
      })
    } else {
      newList = this.props.items
    }
    this.setState((state) => { return { filtered: newList } })
  }

  componentDidMount() {
    console.log('componentDidMount', this.props);
    this.setState((state) => {
      return { filtered: this.props.items }
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', this.props, nextProps);
    this.setState((state) => {
      return { filtered: nextProps.items }
    })
  }

  render() {
    console.log('render', this.state);
    return (
      <div>
        <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
        <ul>
          { 
            this.state.filtered.map(item => {
              return (
                <li key={item.id}>
                  {item.value} &nbsp;
                  <span
                    className="delete"
                    onClick={() => this.props.delete(item)}
                  />
                </li>
              )
            }
          )}
        </ul>
      </div>
    )
  }
}