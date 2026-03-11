import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import Recipe from '@/lib/models/Recipe';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user || (user.role !== 'admin' && user.email !== 'admin@gordito.com')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id, title, category, description, ingredients, instructions, image, isPremium } = await req.json();

    if (!title || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newRecipe = await Recipe.create({
      title,
      category,
      description,
      ingredients,
      instructions,
      image,
      isPremium: isPremium || false,
    });

    return NextResponse.json({ recipe: newRecipe });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user || (user.role !== 'admin' && user.email !== 'admin@gordito.com')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id, title, category, description, ingredients, instructions, image, isPremium } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Recipe ID required' }, { status: 400 });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, category, description, ingredients, instructions, image, isPremium },
      { new: true }
    );

    if (!updatedRecipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json({ recipe: updatedRecipe });
  } catch (error) {
    console.error('Error updating recipe:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user || (user.role !== 'admin' && user.email !== 'admin@gordito.com')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Recipe ID required' }, { status: 400 });
    }

    await Recipe.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
