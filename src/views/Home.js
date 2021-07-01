import React from "react";
import { Redirect } from "react-router";

import { useStore } from "../store/store";
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
          <Redirect to="/products" />
        </>
      )}
    </>
  );
}

export default Home;
