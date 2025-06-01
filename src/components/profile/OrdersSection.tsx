// src/components/profile/OrdersSection.tsx
"use client";

import { Order } from "@/types/order.type";
import { ShoppingBag } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";

interface OrdersSectionProps {
  orders: Order[];
}

export default function OrdersSection({ orders }: OrdersSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-dark font-serif mb-8 flex items-center">
        <ShoppingBag className="w-6 h-6 mr-3 text-primary" />
        Historique des commandes
      </h2>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-secondary-light rounded-xl p-5 hover:shadow-soft transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium text-lg text-primary-dark group-hover:text-accent-dark transition-colors">
                    Commande #{order._id.slice(-6)}
                  </h3>
                  <p className="text-sm text-neutral-dark mt-1">
                    Passée le {format(new Date(order.createdAt), "PPP", { locale: fr })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
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

              <div className="mt-4 border-t border-secondary-light pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-dark mb-1">
                      Adresse de livraison
                    </h4>
                    <p className="text-primary-dark text-sm">
                      {order.shippingDetails.address}
                      <br />
                      {order.shippingDetails.zipCode} {order.shippingDetails.city}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-dark mb-1">
                      Méthode de paiement
                    </h4>
                    <p className="text-primary-dark text-sm">
                      {order.paymentMethod === "onDelivery"
                        ? "Paiement à la livraison"
                        : "Paiement en ligne"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-secondary-light pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-dark">Sous-total</span>
                  <span className="text-primary-dark font-medium">
                    {(order.totalPrice - 7.0).toFixed(2)} TND
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-neutral-dark">Livraison</span>
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
      ) : (
        <div className="bg-secondary-light/30 rounded-xl p-8 text-center border border-dashed border-secondary">
          <div className="mx-auto w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center mb-4 border border-primary-light/30">
            <ShoppingBag className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-medium text-primary-dark mb-2">
            Aucune commande
          </h3>
          <p className="text-neutral-dark mb-6 max-w-md mx-auto">
            Votre historique de commandes apparaîtra ici une fois que vous aurez effectué votre premier achat
          </p>
          <Link
            href="/products"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-sm hover:shadow-hover"
          >
            Découvrir nos parfums
          </Link>
        </div>
      )}
    </div>
  );
}
