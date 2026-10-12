'use client';

import { useState } from 'react';

export function useCloudinary() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File, folder = 'workfolio/artworks') => {
    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload/cloudinary', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Cloudinary upload failed');
      }
      return data.media;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading, error };
}

export default useCloudinary;
