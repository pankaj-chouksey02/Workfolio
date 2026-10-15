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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      status: 'degraded',
      error: message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
