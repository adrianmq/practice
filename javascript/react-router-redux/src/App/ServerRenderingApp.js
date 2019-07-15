import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import BasicRouter from '../components/BasicRouter'
import './App.css'


function ServerRenderingApp() {
  return (
    <div className="App">
      <Router>
        <BasicRouter />
      </Router>
    </div>
  )
}

export default ServerRenderingApp