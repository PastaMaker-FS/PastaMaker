import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

import AllProducts from './components/products/all-products'

const App = () => {
  return (
    <div>
      <Navbar />
      <AllProducts />
      <Routes />
    </div>
  )
}

export default App
