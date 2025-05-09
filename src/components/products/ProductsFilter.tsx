// src/components/products/ProductsFilter.tsx
"use client";
import { Category } from "@/types/Category";
import { Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductsFilterProps {
  categories: Category[];
}

export default function ProductsFilter({ categories }: ProductsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const activePrice = searchParams.get("price");

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    router.push(`/products?${params.toString()}`);
  };

  const handlePriceChange = (priceRange: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (priceRange) {
      params.set("price", priceRange);
    } else {
      params.delete("price");
    }
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    router.push(`/products?${params.toString()}`);
  };

  const hasActiveFilters = activeCategory || activePrice;

  return (
    <div className="bg-white p-6 rounded-xl shadow-soft border border-secondary-light">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center text-lg font-medium text-primary-dark font-serif">
          <Filter className="w-5 h-5 mr-2 text-primary" />
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-accent hover:text-accent-dark flex items-center transition-colors"
          >
            Clear all
            <X className="ml-1 w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-8">
        {/* Categories Section */}
        <div>
          <h3 className="text-sm font-medium text-primary-dark mb-3 font-serif">
            Categories
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => handleCategoryChange("")}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                !activeCategory
                  ? "bg-accent text-white font-medium"
                  : "text-neutral-dark hover:bg-secondary-light"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category._id)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeCategory === category._id
                    ? "bg-accent text-white font-medium"
                    : "text-neutral-dark hover:bg-secondary-light"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Section */}
        <div>
          <h3 className="text-sm font-medium text-primary-dark mb-3 font-serif">
            Price Range
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => handlePriceChange("under_50")}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                activePrice === "under_50"
                  ? "bg-accent text-white font-medium"
                  : "text-neutral-dark hover:bg-secondary-light"
              }`}
            >
              Under 50 DT
            </button>
            <button
              onClick={() => handlePriceChange("50_100")}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                activePrice === "50_100"
                  ? "bg-accent text-white font-medium"
                  : "text-neutral-dark hover:bg-secondary-light"
              }`}
            >
              50 - 100 DT
            </button>
            <button
              onClick={() => handlePriceChange("over_100")}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                activePrice === "over_100"
                  ? "bg-accent text-white font-medium"
                  : "text-neutral-dark hover:bg-secondary-light"
              }`}
            >
              Over 100 DT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
