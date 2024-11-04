import axios from 'axios';
import Cookies from "js-cookie";

// const token = Cookies.get("token");
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost/car-rental-api/public', // adjust the baseURL to match your Laravel API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add a request interceptor to include the token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
