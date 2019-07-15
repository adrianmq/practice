import * as actionTypes from './type'

export const addOne = { type: actionTypes.ADD_ONE }
export const minusOne = { type: actionTypes.MINUS_ONE }
export const minusOneAsync = (dispatch) => {
  setTimeout(() => dispatch({ type: actionTypes.MINUS_ONE }), 1000)
}