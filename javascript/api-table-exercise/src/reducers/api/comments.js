import * as ActionTypes from '../../actions/types'
import { indexObjectList } from '../util'

const initialComments = {
    data: {}, dataByPostId: {}, loading: false, error: null
}
export const comments = (state = initialComments, action) => {
    switch (action.type) {
        case ActionTypes.GET_COMMENTS:
            return { ...state, loading: true }
        case ActionTypes.GET_COMMENTS_SUCCESS:
            let data = indexObjectList(action.data)
            let dataByPostId = action.data.reduce((commentsByPostId, comment) => {
                if (comment['postId'] in commentsByPostId) {
                    commentsByPostId[comment['postId']].push(comment)
                } else {
                    commentsByPostId[comment['postId']] = [comment]
                }
                return commentsByPostId
            }, {})
            return { ...state, loading: false, data, dataByPostId }
        case ActionTypes.GET_COMMENTS_FAILED:
            return { ...state, loading: false, error: action.error }
        default:
            return state;
    }
}
  