'use client';

import Button, { type ButtonProps } from '@/components/ui/Button';
import { papaHero } from '@/lib/papa-event';
import { usePapaInventory } from '@/hooks/usePapaInventory';

type PapaOrderCtaProps = Omit<ButtonProps, 'href' | 'disabled' | 'children'> & {
  children?: string;
  soldOutLabel?: string;
};

export default function PapaOrderCta({
  children,
  soldOutLabel = 'Edición agotada',
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
    <Button href="#ordenar" {...buttonProps}>
      {children ?? papaHero.cta}
    </Button>
  );
}
