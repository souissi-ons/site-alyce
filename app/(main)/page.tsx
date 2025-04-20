import Hero from "@/components/Hero";
import CatalogueGrid from "../components/catalogue-grid";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-full">
      <Hero />
      <CatalogueGrid />
    </main>
  );
}
