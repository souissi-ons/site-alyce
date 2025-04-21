import { Product, ProductInfo } from "@/types";
import { useRouter } from "next/navigation";
const ProductCard = ({ product }: { product: ProductInfo }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product._id}`);
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
        <span className="absolute top-2 right-2 bg-primaryDark text-white text-xs font-bold px-2 py-1 rounded">
          {product.price} DT
        </span>
      </div>
      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {product.description}
      </p>
      <button
        className="w-full bg-secondary hover:bg-tertiaryLight text-primaryDark font-medium py-2 px-4 rounded-full transition-colors"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Ajouter au panier
      </button>
    </div>
  );
};
export default ProductCard;
