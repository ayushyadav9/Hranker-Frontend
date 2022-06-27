import { createSlice } from "@reduxjs/toolkit";
import { loginUser, getUser, googleLoginUser, registerUser, getSavedPosts, markNotiAsRead, getNotifications, addToSave, followUser, unfollowUser } from "../ApiCalls";

const initialState = {
  isLoggedIn: false,
  userToken: null,
  loadings: {
    loginLoading: false,
    getUserLoading: false,
    savedPostsLoading: false,
    notiReadLoading: false,
    getNotiLoading: false,
    followLoading: false
  },
  userData: null,
  points: null,
  notifications:null,
  savedPosts: null,
  notify:{
    login:null,
    register:null
  },
  error: null,
};

const userReducer = createSlice({
  name: "test",
  initialState,
  reducers: {
    setToken(state, action) {
      state.userToken = action.payload;
    },
    markNotificationAsTrue(state, action) {
      state.userToken = action.payload;
    },
    logOut(state, action) {
      state.userToken = null;
      state.isLoggedIn = false;
      state.userData = null;
    },
    updatePoints(state, action){
      state.points = state.points + action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      //GetUser
      .addCase(getUser.fulfilled, (state, action) => {
        state.loadings.getUserLoading = false;
        if (action.payload.success === true) {
          state.userData = action.payload.user;
          state.points = action.payload.user.points
          state.isLoggedIn = true;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(getUser.pending, (state, action) => {
        state.loadings.getUserLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loadings.getUserLoading = false;
        state.error = true;
      })
      //Login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadings.loginLoading = false;
        if (action.payload.success === true) {
          state.userData = action.payload.data.user;
          state.points = action.payload.data.user.points
          state.isLoggedIn = true;
          state.userToken = action.payload.data.token;
        } else {
          state.notify.login = action.payload.message;
          state.error = action.payload.message;
        }
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loadings.loginLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadings.loginLoading = false;
        state.error = true;
      })
      //Google Login
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.loadings.loginLoading = false;
        if (action.payload.success === true) {
          state.userData = action.payload.data.user;
          state.points = action.payload.data.user.points
          state.isLoggedIn = true;
          state.userToken = action.payload.data.token;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(googleLoginUser.pending, (state, action) => {
        state.loadings.loginLoading = true;
      })
      .addCase(googleLoginUser.rejected, (state, action) => {
        state.loadings.loginLoading = false;
        state.error = true;
      })
      //Register User Local
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loadings.loginLoading = false;
        if (action.payload.success === true) {
          state.userData = action.payload.data.user;
          state.points = action.payload.data.user.points
          state.isLoggedIn = true;
          state.userToken = action.payload.data.token;
        } else {
          state.notify.register = action.payload.message;
          state.error = action.payload.message;
        }
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loadings.loginLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loadings.loginLoading = false;
        state.error = true;
      })
      //Get Saved Posts
      .addCase(getSavedPosts.fulfilled, (state, action) => {
        state.loadings.savedPostsLoading = false;
        if (action.payload.success === true) {
          state.savedPosts = action.payload.data;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(getSavedPosts.pending, (state, action) => {
        state.loadings.savedPostsLoading = true;
      })
      .addCase(getSavedPosts.rejected, (state, action) => {
        state.loadings.savedPostsLoading = false;
        state.error = true;
      })
      //Mark notification as read
      .addCase(markNotiAsRead.fulfilled, (state, action) => {
        state.loadings.notiReadLoading = false;
        if (action.payload.success === true) {
          state.notifications.map((n, i) => {
            if (n._id === action.payload._id) {
              n.isRead = true;
            }
            return n;
          });
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(markNotiAsRead.pending, (state, action) => {
        state.loadings.notiReadLoading = true;
      })
      .addCase(markNotiAsRead.rejected, (state, action) => {
        state.loadings.notiReadLoading = false;
        state.error = true;
      })
      //Get Notifications
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loadings.getNotiLoading = false;
        if (action.payload.success === true) {
          state.notifications = action.payload.data
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(getNotifications.pending, (state, action) => {
        state.loadings.getNotiLoading = true;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loadings.getNotiLoading = false;
        state.error = true;
      })
      //Add Post To Save
      .addCase(addToSave.fulfilled, (state, action) => {
        if (action.payload.success === true && action.payload.isRemoved === false) {
          if(action.payload.type===1){
            state.userData.saved.blogPosts.push(action.payload._id)
          }else{
            state.userData.saved.quesPosts.push(action.payload._id)
          }
        } else if(action.payload.success === true && action.payload.isRemoved === true) {
          if(action.payload.type===1){
            const index = state.userData.saved.blogPosts.indexOf(action.payload._id);
            state.userData.saved.blogPosts.splice(index, 1);
          }else{
            const index = state.userData.saved.quesPosts.indexOf(action.payload._id);
            state.userData.saved.quesPosts.splice(index, 1);
          }
        } else{
          state.error = action.payload.message;
        }
      })
      .addCase(addToSave.pending, (state, action) => {
        // state.loadings.getNotiLoading = true;
      })
      .addCase(addToSave.rejected, (state, action) => {
        // state.loadings.getNotiLoading = false;
        state.error = true;
      })
      //Follow User
      .addCase(followUser.fulfilled, (state, action) => {
        if (action.payload.success === true){
          state.userData.following.push(action.payload.userId)
        } else{
          state.error = action.payload.message;
        }
      })
      .addCase(followUser.pending, (state, action) => {
        state.loadings.followLoading = true;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loadings.followLoading = false;
        state.error = true;
      })
      //Unfollow User
      .addCase(unfollowUser.fulfilled, (state, action) => {
        if (action.payload.success === true){
          const index = state.userData.following.indexOf(action.payload.userId);
          state.userData.following.splice(index, 1);
        } else{
          state.error = action.payload.message;
        }
      })
      .addCase(unfollowUser.pending, (state, action) => {
        state.loadings.followLoading = true;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.loadings.followLoading = false;
        state.error = true;
      })
  },
});

export const { setToken, logOut, updatePoints } = userReducer.actions;
export default userReducer.reducer;
