const { default: axios } = require("axios");

const axiosPublic = axios.create({
  baseURL: "https://fintrack-server-1.onrender.com",
  withCredentials: true,
});

export default axiosPublic;
