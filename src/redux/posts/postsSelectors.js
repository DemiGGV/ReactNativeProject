import { createSelector } from "@reduxjs/toolkit";

export const getPosts = (state) => state.posts.posts;

export const getCurrentPost = (state) => state.posts.currentIndex;

export const getCurrentUserID = (state) => state.auth.user.uid;

export const getUserPosts = createSelector(
  [getPosts, getCurrentUserID],
  (posts, userid) => {
    return posts.filter((post) => post.userid.includes(userid));
  }
);

export const getIsLoading = (state) => state.posts.isLoading;
