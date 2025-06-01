"use server";

import { CreateOrderDto } from "@/types/order.type";
import { axiosClient } from "@/utils/axiosUtil";
import { PaymentMethod } from "@/types/payment-methods.enum";
import { revalidatePath } from "next/cache";
import { Order } from "@/types/order.type";

export async function getUserOrders(): Promise<Order[]> {
  try {
    const instance = await axiosClient();
    console.log("Fetching orders from /order/own");
    const response = await instance.get<Order[]>("/order/own");
    console.log("Orders response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user orders:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
}

export async function initPayment(orderData: CreateOrderDto): Promise<string> {
  try {
    console.log("Init payment called");
    const instance = await axiosClient();
    console.log("Order data:", orderData);

    // Get current cart data
    const cartResponse = await instance.get("/shopping-cart");
    const cartData = cartResponse.data;

    // Calculate total price from cart items
    const subtotal = cartData.cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const shippingEstimate = 7.0;
    const totalPrice = subtotal + shippingEstimate;

    // Calculate amount in millimes (smallest currency unit)
    // Ensure the amount is at least 100 millimes (0.1 TND)
    const amountInMillimes = Math.max(100, Math.round(totalPrice * 1000));

    const formattedData = {
      shippingDetails: orderData.shippingDetails,
      paymentMethod: orderData.paymentMethod,
      cartItems: cartData.cartItems.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        imageURL: item.imageURL,
        stockQuantity: item.stockQuantity,
        product: {
          _id: item.productId,
          name: item.name,
          price: item.price,
          imageURL: item.imageURL,
          stockQuantity: item.stockQuantity
        }
      })),
      totalPrice: totalPrice,
      onlinePaymentRef: orderData.paymentMethod === PaymentMethod.OnDelivery 
        ? `COD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        : undefined,
      amount: amountInMillimes // Ensure it's an integer and at least 100
    };

    console.log("Formatted data:", formattedData);

    // Use the correct endpoint based on payment method
    const endpoint = formattedData.paymentMethod === PaymentMethod.OnDelivery
      ? "/order/test-init-payment"
      : "/order/init-payment";

    try {
      const response = await instance.post(endpoint, formattedData);

      // Delete cart after successful order
      try {
        console.log("Attempting to delete cart...");
        if (cartData?._id) {
          const deleteResponse = await instance.delete(`/shopping-cart/${cartData._id}`);
          console.log("Cart deletion response:", deleteResponse.data);
          
          // Verify cart is empty
          const verifyCart = await instance.get("/shopping-cart");
          if (verifyCart.data.cartItems.length === 0) {
            console.log("Cart successfully cleared");
          } else {
            console.log("Cart still has items, attempting to clear again");
            // Try to clear cart items individually
            for (const item of verifyCart.data.cartItems) {
              await instance.delete("/shopping-cart/item", {
                params: { product_id: item.productId }
              });
            }
          }
        } else {
          console.log("No cart found to delete");
        }
      } catch (cartError: any) {
        console.error("Failed to clear cart:", {
          status: cartError.response?.status,
          data: cartError.response?.data,
          message: cartError.message
        });
        // Try alternative method to clear cart
        try {
          const cartItems = await instance.get("/shopping-cart");
          for (const item of cartItems.data.cartItems) {
            await instance.delete("/shopping-cart/item", {
              params: { product_id: item.productId }
            });
          }
        } catch (retryError) {
          console.error("Failed to clear cart items individually:", retryError);
        }
      }

      revalidatePath("/orders");
      revalidatePath("/cart");

      if (formattedData.paymentMethod === PaymentMethod.OnDelivery) {
        return "/order-success";
      }

      // For online payment, return the payment URL
      if (response.data?.url) {
        return response.data.url;
      } else if (response.data?.payUrl) {
        return response.data.payUrl;
      } else {
        throw new Error("No payment URL received from server");
      }
    } catch (requestError: any) {
      console.error("Request error details:", {
        status: requestError.response?.status,
        statusText: requestError.response?.statusText,
        data: requestError.response?.data,
        message: requestError.message,
        code: requestError.code
      });

      if (requestError.code === 'ECONNREFUSED') {
        throw new Error("Unable to connect to the server. Please check if the backend is running.");
      }

      if (requestError.response?.status === 404) {
        throw new Error("Payment endpoint not found. Please contact support.");
      }

      const errorMessage = requestError.response?.data?.message
        ? Array.isArray(requestError.response.data.message)
          ? requestError.response.data.message.join(", ")
          : requestError.response.data.message
        : requestError.message || "Failed to initialize payment";

      throw new Error(errorMessage);
    }
  } catch (error: any) {
    console.error(
      "[PAYMENT_ERROR] Details:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function createOrder(orderData: CreateOrderDto): Promise<string> {
  try {
    const instance = await axiosClient();
    const cartResponse = await instance.get("/shopping-cart");
    const cartData = cartResponse.data;
    const shippingEstimate = 7.0;

    // Calculate total price from cart items
    const subtotal = cartData.cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const totalPrice = subtotal + shippingEstimate;

    const formattedData = {
      shippingDetails: orderData.shippingDetails,
      paymentMethod: orderData.paymentMethod,
      cartItems: cartData.cartItems.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        imageURL: item.imageURL,
        stockQuantity: item.stockQuantity,
        product: {
          _id: item.productId,
          name: item.name,
          price: item.price,
          imageURL: item.imageURL,
          stockQuantity: item.stockQuantity
        }
      })),
      totalPrice: totalPrice
    };

    const response = await instance.post("/order/create", formattedData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating order:", error);
    throw error;
  }
}
