import React from "react";
import { UPDATECART, useStore } from "../store/store";

function ProductItem(props) {
  const { cart, dispatch } = useStore((state) => state);
  const product = props.product;

  const addToCart = (product) => {
    const cartCopy = cart;
    if (cartCopy[product.id]) {
      cartCopy[product.id].amount += product.amount;
    } else {
      cartCopy[product.id] = product;
    }
    if (cartCopy[product.id].amount > product.product.stock) {
      cartCopy[product.id].amount = product.product.stock;
    }
    dispatch({ type: UPDATECART, payload: cartCopy });
  };

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
          {product.stock > 0 ? (
            <>{product.stock + " Available"}</>
          ) : (
            "Out of Stock"
          )}
          <div>
            <button
              onClick={(e) =>
                addToCart({
                  id: product.name,
                  product,
                  amount: 1,
                })
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
