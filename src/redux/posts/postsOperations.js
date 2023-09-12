import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../../config";
import { deleteObject, ref } from "firebase/storage";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (credentials, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      let dataArr = [];
      snapshot.forEach((post) => {
        dataArr.push({ ...post.data(), id: post.id });
      });
      return dataArr;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (credentials, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), credentials);
      return { ...credentials, id: docRef.id };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (credentials, thunkAPI) => {
    try {
      const { id, comment } = credentials;
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        comments: arrayUnion(comment),
      });
      return { id, comment };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const incrementLikes = createAsyncThunk(
  "posts/incrementLikes",
  async (credentials, thunkAPI) => {
    try {
      const { id, uid } = credentials;
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        likes: arrayUnion(uid),
      });
      return { id, uid };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (credentials, thunkAPI) => {
    try {
      const { id, imageURL } = credentials;
      const docRef = doc(db, "posts", id);
      const desertRef = ref(storage, imageURL);
      await deleteObject(desertRef);
      await deleteDoc(docRef);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
