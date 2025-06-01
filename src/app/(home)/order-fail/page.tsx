import { XCircle } from "lucide-react";
import Link from "next/link";

export default function OrderFailPage() {
  return (
    <div className="bg-neutral-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-soft p-12 text-center border border-secondary-light max-w-md mx-auto">
          <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-primary-dark font-serif mb-2">
            Order Failed
          </h2>
          <p className="text-neutral-dark mb-6">
            There was an issue processing your order. Please try again.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/cart">
              <button className="w-full bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg shadow-sm hover:shadow-hover transition-all">
                Try Again
              </button>
            </Link>
            <Link href="/products">
              <button className="w-full bg-white hover:bg-secondary-light text-primary-dark border border-secondary-light px-6 py-3 rounded-lg shadow-sm hover:shadow-hover transition-all">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
