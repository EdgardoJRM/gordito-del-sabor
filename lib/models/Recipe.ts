import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  category: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  image?: string;
  isPremium?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RecipeSchema = new Schema<IRecipe>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    ingredients: [{ type: String }],
    instructions: [{ type: String }],
    image: { type: String },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema);
