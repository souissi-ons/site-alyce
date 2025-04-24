// app/page.tsx
import { getAllCategories } from "@/actions/category.actions";
import { getActiveProducts } from "@/actions/product.actions";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroSection from "@/components/home/HeroSection";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";

export default async function Home() {
  const [categoriesData, productsData] = await Promise.all([
    getAllCategories(),
    getActiveProducts(),
  ]);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedCategories categories={categoriesData} />
      <FeaturedProducts products={productsData} />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
