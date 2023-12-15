const addDecimals = num => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const updateCart = state => {
  // calculate item price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
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

export { updateCart };
