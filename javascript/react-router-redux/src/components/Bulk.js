import React from 'react'
import { Route, Link } from 'react-router-dom'


export const Hidden = () => (
  <h2>Hidden page, with no links to it</h2>
)

export function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

export function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  )
}

export function Topics({ match }) {
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

export function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  )
}
