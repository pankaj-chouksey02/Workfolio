'use client';

import React from 'react';
import CollectionsScreen from '../../../screens/CollectionsScreen';

export function CollectionsView({ onNavigate }: { onNavigate?: (path: string) => void }) {
  return <CollectionsScreen onNavigate={onNavigate || (() => {})} />;
}

export default CollectionsView;
