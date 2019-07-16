import { combineReducers } from 'redux'
import counterReducer from './counter'
import todosReducer from './todos'


export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    return handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state
  }
}

export default combineReducers({
  counter: counterReducer,
  todos: todosReducer
})