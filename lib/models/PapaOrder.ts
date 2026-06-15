import mongoose, { Schema, Document } from 'mongoose';

export interface IPapaOrder extends Document {
  stripeSessionId: string;
  eventId: string;
  bundleId: string;
  bundleTitle: string;
  apronCount: number;
  amountTotal: number;
  currency: string;
  customerEmail: string;
  customerName?: string;
  customFields: Record<string, string>;
  paymentLinkId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PapaOrderSchema = new Schema<IPapaOrder>(
  {
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    eventId: {
      type: String,
      required: true,
      index: true,
    },
    bundleId: {
      type: String,
      required: true,
    },
    bundleTitle: {
      type: String,
      required: true,
    },
    apronCount: {
      type: Number,
      required: true,
    },
    amountTotal: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: 'usd',
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
    },
    customFields: {
      type: Schema.Types.Mixed,
      default: {},
    },
    paymentLinkId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PapaOrder ||
  mongoose.model<IPapaOrder>('PapaOrder', PapaOrderSchema);
