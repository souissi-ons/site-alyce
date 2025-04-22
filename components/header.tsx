"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, LogIn, LogOut } from "lucide-react";

interface HeaderProps {
  initialAuthState: boolean;
}

export function Header({ initialAuthState }: HeaderProps) {
  const router = useRouter();

  const handleAuthAction = async () => {
    if (initialAuthState) {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
        document.cookie =
          "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Logout failed:", error);
      }
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
            {/* Search */}
            <button
              className="text-primaryDark hover:text-primaryDark/70 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Auth Button */}
            {initialAuthState ? (
              <>
                {/* Cart */}
                <Link
                  href="/shopping-cart"
                  className="text-primaryDark hover:text-primaryDark/70 transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Link>

                <button
                  onClick={handleAuthAction}
                  className="hidden md:block bg-tertiaryLight text-white px-4 py-2 rounded-full hover:bg-primaryDark transition-colors text-sm"
                  aria-label="Se Déconnecter"
                >
                  Déconnecter
                </button>
                <button
                  onClick={handleAuthAction}
                  className="md:hidden text-primaryDark hover:text-primaryDark/70 transition-colors"
                  aria-label="Se Déconnecter"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAuthAction}
                  className="hidden md:block bg-tertiaryLight text-white px-4 py-2 rounded-full hover:bg-primaryDark transition-colors text-sm"
                  aria-label="Se Connecter"
                >
                  Se Connecter
                </button>
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
