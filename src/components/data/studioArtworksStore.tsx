export interface Artwork {
  id: string;
  title: string;
  discipline: string;
  medium: string;
  dimensions: string;
  weight: string;
  price: string;
  rawPrice: number;
  status: 'Available' | 'Reserved' | 'Sold';
  collection: string;
  image: string;
  notes: string;
}

export interface CatalogItem {
  id: string;
  title: string;
  category: string;
  medium: string;
  dims: string;
  year: string;
  price: number;
  status: 'Available' | 'Reserved' | 'Sold';
  editionInfo?: string;
  img: string;
}

// Default initial studio artworks originally present in the studio dashboard
export const INITIAL_STUDIO_ARTWORKS: Artwork[] = [
  {
    id: 'ART-2024-001',
    title: 'Khurja Glazed Terracotta Urn No. 04',
    discipline: 'Clay & Terracotta',
    medium: 'Unglazed stoneware with wood-ash slip',
    dimensions: '48 × 32 × 30 cm',
    weight: '12.5 kg',
    price: '₹18,500',
    rawPrice: 18500,
    status: 'Available',
    collection: 'Maati: Monsoon Clay & Riverbed Silt',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDha1TzoOkLMLpC_Bs7xc7KfYol24S6Ozc4T_tILVTNXWd1gJMy-YCCGDNR81oSa67kPy8pmJeFcltIIXNq695dXm4t_l1MACK4MtgfbNGK8lh7B-Fuv4EdWZgMpa68X92X6c_Bvg5_CwsotT4UuE-POB_NYuijoPFFC-ILSD-hW_c2sWFqfpHMsb5RxFG3ODsN-VI6GDrd8-xM8geSl8ib4XETj5RSMQ62xAOPKzobR0Ms3cacjNzrUA',
    notes: 'Reduction wood-fired at 1280°C in Khurja kiln for 48 hours.'
  },
  {
    id: 'ART-2024-002',
    title: 'Bastar Lost-Wax Brass Bull',
    discipline: 'Metal & Bronze',
    medium: 'Hand-cast bell metal (Dhokra cire-perdue)',
    dimensions: '34 × 24 × 18 cm',
    weight: '8.4 kg',
    price: '₹28,000',
    rawPrice: 28000,
    status: 'Available',
    collection: 'Dhaatu: Bastar Bell-Metal & Bronze',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpcvJIiJqG-61uu2eZzkd-p7joH3nu1pR4OJJIV9YgWhOwLv0T9bJ_qMFiilDALU0uE2Y8-C-rxDm5JGipt7B7qGYcIPO4N7Z0hExdku7JA3S5PVs3yWnBt6mi7Odbpif0cz_LzIuGf4uh5wlfumfy-HCiZbITrze-heFJtDNuh0u-SkCaKN2_Z-rp4Y5eSxNAz9czuVNVEzKMBbIeVzaHpn1exfY1yH_tyVizctSQFJ0yPB9dSyA7w',
    notes: 'Single casting using lost-wax technique from Kondagaon, Bastar.'
  },
  {
    id: 'ART-2024-003',
    title: 'Kishangarh Lotus Study on Wasli',
    discipline: 'Wash Painting',
    medium: 'Natural stone pigments & 24k gold leaf on handmade wasli paper',
    dimensions: '42 × 30 cm',
    weight: 'Framed in seasoned teak',
    price: '₹45,000',
    rawPrice: 45000,
    status: 'Reserved',
    collection: 'Wasli & Rang: Pigments on Rag Paper',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnqA26Qrl0TAF1fgHaioTZgQ9C1aJV7hCd3WUAinKIfyqTTMF2cRXlbe4MB_XfE9FZODvmTtyfk0MUXSEDX-sQBs3wSQ_Re5Z4gHOVI0jlMJIC0Oa5pkaVQ8p-1qUdsDoWu7HuYo-85b0mCX2exGodIHtSTDio6AbKY03jxMeCimzIPCO43SumkN9_TEFI9FMzmOUc1mfvYRtnKGaI0M_xKlLZSBbnOh2YqXYSYCfZkonV3iFktX3Fpg',
    notes: 'Ground lapis lazuli and malachite with agate stone burnishing.'
  },
  {
    id: 'ART-2024-004',
    title: 'Kumartuli Raw Silt Clay Vessel',
    discipline: 'Clay & Terracotta',
    medium: 'Ganga river alluvial silt, unglazed natural finish',
    dimensions: '38 × 26 cm',
    weight: '9.0 kg',
    price: '₹14,000',
    rawPrice: 14000,
    status: 'Available',
    collection: 'Maati: Monsoon Clay & Riverbed Silt',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgSFBOOSLqsikOA5pn9dq_hAJRnoIEXH51BdJ_-1H6KJI3esGSF21l7pS-79vv4zlWZ2upyJVwIRhcL9VDpKKeMOcUsSYlQnQbhdkSVZt8TqTwxDhGRj3IybiCWW__UcUTj9SxXgkIkbXtUxPXyw1YtBE7ZMa2SXe5ARnAHg1rANHLfmb6J0yO7cq2x-eAYYBn4jkc0ZIxIYJbwptL086TW96wENVq-UselI4fajv9HLjkTlXqxuJm7Q',
    notes: 'Sun-dried and pit-fired with straw and rice husk.'
  },
  {
    id: 'ART-2024-005',
    title: 'Varanasi Mulberry Silk Zari Tapestry',
    discipline: 'Heritage Textiles',
    medium: 'Handspun mulberry silk with real silver zari weft',
    dimensions: '90 × 45 cm',
    weight: 'Mounted on wooden battens',
    price: '₹52,000',
    rawPrice: 52000,
    status: 'Sold',
    collection: 'Vastra: Heritage Looms of Varanasi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtbRtqiIwj_7gW7_R2Dfcv-Ajybri2Wzww23lFMSPT2D2qv36SPptttwuK13Ow8aQHKZFmU7K9YZBb3O0jiLTePLEd6PgePbcxIddAuLMel87nozygj1_RnjYFG0QHx5pSFFrvG1ht-vwmWFjj70S0OHaBCOeBNa_ML0JQxYuL8RmiHJT2lF_Uv6fhFj21Q93VKp_wIMOOJ0wgydcLU3HS6qxwGpfY38XAtv1t6ZcQAk7JY2DBSqkoTg',
    notes: 'Acquired by private collector in Mumbai. Woven on pit loom in Madanpura.'
  },
  {
    id: 'ART-2024-006',
    title: 'Shekhawati Teak & Brass Foyer Bench',
    discipline: 'Woodcraft',
    medium: 'Reclaimed aged teak wood with hand-beaten brass joinery',
    dimensions: '110 × 40 × 45 cm',
    weight: '24.0 kg',
    price: '₹34,000',
    rawPrice: 34000,
    status: 'Available',
    collection: 'Independent Works',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMleKXqqQAXw99rnEONi9Rejyrm8vV1ATgfO6q1GExwKDlJO9lpSz8WN5mzcnRwimlbi7diVuKNMdQmELNpdV3vy1apiD68Qa7W-R_fMTxqiGwZavvhGmI6nLmDUgvCbVmpQDgfsJmFXTkgtLbq8V0wBSa7L3WXbCDSUjNPhxodL61FJc2AVlR3YbG9v7ILj9aCQX2SJ02HFaikXH3YSNJY7-7SzPYMGGiHo_DiNY8wxJdTNn5MTvVGQ',
    notes: 'Natural beeswax polish, no artificial stains or chemical lacquers.'
  }
];

