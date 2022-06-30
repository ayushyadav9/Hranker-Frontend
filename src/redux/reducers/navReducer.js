import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notiPopup: false,
  userPopup: false,
  messagePopup: false,
  searchPopup: false,
  selectedExams:[],
  selectedSubjects:[]
};

const navReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleNoti(state, action) {
      state.notiPopup = !state.notiPopup;
      state.messagePopup = false;
      state.userPopup = false;
      state.searchPopup = false;
    },
    toggleUser(state, action) {
      state.userPopup = !state.userPopup;
      state.messagePopup = false;
      state.notiPopup = false;
      state.searchPopup = false;
    },
    toggleMessage(state, action) {
      state.messagePopup = !state.messagePopup;
      state.userPopup = false;
      state.notiPopup = false;
      state.searchPopup = false;
    },
    toggleSearch(state, action) {
      state.searchPopup = !state.searchPopup;
      state.userPopup = false;
      state.notiPopup = false;
      state.messagePopup = false;
    },
    closeAll(state, action) {
      state.messagePopup = false;
      state.userPopup = false;
      state.notiPopup = false;
      state.searchPopup = false
    },
    addToExam(state, action) {
      console.log(state.selectedExams.includes(action.payload))
      if(!state.selectedExams.includes(action.payload)){
        state.selectedExams.push(action.payload)
      }
    },
    addToSubject(state, action){
      if(!state.selectedSubjects.includes(action.payload)){
        state.selectedSubjects.push(action.payload)
      }
    },
    removeFromExam(state, action) {
      const index = state.selectedExams.indexOf(action.payload);
      state.selectedExams.splice(index, 1);
    },
    removeFromSubject(state, action){
      const index = state.selectedSubjects.indexOf(action.payload);
      state.selectedSubjects.splice(index, 1);
    }
  },
});

export const { toggleNoti, toggleUser, toggleMessage, toggleSearch, closeAll, addToExam, addToSubject, removeFromExam, removeFromSubject } = navReducer.actions;
export default navReducer.reducer;
