import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Home from './components/home'
import Login from './components/login'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
