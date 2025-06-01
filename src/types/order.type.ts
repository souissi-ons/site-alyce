// src/types/order.type.ts

import { PaymentMethod } from "./payment-methods.enum";

export interface OrderItem {
  _id: string;
  productId: string;
  name: string;
  imageURL: string;
  price: number;
  quantity: number;
}

export interface ShippingDetails {
  address: string;
  zipCode: string;
  city: string;
  phoneNumber: string;
}

export interface Order {
  _id: string;
  clientId: string;
  cartItems: OrderItem[];
  totalPrice: number;
  status: "pending" | "processing" | "completed";
  paymentMethod: "onDelivery" | "online";
  shippingDetails: ShippingDetails;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  shippingDetails: ShippingDetails;
  paymentMethod: "onDelivery" | "online";
}

// Interface pour la réponse de l'API si nécessaire
export interface OrderResponse {
  id: string;
  clientId: string;
  cartItems: {
    productId: string;
    name: string;
    imageURL: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  shippingDetails: ShippingDetails;
  paymentMethod: PaymentMethod;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
