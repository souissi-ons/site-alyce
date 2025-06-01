// components/home/FeaturedCategories.tsx
"use client";
import Link from "next/link";
import { Category } from "@/types/Category";
import CategoryCard from "../CategoryCard";

interface FeaturedCategoriesProps {
  categories: Category[];
}

export default function FeaturedCategories({
  categories,
}: FeaturedCategoriesProps) {
  return (
    <section className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-3xl font-serif font-bold text-primary-dark">
            Our Fragrance Families
          </h2>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No categories found
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.slice(0, 5).map((category, index) => (
              <CategoryCard
                key={
                  category._id
                    ? `category-${category._id}`
                    : `category-fallback-${index}`
                }
                category={category}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
