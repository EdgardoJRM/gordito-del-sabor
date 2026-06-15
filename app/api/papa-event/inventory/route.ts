import { NextResponse } from 'next/server';
import { buildPapaInventoryResponse, getPapaInventory } from '@/lib/papa-inventory';

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
