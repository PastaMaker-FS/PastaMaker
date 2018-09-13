import React from 'react'

import {Navbar} from './components'
import AllProducts from './components/allProducts'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AllProducts />
    </div>
  )
}

export default App
