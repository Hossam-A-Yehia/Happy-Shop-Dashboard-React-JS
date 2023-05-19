import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userAccount: JSON.parse(localStorage.getItem("admin")) || null,
  isFetching: false,
  erorr: false,
};
export const usersSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.userAccount = null;
      state.isFetching = true;
      state.erorr = false;
    },
    loginSuccess: (state, action) => {
      state.userAccount = action.payload;
      state.isFetching = false;
      state.erorr = false;
      window.localStorage.setItem("admin", JSON.stringify(state.userAccount));
    },
    loginFailure: (state, action) => {
      state.userAccount = null;
      state.isFetching = false;
      state.erorr = true;
    },
    logout: (state, action) => {
      state.userAccount = null;
      state.erorr = true;
      window.localStorage.removeItem("admin");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } =
  usersSlice.actions;
export default usersSlice.reducer;
