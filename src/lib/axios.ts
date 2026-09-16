import Axios from "axios";
import { getTokenCookie } from "./cookie";

const axios = Axios.create({
  baseURL:  process.env.BASE_URL_ORIGIN,
});


axios.interceptors.request.use(
  async (config) => {
    try {
      const token = await getTokenCookie();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

    } catch (error) {
      console.error("❌ [SERVER-AXIOS] Interceptor Error:", error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axios;
