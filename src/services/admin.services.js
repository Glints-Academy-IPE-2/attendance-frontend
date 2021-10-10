import authHeader from "./auth.header";
const axios = require("axios");

const API_URL = "https://ipe-attendance.herokuapp.com/api/admin/";

const getAllUsers = () => {
  return axios.get(API_URL + "get-user", { headers: authHeader() });
};

const approveUser = verifiedToken => {
  return axios.get(API_URL + "approve-user/" + verifiedToken, {
    headers: authHeader()
  });
};

const deleteUser = id => {
  return axios.delete(API_URL + "delete-user/" + id, {
    headers: authHeader()
  });
};

const getAllAttendance = () => {
  return axios.get(API_URL + "get-attendance", {
    headers: authHeader()
  });
};

const AdminServices = {
  getAllUsers,
  approveUser,
  deleteUser,
  getAllAttendance
};

export default AdminServices;
