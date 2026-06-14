'use client';

import Image from 'next/image';
import { useState } from 'react';

export type GalleryImage = { src: string; alt: string };

type ProductGalleryProps = {
  images: GalleryImage[];
};

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  if (!main) {
    return (
      <div className="aspect-[4/5] rounded-2xl border border-dashed border-[#E8E0D8] bg-[#F2EDE6] flex items-center justify-center text-[#6B5B4E]">
        Añade imágenes del producto
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:rounded-3xl border border-[#E8E0D8] bg-[#FAF8F5] shadow-sm">
        <Image
          src={main.src}
          alt={main.alt}
          fill
          className="object-cover"
          sizes="(max-width:1024px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                i === active ? 'ring-2 ring-[#C4472B] border-[#C4472B]' : 'border-[#E8E0D8] hover:border-[#C4472B]/40'
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
