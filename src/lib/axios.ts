import Axios from "axios";
import { getTokenCookie, setTokenCookie } from "./cookie";

const axios = Axios.create({
  baseURL:  process.env.BASE_URL_ORIGIN,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  async (config) => {
    try {
      const token = await getTokenCookie();

      if (token?.access_token) {
        config.headers.Authorization = `Bearer ${token.access_token}`;
      }

    } catch (error) {
      return Promise.reject(error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await getTokenCookie();
        if (!token?.refresh_token) {
          throw new Error("Refresh token not found.");
        }

        const response = await Axios.post(
          `${process.env.BASE_URL_ORIGIN}/refresh-token`,
          {
            refresh_token: token.refresh_token,
          }
        );

        await setTokenCookie({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token || token.refresh_token,
        });

        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

        return axios(originalRequest);
      } catch (refreshError) {        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
