const { default: axios } = require("axios");

const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

export default axiosPublic;
