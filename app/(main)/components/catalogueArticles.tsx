"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product, ProductInfo } from "@/types";
import ProductCard from "./productCard";

interface CatalogueArticlesProps {
  initialData: ProductInfo[];
  initialTotal: number;
}

const CatalogueArticles = ({
  initialData,
  initialTotal,
}: CatalogueArticlesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] =
    useState<ProductInfo[]>(initialData);
  const productsPerPage = 20;

  useEffect(() => {
    if (searchTerm) {
      const filtered = initialData.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(initialData);
    }
    setCurrentPage(1);
  }, [searchTerm, initialData]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Barre de recherche */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Rechercher des produits..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryDark"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <p className="mt-2 text-sm text-gray-500">
            {filteredProducts.length} produits trouvés
          </p>
        </div>

        {/* Liste des produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <PaginationButton
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={20} />
            </PaginationButton>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationButton
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  active={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationButton>
              ))}
            </div>

            <PaginationButton
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={20} />
            </PaginationButton>
          </div>
        )}
      </div>
    </div>
  );
};

const PaginationButton = ({
  children,
  onClick,
  disabled = false,
  active = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
      active
        ? "bg-primaryDark text-white"
        : disabled
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-secondary text-primaryDark hover:bg-tertiaryLight"
    }`}
  >
    {children}
  </button>
);

export default CatalogueArticles;
