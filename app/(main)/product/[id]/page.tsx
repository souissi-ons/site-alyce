import { fetchProduct } from "@/actions/products.actions";
import Banner from "@/components/banner";
import ProductImages from "../components/ProductImages";
import ProductDetails from "../components/ProductDetails";
import ProductReviews from "../components/ProductReviews";
import { Product } from "@/types";

const productPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product: Product = await fetchProduct(id);
  console.log("Product data:", product);
  if (!product) {
    return <div className="text-center py-10">Produit introuvable</div>;
  }

  return (
    <div className="items-center h-full">
      <Banner title="Produit" />
      <div className="p-6 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center mb-10">
            <ProductImages imageUrl={product.product.imageUrl} />
            <ProductDetails product={product} />
          </div>

          {/* Product Info and Reviews */}
          <div className="space-y-6">
            {/* Product Info */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Détails du produit
              </h1>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-primaryDark">
                  Ingrédients :
                </h2>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  {product.product.ingredients &&
                  product.product.ingredients.length > 0 ? (
                    product.product.ingredients.map(
                      (ingredient: string, index: number) => (
                        <li key={index}>{ingredient}</li>
                      )
                    )
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Aucun ingrédient trouvé
                    </div>
                  )}
                </ul>
              </div>
            </div>

            {/* Reviews Section */}
            <ProductReviews
              reviews={product.reviews}
              averageRating={product.product.averageRating}
              reviewsNumber={product.product.reviewsNumber}
              productId={product.product._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default productPage;
