// src/actions/cart.actions.ts
"use server";

import { axiosClient } from "@/utils/axiosUtil";
import { Category } from "@/types/Category";

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const instance = await axiosClient();
    const response = await instance.get<Category[]>("/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const instance = await axiosClient();
    const response = await instance.get<Category>(`/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
};
