const axios = require("axios");

const API_URL = "http://localhost:8000/api/";

const query = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiY2FsdmluamFAY2FsdmluamEuY29tIiwicGFzc3dvcmQiOiJjYWx2aW5qYSJ9LCJpYXQiOjE2MzM0NDA5OTN9.gxwFRYOJRmc34PnHQmJV2LJ_FJZN8zFfQ34KvIP7Kfg";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MSwiZW1haWwiOiJjYWx2aW5AY2FsdmluLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjEtMTAtMDVUMTY6NDg6NTYuODEzWiJ9LCJpYXQiOjE2MzM0NTI1Mzd9.B41o3nlc8so7K5Keugfm-OTn2R67KklOVlYLgtDoa9c";

const getAllUsers = () => {
  return axios
    .get(
      API_URL + "admin/approve-user?token=" + query,
      {
        headers: {
          "x-token": token
        }
      }
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
};


// res.data.data.users.rows

getAllUsers();
