import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://asm3-webshopping.onrender.com",
  // baseURL: "http://localhost:5000",
  // baseURL: "  https://grandiose-curious-shop.glitch.me",

  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
});

export default axiosClient;
