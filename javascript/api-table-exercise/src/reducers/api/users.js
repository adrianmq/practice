import * as ActionTypes from '../../actions/types'
import { indexObjectList } from '../util'

const initialUsers = {
  data: {}, loading: false, error: null
}
export const users = (state = initialUsers, action) => {
  switch (action.type) {
    case ActionTypes.GET_USERS:
      return { ...state, loading: true }
    case ActionTypes.GET_USERS_SUCCESS:
      let data = indexObjectList(action.data)
      return { ...state, loading: false, data }
    case ActionTypes.GET_USERS_FAILED:
      return { ...state, loading: false, error: action.error }
    default:
      return state;
  }
}
