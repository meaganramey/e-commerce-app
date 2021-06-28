import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Cart from "./views/Cart";
import Home from "./views/Home";
import ProductList from "./views/ProductList";
import AddProduct from "./views/AddProduct";
import AuthView from "./views/Auth";
import { LOGIN, useStore } from "./store/store";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("xs")]: {
      backgroundColor: theme.palette.primary.main,
      height: "140vh",
      paddingBottom: "8rem",
    },
    [theme.breakpoints.up("sm")]: {
      backgroundColor: theme.palette.primary.main,
      height: "150vh",
      paddingBottom: "8rem",
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.primary.main,
      height: "110vh",
      paddingBottom: "8rem",
    },
    [theme.breakpoints.up("lg")]: {
      backgroundColor: theme.palette.primary.main,
      height: "110vh",
      paddingBottom: "8rem",
    },
  },
}));

function App(props) {
  const classes = useStyles();
  const dispatch = useStore((state) => state.dispatch);
  useEffect(() => {
    if (localStorage.getItem("rememberMe")) {
      if (localStorage.getItem("token")) {
        let token = localStorage.getItem("token");
        let email = localStorage.getItem("email");
        dispatch({
          type: LOGIN,
          payload: { token: token, email: email, statusCode: 200 },
        });
      }
    }
  }, []);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/add-product" component={AddProduct} />
        <Route path="/login" component={AuthView} />
        <Route path="/signup" component={AuthView} />
      </Switch>
    </div>
  );
}

export default App;
