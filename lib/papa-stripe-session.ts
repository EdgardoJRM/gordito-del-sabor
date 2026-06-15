import type Stripe from 'stripe';
import {
  getPapaStripePaymentLink,
  papaBundles,
  type PapaBundleId,
} from '@/lib/papa-event';

const bundleIds = Object.keys(papaBundles) as PapaBundleId[];

function isPapaBundleId(value: string): value is PapaBundleId {
  return bundleIds.includes(value as PapaBundleId);
}

function paymentLinkSlug(url: string): string | null {
  try {
    const pathname = new URL(url).pathname.replace(/^\/+/, '');
    return pathname || null;
  } catch {
    return null;
  }
}

function resolveBundleFromPaymentLinks(session: Stripe.Checkout.Session): PapaBundleId | null {
  const sessionSlug = session.url ? paymentLinkSlug(session.url) : null;

  for (const bundleId of bundleIds) {
    const link = getPapaStripePaymentLink(bundleId);
    if (!link) continue;

    const envSlug = paymentLinkSlug(link);
    if (envSlug && sessionSlug && envSlug === sessionSlug) {
      return bundleId;
    }
  }

  return null;
}

function resolveBundleFromAmount(amountTotal: number | null): PapaBundleId | null {
  if (amountTotal == null) return null;

  const match = bundleIds.find((id) => Math.round(papaBundles[id].price * 100) === amountTotal);
  return match ?? null;
}

export function extractPapaCustomFields(
  session: Stripe.Checkout.Session
): Record<string, string> {
  const fields: Record<string, string> = {};

  for (const field of session.custom_fields ?? []) {
    const label =
      field.label?.custom ??
      field.label?.type ??
      field.key ??
      'Campo';
    const value = field.text?.value ?? field.dropdown?.value ?? field.numeric?.value;

    if (value != null && String(value).trim()) {
      fields[label] = String(value).trim();
    }
  }

  return fields;
}

export function resolvePapaBundleFromSession(
  session: Stripe.Checkout.Session
): PapaBundleId | null {
  const metadataBundle = session.metadata?.bundleId;
  if (metadataBundle && isPapaBundleId(metadataBundle)) {
    return metadataBundle;
  }

  const fromLink = resolveBundleFromPaymentLinks(session);
  if (fromLink) return fromLink;

  return resolveBundleFromAmount(session.amount_total);
}

export function isPapaCheckoutSession(session: Stripe.Checkout.Session): boolean {
  if (session.metadata?.checkoutType === 'papa-event') return true;
  if (session.metadata?.eventId === 'el-sabor-de-papa-2026') return true;
  if (session.payment_link) return resolvePapaBundleFromSession(session) != null;
  return false;
}
