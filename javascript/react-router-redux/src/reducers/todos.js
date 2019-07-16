import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from "../actions/ui/type";
import { createReducer } from "./index";


const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  list: []
};

const todosReducer = createReducer(initialState, {
  [SET_VISIBILITY_FILTER]: (state = initialState, action) => {
    return Object.assign({}, state, {
      visibilityFilter: action.filter
    })
  },
  [ADD_TODO]: (state = initialState, action) => {
    console.log('addTodo reducer', action, state)
    const text = action.text.trim();
    let todoList = [...state.list, {
      completed: false,
      text
    }]
    return Object.assign({}, state, {list: todoList});
  },
  [TOGGLE_TODO]: (state, action) => {
    return Object.assign({}, state, {
      list: state.list.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    })
  },
  [REMOVE_TODO]: (state, action) => {
    return Object.assign({}, state, {
      list: state.list.slice(0, action.index).concat(state.list.slice(action.index + 1))
    })
  }
});

export default todosReducer;
