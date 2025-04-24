// components/home/FeaturedProducts.tsx
"use client";
import Link from "next/link";
import { Product } from "@/types/Product";
import ProductCard from "../ProductCard";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-3xl font-serif font-bold text-primary-dark">
            Signature Collections
          </h2>
          <Link
            href="/products"
            className="text-primary-dark hover:text-accent-dark font-medium flex items-center gap-2 transition-colors group"
          >
            View All Products
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard
                key={
                  product._id
                    ? `product-${product._id}`
                    : `product-fallback-${index}`
                }
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
