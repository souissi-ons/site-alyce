// src/components/profile/OrdersSection.tsx
"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function OrdersSection({ orders }: { orders: string[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-dark font-serif mb-8 flex items-center">
        <ShoppingBag className="w-6 h-6 mr-3 text-primary" />
        Order History
      </h2>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((orderId) => (
            <div
              key={orderId}
              className="border border-secondary-light rounded-xl p-5 hover:shadow-soft transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium text-lg text-primary-dark group-hover:text-accent-dark transition-colors">
                    Order #{orderId.substring(0, 8).toUpperCase()}
                  </h3>
                  <p className="text-sm text-neutral-dark mt-1">
                    Placed on{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-secondary-light text-primary-dark text-sm px-3 py-1 rounded-full">
                    Processing
                  </span>
                  <Link
                    href={`/orders/${orderId}`}
                    className="text-sm font-medium text-accent hover:text-accent-dark flex items-center group-hover:underline transition-all"
                  >
                    View Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 w-4 h-4"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-secondary-light/30 rounded-xl p-8 text-center border border-dashed border-secondary">
          <div className="mx-auto w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center mb-4 border border-primary-light/30">
            <ShoppingBag className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-medium text-primary-dark mb-2">
            No orders yet
          </h3>
          <p className="text-neutral-dark mb-6 max-w-md mx-auto">
            Your order history will appear here once you make your first
            purchase
          </p>
          <Link
            href="/products"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-sm hover:shadow-hover"
          >
            Discover Our Fragrances
          </Link>
        </div>
      )}
    </div>
  );
}
