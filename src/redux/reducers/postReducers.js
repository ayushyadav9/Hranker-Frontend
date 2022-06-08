import { createSlice } from "@reduxjs/toolkit";
import { getNewsFeed } from "../ApiCalls";

const initialState = {
  loadings: {
    newsFeedLoading: false,
    getUserLoading: false
  },
  postsData: null,
  error: null,
};

const postReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setToken(state, action) {
      state.userToken = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //Get NewsFeed
      .addCase(getNewsFeed.fulfilled, (state, action) => {
        state.loadings.newsFeedLoading = false;
        if (action.payload.success === true) {
          state.postsData = action.payload.data;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(getNewsFeed.pending, (state, action) => {
        state.loadings.newsFeedLoading = true;
      })
      .addCase(getNewsFeed.rejected, (state, action) => {
        state.loadings.newsFeedLoading = false;
        state.error = true;
      })
      
  },
});

export const { setToken } = postReducer.actions;
export default postReducer.reducer;
