import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import userReducer from './redux/reducers/userReducers';
import postReducers from './redux/reducers/postReducers';
import navReducer from './redux/reducers/navReducer';
import LeaderboardReducers from './redux/reducers/LeaderboardReducers';


const store = configureStore({
  reducer:{
    user:userReducer,
    post:postReducers,
    nav:navReducer,
    leaderBoard: LeaderboardReducers
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer/>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);
