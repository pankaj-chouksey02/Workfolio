'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PortfolioCustomizerScreen from '@/screens/PortfolioCustomizerScreen';

export default function StudioCustomizePage() {
  const router = useRouter();

  return (
    <PortfolioCustomizerScreen
      onNavigate={(path: string) => {
        const routeMap: Record<string, string> = {
          home: '/',
          'studio-overview': '/studio',
          artworks: '/studio/artworks',
          'portfolio-customizer': '/studio/customize',
          collections: '/studio/collections',
          products: '/studio/products',
        };

        router.push(routeMap[path] ?? `/studio/${path}`);
      }}
    />
  );
}
