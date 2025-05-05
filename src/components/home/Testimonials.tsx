export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sophia Laurent",
      role: "Perfume Collector",
      content:
        "Alyce's fragrances have transformed my daily routine into a luxurious experience. The longevity is unmatched!",
      rating: 5,
    },
    {
      id: 2,
      name: "James Wilson",
      role: "First-time Buyer",
      content:
        "From the elegant packaging to the exquisite scent, every detail speaks of quality. I'm officially hooked!",
      rating: 5,
    },
    {
      id: 3,
      name: "Isabella Rossi",
      role: "Luxury Blogger",
      content:
        "These scents tell a story - each note unfolds beautifully throughout the day. My audience can't get enough!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-primary-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Loved by Fragrance Enthusiasts
          </h2>
          <p className="text-primary-light">
            Discover why our customers keep coming back to Alyce
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all flex flex-col"
            >
              <div className="flex mb-4 text-accent">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="mb-6 italic text-primary-light flex-1">
                {testimonial.content}
              </p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm opacity-80">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
