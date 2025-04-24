// src/types/CartItem.ts

import { CartItem } from "./CartItem";

export interface ShoppingCart {
  _id: string;
  clientId: string;
  cartItems: CartItem[];
  totalPrice: number;
}
