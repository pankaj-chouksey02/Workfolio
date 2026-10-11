'use client';

import { useRouter } from 'next/navigation';
import PortfolioCustomizerScreen from '../../screens/PortfolioCustomizerScreen';

export default function CustomizerPage() {
  const router = useRouter();

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

  return <PortfolioCustomizerScreen onNavigate={handleNavigate} />;
}
