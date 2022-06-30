import { createSlice } from "@reduxjs/toolkit";
import { getActiveLeaderboard, getLeaderboard, getTopPosts } from "../ApiCalls";

const initialState = {
  loadings:{
    leaderBoardLoading: false,
    activeLoading: false,
    topPostsLoading: false
  },
  topPosts:null,
  topUsers:null,
  activeUsers:null,
  error: null,
};

const postReducer = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        //Get LeaderBoard
        .addCase(getLeaderboard.fulfilled, (state, action) => {
          state.loadings.leaderBoardLoading = false;
          if (action.payload.success === true) {
            state.topUsers = action.payload.users;
          } else {
            state.error = action.payload.message;
          }
        })
        .addCase(getLeaderboard.pending, (state, action) => {
          state.loadings.leaderBoardLoading = true;
        })
        .addCase(getLeaderboard.rejected, (state, action) => {
          state.loadings.leaderBoardLoading = false;
          state.error = true;
        })

        //Get Top Posts
        .addCase(getTopPosts.fulfilled, (state, action) => {
          state.loadings.topPostsLoading = false;
          if (action.payload.success === true) {
            state.topPosts = action.payload.data;
          } else {
            state.error = action.payload.message;
          }
        })
        .addCase(getTopPosts.pending, (state, action) => {
          state.loadings.topPostsLoading = true;
        })
        .addCase(getTopPosts.rejected, (state, action) => {
          state.loadings.topPostsLoading = false;
          state.error = true;
        })

        //Get Active LeaderBoard
        .addCase(getActiveLeaderboard.fulfilled, (state, action) => {
          state.loadings.activeLoading = false;
          if (action.payload.success === true) {
            state.activeUsers = action.payload.users;
          } else {
            state.error = action.payload.message;
          }
        })
        .addCase(getActiveLeaderboard.pending, (state, action) => {
          state.loadings.activeLoading = true;
        })
        .addCase(getActiveLeaderboard.rejected, (state, action) => {
          state.loadings.activeLoading = false;
          state.error = true;
        })
    },
  });
  
  export default postReducer.reducer;