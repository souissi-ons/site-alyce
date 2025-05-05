import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary-dark mb-4">
            Our Story
          </h1>
          <p className="text-neutral-dark">
            The journey of Alyce Perfumes began with a passion for creating
            unforgettable scents.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Image
              src="/about-1.jpg"
              alt="Our Founder"
              width={600}
              height={400}
              className="rounded-xl shadow-soft"
            />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">
              The Beginning
            </h2>
            <p className="text-neutral-dark mb-4">
              Founded in 2010 by master perfumer Sophia Laurent, Alyce began as
              a small boutique perfumery in Paris. Sophia&apos;s vision was to
              create fragrances that told stories and evoked emotions.
            </p>
            <p className="text-neutral-dark">
              What started as a passion project quickly grew into a beloved
              brand known for its craftsmanship and attention to detail.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="md:order-2">
            <Image
              src="/about-2.jpg"
              alt="Our Process"
              width={600}
              height={400}
              className="rounded-xl shadow-soft"
            />
          </div>
          <div className="md:order-1">
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">
              Our Craft
            </h2>
            <p className="text-neutral-dark mb-4">
              Each Alyce fragrance is meticulously crafted using the finest
              ingredients sourced from around the world. Our perfumers combine
              traditional techniques with modern innovation to create unique
              scent profiles.
            </p>
            <p className="text-neutral-dark">
              We believe in sustainable and ethical sourcing, ensuring that
              every bottle tells a story of quality and responsibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
