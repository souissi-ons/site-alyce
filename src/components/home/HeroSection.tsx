/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-primary-light to-white">
      <div className="container mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-dark leading-tight">
            Timeless Scents, <br className="hidden md:block" /> Modern Elegance
          </h1>
          <p className="text-lg text-neutral-dark max-w-lg mx-auto md:mx-0">
            Alyce perfumes capture the essence of sophistication with our
            carefully crafted fragrances that linger beautifully.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/products"
              className="px-8 py-3 bg-primary-dark text-white rounded-full font-medium hover:bg-opacity-90 transition-all shadow-sm"
            >
              Discover Scents
            </Link>
            <Link
              href="/categories"
              className="px-8 py-3 border border-primary-dark text-primary-dark rounded-full font-medium hover:bg-primary-light transition-all"
            >
              Explore Collections
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 relative aspect-square max-w-xl">
          <img
            src="/hero-perfume.png"
            alt="Alyce Signature Perfume"
            className="object-contain animate-float"
          />
        </div>
      </div>
    </section>
  );
}
