import React from "react";

function CartItem(props) {
  const { cartItem, cartKey } = props;
  const { product, amount } = cartItem;

  return (
    <>
      <div>
        <div>
          <img scr="" alt={product.shortDesc} width="200px" />
        </div>
        <div>
          <b>
            {product.name} <span>${product.price}</span>
          </b>
          <div>{product.shortDesc}</div>
          {amount} in Cart
          <div>
            <button onClick={(e) => props.removeFromCart(cartKey)}>
              Remove From Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
