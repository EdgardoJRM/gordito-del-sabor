import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Simulamos una base de datos de órdenes en memoria
export const orders: Record<string, any> = {};

export async function POST(request: NextRequest) {
  try {
    const { items, userEmail, userName } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'El carrito está vacío' },
        { status: 400 }
      );
    }

    // Crear líneas de producto para Stripe
    const lineItems = items.map((item: any) => ({
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

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/carrito`,
      customer_email: userEmail,
      metadata: {
        userName,
        userEmail,
        itemsCount: items.length.toString(),
      },
    });

    // Guardar orden en memoria (en producción sería una BD)
    orders[session.id] = {
      id: session.id,
      items,
      userEmail,
      userName,
      status: 'pending',
      createdAt: new Date(),
    };

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Error al procesar el pago' },
      { status: 500 }
    );
  }
}
