'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import StudioHeader from './StudioHeader';
import StudioSidebar from './StudioSidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
        <StudioSidebar />
        <StudioHeader />
        <main className="pl-72 pt-16 flex-1 flex flex-col">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
