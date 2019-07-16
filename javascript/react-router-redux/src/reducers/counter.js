import { ADD_ONE, MINUS_ONE } from '../actions/ui/type'


const initialState = {
  value: 0
}

function counterReducer(counterState = initialState, action) {
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

export default counterReducer
