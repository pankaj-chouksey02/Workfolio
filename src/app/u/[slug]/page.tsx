'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import CreatorPortfolio from '../../../features/portfolio/components/CreatorPortfolio';

export default function CreatorProfilePage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'elenavance';
  const name = slug === 'elenavance' ? 'Elena Vance' : slug.replace('-', ' ');

  return <CreatorPortfolio slug={slug} creatorName={name} />;
}
