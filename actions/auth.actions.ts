"use server";
import { SignInActionResponse } from "@/dto/auth.dto";
import { SignInSchema } from "@/schemas/auth.schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { axiosClient } from "@/utils/axiosUtil";

export async function signIn(
  prevState: SignInActionResponse,
  formData: FormData
): Promise<SignInActionResponse> {
  console.log("authActions");
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const validatedData = SignInSchema.safeParse(rawData);
    console.log("rawData", rawData);
    console.log("validatedData", validatedData);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Veuillez corriger les erreurs dans le formulaire",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }
    const instance = await axiosClient();
    const response = await instance.post<{
      access_token: string;
    }>("/auth/login", rawData);
    console.log("rawData", rawData);
    console.log("response.data.access_token", response.data.access_token);
    const cookieStore = await cookies();
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      const accessTokenCookie = setCookieHeader.find((cookie) =>
        cookie.startsWith("access_token=")
      );

      if (accessTokenCookie) {
        const accessToken = accessTokenCookie.split(";")[0].split("=")[1];
        console.log("Access Token extrait:", accessToken);
        const cookieStore = await cookies();
        cookieStore.set("access_token", accessToken);
      }
    } else {
      console.log("Aucun cookie reçu dans la réponse.");
    }
    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    } else {
      return {
        success: false,
        message: "Une erreur inattendue est survenue lors de la connexion",
      };
    }
  }
}

export async function checkAuth() {
  try {
    const instance = await axiosClient();
    await instance.get("/auth/check");
    return { authenticated: true };
  } catch (error) {
    return { authenticated: false };
  }
}
