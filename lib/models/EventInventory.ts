import mongoose, { Schema, Document } from 'mongoose';

export interface IEventInventory extends Document {
  eventId: string;
  totalUnits: number;
  soldUnits: number;
  updatedAt: Date;
  createdAt: Date;
}

const EventInventorySchema = new Schema<IEventInventory>(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
    },
    totalUnits: {
      type: Number,
      required: true,
    },
    soldUnits: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.EventInventory ||
  mongoose.model<IEventInventory>('EventInventory', EventInventorySchema);
