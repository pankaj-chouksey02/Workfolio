'use client';

import { usePathname, useRouter } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import StudioSidebar from './StudioSidebar';
import StudioHeader from './StudioHeader';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isStudioRoute = pathname.startsWith('/studio') || pathname.startsWith('/artworks') || pathname.startsWith('/customizer') || pathname.startsWith('/collections') || pathname.startsWith('/products');

  const handleNavigate = (path: string) => {
    const routeMap: Record<string, string> = {
      home: '/',
      'studio-overview': '/studio/overview',
      artworks: '/artworks',
      'portfolio-customizer': '/customizer',
      collections: '/collections',
      products: '/products',
    };

    const destination = routeMap[path] ?? `/${path}`;
    router.push(destination);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B1C1A] font-sans flex flex-col antialiased selection:bg-[#C25E3E] selection:text-white">
      {isStudioRoute ? (
        <>
          <StudioSidebar currentPath={pathname} onNavigate={handleNavigate} />
          <div className="pl-72 flex flex-col min-h-screen">
            <StudioHeader onNavigate={handleNavigate} />
            <main className="relative pt-16 bg-[#FAF8F5] flex-1">{children}</main>
          </div>
        </>
      ) : (
        <>
          <Header currentPath={pathname === '/' ? 'home' : pathname.slice(1)} onNavigate={handleNavigate} />
          <main className="flex-1 w-full">{children}</main>
          <Footer onNavigate={handleNavigate} />
        </>
      )}
    </div>
  );
}
