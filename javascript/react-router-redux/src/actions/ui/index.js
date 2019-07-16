import * as actionTypes from "./type";

export const addOne = { type: actionTypes.ADD_ONE };
export const minusOne = { type: actionTypes.MINUS_ONE };
export const minusOneAsync = dispatch => {
  setTimeout(() => dispatch({ type: actionTypes.MINUS_ONE }), 1000);
};

export const addTodo = text => {
  return { type: actionTypes.ADD_TODO, text };
};
export const toggleTodo = index => {
  return { type: actionTypes.TOGGLE_TODO, index }
}
export const setVisibilityFilter = filter => {
  return { type: actionTypes.SET_VISIBILITY_FILTER, filter }
}
export const removeTodo = index => {
  return { type: actionTypes.REMOVE_TODO, index }
}
