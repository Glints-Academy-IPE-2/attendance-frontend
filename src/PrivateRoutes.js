import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthServices from "./services/auth.service";

export default function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = AuthServices.getCurrentUser().user.email;
  console.log(currentUser);

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}
