import React, { useState } from "react";
import { Redirect } from "react-router";
import CartItem from "../components/CartItem";
import { getAllProductsRequest, updateProductRequest } from "../fetchRequests";
import {
  ALLPRODUCTS,
  UPDATECART,
  UPDATEPRODUCTQUANTITY,
  useStore,
} from "../store/store";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  addproduct: {
    [theme.breakpoints.up("xs")]: {
      // backgroundColor: theme.palette.secondary.main,
      maxWidth: "90vw",
      margin: "0 auto",
      marginBottom: "10vh",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "70vw",
      // backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up("md")]: {
      // backgroundColor: theme.palette.success.main,
      maxWidth: "750px",
    },
  },
  addProductTitleBox: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
  },
  addProductTitleDiv: {
    [theme.breakpoints.up("xs")]: {
      width: "90%",
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "40%",
    },
  },
  productDetails: {
    [theme.breakpoints.up("xs")]: {
      width: "90%",
      marginBottom: "-1rem",
      "& > *": {
        width: "100%",
        marginBottom: "2rem",
      },
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
      marginTop: "8%",
    },
  },
}));

function Cart(props) {
  const cart = useStore((state) => state.cart);
  const dispatch = useStore((state) => state.dispatch);
  const user = useStore((state) => state.user);
  const products = useStore((state) => state.products);
  const [cartKeys, setCartKeys] = useState(Object.keys(cart || {}));
  const [redirect, setRedirect] = useState(false);
  const removeFromCart = (productID) => {
    let cartCopy = cart;
    const removedItem = cartKeys.filter((item) => item === productID);
    delete cartCopy[removedItem];
    dispatch({ type: UPDATECART, payload: cartCopy });
    setCartKeys(cartKeys.filter((item) => item !== productID));
  };

  const clearCart = (product) => {
    setCartKeys([]);
    dispatch({ type: UPDATECART, payload: {} });
  };

  const checkout = () => {
    if (!user.token) {
      setRedirect(true);
      return;
    }
    products.map((product) => {
      console.log("In the product map");
      if (cart[product.name]) {
        product.stock = product.stock - cart[product.name].amount;
        updateProductRequest(product).then((res) => {
          dispatch({ type: UPDATEPRODUCTQUANTITY, payload: res });
        });
      }
      return product;
    });
    getAllProductsRequest().then((res) => {
      dispatch({ type: ALLPRODUCTS, payload: res });
      clearCart();
    });
  };

  const classes = useStyles();
  return (
    <>
      <Card className={classes.addproduct}>
        <Box className={classes.addProductTitleBox}>
          <CardContent className={classes.addProductTitleDiv}>
            <h2>Your Cart:</h2>
          </CardContent>
          <CardContent className={classes.productDetails}>
            {cartKeys.length ? (
              <>
                {cartKeys.map((item) => {
                  return (
                    <CartItem
                      cartKey={item}
                      key={item}
                      cartItem={cart[item]}
                      removeFromCart={removeFromCart}
                    />
                  );
                })}
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={checkout}
                >
                  Checkout
                </Button>
                {redirect && <Redirect to="/" />}
              </>
            ) : (
              <h2>No items in the cart</h2>
            )}
          </CardContent>
        </Box>
      </Card>
    </>
  );
}

export default Cart;
