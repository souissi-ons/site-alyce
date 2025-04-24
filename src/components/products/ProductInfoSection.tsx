// src/components/products/ProductInfoSection.tsx
"use client";

import { addToCart } from "@/actions/cart.actions";
import { Product } from "@/types/Product";
import { Heart, Share2, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getCategoryById } from "@/actions/category.actions";

interface ProductInfoSectionProps {
  product: Product;
}

export default function ProductInfoSection({
  product,
}: ProductInfoSectionProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchCategory = async () => {
      if (product.category) {
        const category = await getCategoryById(product.category);
        setCategoryName(category?.name || "");
      }
    };
    fetchCategory();
  }, [product.category]);

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-accent/50 text-accent" />
        );
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-secondary" />);
      }
    }
    return stars;
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuantity(parseInt(e.target.value));
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Add wishlist functionality
  };

  const handleShare = () => {
    setIsSharing(true);
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out this product: ${product.name}`,
          url: window.location.href,
        })
        .catch(() => setIsSharing(false));
    } else {
      navigator.clipboard.writeText(window.location.href);
      setTimeout(() => setIsSharing(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-8 border border-secondary-light">
      {/* Category Badge */}
      {product.category && (
        <div className="mb-4">
          <span className="inline-block bg-secondary-light text-primary-dark text-sm px-3 py-1 rounded-full hover:bg-secondary transition-colors">
            {categoryName}
          </span>
        </div>
      )}

      {/* Product Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-dark font-serif mb-2">
          {product.name}
        </h1>
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {renderRatingStars(product.averageRating)}
          </div>
          <span className="text-neutral-dark text-sm">
            ({product.reviewsNumber} reviews)
          </span>
        </div>
      </div>

      {/* Price and Status */}
      <div className="mb-6">
        <div className="flex items-center flex-wrap gap-4">
          <span className="text-3xl font-bold text-primary-dark">
            {product.price.toFixed(2)} DT
          </span>
          {product.quantity > 0 ? (
            <span className="text-green-600 text-sm bg-green-50 px-3 py-1 rounded-full">
              In Stock ({product.quantity} available)
            </span>
          ) : (
            <span className="text-red-500 text-sm bg-red-50 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
        {product.quantity < 10 && product.quantity > 0 && (
          <p className="text-red-500 text-sm mt-2">
            Only {product.quantity} left - order soon!
          </p>
        )}
      </div>

      {/* Quantity Selector */}
      {product.isActive && product.quantity > 0 && (
        <div className="mb-6">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-neutral-dark mb-2"
          >
            Quantity
          </label>
          <select
            id="quantity"
            className="w-full border border-secondary rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:border-transparent"
            value={selectedQuantity}
            onChange={handleQuantityChange}
          >
            {Array.from({ length: Math.min(10, product.quantity) }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          onClick={async () => {
            await addToCart({
              productId: product._id,
              name: product.name,
              imageURL: product.imageUrl,
              price: product.price,
              stockQuantity: product.quantity,
              quantity: selectedQuantity,
            });
          }}
          disabled={!product.isActive}
          className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg transition-colors ${
            product.isActive
              ? "bg-accent hover:bg-accent-dark text-white shadow-sm hover:shadow-hover"
              : "bg-secondary-light text-neutral-dark cursor-not-allowed"
          }`}
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleAddToWishlist}
            className={`p-3 border rounded-lg transition-colors flex-1 ${
              isWishlisted
                ? "border-accent bg-accent/10 text-accent"
                : "border-secondary hover:bg-secondary-light text-primary"
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-accent" : ""}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-3 border border-secondary rounded-lg hover:bg-secondary-light transition-colors flex-1"
            disabled={isSharing}
          >
            <Share2 className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>

      {/* Product Description */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary-dark font-serif mb-4">
          Description
        </h2>
        <p className="text-neutral-dark whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        {product.usageAdvice && (
          <div>
            <h3 className="font-bold text-primary-dark mb-2">Usage Advice</h3>
            <p className="text-neutral-dark">{product.usageAdvice}</p>
          </div>
        )}

        {product.ingredients && product.ingredients.length > 0 && (
          <div>
            <h3 className="font-bold text-primary-dark mb-2">Ingredients</h3>
            <ul className="list-disc pl-5 text-neutral-dark space-y-1">
              {product.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}

        {product.storageConditions && (
          <div>
            <h3 className="font-bold text-primary-dark mb-2">
              Storage Conditions
            </h3>
            <p className="text-neutral-dark">{product.storageConditions}</p>
          </div>
        )}

        {product.precautions && (
          <div>
            <h3 className="font-bold text-primary-dark mb-2">Precautions</h3>
            <p className="text-neutral-dark">{product.precautions}</p>
          </div>
        )}
      </div>
    </div>
  );
}
