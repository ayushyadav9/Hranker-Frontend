import { createSlice } from "@reduxjs/toolkit";
import {  blockUser, getConversations } from "../ApiCalls";

const initialState = {
  loadings: {
    getCovoLoading: false,
    blockLoading: false
  },
  conversations: null,
  error: null,
};

const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      //Get Conversations
      .addCase(getConversations.fulfilled, (state, action) => {
        state.loadings.getCovoLoading = false;
        if (action.payload.success === true) {
          state.conversations = action.payload.data;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(getConversations.pending, (state, action) => {
        state.loadings.getCovoLoading = true;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.loadings.getCovoLoading = false;
        state.error = true;
      })
      //Block User
      .addCase(blockUser.fulfilled, (state, action) => {
        state.loadings.blockLoading = false;
        if (action.payload.success === true) {
          const index = state.conversations.indexOf(action.payload.convoId);
          state.conversations.splice(index, 1);
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(blockUser.pending, (state, action) => {
        state.loadings.blockLoading = true;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.loadings.blockLoading = false;
        state.error = true;
      })
  },
});

export const { setToken, toggleBlogPopup, toggleQuesPopup, clearFeed } = chatReducer.actions;
export default chatReducer.reducer;
