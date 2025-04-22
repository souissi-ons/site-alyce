"use client";
import { CartItem } from "@/types";
import { useState } from "react";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) {
      await handleRemove();
      return;
    }

    setIsUpdating(true);
    try {
      // update the quantity in the cart
      setQuantity(newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      // remove the item from the cart
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-4 flex gap-4">
      <div className="w-24 h-24 rounded-md overflow-hidden">
        <img
          src={item.imageURL}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-primary font-bold">{item.price} DT</p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-2 hover:bg-gray-100 rounded-md disabled:opacity-50"
              disabled={isUpdating}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-2 hover:bg-gray-100 rounded-md disabled:opacity-50"
              disabled={isUpdating}
            >
              +
            </button>
          </div>

          <button
            className="text-red-500 hover:text-red-700 hover:bg-gray-100 px-2 py-1 rounded-md disabled:opacity-50"
            onClick={handleRemove}
            disabled={isUpdating}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
