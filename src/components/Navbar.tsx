import Link from "next/link";
import Image from "next/image";
import { getCartItemsCount } from "@/actions/cart.actions";
import { isLoggedIn } from "@/actions/auth.actions";
import { LogIn, Search, ShoppingCart, User2 } from "lucide-react";

export default async function Navbar() {
  const loggedIn = await isLoggedIn();
  const count = await getCartItemsCount();

  return (
    <nav className="bg-white border-b border-primary-light sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/alyce-logo-1.png"
              alt="Alyce Perfumes"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-primary-dark hover:text-accent transition-colors font-medium"
            >
              Fragrances
            </Link>
            <Link
              href="/about"
              className="text-primary-dark hover:text-accent transition-colors font-medium"
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              className="text-primary-dark hover:text-accent transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button aria-label="Search">
              <Search className="w-5 h-5 text-primary-dark" />
            </button>
            {loggedIn ? (
              <Link href="/profile" aria-label="Account">
                <User2 className="w-5 h-5 text-primary-dark" />
              </Link>
            ) : (
              <Link href="/login" aria-label="Login">
                <LogIn className="w-5 h-5 text-primary-dark" />
              </Link>
            )}
            <Link href="/cart" aria-label="Cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-primary-dark" />
              {
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              }
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
