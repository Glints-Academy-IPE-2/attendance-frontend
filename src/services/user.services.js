import authHeader from "./auth.header";
const axios = require("axios");

const API_URL = "https://ipe-attendance.herokuapp.com/api/user/";

const getCurrentUser = () => {
  return (
    JSON.parse(localStorage.getItem("user")) || {
      user: { isAdmin: false, email: false }
    }
  );
};

const getAttendance = id => {
  const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWJzZW5zaWdsaW50cys1QG1haWxpbmF0b3IuY29tIiwicGFzc3dvcmQiOiJhZG1pbiJ9LCJpYXQiOjE2MzM2NDA1MDN9.Dqr3KoO8whDO5e5jYZLM6UAnCQ5P_4e8pt9AEa6d1Zk";

  return axios.get(
    `https://ipe-attendance.herokuapp.com/api/admin/get-attendance/${id}`,
    {
      headers: { "x-token": adminToken }
    }
  );
};

const setLocation = (id, latitude, longitude) => {
  return axios.put(
    API_URL + `location/${id}`,
    {
      latitude,
      longitude
    },
    {
      headers: authHeader()
    }
  );
};

const UserServices = {
  getCurrentUser,
  setLocation,
  getAttendance
};

export default UserServices;
