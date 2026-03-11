import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ isAdmin: false, reason: 'No session' });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ isAdmin: false, reason: 'User not found' });
    }

    const isAdmin = user.role === 'admin' || user.email === 'admin@gordito.com';

    return NextResponse.json({
      isAdmin,
      userEmail: user.email,
      userRole: user.role,
      sessionRole: (session.user as any).role,
    });
  } catch (error) {
    console.error('Error checking admin:', error);
    return NextResponse.json({ error: 'Internal error', isAdmin: false }, { status: 500 });
  }
}
