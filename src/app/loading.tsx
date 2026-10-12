import React from 'react';
import LoadingSpinner from '../components/feedback/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner label="Accessing Atelier Archive..." />
    </div>
  );
}
