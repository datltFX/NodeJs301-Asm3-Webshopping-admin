import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://asm3-webshopping.onrender.com",
  // baseURL: "http://localhost:5000",
  headers: {
    "content-type": "application/json",
  },
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});
export default axiosClient;
