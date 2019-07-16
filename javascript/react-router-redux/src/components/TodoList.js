import React from 'react'
import Todo from './Todo'
import { v4 } from 'node-uuid'


export default class TodoList extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <ol>
          {
            this.props.todos.list.length < 1
              ? <li style={{listStyleType: 'none'}}>No matters to cover</li>
              : this.props.todos.list.map((todo, index) => {
                return <Todo
                  key={v4()}
                  onClick={() => this.props.toggleTodo(index)}
                  index={index}
                  completed={todo.completed}
                  text={todo.text}
                  />
              })
          }
        </ol>
      </div>
    )
  }
}