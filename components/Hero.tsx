import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center">
      <div className="absolute inset-0">
        <Image
          src="/bg-image.png"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
        />
      </div>

      <div className="relative z-10 max-w-[600px] pl-24 text-left">
        <div className="flex flex-col space-y-6">
          <Image
            src="/alyce-logo-2.png"
            alt="ALYCE Logo"
            width={450}
            height={200}
            className="mb-4"
          />

          <p className="text-lg text-gray-700 max-w-lg leading-relaxed">
            Bienvenue chez Alyce, où nous élevons votre expérience des parfums
            et des bougies à un tout autre niveau ! Nos créations délicates et
            raffinées sont conçues pour apporter une touche d'élégance et de
            fraîcheur à votre quotidien.
          </p>
        </div>
      </div>
    </section>
  );
}
