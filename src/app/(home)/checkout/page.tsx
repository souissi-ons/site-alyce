"use client";
import { useForm } from "react-hook-form";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { getCart } from "@/actions/cart.actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { initPayment } from "@/actions/order.actions";
import { PaymentMethod } from "@/types/payment-methods.enum";
import { CreateOrderDto } from "@/types/order.type";

// Add type for API response
type PaymentResponse = {
  redirectUrl?: string;
  success?: boolean;
  error?: string;
};

export default function CheckoutPage() {
  const [cartData, setCartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      address: "",
      zipCode: "",
      city: "",
      phoneNumber: "",
      paymentMethod: PaymentMethod.OnDelivery,
    },
  });

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getCart();
        setCartData(data);
      } catch (err) {
        console.error("Failed to fetch cart data:", err);
        setError("Failed to load cart data. Please try again.");
      }
    };
    fetchCartData();
  }, []);

  const onSubmit = async (data: any) => {
    if (!cartData) return;

    setIsLoading(true);
    setError(null);
    try {
      const orderData: CreateOrderDto = {
        shippingDetails: {
          address: data.address.trim(),
          zipCode: data.zipCode.trim(),
          city: data.city.trim(),
          phoneNumber: data.phoneNumber.trim(),
        },
        paymentMethod: data.paymentMethod,
      };

      // Validate shipping details are not empty
      if (Object.values(orderData.shippingDetails).some((value) => !value)) {
        throw new Error("All shipping details are required");
      }

      const result = await initPayment(orderData);

      if (data.paymentMethod === PaymentMethod.Online) {
        // For online payment, redirect to payment URL
        if (result) {
          window.location.href = result;
        } else {
          throw new Error("Failed to get payment URL");
        }
      } else {
        // For on-delivery payment, redirect to success page
        router.push("/order-success");
      }
    } catch (error: any) {
      console.error("Error during checkout:", error);
      setError(
        error.message || "Failed to process your order. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!cartData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (cartData.cartItems.length === 0) {
    return (
      <div className="bg-neutral-light min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-soft p-12 text-center border border-secondary-light max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 mx-auto text-neutral mb-4" />
            <h2 className="text-2xl font-bold text-primary-dark font-serif mb-2">
              Your cart is empty
            </h2>
            <p className="text-neutral-dark mb-6">
              Discover our exquisite perfume collection
            </p>
            <Link href="/products">
              <button className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg shadow-sm hover:shadow-hover transition-all">
                Explore Perfumes
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = cartData?.cartItems?.reduce((sum: number, item: { price: number; quantity: number }) => sum + (item.price * item.quantity), 0) || 0;
  const shippingEstimate = 7.0;
  const total = subtotal + shippingEstimate;

  return (
    <div className="bg-neutral-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-primary-dark font-serif">
            Checkout
          </h1>
          <Link
            href="/cart"
            className="text-accent hover:text-accent-dark flex items-center gap-2 transition-colors group"
          >
            Back to Cart
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
          </Link>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping and Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-soft p-6 border border-secondary-light">
              <h2 className="text-xl font-serif font-medium text-primary-dark mb-6">
                Shipping Information
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent transition ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address.message as string}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      {...register("zipCode", {
                        required: "Zip code is required",
                        pattern: {
                          value: /^\d+$/,
                          message: "Must be a number",
                        },
                      })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent transition ${
                        errors.zipCode ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.zipCode.message as string}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register("city", { required: "City is required" })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent transition ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.city.message as string}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\d+$/,
                          message: "Must be a number",
                        },
                      })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent transition ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phoneNumber.message as string}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-serif font-medium text-primary-dark mb-6">
                    Payment Method
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="onDelivery"
                        value={PaymentMethod.OnDelivery}
                        {...register("paymentMethod")}
                        className="h-4 w-4 text-accent focus:ring-accent border-gray-300"
                      />
                      <label
                        htmlFor="onDelivery"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cash on Delivery
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="online"
                        value={PaymentMethod.Online}
                        {...register("paymentMethod")}
                        className="h-4 w-4 text-accent focus:ring-accent border-gray-300"
                      />
                      <label
                        htmlFor="online"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Online Payment
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-lg shadow-sm hover:shadow-hover transition-all disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-soft p-6 border border-secondary-light h-fit sticky top-4">
            <h2 className="text-xl font-serif font-medium text-primary-dark mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-dark">Subtotal</span>
                <span className="text-primary-dark font-medium">
                  {subtotal.toFixed(2)} TND
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-dark">Shipping</span>
                <span className="text-primary-dark font-medium">
                  {shippingEstimate.toFixed(2)} TND
                </span>
              </div>

              <div className="border-t border-secondary-light pt-3 flex justify-between text-lg font-bold">
                <span className="text-primary-dark">Total</span>
                <span className="text-primary-dark">
                  {total.toFixed(2)} TND
                </span>
              </div>
            </div>

            <ul className="divide-y divide-secondary-light mb-6">
              {cartData.cartItems.map((item: any) => (
                <li key={item._id} className="py-3 flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-secondary-light mr-3">
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-primary-dark">
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-dark">
                      {item.price.toFixed(2)} TND × {item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
