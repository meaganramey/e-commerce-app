import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Cart from "./views/Cart";
import Home from "./views/Home";
import ProductList from "./views/ProductList";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path='/cart' component={Cart} />
      </Switch>
    </>
  );
}

export default App;
