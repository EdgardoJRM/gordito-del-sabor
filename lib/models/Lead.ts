import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name?: string;
  email: string;
  phone?: string;
  source: 'ebook' | 'contact' | 'newsletter' | 'sponsor' | 'delantal-reminder';
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
    phone: {
      type: String,
    },
    source: {
      type: String,
      enum: ['ebook', 'contact', 'newsletter', 'sponsor', 'delantal-reminder'],
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

