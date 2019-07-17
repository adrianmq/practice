import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Notifications from 'react-notify-toast'
import UploadImage from './UploadImage'
import Footer from './Footer'
import FadeIn from '../layout/FadeIn'
import Grid from '../grid/Grid'
import List from '../list/List'
import './App.css'


const FadeInComponent = ({ component: Component, ...rest }) => {
  return (
    <FadeIn>
      <Component {...rest} />
    </FadeIn>
  )
}

const GridRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => (
      <FadeInComponent component={Component} />
    )} />
  )
}

const ListRoute = ({ component: Component, ...rest }) => {
  const sorters = [{ property: 'name', direction: 'DESC' }]
  const filters = [{ property: 'name', value: 'rico' }]

  return (
    <Route {...rest} render={routeProps => (
      <FadeInComponent component={Component} sorters={sorters} filters={filters} />
    )} />
  )
}

class App extends Component {
  render() {
    return (
      <Router {...this.props}>
        <div className='container'>
          <Notifications />
          <Route exact path='/' component={UploadImage} />
          <GridRoute exact path='/grid' component={Grid} />
          <ListRoute exact path='/list' component={List} />
          {/* <Route exact path='/list' component={List} /> */}
          <Footer />
        </div>
      </Router>
    )
  }
}


export default App