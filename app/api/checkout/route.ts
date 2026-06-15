import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe, getSiteUrl } from '@/lib/stripe';
import {
  getBundle,
  getDeliveryLabel,
  papaBundles,
  validateDeliveryMethod,
  validateEmbroideryNames,
  type PapaBundleId,
  type PapaDeliveryMethod,
} from '@/lib/papa-event';
import { getPapaInventory, reservePapaAprons } from '@/lib/papa-inventory';

type CartLineItem = {
  productId: string;
  productName: string;
  price: number;
  customText: string;
  quantity: number;
};

type PapaCheckoutBody = {
  mode: 'papa-event';
  bundleId: PapaBundleId;
  deliveryMethod: PapaDeliveryMethod;
  embroideryNames: string[];
  customerEmail: string;
};

type LegacyCartBody = {
  items: CartLineItem[];
  userEmail?: string;
  userName?: string;
};

function isPapaBundleId(value: string): value is PapaBundleId {
  return value in papaBundles;
}

function buildPapaLineItem(
  bundleId: PapaBundleId,
  embroideryNames: string[],
  deliveryMethod: PapaDeliveryMethod
): Stripe.Checkout.SessionCreateParams.LineItem {
  const bundle = getBundle(bundleId);
  const embroideryLabel = embroideryNames.map((n) => n.trim()).join(' · ');
  const deliveryLabel = getDeliveryLabel(deliveryMethod);

  return {
    price_data: {
      currency: 'usd',
      product_data: {
        name: `El Sabor de Papá — ${bundle.title}`,
        description: `Bordado: ${embroideryLabel} · Entrega: ${deliveryLabel}`,
        metadata: {
          eventId: 'el-sabor-de-papa-2026',
          bundleId,
          apronCount: String(bundle.apronCount),
          deliveryMethod,
        },
      },
      unit_amount: Math.round(bundle.price * 100),
    },
    quantity: 1,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body?.mode === 'papa-event') {
      return handlePapaCheckout(body as PapaCheckoutBody);
    }

    return handleLegacyCart(body as LegacyCartBody);
  } catch (error) {
    console.error('Checkout error:', error);
    const message = error instanceof Error ? error.message : 'Error al procesar el pago';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function handlePapaCheckout(body: PapaCheckoutBody) {
  const { bundleId, deliveryMethod, embroideryNames, customerEmail } = body;

  if (!bundleId || !isPapaBundleId(bundleId)) {
    return NextResponse.json({ error: 'Bundle inválido.' }, { status: 400 });
  }

  if (!validateDeliveryMethod(deliveryMethod)) {
    return NextResponse.json({ error: 'Selecciona un método de entrega válido.' }, { status: 400 });
  }

  const embroideryError = validateEmbroideryNames(bundleId, embroideryNames ?? []);
  if (embroideryError) {
    return NextResponse.json({ error: embroideryError }, { status: 400 });
  }

  const email = customerEmail?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Ingresa un email válido.' }, { status: 400 });
  }

  const bundle = getBundle(bundleId);
  const inventory = await getPapaInventory();
  if (inventory.remaining < bundle.apronCount) {
    return NextResponse.json(
      { error: 'Lo sentimos — ya no quedan delantales disponibles en esta edición.' },
      { status: 409 }
    );
  }

  const reserved = await reservePapaAprons(bundle.apronCount);
  if (!reserved) {
    return NextResponse.json(
      { error: 'Alguien acaba de tomar las últimas unidades. Intenta de nuevo.' },
      { status: 409 }
    );
  }

  const stripe = getStripe();
  const siteUrl = getSiteUrl();
  const trimmedNames = embroideryNames.map((n) => n.trim());

  try {
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: [buildPapaLineItem(bundleId, trimmedNames, deliveryMethod)],
      success_url: `${siteUrl}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}&event=papa`,
      cancel_url: `${siteUrl}/el-sabor-de-papa?cancelled=1`,
      customer_email: email,
      phone_number_collection: { enabled: true },
      metadata: {
        checkoutType: 'papa-event',
        bundleId,
        deliveryMethod,
        embroideryNames: JSON.stringify(trimmedNames),
        apronCount: String(bundle.apronCount),
        customerEmail: email,
      },
    };

    if (deliveryMethod === 'mail') {
      sessionParams.shipping_address_collection = { allowed_countries: ['US'] };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    await import('@/lib/papa-inventory').then(({ releasePapaAprons }) =>
      releasePapaAprons(bundle.apronCount)
    );
    throw error;
  }
}

async function handleLegacyCart(body: LegacyCartBody) {
  const { items, userEmail, userName } = body;

  if (!items?.length) {
    return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 });
  }

  const stripe = getStripe();
  const siteUrl = getSiteUrl();

  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: `${item.productName} - ${item.customText}`,
        metadata: {
          productId: item.productId,
          customText: item.customText,
        },
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url: `${siteUrl}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/carrito`,
    customer_email: userEmail,
    metadata: {
      checkoutType: 'legacy-cart',
      userName: userName ?? '',
      userEmail: userEmail ?? '',
      itemsCount: String(items.length),
    },
  });

  return NextResponse.json({ url: session.url });
}
