import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

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
      <Container
        // maxWidth='xs'
        spacing={2}
      >
        <Grid spacing={4} container direction="row" justify="center" alignItems="center">
          {products.map((product) => (
            <Grid item xs>
              <ProductItem key={product.id} product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default ProductList;
