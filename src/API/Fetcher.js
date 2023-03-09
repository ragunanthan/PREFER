import axios from "axios";
import { getSecureData } from "../keychain/secureStorage";

export const fetcher = axios.create({
    baseURL :  "http://129.154.42.133/api",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : "*"
        }
});

// Response interceptor for API calls
fetcher.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    console.log(error);
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      let data = await getSecureData("userData");
      const access_token =  await fetcher.post(ENDPOINTS.REFERSH_TOKEN, {
        userId: data?.userId,
        refreshToken: data?.refreshToken,
      });            
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token.data.accessToken}`;
      return fetcher(originalRequest);
    }
    return Promise.reject(error);
  });

export const PostMethod = async(url, data) => await fetcher.post(url, data);

export const ENDPOINTS = {
    LOGIN : "/login",
    SIGNUP : "/signup",
    REFERSH_TOKEN : "/refreshToken",
    LOGOUT : "/refreshToken/logut",
    PREFER : "/prefer",
    ALLUSER : "/user"
}

