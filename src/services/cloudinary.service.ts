import { uploadToCloudinary, getOptimizedImageUrl, CloudinaryUploadResult } from '../lib/cloudinary';

export class CloudinaryService {
  static async uploadArtwork(file: File): Promise<CloudinaryUploadResult> {
    return uploadToCloudinary(file, 'artworks');
  }

  static async uploadAvatar(file: File): Promise<CloudinaryUploadResult> {
    return uploadToCloudinary(file, 'avatars');
  }

  static getThumbnail(publicId: string): string {
    return getOptimizedImageUrl(publicId, {
      width: 400,
      height: 400,
      crop: 'fill',
    });
  }

  static getHeroImage(publicId: string): string {
    return getOptimizedImageUrl(publicId, {
      width: 1600,
      crop: 'fit',
      quality: 'auto',
    });
  }
}
