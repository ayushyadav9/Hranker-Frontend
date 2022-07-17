import React, { useState,useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import {  useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const [isLogged, setisLogged] = useState(true)
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    const decodedJwt = parseJwt(localStorage.getItem("userJWT"));
    if (!localStorage.getItem("userJWT") || decodedJwt.exp * 1000 < Date.now()){
      setisLogged(false)
    }
  }, [])
  
  return isLogged ? <Outlet/>:<Navigate to="/sign-up"/>
};

export default ProtectedRoute;