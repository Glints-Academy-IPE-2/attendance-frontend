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
  setLocation
};

export default UserServices;
