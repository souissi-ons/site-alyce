"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
}

const OrderSummary = ({ subtotal, tax }: OrderSummaryProps) => {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");

  const applyPromoCode = () => {
    // Implement promo code logic here
    console.log("Applying promo code:", promoCode);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>{subtotal.toFixed(2)} DT</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>{tax.toFixed(2)} DT</span>
        </div>
        <div className="border-t pt-4 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{(subtotal + tax).toFixed(2)} DT</span>
        </div>

        <div className="pt-4 space-y-2">
          <button
            onClick={() => router.push("/checkout")}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
          >
            Passer au paiement
          </button>

          <button
            onClick={() => router.push("/catalogue")}
            className="w-full py-2 px-4 rounded-md text-primary hover:underline transition-colors"
          >
            Continuer vos achats
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
