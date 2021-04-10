import React from "react";

import { useStore } from "../store/store";
import ProductList from "./ProductList";
import AuthView from "./Auth";

function Home(props) {
  const user = useStore((state) => state.user);

  return (
    <>
      {!user.token ? (
        <>
          <AuthView />
        </>
      ) : (
        <>
          <ProductList />
        </>
      )}
    </>
  );
}

export default Home;
