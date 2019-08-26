import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import makeStore from './store';
import { fetchPosts, fetchUsers, fetchComments } from './actions';
import { log } from 'util';

let store = makeStore();

class App extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <table>
            <thead>
              <tr>
                <td>Title</td>
                <td>Body</td>
                <td>User</td>
                <td>Comments</td>
              </tr>
            </thead>
            <tbody>
            {
              this.props.posts
                ? Object.values(this.props.posts).map((post, i) => {
                  return (
                      <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td>{
                          post.userId in this.props.users
                            ? this.props.users[post.userId]['name']
                            : '-'
                        }</td>
                        <td>{
                          post.id in this.props.commentsByPostId
                            ? Object.keys(this.props.commentsByPostId[post.id]).length
                            : 0
                        }</td>
                      </tr>
                  )
                })
                : (null)
            }
            </tbody>
          </table>
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  posts: state['api']['posts'],
  commentsByPostId: state['api']['commentsByPostId'],
  users: state['api']['users']
})

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => dispatch(fetchPosts(json)))
      .then(json => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(json => dispatch(fetchUsers(json)))

        fetch('https://jsonplaceholder.typicode.com/comments')
          .then(response => response.json())
          .then(json => dispatch(fetchComments(json)))
      })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
