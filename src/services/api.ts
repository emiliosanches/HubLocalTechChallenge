import axios from "axios";
import { store } from "../store";
import { logout } from "../store/modules/auth/actions";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
