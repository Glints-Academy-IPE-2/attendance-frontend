import authHeader from "./auth.header";
const axios = require("axios");

const API_URL = "http://localhost:8000/api/admin/";

const getAllUsers = () => {
  return axios.get(API_URL + "get-user", { headers: authHeader() });
};

const approveUser = (verifiedToken) => {
  return axios.get(API_URL + "approve-user/" + verifiedToken, {
    headers: authHeader(),
  });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + "delete-user/" + id, {
    headers: authHeader(),
  });
};

const UserServices = {
  getAllUsers,
  approveUser,
  deleteUser,
};

export default UserServices;
