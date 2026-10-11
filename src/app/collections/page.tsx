'use client';

import { useRouter } from 'next/navigation';
import CollectionsScreen from '../../screens/CollectionsScreen';

export default function CollectionsPage() {
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

  return <CollectionsScreen onNavigate={handleNavigate} />;
}
