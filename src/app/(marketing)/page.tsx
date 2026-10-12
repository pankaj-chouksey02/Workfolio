'use client';

import { useRouter } from 'next/navigation';
import LandingScreen from '../../screens/LandingScreen';

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    const routeMap: Record<string, string> = {
      home: '/',
      'studio-overview': '/studio',
      artworks: '/studio/artworks',
      'portfolio-customizer': '/studio/customize',
      collections: '/studio/collections',
      products: '/studio/products',
    };

    const destination = routeMap[path] ?? `/${path}`;
    router.push(destination);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <LandingScreen onNavigate={handleNavigate} />;
}
