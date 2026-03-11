import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import Favorite from '@/lib/models/Favorite';
import { recipes } from '@/lib/recipes-data';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Verificar que es admin
    const user = await User.findOne({ email: session.user.email });
    if (!user || (user.role !== 'admin' && user.email !== 'admin@gordito.com')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Obtener favoritos por receta
    const favoritesCounts = await Favorite.aggregate([
      {
        $group: {
          _id: '$recipeId',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Mapear a recetas con favoritos
    const recipesWithFavorites = recipes.map((recipe) => {
      const favoriteData = favoritesCounts.find((f: any) => f._id === recipe.id);
      return {
        id: recipe.id,
        title: recipe.title,
        category: recipe.category,
        description: recipe.description,
        image: recipe.image,
        favorites: favoriteData?.count || 0,
      };
    });

    // Ordenar por favoritos descendente
    recipesWithFavorites.sort((a, b) => b.favorites - a.favorites);

    return NextResponse.json({ recipes: recipesWithFavorites });
  } catch (error) {
    console.error('Error fetching recipes with favorites:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
