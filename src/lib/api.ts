import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../Constants";
import { UserAuthResponse } from "./types";

export const queryClient = new QueryClient();

const api = (queryKeyName: string = "auth") => {
  const api = axios.create({
    baseURL: API_URL,
  });

  api.interceptors.request.use((config) => {
    const token = queryClient.getQueryData<UserAuthResponse>([
      queryKeyName,
    ])?.token;
    // console.log("🚀 ~ api.interceptors.request.use ~ token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return api;
};
export { api };
