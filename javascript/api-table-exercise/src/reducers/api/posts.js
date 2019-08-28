import * as ActionTypes from '../../actions/types'
import { indexObjectList } from '../util'

const initialPosts = {
  data: {}, loading: false, error: null
}
export const posts = (state = initialPosts, action) => {
  switch (action.type) {
    case ActionTypes.GET_POSTS:
      return { ...state, loading: true }
    case ActionTypes.GET_POSTS_SUCCESS:
      let data = indexObjectList(action.data)
      return { ...state, loading: false, data }
    case ActionTypes.GET_POSTS_FAILED:
      return { ...state, loading: false, error: action.error }
    default:
      return state;
  }
}
