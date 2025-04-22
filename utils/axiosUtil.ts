"use server";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

export const axiosClient = async (): Promise<AxiosInstance> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
  });
  if (token) {
    instance.interceptors.request.use((config) => {
      config.headers["Cookie"] = `access_token=${token}`;
      return config;
    });
  }
  return instance;
};
