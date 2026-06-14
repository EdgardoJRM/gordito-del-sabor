import dbConnect from '@/lib/mongodb';
import EventInventory from '@/lib/models/EventInventory';
import { PAPA_EVENT_ID, papaEvent } from '@/lib/papa-event';

export type InventorySnapshot = {
  total: number;
  sold: number;
  remaining: number;
};

export async function getPapaInventory(): Promise<InventorySnapshot> {
  await dbConnect();

  let doc = await EventInventory.findOne({ eventId: PAPA_EVENT_ID });
  if (!doc) {
    doc = await EventInventory.create({
      eventId: PAPA_EVENT_ID,
      totalUnits: papaEvent.totalAprons,
      soldUnits: 0,
    });
  }

  const remaining = Math.max(0, doc.totalUnits - doc.soldUnits);
  return {
    total: doc.totalUnits,
    sold: doc.soldUnits,
    remaining,
  };
}

export async function reservePapaAprons(apronCount: number): Promise<InventorySnapshot | null> {
  await dbConnect();

  const doc = await EventInventory.findOneAndUpdate(
    {
      eventId: PAPA_EVENT_ID,
      $expr: {
        $gte: [{ $subtract: ['$totalUnits', '$soldUnits'] }, apronCount],
      },
    },
    { $inc: { soldUnits: apronCount } },
    { new: true }
  );

  if (!doc) return null;

  return {
    total: doc.totalUnits,
    sold: doc.soldUnits,
    remaining: Math.max(0, doc.totalUnits - doc.soldUnits),
  };
}

export async function releasePapaAprons(apronCount: number): Promise<void> {
  await dbConnect();
  await EventInventory.findOneAndUpdate(
    { eventId: PAPA_EVENT_ID },
    { $inc: { soldUnits: -apronCount } }
  );
}
