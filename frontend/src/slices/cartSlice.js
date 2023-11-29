import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = num => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

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

  // calculate item price
  state.itemsPrice = addDecimals(
    state.cartItems.reducer((acc, item) => acc + item.price * item.qty, 0)
  );

  // calculate shipping Price (if order > $100 then its free else $10)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // calculate tax price (15%)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  //calculate total price
  state.totalPrice = addDecimals(
    (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2)
  );
  // now we save it into localstorage
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  addToCart: addToCarts,
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
