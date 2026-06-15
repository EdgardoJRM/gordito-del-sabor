import { NextRequest, NextResponse } from 'next/server';
import { isValidDelantalPreviewToken } from '@/lib/delantal-countdown';
import {
  buildPapaInventoryResponse,
  getPapaInventory,
  setPapaInventoryRemaining,
} from '@/lib/papa-inventory';

export async function GET() {
  try {
    const inventory = buildPapaInventoryResponse(await getPapaInventory());
    return NextResponse.json(inventory);
  } catch (error) {
    console.error('Inventory error:', error);
    return NextResponse.json(
      { error: 'No se pudo cargar el inventario.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const secret =
    request.nextUrl.searchParams.get('secret') ??
    request.headers.get('x-delantal-secret');

  const inventoryResetSecret = process.env.PAPA_INVENTORY_RESET_SECRET?.trim();
  const authorized =
    isValidDelantalPreviewToken(secret) ||
    (inventoryResetSecret && secret === inventoryResetSecret);

  if (!authorized) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  let remaining = 99;
  try {
    const body = await request.json().catch(() => ({}));
    if (typeof body.remaining === 'number') remaining = body.remaining;
  } catch {
    // default 99
  }

  try {
    const snapshot = buildPapaInventoryResponse(await setPapaInventoryRemaining(remaining));
    return NextResponse.json(snapshot);
  } catch (error) {
    console.error('Inventory reset error:', error);
    return NextResponse.json(
      { error: 'No se pudo actualizar el inventario.' },
      { status: 500 }
    );
  }
}
