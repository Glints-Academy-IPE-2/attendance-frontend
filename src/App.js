import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import PrivateRoute from "./PrivateRoutes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/login/Login"));
const Register = React.lazy(() => import("./views/register/Register"));
const Forgot = React.lazy(() => import("./views/forgot/ForgotPassword"));
const Reset = React.lazy(() => import("./views/reset/ResetPassword"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={props => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={props => <Register {...props} />}
            />
            <Route
              exact
              path="/forgot"
              name="Forgot Password Page"
              render={props => <Forgot {...props} />}
            />
            <Route
              exact
              path="/resetPassword"
              name="Reset Password Page"
              render={props => <Reset {...props} />}
            />
            <PrivateRoute path="/" name="Home" component={TheLayout} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
