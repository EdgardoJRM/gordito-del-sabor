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

export async function handlePapaCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  if (!isPapaCheckoutSession(session)) return;
  if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
    return;
  }

  const bundleId = resolvePapaBundleFromSession(session);
  if (!bundleId) {
    console.warn('Papa webhook: no se pudo identificar el bundle', { sessionId: session.id });
    return;
  }

  const bundle = papaBundles[bundleId];
  const customerEmail =
    session.customer_details?.email?.trim() ||
    session.customer_email?.trim() ||
    session.metadata?.customerEmail?.trim();

  if (!customerEmail) {
    console.warn('Papa webhook: pedido sin email', { sessionId: session.id, bundleId });
    return;
  }

  await dbConnect();

  const existing = await PapaOrder.findOne({ stripeSessionId: session.id });
  if (existing) return;

  let order;
  try {
    order = await PapaOrder.create({
      stripeSessionId: session.id,
      eventId: PAPA_EVENT_ID,
      bundleId,
      bundleTitle: bundle.title,
      apronCount: bundle.apronCount,
      amountTotal: session.amount_total ?? Math.round(bundle.price * 100),
      currency: session.currency ?? 'usd',
      customerEmail,
      customerName: session.customer_details?.name?.trim() || undefined,
      customFields: extractPapaCustomFields(session),
      paymentLinkId:
        typeof session.payment_link === 'string' ? session.payment_link : session.payment_link?.id,
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
      sessionId: session.id,
      bundleId,
      apronCount: bundle.apronCount,
    });
  }

  const snapshot = inventory ?? (await getPapaInventory());

  try {
    await sendPapaOrderEmails(order, snapshot);
  } catch (error) {
    console.error('Papa webhook: error enviando emails', error);
  }

  console.info('Papa event order recorded', {
    sessionId: session.id,
    bundleId,
    remaining: snapshot.remaining,
    email: customerEmail,
  });
}
