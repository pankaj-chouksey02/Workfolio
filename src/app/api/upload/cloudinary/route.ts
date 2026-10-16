import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'workfolio/artworks';

    if (!file) {
      return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
    }

    const uploadResult = await uploadToCloudinary(file, folder);

    return NextResponse.json({
      success: true,
      media: uploadResult,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Media ingestion failed';
    return NextResponse.json({
      success: false,
      error: message,
    }, { status: 500 });
  }
}
