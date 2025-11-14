import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: "https://<your-render-backend>/api",
});

axiosInstance.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      const token = await currentUser.getIdToken(true);
      config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      console.error("Failed to get Firebase token:", err);
    }
  }
  return config;
});

export default axiosInstance;
