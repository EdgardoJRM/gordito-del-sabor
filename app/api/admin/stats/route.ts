import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import Lead from '@/lib/models/Lead';
import Order from '@/lib/models/Order';
import Favorite from '@/lib/models/Favorite';
import { recipes } from '@/lib/recipes-data';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Verificar que es admin
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Verificar que es admin
    const user = await User.findOne({ email: session.user.email });
    if (!user || (user.role !== 'admin' && user.email !== 'admin@gordito.com')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Obtener estadísticas
    const [totalUsers, totalLeads, leadsBySource, totalOrders, totalRevenue, favoritesCounts] = await Promise.all([
      // Total usuarios
      User.countDocuments(),

      // Total leads
      Lead.countDocuments(),

      // Leads por fuente
      Lead.aggregate([
        {
          $group: {
            _id: '$source',
            count: { $sum: 1 },
          },
        },
      ]),

      // Total órdenes completadas
      Order.countDocuments({ status: 'completed' }),

      // Ingresos totales
      Order.aggregate([
        { $match: { status: 'completed' } },
        {
          $group: {
            _id: null,
            total: { $sum: '$price' },
          },
        },
      ]),

      // Contar favoritos por receta
      Favorite.aggregate([
        {
          $group: {
            _id: '$recipeId',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 3 },
      ]),
    ]);

    // Procesar leads por fuente
    const leadsBreakdown = {
      ebook: 0,
      contact: 0,
      newsletter: 0,
    };

    leadsBySource.forEach((item: any) => {
      leadsBreakdown[item._id as keyof typeof leadsBreakdown] = item.count;
    });

    // Procesar recetas favoritas
    const topRecipes = favoritesCounts.map((item: any) => {
      const recipe = recipes.find((r) => r.id === item._id);
      return {
        id: item._id,
        title: recipe?.title || 'Receta desconocida',
        favorites: item.count,
      };
    });

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    return NextResponse.json({
      totalUsers,
      totalLeads,
      leadsBySource: leadsBreakdown,
      totalOrders,
      totalRevenue: revenue,
      topRecipes,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
