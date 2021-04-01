import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./views/Home";
import ProductList from "./views/ProductList";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={ProductList} />
      </Switch>
    </>
  );
}

export default App;
