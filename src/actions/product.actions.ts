// src/actions/product.actions.ts

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
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFilteredProducts = async (
  categoryId?: string,
  priceRange?: string,
  sort?: string
): Promise<Product[]> => {
  try {
    const instance = await axiosClient();
    const params = new URLSearchParams();

    if (categoryId) {
      params.append("category", categoryId);
    }

    // Convertir la plage de prix en paramètres backend
    if (priceRange) {
      switch (priceRange) {
        case "under_50":
          params.append("priceMax", "50");
          break;
        case "50_100":
          params.append("priceMin", "50");
          params.append("priceMax", "100");
          break;
        case "over_100":
          params.append("priceMin", "100");
          break;
      }
    }

    if (sort) {
      params.append("sort", sort);
    }

    const response = await instance.get<Product[]>(
      `/product/filter?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
};
