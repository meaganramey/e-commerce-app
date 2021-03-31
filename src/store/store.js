import create from "zustand"
import { devtools, redux } from "zustand/middleware"

// define the store's initial state
const initialState = {
  user: { token: "" },
  messages: [],
}

// set action types


// define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// create useStore hook
export const useStore = create(devtools(redux(reducer, initialState)))
