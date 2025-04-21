import Hero from "@/components/Hero";
import { fetchProducts } from "@/actions/products.actions";
import Categories from "./components/catégories";
import CatalogueArticles from "./components/catalogueArticles";

const Home = async () => {
  // Appel sans paramètres de pagination/recherche
  const { data, total } = await fetchProducts();

  return (
    <main className="flex flex-col items-center h-full">
      <Hero />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <Categories />
        </div>

        <div>
          <CatalogueArticles initialData={data} initialTotal={total} />
        </div>
      </div>
    </main>
  );
};
export default Home;
