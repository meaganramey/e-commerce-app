import React from "react";
import CartItem from "../components/CartItem";
import { UPDATECART, useStore } from "../store/store";

function Cart(props) {
  const cart = useStore((state) => state.cart);
  const dispatch = useStore((state) => state.dispatch);
  const cartKeys = Object.keys(cart || {});
  const removeFromCart = (productID) => {
    const cartCopy = cartKeys.filter((item) => item !== productID);
    dispatch({ type: UPDATECART, payload: cartCopy });
  };

  const clearCart = (product) => {
    dispatch({ type: UPDATECART, payload: {} });
  };

  const checkout = () => {};

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
        </div>
      ) : (
        <div>No items in the cart!</div>
      )}
    </>
  );
}

export default Cart;
