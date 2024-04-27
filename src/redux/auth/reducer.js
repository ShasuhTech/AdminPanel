import { createSlice } from "@reduxjs/toolkit";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./action";

const initialState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      // state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    }
  }
});

export const authActions = authReducer.actions;

export default authReducer.reducer;
