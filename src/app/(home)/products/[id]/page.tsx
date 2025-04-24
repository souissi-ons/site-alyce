/* eslint-disable @next/next/no-img-element */
import ProductInfoSection from "@/components/products/ProductInfoSection";
import ReviewSection from "@/components/products/ReviewSection";
import Link from "next/link";
import { Product } from "@/types/Product";
import { getProductById } from "@/actions/product.actions";
import { ClientReview } from "@/types/ClientReview";

type Params = Promise<{ id: string }>;

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const data = await getProductById(id);
  const product: Product = data.product;
  const reviews: ClientReview[] = data.reviews;

  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="text-neutral-dark hover:text-accent transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-neutral">/</span>
                <Link
                  href="/products"
                  className="text-neutral-dark hover:text-accent transition-colors"
                >
                  Products
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-neutral">/</span>
                <span className="text-primary-dark">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="bg-white rounded-xl shadow-soft p-6 border border-secondary-light">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-secondary-light rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-accent transition-all"
                >
                  {/* Thumbnail images would go here */}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <ProductInfoSection product={product} />
        </div>

        {/* Reviews Section */}
        <ReviewSection
          reviews={reviews}
          averageRating={product.averageRating}
          productId={product._id}
        />
      </div>
    </div>
  );
}
