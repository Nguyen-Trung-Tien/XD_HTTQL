import axios from "axios";
import store from "../redux/store";
import { resetUser } from "../redux/userSlice";
import { login } from "../redux/slice/userSlice";
const API_URL = import.meta.env.VITE_API_URL;

const axiosJWT = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosJWT.interceptors.request.use(
  async (config) => {
    const state = store.getState().user;
    const token = state.access_token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosJWT.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (
      status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/api/v1/user/refresh-token"
    ) {
      originalRequest._retry = true;
      try {
        const refresh_token = store.getState().user.refresh_token;
        if (!refresh_token) throw new Error("No refresh token available");

        const res = await axios.post(`${API_URL}/api/v1/user/refresh-token`, {
          refresh_token,
        });

        const {
          access_token,
          refresh_token: newRefreshToken,
          ...userData
        } = res.data;

        // Cập nhật Redux store
        store.dispatch(
          login({
            ...userData,
            access_token,
            refresh_token: newRefreshToken,
          })
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userData,
            access_token,
            refresh_token: newRefreshToken,
          })
        );

        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        return axiosJWT(originalRequest);
      } catch (err) {
        store.dispatch(resetUser());
        localStorage.removeItem("user");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosJWT;
