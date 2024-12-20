import axios, { CreateAxiosDefaults } from "axios";
import { DOMAIN } from "./server.config";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH__TOKEN_STORAGE_KEY,
} from "../constants/auth";
import { AUTH_ENDPOINTS } from "./endpoints/auth-endpoints";

const baseConfig: CreateAxiosDefaults = {
  method: "post",
  timeout: 1000 * 30,
  baseURL: DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const axiosInstance = axios.create(baseConfig);

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (config.url !== AUTH_ENDPOINTS.AUTH.LOGIN) {
      if (accessToken?.length) {
        config.headers["Authorization"] = accessToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // const accessToken = response.headers["Authorization"] as string | null;
    // if (accessToken?.length) {
    //   localStorage.setItem(
    //     ACCESS_TOKEN_STORAGE_KEY,
    //     JSON.stringify(accessToken)
    //   );
    // }
    return response.data;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
        localStorage.removeItem(REFRESH__TOKEN_STORAGE_KEY);
        window.location.href = "/sign-in";
      }
    } else if (error.request) {
      //   console.log("No response from server:", error.request);
    } else {
      //   console.log("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
