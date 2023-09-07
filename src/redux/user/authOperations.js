import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../../config";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, thunkAPI) => {
    try {
      const authResp = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      await updateProfile(authResp.user, {
        displayName: credentials.displayName,
        photoURL: credentials.photoURL,
      });
      const { displayName, email, uid, photoURL } = authResp.user;
      return { displayName, email, photoURL, uid };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const authResp = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const { displayName, email, uid, photoURL } = authResp.user;
      return { displayName, email, photoURL, uid };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
