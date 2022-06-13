import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../api";


export const getUser = createAsyncThunk("users/getUser", async (token) => {
  let result = await fetch(`${baseURL}/auth/getUser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let res = await result.json();
  return res;
});

export const loginUser = createAsyncThunk("users/login", async (formData) => {
  let result = await fetch(`${baseURL}/auth/login/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  let res = await result.json();
  return res;
});

export const googleLoginUser = createAsyncThunk("users/googleLogin", async (tokenId) => {
  let result = await fetch(`${baseURL}/auth/googleSignup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tokenId: tokenId })
  });
  let res = await result.json();
  return res;
});

export const registerUser = createAsyncThunk("users/register-local", async (formData) => {
  let result = await fetch(`${baseURL}/auth/register/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
  });
  let res = await result.json();
  return res;
});

export const getNewsFeed = createAsyncThunk("users/getNewsFeed", async (token) => {
  let result = await fetch(`${baseURL}/post/getNewsFeed`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let res = await result.json();
  return res;
});

export const getSavedPosts = createAsyncThunk("users/getSavedPosts", async (token) => {
  let result = await fetch(`${baseURL}/auth/getSavedPosts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let res = await result.json();
  return res;
});

export const markNotiAsRead = createAsyncThunk("users/markAsRead", async (data) => {
  let result = await fetch(`${baseURL}/noti/markNotificationAsRead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({ notiId: data.id }),
  });
  let res = await result.json();
  res._id = data.id 
  return res;
});

export const toggleLike = createAsyncThunk("users/toggleLike", async (data) => {
  let result = await fetch(`${baseURL}/post/toggleLike`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({ postId: data.postId }),
  });
  let res = await result.json();
  res.postId = data.postId 
  return res;
});

export const getNotifications = createAsyncThunk("users/getNotifications", async (token) => {
  let result = await fetch(`${baseURL}/auth/getNotifications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let res = await result.json();
  return res;
});