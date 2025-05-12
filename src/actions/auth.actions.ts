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
    await instance.post(
      `/auth/google`,
      { code },
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      }
    );

    // Si nous arrivons ici, c'est que l'authentification a réussi
    // Les cookies seront automatiquement définis par le backend
    return { success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to authenticate with Google";
    throw new Error(errorMessage);
  }
}

export const getGoogleOAuthURL = async () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
};
