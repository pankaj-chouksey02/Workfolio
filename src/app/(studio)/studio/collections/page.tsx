'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CollectionsView from '../../../../features/collections/components/CollectionsView';

export default function StudioCollectionsPage() {
  const router = useRouter();

  return <CollectionsView onNavigate={(path) => router.push(path)} />;
}
