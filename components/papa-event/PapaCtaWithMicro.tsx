'use client';

import PapaOrderCta from '@/components/papa-event/PapaOrderCta';
import { papaCtaMicroDefault } from '@/lib/papa-event';
import type { ComponentProps } from 'react';

type PapaCtaWithMicroProps = ComponentProps<typeof PapaOrderCta> & {
  micro?: string;
  microClassName?: string;
  align?: 'left' | 'center';
  microTone?: 'light' | 'dark' | 'earth';
};

export default function PapaCtaWithMicro({
  micro = papaCtaMicroDefault,
  microClassName = '',
  align = 'center',
  microTone = 'earth',
  ...ctaProps
}: PapaCtaWithMicroProps) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center mx-auto';
  const toneClass =
    microTone === 'light'
      ? 'text-[#E8D4BC]/90'
      : microTone === 'dark'
        ? 'text-[#C4B8AE]'
        : 'text-[#9C8B80]';

  return (
    <div>
      <PapaOrderCta {...ctaProps} />
      <p className={`mt-4 text-base md:text-lg leading-relaxed max-w-xl ${alignClass} ${toneClass} ${microClassName}`}>
        {micro}
      </p>
    </div>
  );
}
