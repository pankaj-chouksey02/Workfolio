import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    const isDbConnected = await connectDB();
    return NextResponse.json({
      status: 'ok',
      service: 'Workfolio Atelier Platform',
      database: isDbConnected ? 'connected' : 'disconnected (mock mode)',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 'degraded',
      error: err.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
