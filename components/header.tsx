"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, LogIn } from "lucide-react";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // À remplacer par votre état d'authentification réel
  const router = useRouter();

  const handleAuthAction = () => {
    if (isLoggedIn) {
      router.push("/Profil");
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-primaryLight/50 backdrop-blur-md rounded-b-3xl px-4 sm:px-4 md:px-10 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <Image
              src="/alyce-logo-1.png"
              alt="Alyce"
              width={50}
              height={50}
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <Image
              src="/alyce-logo-2.png"
              alt="Alyce"
              width={100}
              height={40}
              className="w-20 h-6 md:w-24 md:h-8"
            />
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Search - Always visible */}
            <button
              className="text-primaryDark hover:text-primaryDark/70 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart - Always visible */}
            <Link
              href="/Panier"
              className="text-primaryDark hover:text-primaryDark/70 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {/* Auth Button - Different on mobile and desktop */}
            {isLoggedIn ? (
              // Profil (tous écrans)
              <button
                onClick={handleAuthAction}
                className="text-primaryDark hover:text-primaryDark/70 transition-colors"
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
              </button>
            ) : (
              <>
                {/* Desktop - Bouton texte */}
                <button
                  onClick={handleAuthAction}
                  className="hidden md:block bg-tertiaryLight text-white px-4 py-2 rounded-full hover:bg-primaryDark transition-colors text-sm"
                  aria-label="Se Connecter"
                >
                  Se Connecter
                </button>

                {/* Mobile - Icône */}
                <button
                  onClick={handleAuthAction}
                  className="md:hidden text-primaryDark hover:text-primaryDark/70 transition-colors"
                  aria-label="Se Connecter"
                >
                  <LogIn className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
