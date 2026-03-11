import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

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

    // Obtener todos los usuarios
    const users = await User.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
