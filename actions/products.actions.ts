// actions/products.actions.ts

import { Product, ProductInfo, Review } from "@/types/index";
import { axiosClient } from "@/utils/axiosUtil";

export const fetchProducts = async (): Promise<{
  data: ProductInfo[];
  total: number;
}> => {
  try {
    const instance = await axiosClient();
    const response = await instance.get<ProductInfo[]>("/product");

    return {
      data: response.data,
      total: response.data.length,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [], total: 0 };
  }
};

export const fetchProduct = async (productId: string): Promise<Product> => {
  try {
    const instance = await axiosClient();
    const response = await instance.get<Product>(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {} as Product;
  }
};
