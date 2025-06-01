// src/actions/cart.actions.ts
"use server";

import { axiosClient } from "@/utils/axiosUtil";
import { revalidatePath } from "next/cache";
import { CartItem } from "@/types/CartItem";
import { ShoppingCart } from "@/types/ShoppingCart";
import { cookies } from "next/headers";

export const getCart = async (): Promise<ShoppingCart> => {
  try {
    const instance = await axiosClient();
    const response = await instance.get<ShoppingCart>("/shopping-cart");
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export async function getCartItemsCount() {
  try {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token");

    if (!accessToken) {
      return 0;
    }

    const instance = await axiosClient();
    const response = await instance.get<ShoppingCart>("/shopping-cart");
    return response.data.cartItems?.length || 0;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return 0;
  }
}

export const addToCart = async (
  item: Omit<CartItem, "_id">
): Promise<ShoppingCart> => {
  try {
    const instance = await axiosClient();
    const response = await instance.post<ShoppingCart>(
      "/shopping-cart/item",
      item
    );
    revalidatePath("/cart");
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const removeFromCart = async (
  productId: string
): Promise<ShoppingCart> => {
  try {
    const instance = await axiosClient();
    const response = await instance.delete<ShoppingCart>(
      "/shopping-cart/item",
      {
        params: { product_id: productId },
      }
    );
    revalidatePath("/cart");
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

export const updateQuantity = async (
  productId: string,
  quantity: number,
  action: "add" | "reduce"
): Promise<ShoppingCart> => {
  try {
    const instance = await axiosClient();
    const response = await instance.patch<ShoppingCart>(
      `/shopping-cart/item/${action}`,
      null,
      {
        params: {
          product_id: productId,
          quantity: quantity,
        },
      }
    );
    revalidatePath("/cart");
    return response.data;
  } catch (error) {
    console.error(
      `Error ${action === "add" ? "increasing" : "decreasing"} quantity:`,
      error
    );
    throw error;
  }
};
