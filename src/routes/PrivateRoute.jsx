import React from "react";
import { Navigate, Route } from "react-router-dom";
import {  useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  let location = useLocation();
  const decodedJwt = parseJwt(localStorage.getItem("token"));

  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          !localStorage.getItem("token") ||
          decodedJwt.exp * 1000 < Date.now()
        ) {
          return (
            <Navigate
              to={{ pathname: "/login", state: { from: location.pathname } }}
            />
          );
        } else
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
      }}
    />
  );
};

export default PrivateRoute;
