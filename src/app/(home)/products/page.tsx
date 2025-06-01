/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/(home)/products/page.tsx
import { Category } from "@/types/Category";
import axios from "axios";
import ProductsFilter from "@/components/products/ProductsFilter";
import ProductGrid from "@/components/products/ProductGrid";
import {
  getActiveProducts,
  getFilteredProducts,} from "@/actions/product.actions";
import { getAllCategories } from "@/actions/category.actions";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    price?: string;
    sort?: string;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const category = params?.category;
  const price = params?.price;
  const sort = params?.sort;

  // Utiliser la fonction de filtrage si des paramètres sont présents
  const products =
    category || price || sort
      ? await getFilteredProducts(category, price, sort)
      : await getActiveProducts();

  const categories = await getAllCategories();

  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary-dark font-serif mb-3">
            Our Fragrance Collection
          </h1>
          <p className="text-lg text-neutral-dark max-w-2xl mx-auto">
            Discover exquisite scents crafted with the finest ingredients for
            those who appreciate true luxury
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <ProductsFilter categories={categories} />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Results Summary */}
            <div className="flex justify-between items-center mb-8 p-5 bg-white rounded-xl shadow-soft border border-secondary-light">
              <p className="text-neutral-dark">
                Showing{" "}
                <span className="font-medium text-primary-dark">
                  {products.length}
                </span>{" "}
                products
              </p>

              {/* Affichage des filtres actifs */}
              <div className="flex gap-2">
                {category && (
                  <span className="px-2 py-1 bg-secondary-light rounded-md text-sm">
                    {categories.find((c) => c._id === category)?.name ||
                      "Category"}
                  </span>
                )}
                {price && (
                  <span className="px-2 py-1 bg-secondary-light rounded-md text-sm">
                    {price === "under_50"
                      ? "Under 50 DT"
                      : price === "50_100"
                      ? "50-100 DT"
                      : price === "over_100"
                      ? "Over 100 DT"
                      : price}
                  </span>
                )}
                {sort && (
                  <span className="px-2 py-1 bg-secondary-light rounded-md text-sm">
                    {sort === "price_asc"
                      ? "Price: Low to High"
                      : sort === "price_desc"
                      ? "Price: High to Low"
                      : sort === "rating"
                      ? "Rating"
                      : sort === "popularity"
                      ? "Popularity"
                      : sort === "newest"
                      ? "Newest"
                      : sort}
                  </span>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
