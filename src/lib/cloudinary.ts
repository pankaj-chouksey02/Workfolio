/**
 * Cloudinary Media Helper & Client Configuration
 * Supports image transformations, responsive URLs, and signed uploads
 */

import { env } from './env';

export interface CloudinaryUploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * Generates an optimized Cloudinary URL with responsive transformations
 */
export function getOptimizedImageUrl(
  publicIdOrUrl: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'thumb' | 'scale';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'avif' | 'jpg';
  } = {}
): string {
  if (!publicIdOrUrl) return '';

  // If already a full non-cloudinary URL (e.g., Unsplash), return as is
  if (publicIdOrUrl.startsWith('http') && !publicIdOrUrl.includes('cloudinary.com')) {
    return publicIdOrUrl;
  }

  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    return publicIdOrUrl;
  }

  const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop && (width || height)) transforms.push(`c_${crop}`);

  const transformString = transforms.join(',');

  // If already a Cloudinary URL, inject transformations
  if (publicIdOrUrl.includes('res.cloudinary.com')) {
    return publicIdOrUrl.replace('/upload/', `/upload/${transformString}/`);
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicIdOrUrl}`;
}

/**
 * Helper to upload a file directly to Cloudinary via client unsigned or signed endpoint
 */
export async function uploadToCloudinary(
  file: File | Blob,
  folder: string = 'artworks'
): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', env.CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
  }

  const data = await res.json();
  return {
    publicId: data.public_id,
    url: data.url,
    secureUrl: data.secure_url,
    width: data.width,
    height: data.height,
    format: data.format,
    bytes: data.bytes,
  };
}
