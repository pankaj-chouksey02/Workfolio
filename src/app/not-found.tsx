'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <span className="font-mono text-xs text-[#C25E3E] uppercase tracking-widest mb-2">Archival Error 404</span>
      <h1 className="font-serif text-4xl sm:text-5xl text-[#141413] mb-4">Object or Monograph Not Found</h1>
      <p className="font-sans text-sm text-[#716E68] max-w-md mb-8">
        The accession record or sovereign URL you requested does not exist in the permanent registry.
      </p>
      <Link
        href="/"
        className="bg-[#141413] text-white font-sans text-xs uppercase tracking-wider px-6 py-3 hover:bg-[#C25E3E] transition-colors"
      >
        Return to Atelier Index
      </Link>
    </div>
  );
}
