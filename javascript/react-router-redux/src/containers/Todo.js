import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import AddTodo from "./AddTodo"
import {
  addTodo,
  toggleTodo,
  removeTodo,
  setVisibilityFilter
} from "../actions/ui/index";
import { VisibilityFilters } from "../actions/ui/type"


class TodoListContainer extends React.Component {
  render() {
    return (
      <div>
        <div>
          <AddTodo />
        </div>
        <TodoList {...this.props} />
      </div>
    )
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ALL:
    default:
      return todos
  }
}

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})
const mapDispatchToProps = (dispatch) => ({
  toggleTodo: (id) => {
    return dispatch(toggleTodo(id))
  }
})

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListContainer)

export default withRouter(VisibleTodoList)