import create from "zustand";
import { devtools, redux } from "zustand/middleware";

// define the store's initial state
const initialState = {
  user: { token: "" },
  cart: {},
  products: [],
};

// set action types
export const ALLPRODUCTS = "ALLPRODUCTS";
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";
export const UPDATECART = "ADDTOCART";
export const UPDATEPRODUCTQUANTITY = "UPDATEPRODUCTQUANTITY";

// define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case ALLPRODUCTS:
      return { products: action.payload };
    case LOGIN:
      return { user: action.payload };
    case SIGNUP:
      return { userSignUp: action.payload };
    case LOGOUT:
      return { logoutSuccess: action.payload, user: { token: "" } };
    case UPDATECART:
      return { cart: action.payload };
    case UPDATEPRODUCTQUANTITY:
      return { updateQuantity: action.payload };
    default:
      return state;
  }
};

// create useStore hook
export const useStore = create(devtools(redux(reducer, initialState)));
