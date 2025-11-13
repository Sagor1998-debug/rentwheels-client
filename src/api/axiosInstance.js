// src/api/axiosInstance.js
import axios from "axios";
import { getAuth } from "firebase/auth";

// Create Axios instance pointing to your Render backend
const axiosInstance = axios.create({
  baseURL: "https://rentwheels-server-2.onrender.com/api", // <-- Render backend
});

// Interceptor to attach Firebase ID token to requests
axiosInstance.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser) {
    try {
      // Refresh token to prevent expiration
      const token = await currentUser.getIdToken(true);
      config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      console.error("Failed to get Firebase token:", err);
    }
  }

  return config;
});

export default axiosInstance;
