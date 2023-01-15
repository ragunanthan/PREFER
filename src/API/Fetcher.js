import axios from "axios";

export const fetcher = axios.create({
    baseURL : "http://localhost:3000/api",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : "*"
        }
});




export const PostMethod = async(url, data) => await fetcher.post(url, data);

export const ENDPOINTS = {
    LOGIN : "/login",
    SIGNUP : "/signup",
    REFERSH_TOKEN : "/refreshToken",
    LOGOUT : "/refreshToken/logut",
    PREFER : "/prefer"
}

