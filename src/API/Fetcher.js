import axios from "axios";
import { getSecureData } from "../keychain/secureStorage";
import { logger } from " ../utils/logger";

export const fetcher = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Response interceptor for API calls
fetcher.interceptors.response.use(
  (response) => {
    logger.log({
      url: response.config.url,
      status: response.status,
      response: response.data,
    });
    return response;
  },
  async function (error) {
    console.log(error);
    logger.error({
      url: error?.config?.url,
      status: error?.response?.status,
      error: error?.response?.data,
    });
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      let data = await getSecureData("userData");
      const access_token = await fetcher.post(ENDPOINTS.REFERSH_TOKEN, {
        userId: data?.userId,
        refreshToken: data?.refreshToken,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token.data.accessToken}`;
      originalRequest.headers.Authorization = `Bearer ${access_token.data.accessToken}`;
      return fetcher(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const PostMethod = async (url, data) => await fetcher.post(url, data);

export const ENDPOINTS = {
  // working
  LOGIN: "/auth/login",
  // working
  SIGNUP: "/auth/signup",

  REFERSH_TOKEN: "/auth/refresh-token",
  LOGOUT: "/auth/logout",

  // working
  PREFER: "/prefer",

  // working
  ALLUSER: "/prefer/alluser",

  // working
  GETBYDATE: "/prefer/filterByDate",
  GETBYMONTH: "/prefer/filterByMonth",
  GETBYYEAR: "/prefer/filterByYear",
};
