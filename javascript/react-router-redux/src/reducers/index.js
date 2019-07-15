import { combineReducers } from 'redux'
import counterReducer from './counter'
import todosReducer from './todos'


export default combineReducers({
  counter: counterReducer,
  todos: todosReducer
})