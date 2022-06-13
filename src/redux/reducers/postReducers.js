import { createSlice } from "@reduxjs/toolkit";
import { getNewsFeed, toggleLike } from "../ApiCalls";

const initialState = {
  loadings: {
    newsFeedLoading: false,
    getUserLoading: false,
    toggleLikeLoading: false
  },
  popups:{
    blogPopup:false,
    quesPopup:false
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
    },
    toggleBlogPopup(state){
      state.popups.blogPopup = !state.popups.blogPopup
    },
    toggleQuesPopup(state){
      state.popups.quesPopup = !state.popups.quesPopup
    },
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
      //Toggle Like
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.loadings.toggleLikeLoading = false;
        if (action.payload.success === true) {
          if(action.payload.isPreviouslyLiked===false){
            let t = state.postsData.map((n, i) => {
              if (n._id === action.payload.postId) {
                n.likers.push(action.payload.userId);
              }
              return n;
            });
            state.postsData = t
          }else{
            let t = state.postsData.map((n, i) => {
              if (n._id === action.payload.postId) {
                const index = n.likers.indexOf(action.payload.userId);
                n.likers.splice(index, 1);
              }
              return n;
            });
            state.postsData = t
          }
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(toggleLike.pending, (state, action) => {
        state.loadings.toggleLikeLoading = true;
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.loadings.toggleLikeLoading = false;
        state.error = true;
      })
      
  },
});

export const { setToken, toggleBlogPopup, toggleQuesPopup } = postReducer.actions;
export default postReducer.reducer;
