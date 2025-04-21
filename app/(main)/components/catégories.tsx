import React from "react";

const categories = [
  "VISAGE",
  "CORPS & BAIN",
  "CHEVEUX",
  "HUILES & HYDROLATS",
  "PARFUM",
];

const Categories = () => {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-4 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-white text-primaryDark rounded-full border border-tertiary 
                      hover:bg-primaryDark hover:text-white transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
