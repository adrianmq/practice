import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReduxCounterContainer from '../containers/ReduxCounter'
import { Home, About, Topics, Hidden } from '../components/Bulk'
import "./App.css";


class App extends React.Component {
  render() {
    return (
      <Router {...this.props}>
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
          <Route path='/redux-counter' component={ReduxCounterContainer} />
          <Route path='/no-link' component={Hidden} />
        </div>
      </Router>
    );
  }
}

export default App
