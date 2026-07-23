'use client';

import Button, { type ButtonProps } from '@/components/ui/Button';
import { papaHero } from '@/lib/papa-event';
import { usePapaInventory } from '@/hooks/usePapaInventory';

type PapaOrderCtaProps = Omit<ButtonProps, 'disabled' | 'children'> & {
  children?: string;
  soldOutLabel?: string;
};

export default function PapaOrderCta({
  children,
  soldOutLabel = 'Edición agotada',
  href = '#ordenar',
  ...buttonProps
}: PapaOrderCtaProps) {
  const { inventory, loading } = usePapaInventory();

  if (!loading && inventory.soldOut) {
    return (
      <Button {...buttonProps} disabled className={`${buttonProps.className ?? ''} opacity-70`}>
        {soldOutLabel}
      </Button>
    );
  }

  return (
    <Button href={href} {...buttonProps}>
      {children ?? papaHero.cta}
    </Button>
  );
}
