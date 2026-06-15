import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { releasePapaAprons } from '@/lib/papa-inventory';
import { handlePapaCheckoutCompleted } from '@/lib/papa-order-handler';

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET no configurado');
    return NextResponse.json({ error: 'Webhook no configurado' }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Firma ausente' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error('Webhook signature error:', error);
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.expired') {
      await handleExpiredSession(event.data.object as Stripe.Checkout.Session);
    }

    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      await handlePapaCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    }
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Error procesando evento' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleExpiredSession(session: Stripe.Checkout.Session) {
  if (session.metadata?.checkoutType !== 'papa-event') return;

  const apronCount = Number(session.metadata.apronCount ?? 0);
  if (apronCount > 0) {
    await releasePapaAprons(apronCount);
  }
}
