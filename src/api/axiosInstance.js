import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosInstance = axios.create({
baseURL: "https://rentwheels-server.onrender.com/api",
});

axiosInstance.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser) {
    // Refresh token to prevent expiration
    const token = await currentUser.getIdToken(true);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
