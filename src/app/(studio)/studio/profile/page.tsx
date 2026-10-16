'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ProfileScreen from '@/screens/ProfileScreen';

export default function StudioProfilePage() {
  const router = useRouter();

  return (
    <ProfileScreen
      onNavigate={(path: string) => {
        const routeMap: Record<string, string> = {
          home: '/',
          'studio-overview': '/studio',
          artworks: '/studio/artworks',
          'portfolio-customizer': '/studio/customize',
          collections: '/studio/collections',
          products: '/studio/products',
          profile: '/studio/profile',
        };

        router.push(routeMap[path] ?? `/studio/${path}`);
      }}
    />
  );
}
