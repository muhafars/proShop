import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
};

const reducersFill = {
  setCredentials: (state, action) => {
    state.userInfo = action.payload;
    localStorage.getItem("userInfo", JSON.stringify(action.payload));
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: reducersFill,
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
