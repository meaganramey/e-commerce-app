import React from "react";
import { Link } from "react-router-dom";
import { logoutRequest } from "../fetchRequests";

import { LOGOUT, useStore } from "../store/store";

function NavBar(props) {
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const dispatch = useStore((state) => state.dispatch);

  const handleLogout = (e) => {
    if (window.confirm("Are you sure you want to logout?")) {
      logoutRequest(user.token).then(() => {
        console.log("after the logout request");
        dispatch({ type: LOGOUT });
      });
    }
  };

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/add-product">Add Product</Link>
      <Link to="/cart">
        Cart <span>{cart.length} items</span>
      </Link>
      {!user.token ? (
        <Link to="/login">Login</Link>
      ) : (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      )}
    </>
  );
}

export default NavBar;
