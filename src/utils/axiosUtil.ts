/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

export const axiosClient = async (): Promise<AxiosInstance> => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
  });

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (accessToken) {
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });
  }

  instance.interceptors.response.use(async (response) => {
    const cookieStore = await cookies();
    const setCookieHeaders = response.headers["set-cookie"];
    if (setCookieHeaders) {
      setCookieHeaders.forEach((cookie) => {
        const [keyValue, ...options] = cookie.split(";");
        const [key, value] = keyValue.split("=");
        cookieStore.set(key.trim(), value.trim(), {
          httpOnly: options.some(
            (opt) => opt.trim().toLowerCase() === "httponly"
          ),
          secure: options.some((opt) => opt.trim().toLowerCase() === "secure"),
          sameSite: options
            .find((opt) => opt.trim().toLowerCase().startsWith("samesite"))
            ?.split("=")[1] as "lax" | "strict" | "none" | undefined,
        });
      });
    }
    return response;
  });

  return instance;
};
