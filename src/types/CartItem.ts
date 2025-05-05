// src/types/CartItem.ts

export interface CartItem {
  _id: string;
  productId: string;
  name: string;
  imageURL: string;
  price: number;
  stockQuantity: number;
  quantity: number;
}

export interface CartItemComponentProps {
  id: string;
  cartItemId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  maxQuantity: number;
}
