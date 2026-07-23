'use client';

import { useState } from 'react';
import Image from 'next/image';
import { papaProductGallery } from '@/lib/papa-event';

type PapaProductGalleryProps = {
  theme?: 'light' | 'dark';
};

export default function PapaProductGallery({ theme = 'light' }: PapaProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = papaProductGallery[activeIndex];
  const isLight = theme === 'light';

  return (
    <div className="w-full">
      <div
        className={`relative aspect-square media-frame ${
          isLight ? 'bg-warm' : 'bg-[#2A221E]'
        }`}
      >
        <Image
          key={active.id}
          src={active.src}
          alt={active.alt}
          fill
          priority={activeIndex === 0}
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {papaProductGallery.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={item.caption}
            aria-current={index === activeIndex}
            className={`relative h-16 w-16 shrink-0 rounded-md overflow-hidden border transition-all ${
              index === activeIndex
                ? 'border-warm-dark'
                : isLight
                  ? 'border-transparent opacity-70 hover:opacity-100'
                  : 'border-white/20 opacity-75 hover:opacity-100'
            }`}
          >
            <Image src={item.src} alt="" fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}
