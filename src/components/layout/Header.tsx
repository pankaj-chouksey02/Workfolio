'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const PRIMARY_NAV = [
  { label: 'Explore Creators', href: '/discover' },
  { label: 'Disciplines', href: '/disciplines' },
  { label: 'Commissions', href: '/commissions' },
  { label: 'About', href: '/about' },
];

export default function Header({ currentPath }: HeaderProps) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : null;

  const isActive = (href: string) =>
    href === '/'
      ? currentPath === 'home'
      : pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E4DF]">
      <div className="h-20 w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <span className="font-serif text-xl tracking-wider uppercase text-[#141413] group-hover:text-[#C25E3E] transition-colors">ATELIER</span>
          </Link>
          <span className="hidden lg:inline-block font-mono text-[10px] uppercase text-[#716E68] tracking-widest pl-2 border-l border-[#E7E4DF]">
            Monograph & Provenance
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer ${isActive(item.href) ? 'text-[#141413] font-semibold' : 'text-[#56423d] hover:text-[#141413]'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="/studio"
            className="hidden sm:inline-block font-sans text-xs uppercase tracking-wider text-[#56423d] hover:text-[#141413] transition-colors px-2 py-1 cursor-pointer"
          >
            Sign In
          </Link>
          <Link 
            href="/studio"
            className="inline-flex items-center justify-center font-sans text-xs uppercase tracking-wider bg-[#141413] text-white hover:bg-[#C25E3E] transition-colors px-5 py-2.5 shadow-sm cursor-pointer"
          >
            Start Your Atelier
          </Link>
          <Link 
            href="/u/elenavance"
            className="w-8 h-8 rounded-full bg-[#9a4023] flex items-center justify-center text-white cursor-pointer shadow-sm hover:opacity-90" 
            title="Elena Vance Studio"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
