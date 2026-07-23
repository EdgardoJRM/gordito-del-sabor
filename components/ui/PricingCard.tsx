import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { Offer } from '@/lib/offers';
import { checkoutHref } from '@/lib/offers';
import { siteConfig } from '@/lib/site-config';

type PricingCardProps = {
  offer: Offer;
  className?: string;
};

function isCheckoutConfigured(key: keyof typeof siteConfig.checkout | null): boolean {
  if (!key) return false;
  const url = siteConfig.checkout[key];
  return Boolean(url && !String(url).startsWith('PEGAR_'));
}

export default function PricingCard({ offer, className = '' }: PricingCardProps) {
  const linkHref = offer.checkoutKey ? checkoutHref(offer.checkoutKey) : '/contacto';
  const needsConfig = Boolean(offer.checkoutKey && !isCheckoutConfigured(offer.checkoutKey));

  return (
    <article
      className={`relative flex flex-col rounded-lg p-8 md:p-10 transition-shadow ${
        offer.recommended
          ? 'bg-gradient-to-b from-[#FFF8F5] to-warm shadow-soft ring-1 ring-accent/15'
          : 'surface-inset'
      } ${className}`}
    >
      {offer.badge && (
        <span className="absolute -top-3 left-6 rounded-pill bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
          {offer.badge}
        </span>
      )}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-warm-dark">{offer.title}</h3>
        {offer.subtitle && (
          <p className="mt-2 text-sm text-earth">{offer.subtitle}</p>
        )}
      </div>
      <div className="mb-8">
        <p className="text-4xl font-bold text-warm-dark">{offer.priceLabel}</p>
        {offer.priceNote && (
          <p className="text-sm text-earth-light mt-1">{offer.priceNote}</p>
        )}
      </div>
      <ul className="mb-10 flex-1 space-y-3">
        {offer.bullets.map((line) => (
          <li key={line} className="flex gap-3 text-earth">
            <Check className="mt-0.5 shrink-0 text-accent" size={20} aria-hidden />
            <span className="body-text text-warm-dark">{line}</span>
          </li>
        ))}
      </ul>
      <Button
        href={linkHref}
        variant={offer.recommended ? 'primary' : 'secondary'}
        className="w-full"
      >
        {offer.ctaLabel}
      </Button>
      {needsConfig && (
        <p className="mt-3 text-center text-xs text-earth-light">
          Configura la URL en <code className="rounded-sm bg-warm-linen px-1">lib/site-config.ts</code>
        </p>
      )}
    </article>
  );
}
