'use client';

import { useState, useEffect } from 'react';

export interface ArtworkData {
  id: string;
  title: string;
  series?: string;
  status: string;
  material: string;
  dimensions: string;
  weight?: string;
  valuation: string;
  image: string;
  badge?: string;
}

const mockArtworks: ArtworkData[] = [
  {
    id: 'EV-2024-004',
    title: 'Tectonic Vessel No. 04',
    series: 'Lithic Strata Series',
    status: 'Published',
    material: 'Unglazed Shigaraki Clay',
    dimensions: '48 × 32 × 30 cm',
    weight: '18.4 kg',
    valuation: '$4,200 USD (Inquire Only)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDha1TzoOkLMLpC_Bs7xc7KfYol24S6Ozc4T_tILVTNXWd1gJMy-YCCGDNR81oSa67kPy8pmJeFcltIIXNq695dXm4t_l1MACK4MtgfbNGK8lh7B-Fuv4EdWZgMpa68X92X6c_Bvg5_CwsotT4UuE-POB_NYuijoPFFC-ILSD-hW_c2sWFqfpHMsb5RxFG3ODsN-VI6GDrd8-xM8geSl8ib4XETj5RSMQ62xAOPKzobR0Ms3cacjNzrUA',
    badge: 'Wood-Fired Anagama (72 Hrs)',
  },
  {
    id: 'EV-2023-089',
    title: 'Strata Monolith IX',
    series: 'Lithic Strata Series',
    status: 'Available',
    material: 'Coarse Chamotte & Ash',
    dimensions: '64 × 22 × 18 cm',
    weight: '21.0 kg',
    valuation: '$4,200 USD (Immediate Acquisition)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpcvJIiJqG-61uu2eZzkd-p7joH3nu1pR4OJJIV9YgWhOwLv0T9bJ_qMFiilDALU0uE2Y8-C-rxDm5JGipt7B7qGYcIPO4N7Z0hExdku7JA3S5PVs3yWnBt6mi7Odbpif0cz_LzIuGf4uh5wlfumfy-HCiZbITrze-heFJtDNuh0u-SkCaKN2_Z-rp4Y5eSxNAz9czuVNVEzKMBbIeVzaHpn1exfY1yH_tyVizctSQFJ0yPB9dSyA7w',
    badge: 'Featured Exhibition Pick',
  },
];

export function useArtworks() {
  const [artworks, setArtworks] = useState<ArtworkData[]>(mockArtworks);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addArtwork = (newArt: ArtworkData) => {
    setArtworks((prev) => [newArt, ...prev]);
  };

  const removeArtwork = (id: string) => {
    setArtworks((prev) => prev.filter((a) => a.id !== id));
  };

  return { artworks, isLoading, error, addArtwork, removeArtwork };
}

export default useArtworks;
