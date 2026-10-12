'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PortfolioCustomizer from '@/features/customization';

export default function StudioCustomizePage() {
  const router = useRouter();

  return <PortfolioCustomizer onNavigate={(path: string) => router.push(path)} />;
}
