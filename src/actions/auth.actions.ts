"use server";
import { axiosClient } from "@/utils/axiosUtil";
import { cookies } from "next/headers";

export async function login(email: string, password: string) {
  try {
    const instance = await axiosClient();
    const response = await instance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Login failed");
  }
}

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  try {
    const instance = await axiosClient();
    const response = await instance.post("/auth/sign-up", {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Registration failed");
  }
}

export async function logout() {
  const cookiesStore = await cookies();
  cookiesStore.delete("access_token");
  cookiesStore.delete("refresh_token");
}

export async function isLoggedIn() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token");
  return !!accessToken;
}
