import create from "zustand";
import { devtools, redux } from "zustand/middleware";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
export const ADDAPRODUCT = "ADDAPRODUCT";

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
    case ADDAPRODUCT:
      return { addProductResponse: action.payload };
    default:
      return state;
  }
};

// create useStore hook
export const useStore = create(devtools(redux(reducer, initialState)));

// Toasts :
export const toastifyMessage = (message, type, styles = {}) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;

    case "error":
      toast.error(message);
      break;

    case "info":
      toast.info(message);
      break;

    case "warn":
      toast.warn(message);
      break;

    default:
      toast(message);
      break;
  }
};
