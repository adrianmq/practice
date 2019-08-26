import { combineReducers } from 'redux';

const apiInitialState = {
  posts: {},
  users: {},
  commentsByPostId: {}
}

const apiReducer = (state = apiInitialState, action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      let posts = action.data.reduce((postsById, post) => {
        postsById[post['id']] = post
        return postsById
      }, {})
      return { ...state, posts }
    case 'FETCH_USERS':
      let users = action.data.reduce((usersById, user) => {
        usersById[user['id']] = user
        return usersById
      }, {})
      return { ...state, users }
    case 'FETCH_COMMENTS':
      let commentsByPostId = action.data.reduce((commentsByPostId, comment) => {
        if (comment['postId'] in commentsByPostId) {
          commentsByPostId[comment['postId']].push(comment)
        } else {
          commentsByPostId[comment['postId']] = [comment]
        }
        return commentsByPostId
      }, {})
      return {
        ...state,
        commentsByPostId
      }
    default:
      return state;
  }
}

export default combineReducers({
  api: apiReducer
})
  