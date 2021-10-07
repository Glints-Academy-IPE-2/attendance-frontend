const axios = require("axios");

const API_URL = "https://ipe-attendance.herokuapp.com/pub/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password
    })
    .then(response => {
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data;
    });
};

const forgotPassword = email => {
  return axios.post(API_URL + "requestResetPassword", {
    email
  });
};

const resetPassword = (email, token, password) => {
  return axios.post(API_URL + `resetPassword/${email}/${token}`, {
    password
  });
};

const verifyUser = token => {
  return axios.get(API_URL + `verify-user/${token}`);
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return (
    JSON.parse(localStorage.getItem("user")) || {
      user: { isAdmin: false, email: false }
    }
  );
};

const AuthServices = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyUser,
  logout,
  getCurrentUser
};

export default AuthServices;
