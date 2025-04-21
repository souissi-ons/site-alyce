// components/ProductImages.tsx
"use client";

export default function ProductImages({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-96 h-96 bg-primaryLight rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
