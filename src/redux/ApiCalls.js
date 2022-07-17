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
  console.log(res)
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
    body: JSON.stringify({ postId: data.postId, postType: data.postType }),
  });
  let res = await result.json();
  res.postId = data.postId 
  return res;
});

export const addComment = createAsyncThunk("post/addComment", async (data) => {
  let result = await fetch(`${baseURL}/post/addComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({ postId: data.postId, comment: data.commentValue, postType: data.postType }),
  });
  let res = await result.json();
  res.clientData = data 
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

export const addToSave = createAsyncThunk("users/addToSave", async (data) => {
  let result = await fetch(`${baseURL}/auth/addToSave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({ postId: data.postId, postType: data.postType }),
  });
  let res = await result.json();
  res.type = data.postType
  res._id = data.postId 
  return res;
});

export const getLeaderboard = createAsyncThunk("users/getLeaderboard", async (token) => {
  let result = await fetch(`${baseURL}/getLeaderboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let res = await result.json();
  return res;
});

export const getRanks = createAsyncThunk("users/getRanks", async (token) => {
  let result = await fetch(`${baseURL}/getRanks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let res = await result.json();
  return res;
});

export const handelVote = createAsyncThunk("post/voteAnswer", async (data) => {
  let result = await fetch(`${baseURL}/post/voteAnswer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({ qId: data.postId, optionId: data.optionId }),
  });
  let res = await result.json();
  
  res.postId = data.postId 
  res.optionId = data.optionId
  return res;
});

export const followUser = createAsyncThunk("auth/follow", async (data) => {
  let result = await fetch(`${baseURL}/auth/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({ username: data.username }),
  });
  let res = await result.json();
  return res;
});

export const unfollowUser = createAsyncThunk("auth/unfollow", async (data) => {
  let result = await fetch(`${baseURL}/auth/unfollow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({ username: data.username }),
  });
  let res = await result.json();
  return res;
});

export const getTopPosts = createAsyncThunk("post/getTopPosts", async (token) => {
  let result = await fetch(`${baseURL}/post/getTopPosts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let res = await result.json();
  return res;
});

export const getActiveLeaderboard = createAsyncThunk("users/getActiveLeaderboard", async (token) => {
  let result = await fetch(`${baseURL}/getActiveLeaderboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let res = await result.json();
  return res;
});

export const getConversations = createAsyncThunk("chat/getConversations", async (token) => {
  let result = await fetch(`${baseURL}/chat/getConversations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let res = await result.json();
  return res;
});

export const blockUser = createAsyncThunk("chat/blockUser", async (data) => {
  let result = await fetch(`${baseURL}/chat/blockUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({convoId: data.convoId}),
  });
  let res = await result.json();
  return res;
});

export const unblockUser = createAsyncThunk("chat/unblockUser", async (data) => {
  let result = await fetch(`${baseURL}/chat/unblockUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({convoId: data.convoId}),
  });
  let res = await result.json();
  return res;
});

export const getBlockedChats = createAsyncThunk("chat/getBlockedChats", async (token) => {
  let result = await fetch(`${baseURL}/chat/getBlockedChats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let res = await result.json();
  return res;
});

export const deletePost = createAsyncThunk("post/delete-post", async (data) => {
  let result = await fetch(`${baseURL}/post/deletePost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({type:data.type, postId: data.postId}),
  });
  let res = await result.json();
  console.log(res)
  return res;
});