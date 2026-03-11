import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';

export async function GET() {
  try {
    await dbConnect();

    const leads = await Lead.find({})
      .sort({ createdAt: -1 })
      .limit(500)
      .lean();

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