const STORAGE_KEY_ARTWORKS = 'atelier_studio_dashboard_artworks';
const STORAGE_KEY_PORTFOLIO_IDS = 'atelier_portfolio_active_artwork_ids';
const EVENT_NAME = 'atelier_artworks_updated';

// Helper to load artworks from storage or return initial
export function getStoredStudioArtworks(): Artwork[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ARTWORKS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read artworks from storage:', e);
  }
  return INITIAL_STUDIO_ARTWORKS;
}

// Helper to save studio artworks
export function saveStoredStudioArtworks(artworks: Artwork[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_ARTWORKS, JSON.stringify(artworks));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { artworks } }));
  } catch (e) {
    console.warn('Could not save artworks to storage:', e);
  }
}

// Convert studio Artwork to portfolio CatalogItem
export function convertArtworkToCatalogItem(art: Artwork): CatalogItem {
  return {
    id: art.id,
    title: art.title,
    category: art.discipline,
    medium: art.medium,
    dims: art.dimensions,
    year: '2026',
    price: art.rawPrice,
    status: art.status,
    editionInfo: art.collection || 'Studio Original',
    img: art.image
  };
}

// Get portfolio inclusion set of IDs
export function getStoredPortfolioArtworkIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PORTFOLIO_IDS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read portfolio IDs from storage:', e);
  }
  // Default: include first 4 artworks from studio dashboard
  return ['ART-2024-001', 'ART-2024-002', 'ART-2024-003', 'ART-2024-004'];
}

// Save portfolio inclusion set of IDs
export function saveStoredPortfolioArtworkIds(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_PORTFOLIO_IDS, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { portfolioIds: ids } }));
  } catch (e) {
    console.warn('Could not save portfolio IDs to storage:', e);
  }
}
