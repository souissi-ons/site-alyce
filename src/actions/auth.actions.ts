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

export async function handleGoogleCallback(code: string) {
  try {
    const instance = await axiosClient();
    await instance.get(`/auth/google/redirect`, {
      params: { code },
      withCredentials: true,
      headers: {
        Accept: "application/json",
      },
    });

    // Si nous arrivons ici, c'est que l'authentification a réussi
    // Les cookies seront automatiquement définis par le backend
    return { success: true };
  } catch (error: any) {
    console.error("Google authentication failed:", error);
    const errorMessage =
      error.response?.data?.message || "Failed to authenticate with Google";
    throw new Error(errorMessage);
  }
}

export async function initiateGoogleLogin() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  // Ajout d'un timestamp pour éviter la mise en cache
  const timestamp = new Date().getTime();
  return `${baseUrl}/auth/google/login?_=${timestamp}`;
}
