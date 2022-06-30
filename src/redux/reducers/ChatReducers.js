import { createSlice } from "@reduxjs/toolkit";
import {  getConversations } from "../ApiCalls";

const initialState = {
  loadings: {
    getCovoLoading: false
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
  },
});

export const { setToken, toggleBlogPopup, toggleQuesPopup, clearFeed } = chatReducer.actions;
export default chatReducer.reducer;
