"use client";
import { CartItem } from "@/types";
import CartItemCard from "./CartItemCard";

interface CartItemsListProps {
  items: CartItem[];
}

const CartItemsList = ({ items }: CartItemsListProps) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-lg">Votre panier est vide</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow divide-y">
      {items.map((item) => (
        <CartItemCard key={item.productId} item={item} />
      ))}
    </div>
  );
};

export default CartItemsList;
