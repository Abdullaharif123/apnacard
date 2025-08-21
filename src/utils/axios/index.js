import axios from "axios";
import { BASE_URL } from "./endpoint";

// Create base instance without setting token upfront
const axiosReq = axios.create({
  baseURL: BASE_URL,
});

// Interceptor to dynamically add Authorization header
axiosReq.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Create separate instance for public routes (like scanning)
export const scanCardRequest = axios.create({
  baseURL: BASE_URL,
});

// If you need to manually set token later (e.g., after login)
export const setAuthToken = (token) => {
  if (token) {
    axiosReq.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosReq.defaults.headers.common["Authorization"];
  }
};

export default axiosReq;