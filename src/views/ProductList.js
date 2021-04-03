import React, { useEffect } from "react";

import { ALLPRODUCTS, useStore } from "../store/store";
import { getAllProductsRequest } from "../fetchRequests";
import ProductItem from "../components/ProductItem";

function ProductList(props) {
  const dispatch = useStore((state) => state.dispatch);
  const products = useStore((state) => state.products);

  useEffect(() => {
    getAllProductsRequest().then((products) =>
      dispatch({ type: ALLPRODUCTS, payload: products })
    );
  }, []);

  return (
    <>
      {products.map((product) => (
        <ProductItem product={product} />
      ))}
    </>
  );
}

export default ProductList;
