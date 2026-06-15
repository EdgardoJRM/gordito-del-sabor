import type Stripe from 'stripe';
import dbConnect from '@/lib/mongodb';
import PapaOrder from '@/lib/models/PapaOrder';
import { PAPA_EVENT_ID, papaBundles } from '@/lib/papa-event';
import { getPapaInventory, reservePapaAprons } from '@/lib/papa-inventory';
import {
  extractPapaCustomFields,
  isPapaCheckoutSession,
  resolvePapaBundleFromSession,
} from '@/lib/papa-stripe-session';
import { sendPapaOrderEmails } from '@/lib/papa-order-notify';
import { getStripe } from '@/lib/stripe';

async function hydrateCheckoutSession(
  session: Stripe.Checkout.Session
): Promise<Stripe.Checkout.Session> {
  try {
    const stripe = getStripe();
    return stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'custom_fields'],
    });
  } catch (error) {
    console.warn('Papa webhook: no se pudo expandir la sesión', {
      sessionId: session.id,
      error: error instanceof Error ? error.message : error,
    });
    return session;
  }
}

export async function handlePapaCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  if (!isPapaCheckoutSession(session)) return;
  if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
    return;
  }

  const hydrated = await hydrateCheckoutSession(session);
  const bundleId = resolvePapaBundleFromSession(hydrated);
  if (!bundleId) {
    console.warn('Papa webhook: no se pudo identificar el bundle', {
      sessionId: hydrated.id,
      amountTotal: hydrated.amount_total,
      paymentLink: hydrated.payment_link,
    });
    return;
  }

  const bundle = papaBundles[bundleId];
  const customerEmail =
    hydrated.customer_details?.email?.trim() ||
    hydrated.customer_email?.trim() ||
    hydrated.metadata?.customerEmail?.trim();

  if (!customerEmail) {
    console.warn('Papa webhook: pedido sin email', { sessionId: hydrated.id, bundleId });
    return;
  }

  await dbConnect();

  const existing = await PapaOrder.findOne({ stripeSessionId: hydrated.id });
  if (existing) {
    console.info('Papa webhook: pedido duplicado, omitiendo', {
      sessionId: hydrated.id,
      email: existing.customerEmail,
      emailsSentAt: existing.emailsSentAt ?? null,
    });
    return;
  }

  let order;
  try {
    order = await PapaOrder.create({
      stripeSessionId: hydrated.id,
      eventId: PAPA_EVENT_ID,
      bundleId,
      bundleTitle: bundle.title,
      apronCount: bundle.apronCount,
      amountTotal: hydrated.amount_total ?? Math.round(bundle.price * 100),
      currency: hydrated.currency ?? 'usd',
      customerEmail,
      customerName: hydrated.customer_details?.name?.trim() || undefined,
      customFields: extractPapaCustomFields(hydrated),
      paymentLinkId:
        typeof hydrated.payment_link === 'string'
          ? hydrated.payment_link
          : hydrated.payment_link?.id,
    });
  } catch (error) {
    const duplicate =
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as { code?: number }).code === 11000;
    if (duplicate) return;
    throw error;
  }

  const inventory = await reservePapaAprons(bundle.apronCount);
  if (!inventory) {
    console.error('Papa webhook: sin inventario suficiente', {
      sessionId: hydrated.id,
      bundleId,
      apronCount: bundle.apronCount,
    });
  }

  const snapshot = inventory ?? (await getPapaInventory());

  try {
    await sendPapaOrderEmails(order, snapshot);
    order.emailsSentAt = new Date();
    await order.save();
  } catch (error) {
    console.error('Papa webhook: error enviando emails', error);
  }

  console.info('Papa event order recorded', {
    sessionId: hydrated.id,
    bundleId,
    apronCount: bundle.apronCount,
    remaining: snapshot.remaining,
    email: customerEmail,
  });
}
