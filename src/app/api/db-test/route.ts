import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';

export async function GET() {
    try {
        await connectToDatabase();
        return NextResponse.json({ status: 'ok', message: 'MongoDB connected successfully.' });
    } catch (error) {
        console.error('DB connection error:', error);
        return NextResponse.json(
            { status: 'error', message: 'Failed to connect to MongoDB.' },
            { status: 500 }
        );
    }
}
