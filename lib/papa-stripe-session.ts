import type Stripe from 'stripe';
import {
  getPapaStripePaymentLink,
  papaBundles,
  papaNonPersonalizedPromo,
  type PapaBundleId,
} from '@/lib/papa-event';

const bundleIds = Object.keys(papaBundles) as PapaBundleId[];
const nonPersonalizedPriceCents = Math.round(papaNonPersonalizedPromo.price * 100);

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

/** IDs de Payment Links live — deben coincidir con la cuenta de Stripe. */
const stripePaymentLinkBundleById: Partial<Record<string, PapaBundleId>> = {
  plink_1TicqVPV9eedAMsC7p9Apd5l: 'premium',
  plink_1Tict8PV9eedAMsCPng7vqhz: 'vip',
  plink_1TictWPV9eedAMsCgp88eSoH: 'legado',
};

function resolveBundleFromPaymentLinkId(session: Stripe.Checkout.Session): PapaBundleId | null {
  const id =
    typeof session.payment_link === 'string' ? session.payment_link : session.payment_link?.id;
  if (!id) return null;
  return stripePaymentLinkBundleById[id] ?? null;
}

function sessionPriceCents(session: Stripe.Checkout.Session): number | null {
  return session.amount_subtotal ?? session.amount_total ?? null;
}

function resolveBundleFromAmount(amountCents: number | null): PapaBundleId | null {
  if (amountCents == null) return null;

  const match = bundleIds.find((id) => Math.round(papaBundles[id].price * 100) === amountCents);
  return match ?? null;
}

function resolveBundleFromLineItems(session: Stripe.Checkout.Session): PapaBundleId | null {
  const items = session.line_items?.data ?? [];
  if (items.length === 0) return null;

  const unitAmount = items[0]?.price?.unit_amount ?? items[0]?.amount_subtotal ?? null;
  return resolveBundleFromAmount(unitAmount);
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

function resolveBaseBundleFromSession(session: Stripe.Checkout.Session): PapaBundleId | null {
  const metadataBundle = session.metadata?.bundleId;
  if (metadataBundle && isPapaBundleId(metadataBundle)) {
    return metadataBundle;
  }

  const fromPaymentLinkId = resolveBundleFromPaymentLinkId(session);
  if (fromPaymentLinkId) return fromPaymentLinkId;

  const fromLink = resolveBundleFromPaymentLinks(session);
  if (fromLink) return fromLink;

  const fromLineItems = resolveBundleFromLineItems(session);
  if (fromLineItems) return fromLineItems;

  return resolveBundleFromAmount(sessionPriceCents(session));
}

/** Pedido Personalizado con cupón 35SPECIAL → sin bordado (bundle interno `clasico`). */
export function sessionUsesNonPersonalizedPromo(session: Stripe.Checkout.Session): boolean {
  const base = resolveBaseBundleFromSession(session);
  if (base !== 'premium') return false;

  const paidCents = session.amount_total;
  if (paidCents != null && paidCents === nonPersonalizedPriceCents) {
    return true;
  }

  const discountCents = session.total_details?.amount_discount ?? 0;
  if (discountCents > 0 && paidCents === nonPersonalizedPriceCents) {
    return true;
  }

  return false;
}

export function resolvePapaBundleFromSession(
  session: Stripe.Checkout.Session
): PapaBundleId | null {
  const base = resolveBaseBundleFromSession(session);
  if (!base) return null;

  if (sessionUsesNonPersonalizedPromo(session)) {
    return 'clasico';
  }

  return base;
}

export function isPapaCheckoutSession(session: Stripe.Checkout.Session): boolean {
  if (session.metadata?.checkoutType === 'papa-event') return true;
  if (session.metadata?.eventId === 'el-sabor-de-papa-2026') return true;
  // Solo usamos Payment Links para Delantal El Gordito.
  if (session.payment_link) return true;
  return resolvePapaBundleFromSession(session) != null;
}
