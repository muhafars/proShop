import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addToCarts = (state, action) => {
  const item = action.payload;

  //check if there is item
  const existItem = state.cartItems.find(x => x._id === item._id);
  // if there is exist item then keep going
  if (existItem) {
    // return cartItems with item if cartItems._id same existItem._id and if no just return whatever in there
    state.cartItems = state.cartItems.map(x => (x._id === existItem._id ? item : x));
  } else {
    // if there unexist item then return loop of cartItem and item from payload
    state.cartItems = [...state.cartItems, item];
  }

  return updateCart(state);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: addToCarts,
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
