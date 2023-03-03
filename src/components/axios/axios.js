import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://asm3-webshopping.onrender.com",
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
export default axiosClient;
