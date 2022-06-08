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