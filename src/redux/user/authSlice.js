import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./authOperations";
import Toast from "react-native-root-toast";

const initialState = {
  user: {},
  isLoggedIn: false,
  isRefreshing: false,
};

const handlePending = (state) => {
  state.error = null;
  state.isRefreshing = true;
};
const handleRejected = (state, action) => {
  state.isRefreshing = false;
  const errMess = action.payload.slice(10);
  let toast = Toast.show(errMess, {
    duration: 1000,
    backgroundColor: "#f02c2c",
    shadowColor: "black",
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};
const handleLogedIn = (state, action) => {
  state.user = action.payload;
  state.error = null;
  state.isRefreshing = false;
};
const handleLogout = (state) => {
  state.user = {};
  state.isLoggedIn = false;
  let toast = Toast.show("Logout succesful", {
    duration: 1000,
    backgroundColor: "#40a6ce",
    shadowColor: "black",
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleLogedIn)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleLogedIn)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(logoutUser.fulfilled, handleLogout)
      .addCase(logoutUser.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
