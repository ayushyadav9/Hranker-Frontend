import { createSlice } from "@reduxjs/toolkit";
import { loginUser, getUser, googleLoginUser, registerUser } from "../ApiCalls";

const initialState = {
  isLoggedIn: false,
  userToken: null,
  loadings: {
    loginLoading: false,
    getUserLoading: false
  },
  userData: null,
  error: null,
};

const userReducer = createSlice({
  name: "test",
  initialState,
  reducers: {
    setToken(state, action) {
      state.userToken = action.payload;
    },
    logOut(state, action) {
      state.userToken = null;
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //GetUser
      .addCase(getUser.fulfilled, (state, action) => {
        state.loadings.getUserLoading = false;
        if (action.payload.success === true) {
          state.userData = action.payload.user;
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
          state.isLoggedIn = true;
          state.userToken = action.payload.data.token;
        } else {
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
          state.isLoggedIn = true;
          state.userToken = action.payload.data.token;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loadings.loginLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loadings.loginLoading = false;
        state.error = true;
      });
  },
});

export const { setToken, logOut } = userReducer.actions;
export default userReducer.reducer;
