import * as Types from './types'

export function getPosts() {
  return { type: Types.GET_POSTS }
}
export function getPostsSuccess(data) {
  return { type: Types.GET_POSTS_SUCCESS, data }
}
export function getPostsFailed(error) {
  return { type: Types.GET_POSTS_FAILED, error }
}

export function getUsers() {
  return { type: Types.GET_USERS }
}
export function getUsersSuccess(data) {
  return { type: Types.GET_USERS_SUCCESS, data }
}
export function getUsersFailed(error) {
  return { type: Types.GET_USERS_FAILED, error }
}

export function getComments() {
  return { type: Types.GET_COMMENTS }
}
export function getCommentsSuccess(data) {
  return { type: Types.GET_COMMENTS_SUCCESS, data }
}
export function getCommentsFailed(error) {
  return { type: Types.GET_COMMENTS_FAILED, error }
}

export function fetchPosts() {
  return function(dispatch) {
    dispatch(getPosts)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => dispatch(getPostsSuccess(json)))
      .catch(error => {
        dispatch(getPostsFailed)
        Promise.reject(error)
      })
  }
}

export function fetchUsers() {
  return function(dispatch) {
    dispatch(getUsers)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => dispatch(getUsersSuccess(json)))
      .catch(error => {
        dispatch(getUsersFailed)
        Promise.reject(error)
      })
  }
}

export function fetchComments() {
  return function(dispatch) {
    dispatch(getComments)
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => dispatch(getCommentsSuccess(json)))
      .catch(error => {
        dispatch(getCommentsFailed)
        Promise.reject(error)
      })
  }
}
