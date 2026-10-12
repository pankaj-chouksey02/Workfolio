'use client';

import React from 'react';
import ArtworksScreen from '../../../screens/ArtworksScreen';

export function ArtworksView({ onNavigate }: { onNavigate?: (path: string) => void }) {
  return <ArtworksScreen onNavigate={onNavigate || (() => {})} />;
}

export default ArtworksView;
