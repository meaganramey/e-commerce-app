import React from "react";

import { useStore } from "../store/store";
import AuthView from "./Auth";
import Homepage from '../components/Homepage'

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
          <Homepage />
        </>
      )}
    </>
  );
}

export default Home;
