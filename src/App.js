import React from 'react'
import {Route, Switch} from 'react-router-dom'

import NavBar from './components/NavBar'
import ProductList from './views/ProductList'


function App() {
  return (
    <>
    <NavBar />
    <Switch>
      <Route path="/products" component={ProductList} />
    </Switch>
    </>
  );
}

export default App;
