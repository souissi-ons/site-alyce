import { Category } from "@/types/category";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 h-full flex flex-col">
      <div className="aspect-square bg-gradient-to-br from-secondary to-accent flex items-center justify-center p-6">
        <h3 className="font-serif text-2xl font-medium text-center text-primary-dark">
          {category.name}
        </h3>
      </div>
    </div>
  );
}
