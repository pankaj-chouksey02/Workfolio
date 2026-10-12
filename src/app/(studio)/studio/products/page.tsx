'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ProductsView from '../../../../features/products/components/ProductsView';

export default function StudioProductsPage() {
  const router = useRouter();

  return <ProductsView onNavigate={(path) => router.push(path)} />;
}
