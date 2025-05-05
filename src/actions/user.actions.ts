// src/actions/user.actions.ts
"use server";

import { User } from "@/types/User";
import { axiosClient } from "@/utils/axiosUtil";
import { revalidatePath } from "next/cache";
export const getUser = async (): Promise<User> => {
  try {
    const instance = await axiosClient();
    const response = await instance.get<User>("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateUserProfile = async (formData: FormData, id: string) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  try {
    const instance = await axiosClient();
    const response = await instance.patch<User>(`/users/${id}`, {
      firstName,
      lastName,
    });

    revalidatePath("/profile");
    return { success: true, user: response.data };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const instance = await axiosClient();
    const response = await instance.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
