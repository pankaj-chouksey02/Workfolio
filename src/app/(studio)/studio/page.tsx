'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import StudioOverview from '../../../features/dashboard/components/StudioOverview';

export default function StudioDashboardPage() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    const routeMap: Record<string, string> = {
      home: '/',
      'studio-overview': '/studio',
      artworks: '/studio/artworks',
      'portfolio-customizer': '/studio/customize',
      collections: '/studio/collections',
      products: '/studio/products',
    };

    const destination = routeMap[path] ?? `/studio/${path}`;
    router.push(destination);
  };

  return <StudioOverview onNavigate={handleNavigate} />;
}
