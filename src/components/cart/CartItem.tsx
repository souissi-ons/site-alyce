"use client";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { removeFromCart, updateQuantity } from "@/actions/cart.actions";
import { CartItemComponentProps } from "@/types/CartItem";

export default function CartItem({ item }: { item: CartItemComponentProps }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRemove = async () => {
    try {
      setIsRemoving(true);
      await removeFromCart(item.id);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.maxQuantity) return;

    const action = newQuantity > quantity ? "add" : "reduce";
    const changeAmount = Math.abs(newQuantity - quantity);

    try {
      setIsUpdating(true);
      await updateQuantity(item.id, changeAmount, action);
      setQuantity(newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <li className="py-4 flex group hover:bg-secondary-light/30 transition-colors px-3 -mx-3 rounded-lg relative">
      {/* Remove button - now positioned absolutely at top-right */}
      <button
        onClick={handleRemove}
        disabled={isRemoving}
        className="absolute right-2 top-2 text-neutral hover:text-accent-dark disabled:opacity-50 transition-colors p-1 rounded-full hover:bg-secondary-light/50"
        aria-label="Remove item"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-secondary-light">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <h3 className="text-base font-medium text-primary-dark pr-6">
            <Link
              href={`/products/${item.id}`}
              className="hover:text-accent-dark transition-colors"
            >
              {item.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-neutral-dark">
            {item.price.toFixed(2)} TND
          </p>

          {item.quantity > 1 && (
            <p className="mt-1 text-xs text-neutral">
              {(item.price * item.quantity).toFixed(2)} TND total
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center border border-secondary rounded-lg bg-white">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || isUpdating}
              className="text-neutral hover:text-accent-dark disabled:opacity-50 p-2 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="mx-2 text-primary-dark w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= item.maxQuantity || isUpdating}
              className="text-neutral hover:text-accent-dark disabled:opacity-50 p-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
