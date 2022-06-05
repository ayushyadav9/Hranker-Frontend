import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Home/Homepage";
import Notification from "../pages/Notifications/Notification";
import Profile from "../pages/Profile/Profile";
import SignIn from "../pages/Registration/SignIn/SignIn";
import SignUp from "../pages/Registration/SignUp/SignUp";
const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/notification/:id" element={<Notification />} />
      </Routes>
    </>
  );
};

export default Routers;
