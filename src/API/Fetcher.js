import axios from "axios";

export const fetcher = axios.create({
    baseURL : "http://localhost:3000/api",
    // headers : 
});



export const GetMethod = async(url) => await fetcher.get(url);

export const PostMethod = async(url, data) => await fetcher.post(url, data);

export const ENDPOINTS = {
    PREFER : "/prefer"
}

