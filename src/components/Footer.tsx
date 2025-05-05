import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="block mb-6">
              <Image
                src="/alyce-logo-2.png"
                alt="Alyce Perfumes"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-primary-light mb-6 max-w-md">
              Crafting timeless fragrances that tell your story. Alyce perfumes
              are created with the finest ingredients for those who appreciate
              true luxury.
            </p>
            <div className="flex space-x-4">
              {["facebook", "instagram", "twitter"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  aria-label={social}
                  className="text-primary-light hover:text-white transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    {social.charAt(0).toUpperCase()}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Explore</h3>
            <ul className="space-y-3">
              {[
                "All Products",
                "New Arrivals",
                "Best Sellers",
                "Gift Sets",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/products"
                    className="text-primary-light hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                {
                  name: "About Us",
                  href: "/about",
                },
                {
                  name: "Contact Us",
                  href: "/contact",
                },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href="#"
                    className="text-primary-light hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-light text-sm">
            © {new Date().getFullYear()} Alyce Perfumes. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-primary-light hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-primary-light hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
