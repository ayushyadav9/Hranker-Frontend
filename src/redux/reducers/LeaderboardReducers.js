import { createSlice } from "@reduxjs/toolkit";
import { getLeaderboard } from "../ApiCalls";

const initialState = {
  data:null,
  loading: null,
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
          state.loading = false;
          if (action.payload.success === true) {
            state.data = action.payload.users;
          } else {
            state.error = action.payload.message;
          }
        })
        .addCase(getLeaderboard.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(getLeaderboard.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
        })
    },
  });
  
  export default postReducer.reducer;