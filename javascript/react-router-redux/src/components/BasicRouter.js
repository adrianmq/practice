import React from 'react'
import { Route, Link } from 'react-router-dom'
import ReduxCounter from './Counter'
import ReduxTodo from './Todo'


const Hidden = () => (
  <h2>Hidden page, with no links to it</h2>
)

function BasicRouter() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Root</Link>
        </li>
        <li>
          <Link to='/about'>Simple Link</Link>
        </li>
        <li>
          <Link to='/topics'>Nested Routes</Link>
        </li>
        <li>
          <Link to='/redux-counter'>Redux Counter Tutorial</Link>
        </li>
      </ul>
      <hr />
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/topics' component={Topics} />
      <Route path='/redux-counter' component={ReduxCounter} />
      <Route path='/redux-todos' component={ReduxTodo} />
      <Route path='/no-link' component={Hidden} />
    </div>
  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  )
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-vs-state`}>Props vs State</Link>
        </li>
      </ul>
      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic</h3>}
      />
    </div>
  )
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  )
}

export default BasicRouter
