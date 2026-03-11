import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { name, email, phone, source, message } = body as {
      name?: string;
      email: string;
      phone?: string;
      source: 'ebook' | 'contact' | 'newsletter';
      message?: string;
    };

    if (!email || !source) {
      return NextResponse.json({ error: 'Email and source are required' }, { status: 400 });
    }

    await Lead.create({
      name,
      email,
      phone,
      source,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

