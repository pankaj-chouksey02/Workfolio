/**
 * Environment Variables Configuration and Validation
 */

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Database
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/workfolio',
  
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET || 'workfolio_preset',
  
  // Auth
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'development-secret-key-1234567890',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
};

export function validateEnv() {
  const missing: string[] = [];
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.MONGODB_URI) missing.push('MONGODB_URI');
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) missing.push('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
    if (!process.env.CLOUDINARY_API_KEY) missing.push('CLOUDINARY_API_KEY');
    if (!process.env.CLOUDINARY_API_SECRET) missing.push('CLOUDINARY_API_SECRET');
  }

  if (missing.length > 0) {
    console.warn(`[Warning] Missing production environment variables: ${missing.join(', ')}`);
  }
}
