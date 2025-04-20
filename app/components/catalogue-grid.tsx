import React from "react";
import Categories from "./catégories";
import CatalogueArticles from "./catalogueArticles";

const CatalogueGrid = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Section Catégories - disposition horizontale */}
      <div className="mb-8">
        <Categories />
      </div>

      <div>
        <CatalogueArticles />
      </div>
    </div>
  );
};

export default CatalogueGrid;
