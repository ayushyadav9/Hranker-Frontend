import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notiPopup: false,
  userPopup: false,
  messagePopup: false,
};

const navReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleNoti(state, action) {
      state.notiPopup = !state.notiPopup;
      state.messagePopup = false;
      state.userPopup = false;
    },
    toggleUser(state, action) {
      state.userPopup = !state.userPopup;
      state.messagePopup = false;
      state.notiPopup = false;
    },
    toggleMessage(state, action) {
      state.messagePopup = !state.messagePopup;
      state.userPopup = false;
      state.notiPopup = false;
    },
    closeAll(state, action) {
      state.messagePopup = false;
      state.userPopup = false;
      state.notiPopup = false;
    },
  },
});

export const { toggleNoti, toggleUser, toggleMessage, closeAll } = navReducer.actions;
export default navReducer.reducer;
