'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ArtworksView from '../../../../features/artworks/components/ArtworksView';

export default function StudioArtworksPage() {
  const router = useRouter();

  return <ArtworksView onNavigate={(path) => router.push(path)} />;
}
