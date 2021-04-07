import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Cart from "./views/Cart";
import Home from "./views/Home";
import ProductList from "./views/ProductList";
import AddProduct from './views/AddProduct'

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/add-product" component={AddProduct} />
      </Switch>
    </>
  );
}

export default App;
