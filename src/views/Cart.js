import React, {useState} from "react";
import { Redirect } from "react-router";
import CartItem from "../components/CartItem";
import { getAllProductsRequest } from "../fetchRequests";
import { ALLPRODUCTS, UPDATECART, useStore } from "../store/store";

function Cart(props) {
  const cart = useStore((state) => state.cart);
  const dispatch = useStore((state) => state.dispatch);
  const user = useStore((state) => state.user)
  const products = useStore((state) => state.products)
  const [cartKeys, setCartKeys] = useState(Object.keys(cart || {}));
  const [redirect, setRedirect] = useState(false)
  const removeFromCart = (productID) => {
    let cartCopy = cart
    const removedItem = cartKeys.filter((item) => item === productID)
    delete cartCopy[removedItem]
    dispatch({ type: UPDATECART, payload: cartCopy });
    setCartKeys(cartKeys.filter((item) => item !== productID))
  };

  const clearCart = (product) => {
    dispatch({ type: UPDATECART, payload: {} });
  };

  const checkout = () => {
    if (!user.token){
      setRedirect(true)
    }
    const products = products.map((product) => {
      if (cart[product.name]){
        product.stock = product.stock - cart[product.name].stock
        updateProductRequest(product).then((res) => {
          dispatch({type: UPDATEPRODUCTQUANTITY, payload: res})
        })
      }
      return product
    })
    getAllProductsRequest().then((res) => {
      dispatch({type: ALLPRODUCTS, payload: res})
    })
  };

  return (
    <>
      <div>Your Cart:</div>
      {cartKeys.length ? (
        <div>
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
          <div>
            <button onClick={clearCart}>Clear Cart</button>
          </div>
          <div>
            <button onClick={checkout}>Check Out</button>
          </div>
          {redirect && <Redirect to='/' />}
        </div>
      ) : (
        <div>No items in the cart!</div>
      )}
    </>
  );
}

export default Cart;
