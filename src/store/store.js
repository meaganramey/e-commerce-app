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

// define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case ALLPRODUCTS:
      return { products: action.payload };
    default:
      return state;
  }
};

// create useStore hook
export const useStore = create(devtools(redux(reducer, initialState)));
