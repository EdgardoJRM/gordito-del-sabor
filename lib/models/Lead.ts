import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name?: string;
  email: string;
  source: 'ebook' | 'contact' | 'newsletter';
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    source: {
      type: String,
      enum: ['ebook', 'contact', 'newsletter'],
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

