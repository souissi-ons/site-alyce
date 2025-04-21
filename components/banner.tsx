// components/Banner.tsx

import Image from "next/image";

export default function Banner({ title }: { title: string }) {
  return (
    <section className="relative w-full h-[400px] flex items-center">
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
          <h1 className="lg:text-8xl text-5xl text-primaryDark">{title}</h1>
        </div>
      </div>
    </section>
  );
}
