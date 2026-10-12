'use client';

import React from 'react';
import StudioOverviewScreen from '../../../screens/StudioOverviewScreen';

export function StudioOverview({ onNavigate }: { onNavigate?: (path: string) => void }) {
  return <StudioOverviewScreen onNavigate={onNavigate || (() => {})} />;
}

export default StudioOverview;
