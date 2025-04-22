import Banner from "@/components/banner";
import CartItemsList from "./components/CartItemsList";
import OrderSummary from "./components/OrderSummary";
import { ShoppingCart } from "@/types";
import { getShoppingCart } from "@/actions/shoppingCart.actions";

const CartPage = async () => {
  const cart: ShoppingCart = await getShoppingCart();
  console.log("Cart data:", cart);

  if (!cart) {
    return <div className="text-center py-10">Votre panier est vide</div>;
  }

  return (
    <div className="items-center h-full">
      <Banner title="Panier" />
      <div className="p-6 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Main Cart Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <CartItemsList items={cart.cartItems} />
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <OrderSummary
                subtotal={cart.totalPrice}
                tax={cart.totalPrice * 0.12}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
