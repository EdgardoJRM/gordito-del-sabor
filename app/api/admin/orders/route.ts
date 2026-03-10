import { NextResponse } from 'next/server';
import { orders } from '@/app/api/checkout/route';

export async function GET() {
  try {
    const ordersList = Object.values(orders);
    return NextResponse.json({ orders: ordersList });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error al obtener órdenes' },
      { status: 500 }
    );
  }
}
