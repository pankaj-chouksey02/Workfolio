'use client';

import React, { useState, useRef } from 'react';
import { Button } from '../ui/Button';

interface ImageUploadProps {
  onUploadSuccess?: (url: string, publicId: string) => void;
  folder?: string;
  className?: string;
}

export function ImageUpload({
  onUploadSuccess,
  folder = 'workfolio/artworks',
  className = '',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    // Show local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload/cloudinary', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.media) {
        onUploadSuccess?.(data.media.secure_url, data.media.public_id);
      }
    } catch (err) {
      console.error('Failed to upload file to Cloudinary:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={`border-2 border-dashed transition-colors p-8 text-center flex flex-col items-center justify-center cursor-pointer ${
        dragActive ? 'border-[#C25E3E] bg-[#FAF8F5]' : 'border-[#E7E4DF] bg-white hover:border-[#141413]'
      } ${className}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.tiff,.raw"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {preview ? (
        <div className="relative w-full max-w-xs aspect-square mb-4 overflow-hidden border border-[#E7E4DF]">
          <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
          {isUploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-mono text-xs">
              Optimizing Cloudinary Ingestion...
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E7E4DF] flex items-center justify-center mx-auto text-[#141413]">
            <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
          </div>
          <div>
            <p className="font-serif text-lg text-[#141413]">Upload Master Artwork Image</p>
            <p className="font-mono text-xs text-[#716E68]">TIFF, RAW, or high-dpi JPEG up to 50MB</p>
          </div>
          <Button variant="outline" size="sm" type="button">
            Browse Archival Files
          </Button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
