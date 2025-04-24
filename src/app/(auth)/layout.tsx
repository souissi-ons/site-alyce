import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/alyce-logo-2.png"
              alt="Alyce Logo"
              width={250}
              height={250}
              className="mx-auto mb-2"
            />
          </Link>
        </header>

        {/* Content */}
        <main className="flex justify-center">
          <div className="w-full max-w-md bg-white rounded-xl shadow-soft p-8 border border-primary-light/30">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-neutral-dark">
          <p>© {new Date().getFullYear()} Alyce. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
