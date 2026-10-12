'use client';

import React from 'react';
import ProductsScreen from '../../../screens/ProductsScreen';

export function ProductsView({ onNavigate }: { onNavigate?: (path: string) => void }) {
  return <ProductsScreen onNavigate={onNavigate || (() => {})} />;
}

export default ProductsView;
