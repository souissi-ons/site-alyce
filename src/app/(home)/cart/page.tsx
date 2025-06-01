import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import CartItem from "@/components/cart/CartItem";
import { getCart } from "@/actions/cart.actions";

export default async function CartPage() {
  const cartData = await getCart();

  const subtotal = cartData?.cartItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const shippingEstimate = 7.0;
  const total = subtotal +shippingEstimate ;

  return (
    <div className="bg-neutral-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-primary-dark font-serif">
            Your Perfume Collection
          </h1>
          <Link
            href="/products"
            className="text-accent hover:text-accent-dark flex items-center gap-2 transition-colors group"
          >
            Continue Shopping
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {!cartData || cartData.cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-soft p-12 text-center border border-secondary-light max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 mx-auto text-neutral mb-4" />
            <h2 className="text-2xl font-bold text-primary-dark font-serif mb-2">
              Your cart is empty
            </h2>
            <p className="text-neutral-dark mb-6">
              Discover our exquisite perfume collection
            </p>
            <Link href="/products">
              <button className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg shadow-sm hover:shadow-hover transition-all">
                Explore Perfumes
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-soft p-6 border border-secondary-light">
                <h2 className="text-xl font-serif font-medium text-primary-dark mb-6">
                  Selected Items ({cartData.cartItems.length})
                </h2>
                <ul className="divide-y divide-secondary-light">
                  {cartData.cartItems.map((item) => (
                    <CartItem
                      key={item._id}
                      item={{
                        id: item.productId,
                        cartItemId: item._id,
                        name: item.name,
                        price: item.price,
                        imageUrl: item.imageURL,
                        quantity: item.quantity,
                        maxQuantity: item.stockQuantity,
                      }}
                    />
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-soft p-6 border border-secondary-light h-fit sticky top-4">
              <h2 className="text-xl font-serif font-medium text-primary-dark mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-dark">Subtotal</span>
                  <span className="text-primary-dark font-medium">
                    {subtotal.toFixed(2)} TND
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-dark">Shipping</span>
                  <span className="text-primary-dark font-medium">
                    {shippingEstimate.toFixed(2)} TND
                  </span>
                </div>

                <div className="border-t border-secondary-light pt-3 flex justify-between text-lg font-bold">
                  <span className="text-primary-dark">Total</span>
                  <span className="text-primary-dark">
                    {total.toFixed(2)} TND
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <button className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-lg shadow-sm hover:shadow-hover transition-all">
                  Proceed to Checkout
                </button>
              </Link>

              <p className="text-sm text-neutral text-center mt-4">
                or{" "}
                <Link
                  href="/products"
                  className="text-accent hover:text-accent-dark font-medium"
                >
                  continue shopping
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
