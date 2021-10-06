const axios = require("axios");

const API_URL = "http://localhost:8000/pub/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data;
    });
};

const forgotPassword = (email) => {
  return axios.post(API_URL + "requestResetPassword", {
    email,
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthServices = {
  register,
  login,
  forgotPassword,
  logout,
  getCurrentUser,
};

export default AuthServices;
