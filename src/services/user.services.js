import authHeader from "./auth.header";
const axios = require("axios");

const API_URL = "http://localhost:8000/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getAllUsers = () => {
  return axios.get(API_URL + "admin/get-user", { headers: authHeader() });
};

const approveUser = (verifiedToken) => {
  return axios.get(API_URL + "admin/approve-user/" + verifiedToken, {
    headers: authHeader(),
  });
};

const UserServices = {
  getPublicContent,
  getAllUsers,
  approveUser,
};

export default UserServices;
