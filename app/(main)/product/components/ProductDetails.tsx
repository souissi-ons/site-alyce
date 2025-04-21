"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/types";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState(false);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      // Add the product to the cart
    } catch (error) {
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="md:ml-10 mt-6 md:mt-0 text-center md:text-left">
      <h1 className="text-3xl font-bold text-primaryDark mt-2">
        {product.product.name}
      </h1>

      <div className="flex items-center mt-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-500 text-xl">
              {i < Math.floor(product.product.averageRating) ? "★" : "☆"}
            </span>
          ))}
          <span className="ml-1 text-gray-600 text-sm">
            ({product.product.reviewsNumber})
          </span>
        </div>
        <span
          className={`font-semibold ml-4 ${
            product.product.quantity > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.product.quantity > 0 ? "En Stock" : "En Rupture"}
        </span>
      </div>

      <p className="text-gray-600 mt-4 text-sm leading-relaxed">
        {product.product.description}
      </p>

      <hr className="border-t-2 border-secondaryLight my-4" />

      <h2 className="text-3xl font-bold text-primaryDark mt-6">
        {product.product.price} DT
      </h2>

      <div className="flex items-center mt-4">
        <p className="mr-4 text-primaryDark font-semibold">Quantité :</p>
        <button
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
          className="bg-tertiaryLight p-2 rounded-full hover:bg-primaryDark text-white disabled:bg-gray-300"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="text"
          className="mx-2 w-12 text-center border rounded-lg focus:outline-none focus:border-accent"
          value={quantity}
          readOnly
        />
        <button
          onClick={increaseQuantity}
          disabled={quantity >= product.product.quantity}
          className="bg-tertiaryLight p-2 rounded-full hover:bg-primaryDark text-white disabled:bg-gray-300"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isAdding || product.product.quantity <= 0}
        className={`mt-6 w-full ${
          product.product.quantity <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-tertiaryLight hover:bg-primaryDark"
        } text-white py-2 rounded-lg transition-colors duration-300 flex items-center justify-center`}
      >
        {isAdding ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Ajout en cours...
          </>
        ) : (
          "Ajouter au panier"
        )}
      </button>
    </div>
  );
}
