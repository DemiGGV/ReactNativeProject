import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-root-toast";
import {
  fetchAllPosts,
  addPost,
  deletePost,
  editPost,
  incrementLikes,
} from "./postsOperations";

const initialState = {
  posts: [],
  isLoading: false,
  isDeleting: false,
  currentIndex: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  let toast = Toast.show(action.payload, {
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
const handleFetchAll = (state, action) => {
  state.isLoading = false;
  state.posts = action.payload;
};
const handleAddPost = (state, action) => {
  state.isLoading = false;
  state.posts.push(action.payload);
};
const handleEditPost = (state, action) => {
  state.isLoading = false;
  const index = state.posts.findIndex((Post) => Post.id === action.payload.id);
  state.posts[index].comments.push(action.payload.comment);
};
const handleIncrementLikesPost = (state, action) => {
  state.isLoading = false;
  const index = state.posts.findIndex((Post) => Post.id === action.payload.id);
  state.posts[index].likes.push(action.payload.uid);
};
const handleDelete = (state, action) => {
  state.isLoading = false;
  const index = state.posts.findIndex((Post) => Post.id === action.payload);
  state.posts.splice(index, 1);
  let toast = Toast.show("Succesfuly deleted!", {
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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCurrentID(state, action) {
      state.currentIndex = state.posts.findIndex(
        (post) => post.id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, handlePending)
      .addCase(fetchAllPosts.fulfilled, handleFetchAll)
      .addCase(fetchAllPosts.rejected, handleRejected)
      //
      .addCase(addPost.pending, handlePending)
      .addCase(addPost.fulfilled, handleAddPost)
      .addCase(addPost.rejected, handleRejected)
      //
      .addCase(editPost.pending, handlePending)
      .addCase(editPost.fulfilled, handleEditPost)
      .addCase(editPost.rejected, handleRejected)
      //
      .addCase(incrementLikes.pending, handlePending)
      .addCase(incrementLikes.fulfilled, handleIncrementLikesPost)
      .addCase(incrementLikes.rejected, handleRejected)
      //
      .addCase(deletePost.pending, handlePending)
      .addCase(deletePost.fulfilled, handleDelete)
      .addCase(deletePost.rejected, handleRejected);
  },
});
export const { setCurrentID } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
