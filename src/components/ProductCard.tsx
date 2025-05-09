/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Product } from "@/types/Product";
import { addToCart } from "@/actions/cart.actions";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/actions/auth.actions";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const authenticated = await isLoggedIn();
    if (!authenticated) {
      router.push("/login");
      return;
    }
    await addToCart({
      productId: product._id,
      name: product.name,
      imageURL: product.imageUrl,
      price: product.price,
      stockQuantity: product.quantity,
      quantity: 1,
    });
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.averageRating);
    const hasHalfStar = product.averageRating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-accent/50 text-accent" />
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-secondary" />);
      }
    }
    return stars;
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-secondary-light hover:border-accent/30">
      {/* Product Status Badge */}
      {!product.isActive && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
          Out of Stock
        </div>
      )}

      <Link
        href={`/products/${product._id}`}
        className="flex flex-col h-full"
        aria-label={`View ${product.name} details`}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-serif text-xl font-bold text-primary-dark mb-2 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-neutral-dark mb-4 line-clamp-2 min-h-[40px]">
            {product.description || "Premium fragrance crafted with care"}
          </p>

          <div className="mt-auto space-y-3">
            {/* Rating */}
            <div className="flex items-center">
              <div className="flex mr-2">{renderStars()}</div>
              <span className="text-neutral-dark text-sm">
                ({product.reviewsNumber})
              </span>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex justify-between items-center pt-2">
              <div>
                <span className="font-serif text-xl font-bold text-primary-dark">
                  {product.price.toFixed(2)} DT
                </span>
                {product.quantity < 10 && product.quantity > 0 && (
                  <span className="block text-xs text-red-500 mt-1">
                    Only {product.quantity} left!
                  </span>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.isActive}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  product.isActive
                    ? "bg-accent hover:bg-accent-dark text-white shadow-sm"
                    : "bg-secondary-light text-neutral-dark cursor-not-allowed"
                }`}
                aria-label={`Add ${product.name} to cart`}
              >
                {product.isActive ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
