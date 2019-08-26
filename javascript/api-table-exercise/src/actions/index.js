const FETCH_POSTS = 'FETCH_POSTS'
export function fetchPosts(data) {
  return { type: FETCH_POSTS, data }
}

const FETCH_USERS = 'FETCH_USERS'
export function fetchUsers(data) {
  return { type: FETCH_USERS, data }
}
  
const FETCH_COMMENTS = 'FETCH_COMMENTS'
export function fetchComments(data) {
  return { type: FETCH_COMMENTS, data }
}
