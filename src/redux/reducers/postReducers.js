import { createSlice } from "@reduxjs/toolkit";
import { addComment, getNewsFeed, handelVote, toggleLike } from "../ApiCalls";

const initialState = {
  loadings: {
    newsFeedLoading: false,
    getUserLoading: false,
    toggleLikeLoading: false,
    voteLoading: false,
    addCommentLoading: false,
  },
  popups:{
    blogPopup:false,
    quesPopup:false,
    sharePopup: false
  },
  shareLink:null,
  confetti: false,
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
    toggleSharePopup(state,action){
      if(state.popups.sharePopup){
        state.shareLink = null
      }else{
        state.shareLink = action.payload
      }
      state.popups.sharePopup = !state.popups.sharePopup
    },
    toggleConfetti(state){
      state.confetti = !state.confetti
    },
    clearFeed(state){
      state.postsData = null
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
      //Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        state.loadings.addCommentLoading = false;
        if (action.payload.success === true) {
            let t = state.postsData.map((n, i) => {
              if (n._id === action.payload.clientData.postId) {
                n.comments.push(action.payload.data);
              }
              return n;
            });
            state.postsData = t
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(addComment.pending, (state, action) => {
        state.loadings.addCommentLoading = true;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loadings.addCommentLoading = false;
        state.error = true;
      })
      //Handel Add Vote
      .addCase(handelVote.fulfilled, (state, action) => {
        state.loadings.voteLoading = false;
        if (action.payload.success === true) {
            let t = state.postsData.map((n) => {
              if (n._id === action.payload.postId) {
                n.answeredBy.push(action.payload.userId);
                n.options.map((opt)=>{
                  if(opt.id===action.payload.optionId){
                    console.log(opt)
                    opt.votes.push(action.payload.userId)
                  }
                  return opt
                })
              }
              return n;
            });
            state.postsData = t
            if(action.payload.isCorrect){
              state.confetti=true;
            }
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(handelVote.pending, (state, action) => {
        state.loadings.voteLoading = true;
      })
      .addCase(handelVote.rejected, (state, action) => {
        state.loadings.voteLoading = false;
        state.error = true;
      })
      
  },
});

export const { setToken, toggleBlogPopup, toggleQuesPopup, toggleSharePopup, clearFeed, toggleConfetti } = postReducer.actions;
export default postReducer.reducer;
