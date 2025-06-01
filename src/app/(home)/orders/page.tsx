"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/order.type";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { getUserOrders } from "@/actions/order.actions";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        console.log("Received orders:", data); // Debug log
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Impossible de charger vos commandes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-neutral-light min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-neutral-light min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-soft p-12 text-center border border-secondary-light max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-primary-dark font-serif mb-2">
              Aucune commande
            </h2>
            <p className="text-neutral-dark mb-6">
              Vous n'avez pas encore passé de commande
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary-dark font-serif mb-8">
          Mes Commandes
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-soft p-6 border border-secondary-light"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h2 className="text-lg font-medium text-primary-dark">
                    Commande #{order._id.slice(-6)}
                  </h2>
                  <p className="text-sm text-neutral-dark">
                    {format(new Date(order.createdAt), "PPP", { locale: fr })}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status === "pending"
                      ? "En attente"
                      : order.status === "completed"
                      ? "Livrée"
                      : "En cours"}
                  </span>
                </div>
              </div>

              <div className="border-t border-secondary-light pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-dark mb-2">
                      Adresse de livraison
                    </h3>
                    <p className="text-primary-dark">
                      {order.shippingDetails.address}
                      <br />
                      {order.shippingDetails.zipCode} {order.shippingDetails.city}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-dark mb-2">
                      Détails de paiement
                    </h3>
                    <p className="text-primary-dark">
                      Méthode:{" "}
                      {order.paymentMethod === "onDelivery"
                        ? "Paiement à la livraison"
                        : "Paiement en ligne"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-neutral-dark mb-2">
                  Articles
                </h3>
                <div className="space-y-2">
                  {order.cartItems?.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.imageURL}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <p className="text-primary-dark font-medium">
                            {item.name}
                          </p>
                          <p className="text-sm text-neutral-dark">
                            Quantité: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-primary-dark font-medium">
                        {(item.price * item.quantity).toFixed(2)} TND
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-secondary-light mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-dark">Subtotal</span>
                  <span className="text-primary-dark font-medium">
                    {(order.totalPrice - 7.0).toFixed(2)} TND
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-neutral-dark">Shipping</span>
                  <span className="text-primary-dark font-medium">
                    7.00 TND
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-secondary-light">
                  <span className="text-lg font-bold text-primary-dark">Total</span>
                  <span className="text-lg font-bold text-primary-dark">
                    {order.totalPrice?.toFixed(2)} TND
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 