import { ADD_ONE, MINUS_ONE } from '../actions/type'


const initialState = {
  value: 0
}

function CounterReducer(counterState = initialState, action) {
  switch (action.type) {
    case ADD_ONE:
      return {
        value: counterState.value + 1
      }
    
    case MINUS_ONE:
      return {
        value: counterState.value - 1
      }
      
    default:
      return counterState
  }
}

export default CounterReducer
