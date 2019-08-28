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
    this.props.getUsers()
    this.props.getComments()
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
                ? Object.values(this.props.posts.data).map((post, i) => {
                  return (
                      <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td>{
                          post.userId in this.props.users.data
                            ? this.props.users.data[post.userId]['name']
                            : '-'
                        }</td>
                        <td>{
                          post.id in this.props.comments.dataByPostId
                            ? Object.keys(this.props.comments.dataByPostId[post.id]).length
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
  posts: state['posts'],
  comments: state['comments'],
  users: state['users']
})
const mapDispatchToProps = {
  getPosts: fetchPosts,
  getUsers: fetchUsers,
  getComments: fetchComments
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
