export default function Newsletter() {
  return (
    <section className="py-16 bg-secondary-light">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-soft text-center">
          <h2 className="text-3xl font-serif font-bold mb-4 text-primary-dark">
            Join Our Fragrance Journey
          </h2>
          <p className="mb-8 text-neutral-dark max-w-2xl mx-auto">
            Subscribe to receive exclusive offers, new scent launches, and
            perfume care tips. Plus, enjoy 15% off your first order.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-5 py-3 rounded-full border border-primary-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-neutral-dark"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-full font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
