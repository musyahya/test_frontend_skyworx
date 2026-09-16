import Axios from "axios";
// import { getAuthCookie } from "./cookie";

// const isServer = typeof window === "undefined";

const axios = Axios.create({
  baseURL:  process.env.BASE_URL_ORIGIN,
});

/**
 * Interceptor Khusus Server
 */
axios.interceptors.request.use(
  async (config) => {
    try {
      // Di Server Action, kita bisa langsung panggil fungsi cookie server
    //   const authData = await getAuthCookie();

    //   if (authData?.token) {
    //     config.headers.Authorization = `Bearer ${authData.token}`;
    //   }

    } catch (error) {
      console.error("❌ [SERVER-AXIOS] Interceptor Error:", error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axios;
