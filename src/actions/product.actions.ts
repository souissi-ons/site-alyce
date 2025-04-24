// src/actions/cart.actions.ts
"use server";

import { axiosClient } from "@/utils/axiosUtil";
import { Product } from "@/types/Product";
import { ClientReview } from "@/types/ClientReview";

export const getActiveProducts = async (): Promise<Product[]> => {
  try {
    const instance = await axiosClient();
    const response = await instance.get<Product[]>("/product/active");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
interface ProductData {
  product: Product;
  reviews: ClientReview[];
}
export const getProductById = async (id: string): Promise<ProductData> => {
  try {
    const instance = await axiosClient();
    const response = await instance.get<ProductData>(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

//   createClientReview(@CurrentUser() user : RequestUser, @Query("product_id") productId : string, @Body() createClientReviewDTO : CreateClientReviewDTO){

export const createClientReview = async (
  productId: string,
  rating: number,
  comment: string
): Promise<ClientReview> => {
  try {
    const instance = await axiosClient();
    const response = await instance.post(
      `/client-review?product_id=${productId}`,
      {
        rating,
        comment,
      }
    );
    console.log("Client review created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating client review:", error);
    throw error;
  }
};
