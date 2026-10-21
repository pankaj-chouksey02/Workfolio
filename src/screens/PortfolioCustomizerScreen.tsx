import React, { useState, useMemo, useEffect } from 'react';
import {
  Artwork,
  getStoredStudioArtworks,
  saveStoredStudioArtworks,
  getStoredPortfolioArtworkIds,
  saveStoredPortfolioArtworkIds,
  convertArtworkToCatalogItem
} from '../components/data/studioArtworksStore';

interface PortfolioCustomizerScreenProps {
  onNavigate: (path: string) => void;
}

// 10 Distinct Master Templates for Indian Craft Disciplines
export interface TemplatePreset {
  id: string;
  name: string;
  craftSubhead: string;
  categoryTag: 'Ceramics' | 'Textiles' | 'Metal' | 'Wood' | 'Heritage Arts' | 'Painting' | 'Sculpture';
  canvasColor: 'bone' | 'linen' | 'multani' | 'sandalwood' | 'terracotta' | 'indigo' | 'basalt' | 'sandstone' | 'forest' | 'teak';
  typography: 'cormorant' | 'playfair' | 'cinzel' | 'syne' | 'space' | 'baskerville' | 'bodoni';
  archetype: 'monograph' | 'grid' | 'story' | 'masonry' | 'split';
  aspectRatio: '4:3' | '1:1' | '16:10' | '3:4' | '2:3' | '5:4';
  borderStyle: 'hairline' | 'matting' | 'flush' | 'float' | 'rivets';
  accentColor: string;
  description: string;
  swatches: string[];
  pricingMode: 'transparent' | 'inquire' | 'range';
  toggles: FeatureToggles;
}

export interface FeatureToggles {
  // SECTIONS (from attached image)
  showHeroSection: boolean;
  showFeaturedWorkSection: boolean;
  showCollectionsSection: boolean;
  showAboutSection: boolean;
  showCommissionsSection: boolean;
  showContactSection: boolean;

  // 7 IMPORTANT SECURITY & PROTECTION FEATURES
  collectorPricing: boolean;     // Show ₹ INR prices vs "Inquire for Price"
  inAppInquiryShield: boolean;   // Inquire via Atelier (masks phone numbers, prevents bypass)
  escrowBadge: boolean;          // 50% Milestone Escrow Protection badge
  insuredTransitBadge: boolean;  // All-India Insured Transit via Blue Dart
  coaSeal: boolean;              // Digital Certificate of Authenticity (COA) seal
  watermarkProtection: boolean;  // Archival studio watermark & right-click shield
  devanagariScript: boolean;     // Dual-script Hindi/English craft title

  // Supporting internal toggles
  craftMaterialSpecs: boolean;
  limitedEditionsStock: boolean;
  commissionStatus: boolean;
  studioVisitPolicy: boolean;
  craftMasterBadge: boolean;
  maskExactAddress: boolean;
  directEmailShield: boolean;
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

export interface IndianArtistProfile {
  id: 'aarav' | 'ananya' | 'devendra';
  name: string;
  studioName: string;
  handle: string;
  discipline: string;
  hindiTitle: string;
  location: string;
  ledgerId: string;
  heroHeadline: string;
  heroSubheadline: string;
  craftHeritageNote: string;
  masterwork: {
    id: string;
    title: string;
    hindiName: string;
    specs: string;
    year: string;
    medium: string;
    dims: string;
    weight: string;
    firingOrLoom: string;
    provenance: string;
    price: number;
    status: 'Available' | 'Reserved' | 'In Private Collection';
    images: {
      front: string;
      texture: string;
      profile: string;
      spatial: string;
    };
  };
  artworks: CatalogItem[];
  processLog: {
    title: string;
    subtitle: string;
    spec1Label: string;
    spec1Val: string;
    spec2Label: string;
    spec2Val: string;
    spec3Label: string;
    spec3Val: string;
    spec4Label: string;
    spec4Val: string;
    summary: string;
  };
  bespoke: {
    title: string;
    leadTime: string;
    minBudget: string;
    terms: string;
    ctaLabel: string;
    accepting: boolean;
  };
}

const INITIAL_INDIAN_PROFILES: Record<'aarav' | 'ananya' | 'devendra', IndianArtistProfile> = {
  aarav: {
    id: 'aarav',
    name: 'Aarav Sharma',
    studioName: 'Mitti & Co.',
    handle: 'aarav.studio',
    discipline: 'Wheel-Thrown Stoneware & Earthen Terracotta',
    hindiTitle: 'मिट्टी और अग्नि · खुर्जा कुम्हार परंपरा',
    location: 'Khurja Pottery Cluster, UP & Shahpur Jat, New Delhi',
    ledgerId: '#KHJ-2026-AS',
    heroHeadline: 'High-fire unglazed stoneware, Gangetic terracotta, and natural wood-ash vitrification.',
    heroSubheadline: 'Handcrafted vessels, chai kulhads, and architectural floor urns shaped on traditional potter wheels. Rooted in centuries-old North Indian ceramic traditions, refined for contemporary homes.',
    craftHeritageNote: 'Khurja has been India’s ceramic heart since the 14th century. Each vessel is single-fired with natural wood ash in traditional down-draught kilns without artificial chemical glazes.',
    masterwork: {
      id: 'MITTI-2026-004',
      title: 'Tectonic Terracotta Vessel No. 04',
      hindiName: 'टेक्टोनिक टेराकोटा पात्र',
      specs: 'Wood-Fired Gangetic Silt & Terra Sigillata',
      year: '2026',
      medium: 'High-fire local clay, natural tamarind wood-ash reduction (1,280°C)',
      dims: '48 × 32 × 30 cm',
      weight: '9.4 kg (Museum Crating)',
      firingOrLoom: '72 Hours Continuous Wood Reduction',
      provenance: 'India Art Fair 2026 Craft Pavilion',
      price: 24000,
      status: 'Available',
      images: {
        front: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=85',
        texture: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85',
        profile: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=85',
        spatial: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
      }
    },
    artworks: [
      {
        id: 'MITTI-2026-001',
        title: 'Vitrified Stoneware Monolith 07',
        category: 'Sculpture',
        medium: 'Refractory stoneware, natural red pine fly ash melt',
        dims: '72 × 28 × 22 cm',
        year: '2026',
        price: 32000,
        status: 'Available',
        editionInfo: 'Unique Original · 1 of 1',
        img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'MITTI-2026-002',
        title: 'Khurja Chai Kulhad Ensemble (Set of 4)',
        category: 'Tableware',
        medium: 'Wheel-thrown stoneware with raw clay slip interior',
        dims: '8 × 7 cm each (180 ml)',
        year: '2026',
        price: 2200,
        status: 'Available',
        editionInfo: 'Batch Run · 8 Sets Left',
        img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'MITTI-2026-003',
        title: 'Smoked Black Slip Earthen Urn',
        category: 'Vessels',
        medium: 'Burnished terra sigillata smoked with rice husk reduction',
        dims: '42 × 34 × 34 cm',
        year: '2026',
        price: 18500,
        status: 'Available',
        editionInfo: 'Unique Original · 1 of 1',
        img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'MITTI-2026-005',
        title: 'Terracotta Architectural Planter',
        category: 'Vessels',
        medium: 'Hand-pressed coarse terracotta with forged iron base',
        dims: '36 × 36 × 44 cm',
        year: '2025',
        price: 8500,
        status: 'Reserved',
        editionInfo: 'Edition of 12 (3 remaining)',
        img: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80'
      }
    ],
    processLog: {
      title: 'Studio Kiln & Raw Material Telemetry',
      subtitle: '72h Continuous Wood Firing Cycle · Khurja Clays',
      spec1Label: 'Clay Sourcing',
      spec1Val: 'Gangetic alluvial silt & Khurja stoneware ball clay',
      spec2Label: 'Peak Temperature',
      spec2Val: '1,280°C (High vitrification cone 10)',
      spec3Label: 'Firing Fuel',
      spec3Val: 'Dried babul & tamarind wood logs',
      spec4Label: 'Atelier Escrow',
      spec4Val: '100% Protected Payout upon Verified Dispatch',
      summary: 'No synthetic lead glazes or chemical fluxes. Earthen hues emerge entirely from mineral reaction with flying wood ash during prolonged down-draught firing.'
    },
    bespoke: {
      title: 'Site-Specific Ceramic Commissions',
      leadTime: '4 to 6 weeks crafting & kiln curing',
      minBudget: '₹25,000',
      terms: '50% advance milestone escrow deposit; remaining 50% upon verified crated courier pickup.',
      ctaLabel: 'Initiate Commission Inquiry',
      accepting: true
    }
  },
  ananya: {
    id: 'ananya',
    name: 'Ananya Sengupta',
    studioName: 'Vastra Studio',
    handle: 'ananya.textiles',
    discipline: 'Pit-Loom Mulberry Silk & Wild Indigo Weaving',
    hindiTitle: 'वस्त्र और नील · बनारस हथकरघा शिल्प',
    location: 'Kotwa Weavers Quarter, Varanasi, Uttar Pradesh',
    ledgerId: '#VNS-2026-AS',
    heroHeadline: 'Hand-spun Varanasi mulberry silk, organic Chettinad indigo, and heritage pit-loom textures.',
    heroSubheadline: 'Bespoke architectural textile tapestries and limited stole editions woven by master artisan families along the holy ghats of Kashi.',
    craftHeritageNote: 'Pit-loom silk weaving in Varanasi dates back over 1,000 years. Each tapestry takes 6 to 12 weeks of meticulous warp setup and hand-beating.',
    masterwork: {
      id: 'VASTRA-2026-012',
      title: 'Indigo Warp Architectural Tapestry',
      hindiName: 'नील वर्ण वस्त्र शिल्पकला',
      specs: 'Pure Handspun Mulberry Silk & Wild Indigo',
      year: '2026',
      medium: 'Handloom pit-weave, natural fermented indigo vat, brass hanging rod',
      dims: '180 × 90 cm',
      weight: '1.8 kg (Rolled Museum Tube)',
      firingOrLoom: '140 Hours Manual Pit-Loom Weaving',
      provenance: 'National Handloom Heritage Showcase 2026',
      price: 36000,
      status: 'Available',
      images: {
        front: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=85',
        texture: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1200&q=85',
        profile: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
        spatial: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
      }
    },
    artworks: [
      {
        id: 'VASTRA-2026-001',
        title: 'Kashi Dawn Tussar Silk Hanging',
        category: 'Tapestry',
        medium: 'Wild tussar silk with madder root border',
        dims: '140 × 60 cm',
        year: '2026',
        price: 26000,
        status: 'Available',
        editionInfo: 'Unique Original · 1 of 1',
        img: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'VASTRA-2026-002',
        title: 'Indigo Resist Handloom Stole',
        category: 'Wearables',
        medium: 'Maheshwari fine cotton-silk with hand-tied resist dots',
        dims: '200 × 55 cm',
        year: '2026',
        price: 3800,
        status: 'Available',
        editionInfo: 'Limited Run · 5 Available',
        img: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'VASTRA-2026-003',
        title: 'Brocade Jacquard Loom Sample',
        category: 'Tapestry',
        medium: 'Hand-dyed organic eri silk with pure zai thread',
        dims: '60 × 60 cm (Framed)',
        year: '2025',
        price: 14500,
        status: 'Available',
        editionInfo: 'Edition of 6 · 2 left',
        img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
      }
    ],
    processLog: {
      title: 'Handloom Pit-Loom & Indigo Vat Telemetry',
      subtitle: 'Kotwa Weaver Guild · 100% Organic Indigo Fermentation',
      spec1Label: 'Yarn Fiber',
      spec1Val: 'Organic mulberry & wild tribal tussar silk',
      spec2Label: 'Loom Setup',
      spec2Val: 'Traditional 4-pedal wooden pit-loom',
      spec3Label: 'Dye Reduction',
      spec3Val: 'Live natural indigo vat with jaggery & lime',
      spec4Label: 'Atelier Escrow',
      spec4Val: '100% Protected Payout upon Verified Dispatch',
      summary: 'Every thread is hand-spun on traditional charkhas before warping. No synthetic chemical fixing agents or aniline dyes are used.'
    },
    bespoke: {
      title: 'Architectural Textile Installations',
      leadTime: '6 to 10 weeks warp setup and loom weave',
      minBudget: '₹35,000',
      terms: '50% advance milestone escrow deposit; remaining 50% upon verified crated courier pickup.',
      ctaLabel: 'Discuss Custom Tapestry',
      accepting: true
    }
  },
  devendra: {
    id: 'devendra',
    name: 'Devendra Kashyap',
    studioName: 'Dhaatu Atelier',
    handle: 'devendra.bronze',
    discipline: 'Lost-Wax Dhokra Metallurgy & Bell-Metal Casting',
    hindiTitle: 'धातु और मोम · बस्तर ढोकरा परंपरा',
    location: 'Kondagaon Tribal Cluster, Bastar, Chhattisgarh',
    ledgerId: '#BST-2026-DK',
    heroHeadline: 'Ancient 4,000-year lost-wax bell metal casting, beeswax coil detailing, and earthen furnace firing.',
    heroSubheadline: 'Singular tribal bronze sculptures, totems, and ceremonial lamps handcrafted without standard moulds. Every piece is intrinsically non-reproducible.',
    craftHeritageNote: 'Dhokra casting in Bastar is an unbroken 4,000-year metallurgical tradition traced back to Mohenjo-daro’s Dancing Girl. Each clay mould is destroyed upon pouring.',
    masterwork: {
      id: 'DHAATU-2026-008',
      title: 'Vriksha Tribal Spirit Monolith',
      hindiName: 'वृक्ष आत्मा ढोकरा मूर्ति',
      specs: 'Lost-Wax Cast Bell Metal (78% Copper, 22% Tin)',
      year: '2026',
      medium: 'Solid bronze bell metal, organic beeswax modeling, charcoal fire patina',
      dims: '56 × 24 × 18 cm',
      weight: '11.8 kg (Museum Mount)',
      firingOrLoom: 'Traditional Pit Furnace Pour at 1,150°C',
      provenance: 'Tribal Arts Triennale New Delhi 2026',
      price: 28500,
      status: 'Available',
      images: {
        front: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
        texture: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=85',
        profile: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85',
        spatial: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
      }
    },
    artworks: [
      {
        id: 'DHAATU-2026-001',
        title: 'Bastar Tribal Bison Horn Totem',
        category: 'Sculpture',
        medium: 'Solid bell metal with beeswax coiled surface detail',
        dims: '44 × 18 × 14 cm',
        year: '2026',
        price: 18500,
        status: 'Available',
        editionInfo: 'Unique Original · 1 of 1',
        img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'DHAATU-2026-002',
        title: 'Dhokra Incense Burner & Sacred Diya',
        category: 'Tableware',
        medium: 'Cast brass bell metal with antique charcoal polish',
        dims: '18 × 14 × 12 cm',
        year: '2026',
        price: 3800,
        status: 'Available',
        editionInfo: 'Batch Run · 4 Available',
        img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'DHAATU-2026-003',
        title: 'Geometric Village Musician Ensemble',
        category: 'Sculpture',
        medium: 'Series of 3 cast bell-metal figures playing traditional damru',
        dims: '24 × 10 × 8 cm each',
        year: '2026',
        price: 14000,
        status: 'Available',
        editionInfo: 'Set of 3 · 1 Available',
        img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
      }
    ],
    processLog: {
      title: 'Lost-Wax Metallurgy & Clay Core Log',
      subtitle: 'Ancient 4,000-Year Cire-Perdue Process · Bastar',
      spec1Label: 'Metal Alloy',
      spec1Val: '78% Copper, 22% Tin (Bell Metal / Kansa)',
      spec2Label: 'Pour Temperature',
      spec2Val: '1,150°C Open Charcoal Hearth',
      spec3Label: 'Core Medium',
      spec3Val: 'Termite hill clay & organic rice straw binding',
      spec4Label: 'Atelier Escrow',
      spec4Val: 'Advance held safely until courier pickup',
      summary: 'Every single line and braid is hand-rolled from wild beeswax mixed with dammar resin. The clay mould is smashed to release the cooled cast, guaranteeing that every sculpture is singular.'
    },
    bespoke: {
      title: 'Monolithic Bronze Sculptures',
      leadTime: '8 to 12 weeks wax sculpting & furnace pour',
      minBudget: '₹40,000',
      terms: '50% advance milestone escrow deposit; remaining 50% upon verified crated courier pickup.',
      ctaLabel: 'Commission Dhokra Sculpture',
      accepting: true
    }
  }
};

export default function PortfolioCustomizerScreen({ onNavigate }: PortfolioCustomizerScreenProps) {
  // Viewport mode: desktop, tablet, mobile
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  // Full Preview expansion toggle
  const [isPreviewExpanded, setIsPreviewExpanded] = useState<boolean>(false);

  // Small screen host tab switcher (< lg screens)
  const [hostSmallScreenTab, setHostSmallScreenTab] = useState<'controls' | 'preview'>('preview');

  // Primary Customizer Collapsible Sections:
  // Templates, Dashboard Artworks, Identity & Lineage, Hero & Statement, Featured Masterwork,
  // Portfolio Catalog Works, Craft & Kiln Telemetry, Bespoke Commissions, About & Heritage,
  // Section Architecture, Theme & Palette, Typography, Contact & Privacy
  const [expandedSections, setExpandedSections] = useState({
    templates: false,
    dashboardArtworks: true, // open by default so user can immediately see this feature
    identity: false,
    hero: false,
    masterwork: false,
    catalog: false,
    process: false,
    bespoke: false,
    about: false,
    section: false,
    theme: false,
    typography: false,
    contact: false,
  });

  const toggleCollapsibleSection = (key: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Studio Dashboard Artworks integration state
  const [studioArtworks, setStudioArtworks] = useState<Artwork[]>(() => getStoredStudioArtworks());
  const [portfolioArtworkIds, setPortfolioArtworkIds] = useState<string[]>(() => getStoredPortfolioArtworkIds());
  const [isAddDashboardArtModalOpen, setIsAddDashboardArtModalOpen] = useState(false);
  const [dashboardArtFilter, setDashboardArtFilter] = useState<string>('All');

  // Form state for adding new artwork to Studio Dashboard from Customizer
  const [dashArtTitle, setDashArtTitle] = useState('');
  const [dashArtDiscipline, setDashArtDiscipline] = useState('Clay & Terracotta');
  const [dashArtMedium, setDashArtMedium] = useState('');
  const [dashArtDimensions, setDashArtDimensions] = useState('');
  const [dashArtPrice, setDashArtPrice] = useState('');
  const [dashArtStatus, setDashArtStatus] = useState<'Available' | 'Reserved' | 'Sold'>('Available');
  const [dashArtCollection, setDashArtCollection] = useState('Independent Works');
  const [dashArtImage, setDashArtImage] = useState('https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80');
  const [dashArtNotes, setDashArtNotes] = useState('');

  // Listen for storage updates across tabs / screens
  useEffect(() => {
    const handleSync = () => {
      setStudioArtworks(getStoredStudioArtworks());
      setPortfolioArtworkIds(getStoredPortfolioArtworkIds());
    };
    window.addEventListener('atelier_artworks_updated', handleSync);
    return () => window.removeEventListener('atelier_artworks_updated', handleSync);
  }, []);

  // Sync artworksList with selected portfolio items
  useEffect(() => {
    const activeStudioPieces = studioArtworks
      .filter(art => portfolioArtworkIds.includes(art.id))
      .map(convertArtworkToCatalogItem);

    // Keep any user-added custom pieces that aren't in studioArtworks
    const customPieces = artworksList.filter(item => !studioArtworks.some(a => a.id === item.id));

    if (activeStudioPieces.length > 0 || customPieces.length > 0) {
      setArtworksList([...activeStudioPieces, ...customPieces]);
    } else {
      setArtworksList([]);
    }
  }, [studioArtworks, portfolioArtworkIds]);

  const toggleArtworkInPortfolio = (artId: string) => {
    const isIncluded = portfolioArtworkIds.includes(artId);
    let nextIds: string[];
    if (isIncluded) {
      nextIds = portfolioArtworkIds.filter(id => id !== artId);
      showToast('Artwork removed from portfolio');
    } else {
      nextIds = [...portfolioArtworkIds, artId];
      showToast('Artwork added to portfolio');
    }
    setPortfolioArtworkIds(nextIds);
    saveStoredPortfolioArtworkIds(nextIds);
  };

  const handleIncludeAllDashboardArtworks = () => {
    const allIds = studioArtworks.map(a => a.id);
    setPortfolioArtworkIds(allIds);
    saveStoredPortfolioArtworkIds(allIds);
    showToast(`Included all ${allIds.length} studio artworks in portfolio`);
  };

  const handleResetPortfolioArtworks = () => {
    const defaultIds = ['ART-2024-001', 'ART-2024-002', 'ART-2024-003', 'ART-2024-004'];
    setPortfolioArtworkIds(defaultIds);
    saveStoredPortfolioArtworkIds(defaultIds);
    showToast('Reset portfolio selection to default pieces');
  };

  const handleCreateDashboardArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dashArtTitle.trim()) return;

    const formattedPrice = dashArtPrice.startsWith('₹') ? dashArtPrice : `₹${dashArtPrice}`;
    const rawVal = parseInt(dashArtPrice.replace(/[^0-9]/g, '')) || 15000;

    const newArt: Artwork = {
      id: `ART-2024-${String(studioArtworks.length + 1).padStart(3, '0')}`,
      title: dashArtTitle.trim(),
      discipline: dashArtDiscipline,
      medium: dashArtMedium.trim() || 'Handcrafted traditional medium',
      dimensions: dashArtDimensions.trim() || 'Custom studio scale',
      weight: 'Studio packaged',
      price: formattedPrice,
      rawPrice: rawVal,
      status: dashArtStatus,
      collection: dashArtCollection.trim() || 'Independent Works',
      image: dashArtImage.trim() || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
      notes: dashArtNotes.trim() || 'Direct from artisan kiln & workshop.'
    };

    const updatedStudio = [newArt, ...studioArtworks];
    setStudioArtworks(updatedStudio);
    saveStoredStudioArtworks(updatedStudio);

    // Automatically include newly created piece in portfolio
    const nextIds = [newArt.id, ...portfolioArtworkIds];
    setPortfolioArtworkIds(nextIds);
    saveStoredPortfolioArtworkIds(nextIds);

    setIsAddDashboardArtModalOpen(false);
    showToast(`Added "${newArt.title}" to dashboard and portfolio!`);

    // Reset form
    setDashArtTitle('');
    setDashArtMedium('');
    setDashArtDimensions('');
    setDashArtPrice('');
    setDashArtNotes('');
  };

  const handleDeleteDashboardArtwork = (artId: string, artTitle: string) => {
    const updatedStudio = studioArtworks.filter(a => a.id !== artId);
    setStudioArtworks(updatedStudio);
    saveStoredStudioArtworks(updatedStudio);

    const nextIds = portfolioArtworkIds.filter(id => id !== artId);
    setPortfolioArtworkIds(nextIds);
    saveStoredPortfolioArtworkIds(nextIds);

    showToast(`Deleted "${artTitle}" from studio dashboard`);
  };

  // Sub-section switcher inside "Studio (Content)" tab
  const [studioEditSection, setStudioEditSection] = useState<'hero' | 'masterwork' | 'gallery' | 'process' | 'bespoke' | 'about' | 'policies'>('hero');

  // Selected Artist Preset
  const [selectedArtistId, setSelectedArtistId] = useState<'aarav' | 'ananya' | 'devendra'>('aarav');
  const baseArtist = INITIAL_INDIAN_PROFILES[selectedArtistId];

  // Template category filter in templates tab
  const [templateFilter, setTemplateFilter] = useState<string>('All');

  // Editable Profile Overrides (Live in preview)
  const [customStudioName, setCustomStudioName] = useState(baseArtist.studioName);
  const [customArtistName, setCustomArtistName] = useState(baseArtist.name);
  const [customHandle, setCustomHandle] = useState(baseArtist.handle);
  const [customLocation, setCustomLocation] = useState(baseArtist.location);
  const [customDiscipline, setCustomDiscipline] = useState(baseArtist.discipline);
  const [customHindiTitle, setCustomHindiTitle] = useState(baseArtist.hindiTitle);
  const [customHeadline, setCustomHeadline] = useState(baseArtist.heroHeadline);
  const [customSubheadline, setCustomSubheadline] = useState(baseArtist.heroSubheadline);
  const [heroLayoutVariant, setHeroLayoutVariant] = useState<'monograph' | 'split' | 'architectural'>('monograph');
  const [heroCtaLabel, setHeroCtaLabel] = useState('Inquire on Works');
  const [studioPhotoUrl, setStudioPhotoUrl] = useState('https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=85');

  // Masterwork Overrides
  const [masterworkTitle, setMasterworkTitle] = useState(baseArtist.masterwork.title);
  const [masterworkHindiName, setMasterworkHindiName] = useState(baseArtist.masterwork.hindiName);
  const [masterworkSpecs, setMasterworkSpecs] = useState(baseArtist.masterwork.specs);
  const [masterworkMedium, setMasterworkMedium] = useState(baseArtist.masterwork.medium);
  const [masterworkPrice, setMasterworkPrice] = useState(baseArtist.masterwork.price);
  const [masterworkFiring, setMasterworkFiring] = useState(baseArtist.masterwork.firingOrLoom);
  const [masterworkProvenance, setMasterworkProvenance] = useState(baseArtist.masterwork.provenance);
  const [masterworkDims, setMasterworkDims] = useState(baseArtist.masterwork.dims);
  const [masterworkWeight, setMasterworkWeight] = useState(baseArtist.masterwork.weight);
  const [masterworkStatus, setMasterworkStatus] = useState(baseArtist.masterwork.status);
  const [masterworkImgFront, setMasterworkImgFront] = useState(baseArtist.masterwork.images.front);
  const [masterworkImgTexture, setMasterworkImgTexture] = useState(baseArtist.masterwork.images.texture);
  const [masterworkImgProfile, setMasterworkImgProfile] = useState(baseArtist.masterwork.images.profile);
  const [masterworkImgSpatial, setMasterworkImgSpatial] = useState(baseArtist.masterwork.images.spatial);

  // Gallery Overrides
  const [galleryTitle, setGalleryTitle] = useState('Studio Catalog & Editions');
  const [gallerySubtitle, setGallerySubtitle] = useState('Available Works & Numbered Editions');
  const [galleryLayout, setGalleryLayout] = useState<'3-col' | '2-col' | 'masonry'>('3-col');
  const [artworksList, setArtworksList] = useState<CatalogItem[]>(baseArtist.artworks);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('All');

  // Process & Telemetry Overrides
  const [processTitle, setProcessTitle] = useState(baseArtist.processLog.title);
  const [processSubtitle, setProcessSubtitle] = useState(baseArtist.processLog.subtitle);
  const [spec1Label, setSpec1Label] = useState(baseArtist.processLog.spec1Label);
  const [spec1Val, setSpec1Val] = useState(baseArtist.processLog.spec1Val);
  const [spec2Label, setSpec2Label] = useState(baseArtist.processLog.spec2Label);
  const [spec2Val, setSpec2Val] = useState(baseArtist.processLog.spec2Val);
  const [spec3Label, setSpec3Label] = useState(baseArtist.processLog.spec3Label);
  const [spec3Val, setSpec3Val] = useState(baseArtist.processLog.spec3Val);
  const [spec4Label, setSpec4Label] = useState(baseArtist.processLog.spec4Label);
  const [spec4Val, setSpec4Val] = useState(baseArtist.processLog.spec4Val);
  const [processSummary, setProcessSummary] = useState(baseArtist.processLog.summary);
  const [guildTag, setGuildTag] = useState('Certified Indian Master Craftsman · GI Registry Authenticated');

  // Bespoke Commissions Section Overrides
  const [bespokeTitle, setBespokeTitle] = useState(baseArtist.bespoke.title);
  const [bespokeLeadTime, setBespokeLeadTime] = useState(baseArtist.bespoke.leadTime);
  const [bespokeMinBudget, setBespokeMinBudget] = useState(baseArtist.bespoke.minBudget);
  const [bespokeTerms, setBespokeTerms] = useState(baseArtist.bespoke.terms);
  const [bespokeCtaLabel, setBespokeCtaLabel] = useState(baseArtist.bespoke.ctaLabel);
  const [bespokeAccepting, setBespokeAccepting] = useState(baseArtist.bespoke.accepting);

  // About & Heritage Overrides
  const [craftHeritageNote, setCraftHeritageNote] = useState(baseArtist.craftHeritageNote);
  const [visitPolicyText, setVisitPolicyText] = useState('Studio visits strictly by prior Atelier platform appointment on select weekdays - no walk-ins.');
  const [pressMention, setPressMention] = useState('Featured in Architectural Digest India, India Art Fair 2026, and Crafts Council of India.');

  // Policies & Shipping
  const [shippingPolicyText, setShippingPolicyText] = useState('All-India insured museum crating via Blue Dart & Delhivery fine art courier.');
  const [transitInsuranceActive, setTransitInsuranceActive] = useState(true);

  // Design Settings (Style Tab)
  const [canvasColor, setCanvasColor] = useState<'bone' | 'linen' | 'multani' | 'sandalwood' | 'terracotta' | 'indigo' | 'basalt' | 'sandstone' | 'forest' | 'teak'>('bone');
  const [typography, setTypography] = useState<'cormorant' | 'playfair' | 'cinzel' | 'syne' | 'space' | 'baskerville' | 'bodoni'>('cormorant');
  const [archetype, setArchetype] = useState<'monograph' | 'grid' | 'story' | 'masonry' | 'split'>('monograph');
  const [aspectRatio, setAspectRatio] = useState<'4:3' | '1:1' | '16:10' | '3:4' | '2:3' | '5:4'>('4:3');
  const [borderStyle, setBorderStyle] = useState<'hairline' | 'matting' | 'flush' | 'float' | 'rivets'>('hairline');
  const [typeScale, setTypeScale] = useState<'editorial' | 'monumental' | 'compact'>('editorial');
  const [headerStyle, setHeaderStyle] = useState<'classical' | 'centered' | 'inline'>('classical');
  const [accentColor, setAccentColor] = useState('#C25E3E');
  const [pricingMode, setPricingMode] = useState<'transparent' | 'inquire' | 'range'>('transparent');
  const [activeTemplateId, setActiveTemplateId] = useState<string>('kora');

  // Interactive Feature & Commerce Toggles (Security Tab & Sections)
  const [toggles, setToggles] = useState<FeatureToggles>({
    showHeroSection: true,
    showFeaturedWorkSection: true,
    showCollectionsSection: true,
    showAboutSection: true,
    showCommissionsSection: true,
    showContactSection: true,

    collectorPricing: true,
    inAppInquiryShield: true,
    escrowBadge: true,
    insuredTransitBadge: true,
    coaSeal: true,
    watermarkProtection: false,
    devanagariScript: true,

    craftMaterialSpecs: true,
    limitedEditionsStock: true,
    commissionStatus: true,
    studioVisitPolicy: true,
    craftMasterBadge: true,
    maskExactAddress: true,
    directEmailShield: true,
  });

  // Masterwork viewing angle in preview
  const [masterworkAngle, setMasterworkAngle] = useState<'front' | 'texture' | 'profile' | 'spatial'>('front');

  // Interactive Modals & Drawers inside Preview
  const [activeInquiryArtwork, setActiveInquiryArtwork] = useState<string | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryCity, setInquiryCity] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  // Certificate of Authenticity Modal
  const [coaModalArtwork, setCoaModalArtwork] = useState<any | null>(null);

  // Zoom Inspection Lightbox Modal
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string; specs: string } | null>(null);

  // Bespoke Commission Inquiry Modal
  const [isBespokeModalOpen, setIsBespokeModalOpen] = useState(false);
  const [bespokeClientName, setBespokeClientName] = useState('');
  const [bespokeClientCity, setBespokeClientCity] = useState('');
  const [bespokeBudget, setBespokeBudget] = useState('₹50,000');
  const [bespokeScope, setBespokeScope] = useState('');
  const [bespokeSent, setBespokeSent] = useState(false);

  // Add Artwork Modal
  const [isAddArtworkOpen, setIsAddArtworkOpen] = useState(false);
  const [newArtTitle, setNewArtTitle] = useState('');
  const [newArtCategory, setNewArtCategory] = useState('Vessel');
  const [newArtMedium, setNewArtMedium] = useState('');
  const [newArtDims, setNewArtDims] = useState('');
  const [newArtPrice, setNewArtPrice] = useState('12000');
  const [newArtEdition, setNewArtEdition] = useState('Unique Original · 1 of 1');
  const [newArtImg, setNewArtImg] = useState('https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80');

  // Lookbook PDF Export Simulator Modal
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);

  // Toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggle = (key: keyof FeatureToggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isMobileViewport = viewportMode === 'mobile';
  const isTabletViewport = viewportMode === 'tablet';

  // 15 Distinct Professional Master Templates for Indian Craft Disciplines
  const TEN_TEMPLATES: TemplatePreset[] = [
    {
      id: 'kora',
      name: '01. Kora Kagaz Minimal',
      craftSubhead: 'Tokyo / Basel Ceramic Monograph',
      categoryTag: 'Ceramics',
      canvasColor: 'bone',
      typography: 'cormorant',
      archetype: 'monograph',
      aspectRatio: '16:10',
      borderStyle: 'hairline',
      accentColor: '#C25E3E',
      description: 'Pristine museum bone paper, Cormorant Garamond display serif, terracotta oxide accents, and prominent archival exhibition plates.',
      swatches: ['#FFFFFF', '#C25E3E', '#141413', '#E7E4DF'],
      pricingMode: 'transparent',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: true,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: true,
        craftMasterBadge: true,
        watermarkProtection: false,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'khadi',
      name: '02. Khadi Raw Linen',
      craftSubhead: 'Varanasi Handloom Textile Catalog',
      categoryTag: 'Textiles',
      canvasColor: 'linen',
      typography: 'playfair',
      archetype: 'grid',
      aspectRatio: '4:3',
      borderStyle: 'hairline',
      accentColor: '#2B4C6F',
      description: 'Unbleached natural linen ground, Playfair Display typography, wild indigo accents, and structured textile catalog grid.',
      swatches: ['#F6F3ED', '#2B4C6F', '#23211E', '#DDD8CE'],
      pricingMode: 'transparent',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: true,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: false,
        craftMasterBadge: true,
        watermarkProtection: false,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'geru',
      name: '03. Geru Clay & Kiln Smoke',
      craftSubhead: 'Wood-Firing Documentary Journal',
      categoryTag: 'Ceramics',
      canvasColor: 'terracotta',
      typography: 'cormorant',
      archetype: 'story',
      aspectRatio: '4:3',
      borderStyle: 'matting',
      accentColor: '#D95F38',
      description: 'Baked terracotta umber ground, Cormorant Garamond italics, kiln firing documentary, and 4-angle craft inspection.',
      swatches: ['#1F1715', '#D95F38', '#F5EDE5', '#3E2F2B'],
      pricingMode: 'inquire',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: false,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: true,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: true,
        craftMasterBadge: true,
        watermarkProtection: true,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'kajal',
      name: '04. Kajal & Basalt Night',
      craftSubhead: 'Lost-Wax Bell Metal Darkroom Vault',
      categoryTag: 'Metal',
      canvasColor: 'basalt',
      typography: 'syne',
      archetype: 'monograph',
      aspectRatio: '16:10',
      borderStyle: 'hairline',
      accentColor: '#C89D55',
      description: 'Basalt charcoal darkroom luxury, Syne avant-garde typography, burnished bell-metal gold accents, and digital COA certificates.',
      swatches: ['#111110', '#C89D55', '#F5F2EB', '#2A2926'],
      pricingMode: 'transparent',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: false,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: true,
        craftMasterBadge: true,
        watermarkProtection: true,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'jaipur',
      name: '05. Jaipur Cobalt & Quartz',
      craftSubhead: 'Symmetric Blue Pottery Salon',
      categoryTag: 'Ceramics',
      canvasColor: 'bone',
      typography: 'playfair',
      archetype: 'grid',
      aspectRatio: '1:1',
      borderStyle: 'matting',
      accentColor: '#155278',
      description: 'Crisp gallery bone canvas, Playfair Display symmetry, Persian cobalt blue accents, and 1:1 square salon geometry.',
      swatches: ['#FFFFFF', '#155278', '#E6A15C', '#1A2E3D'],
      pricingMode: 'transparent',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: true,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: true,
        craftMasterBadge: true,
        watermarkProtection: false,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'wasli',
      name: '06. Wasli & Kishangarh Gold',
      craftSubhead: 'Miniature Monograph & Provenance',
      categoryTag: 'Painting',
      canvasColor: 'sandalwood',
      typography: 'cormorant',
      archetype: 'monograph',
      aspectRatio: '3:4',
      borderStyle: 'matting',
      accentColor: '#B8860B',
      description: 'Handmade hemp wasli paper tones, genuine 24k gold leaf foil accents, 3:4 vertical frames, and watermark protection.',
      swatches: ['#FAF4EA', '#B8860B', '#2C2723', '#E5D8C3'],
      pricingMode: 'range',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: true,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: true,
        craftMasterBadge: true,
        watermarkProtection: true,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'shekhawati',
      name: '07. Shekhawati Teak & Brass',
      craftSubhead: 'Haveli Architectural Woodcraft',
      categoryTag: 'Wood',
      canvasColor: 'teak',
      typography: 'cinzel',
      archetype: 'story',
      aspectRatio: '16:10',
      borderStyle: 'hairline',
      accentColor: '#D4AF37',
      description: 'Deep aged Sheesham teakwood, Cinzel Roman capital letterforms, hand-beaten brass accents, and architectural provenance.',
      swatches: ['#1B1613', '#D4AF37', '#EFE7DA', '#382D26'],
      pricingMode: 'transparent',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: true,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: true,
        craftMasterBadge: true,
        watermarkProtection: false,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'bidri',
      name: '08. Bidri & Sterling Silver',
      craftSubhead: 'Deccan Damascene Precision Archive',
      categoryTag: 'Metal',
      canvasColor: 'basalt',
      typography: 'syne',
      archetype: 'grid',
      aspectRatio: '1:1',
      borderStyle: 'hairline',
      accentColor: '#E2E8F0',
      description: 'Obsidian zinc base with sterling silver inlay, Syne geometric typography, and macro precision inspection.',
      swatches: ['#121417', '#E2E8F0', '#94A3B8', '#2B3038'],
      pricingMode: 'transparent',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: false,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: false,
        craftMasterBadge: true,
        watermarkProtection: true,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'rogan',
      name: '09. Kutch Rogan & Mud Lippan',
      craftSubhead: 'Heritage Earth & Mirror Relief',
      categoryTag: 'Heritage Arts',
      canvasColor: 'multani',
      typography: 'playfair',
      archetype: 'story',
      aspectRatio: '4:3',
      borderStyle: 'matting',
      accentColor: '#D9531E',
      description: 'Multani earth sand ground, Playfair Display, castor saffron rust accents, and studio visit reservation liaison.',
      swatches: ['#F4EFE6', '#D9531E', '#3D312A', '#D8CCBD'],
      pricingMode: 'transparent',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: true,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: true,
        craftMasterBadge: true,
        watermarkProtection: false,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'patachitra',
      name: '10. Bengal Patachitra Scroll',
      craftSubhead: 'Narrative Scroll Monograph',
      categoryTag: 'Painting',
      canvasColor: 'sandstone',
      typography: 'baskerville',
      archetype: 'monograph',
      aspectRatio: '3:4',
      borderStyle: 'hairline',
      accentColor: '#943826',
      description: 'Conch shell parchment, Libre Baskerville literary serif, vegetable dye madder red accents, and story monograph layout.',
      swatches: ['#F5ECE1', '#943826', '#1E3A2F', '#E2D5C3'],
      pricingMode: 'transparent',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: true,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: true,
        craftMasterBadge: true,
        watermarkProtection: true,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'bodoni-luxury',
      name: '11. Bodoni Haute Couture',
      craftSubhead: 'Paris / Milan Fine Art Salon',
      categoryTag: 'Textiles',
      canvasColor: 'basalt',
      typography: 'bodoni',
      archetype: 'monograph',
      aspectRatio: '2:3',
      borderStyle: 'rivets',
      accentColor: '#E2E8F0',
      description: 'High-contrast Bodoni Moda typography, midnight basalt ground, brass corner rivets, and ultra-luxury couture presentation.',
      swatches: ['#0A0A09', '#E2E8F0', '#C5A880', '#222220'],
      pricingMode: 'transparent',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: false,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: true,
        craftMasterBadge: true,
        watermarkProtection: true,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'cinzel-monument',
      name: '12. Cinzel Stone Monument',
      craftSubhead: 'Himalayan Temple Carving Archive',
      categoryTag: 'Sculpture',
      canvasColor: 'forest',
      typography: 'cinzel',
      archetype: 'story',
      aspectRatio: '16:10',
      borderStyle: 'matting',
      accentColor: '#C89D55',
      description: 'Deep Pichwai neem forest green ground, monumental Cinzel Roman capitals, antique gold foil accents, and stone sculpture provenance.',
      swatches: ['#16241B', '#C89D55', '#F5F2EB', '#273C2E'],
      pricingMode: 'inquire',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: false,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: true,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: true,
        craftMasterBadge: true,
        watermarkProtection: true,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'space-telemetry',
      name: '13. Space Spec Telemetry',
      craftSubhead: 'Industrial Ceramic Laboratory',
      categoryTag: 'Ceramics',
      canvasColor: 'sandstone',
      typography: 'space',
      archetype: 'grid',
      aspectRatio: '1:1',
      borderStyle: 'hairline',
      accentColor: '#3F5342',
      description: 'Marwar sandstone dune ochre ground, Space Grotesk studio telemetry fonts, forest green accents, and scientific kiln curves.',
      swatches: ['#F2E8DC', '#3F5342', '#141413', '#D6C8B5'],
      pricingMode: 'transparent',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: false,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: false,
        craftMasterBadge: true,
        watermarkProtection: false,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'indigo-velvet',
      name: '14. Kashi Neel Velvet',
      craftSubhead: 'Varanasi Ghat Nocturne Archive',
      categoryTag: 'Textiles',
      canvasColor: 'indigo',
      typography: 'cormorant',
      archetype: 'story',
      aspectRatio: '3:4',
      borderStyle: 'float',
      accentColor: '#38BDF8',
      description: 'Kashi deep indigo night ground, Cormorant Garamond italic headings, electric sky blue accents, and floating museum cards.',
      swatches: ['#121A24', '#38BDF8', '#F8FAFC', '#1E293B'],
      pricingMode: 'transparent',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: true,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: true,
        craftMasterBadge: true,
        watermarkProtection: true,
        maskExactAddress: true,
        directEmailShield: true,
      }
    },
    {
      id: 'sandalwood-ivory',
      name: '15. Chandan Ivory & Ochre',
      craftSubhead: 'Mysore Sandalwood & Gold Leaf',
      categoryTag: 'Wood',
      canvasColor: 'sandalwood',
      typography: 'playfair',
      archetype: 'grid',
      aspectRatio: '4:3',
      borderStyle: 'matting',
      accentColor: '#D95F38',
      description: 'Warm sandalwood ivory ground, Playfair Display typography, geru rust accents, and matted gallery framing.',
      swatches: ['#F7EFE1', '#D95F38', '#2D231E', '#E4D5BC'],
      pricingMode: 'transparent',
      toggles: {
        showHeroSection: true,
        showFeaturedWorkSection: true,
        showCollectionsSection: true,
        showAboutSection: true,
        showCommissionsSection: true,
        showContactSection: true,
        collectorPricing: true,
        inAppInquiryShield: true,
        escrowBadge: true,
        insuredTransitBadge: true,
        coaSeal: true,
        devanagariScript: true,
        craftMaterialSpecs: true,
        limitedEditionsStock: true,
        commissionStatus: true,
        studioVisitPolicy: true,
        craftMasterBadge: true,
        watermarkProtection: false,
        maskExactAddress: true,
        directEmailShield: true,
      }
    }
  ];

  const filteredTemplates = useMemo(() => {
    if (templateFilter === 'All') return TEN_TEMPLATES;
    return TEN_TEMPLATES.filter(t => t.categoryTag === templateFilter);
  }, [templateFilter]);

  const applyTemplate = (preset: TemplatePreset) => {
    setActiveTemplateId(preset.id);
    setCanvasColor(preset.canvasColor);
    setTypography(preset.typography);
    setArchetype(preset.archetype);
    setAspectRatio(preset.aspectRatio);
    setBorderStyle(preset.borderStyle);
    setAccentColor(preset.accentColor);
    setPricingMode(preset.pricingMode);
    setToggles(prev => ({ ...prev, ...preset.toggles }));
    showToast(`Applied Master Template: ${preset.name}`);
  };

  const handleSelectArtistPreset = (id: 'aarav' | 'ananya' | 'devendra') => {
    setSelectedArtistId(id);
    const p = INITIAL_INDIAN_PROFILES[id];
    setCustomStudioName(p.studioName);
    setCustomArtistName(p.name);
    setCustomHandle(p.handle);
    setCustomLocation(p.location);
    setCustomDiscipline(p.discipline);
    setCustomHindiTitle(p.hindiTitle);
    setCustomHeadline(p.heroHeadline);
    setCustomSubheadline(p.heroSubheadline);
    setMasterworkTitle(p.masterwork.title);
    setMasterworkHindiName(p.masterwork.hindiName);
    setMasterworkSpecs(p.masterwork.specs);
    setMasterworkMedium(p.masterwork.medium);
    setMasterworkPrice(p.masterwork.price);
    setMasterworkFiring(p.masterwork.firingOrLoom);
    setMasterworkProvenance(p.masterwork.provenance);
    setMasterworkDims(p.masterwork.dims);
    setMasterworkWeight(p.masterwork.weight);
    setMasterworkStatus(p.masterwork.status);
    setMasterworkImgFront(p.masterwork.images.front);
    setMasterworkImgTexture(p.masterwork.images.texture);
    setMasterworkImgProfile(p.masterwork.images.profile);
    setMasterworkImgSpatial(p.masterwork.images.spatial);
    setArtworksList(p.artworks);
    setProcessTitle(p.processLog.title);
    setProcessSubtitle(p.processLog.subtitle);
    setSpec1Label(p.processLog.spec1Label);
    setSpec1Val(p.processLog.spec1Val);
    setSpec2Label(p.processLog.spec2Label);
    setSpec2Val(p.processLog.spec2Val);
    setSpec3Label(p.processLog.spec3Label);
    setSpec3Val(p.processLog.spec3Val);
    setSpec4Label(p.processLog.spec4Label);
    setSpec4Val(p.processLog.spec4Val);
    setProcessSummary(p.processLog.summary);
    setCraftHeritageNote(p.craftHeritageNote);
    setBespokeTitle(p.bespoke.title);
    setBespokeLeadTime(p.bespoke.leadTime);
    setBespokeMinBudget(p.bespoke.minBudget);
    setBespokeTerms(p.bespoke.terms);
    setBespokeCtaLabel(p.bespoke.ctaLabel);
    setBespokeAccepting(p.bespoke.accepting);
    showToast(`Loaded discipline preset: ${p.name}`);
  };

  // Color theme classes with full dark/light systemic palette awareness (Market-Standard)
  const getThemeClasses = () => {
    switch (canvasColor) {
      case 'basalt':
        return {
          isDark: true,
          bg: 'bg-[#111110]',
          text: 'text-[#F5F2EB]',
          border: 'border-[#2A2926]',
          subtleBg: 'bg-[#181716]',
          cardBg: 'bg-[#191817]',
          cardBorder: 'border-[#33312C]',
          mutedText: 'text-[#A39E94]',
          tagBg: 'bg-[#22211F]',
          tagBorder: 'border-[#383632]',
          tagText: 'text-[#E8E4DA]',
          btnSecondary: 'bg-white/10 hover:bg-white/15 text-white border-white/20',
          specLine: 'border-[#2A2926]',
          itemBg: 'bg-[#181716]',
        };
      case 'teak':
        return {
          isDark: true,
          bg: 'bg-[#1B1613]',
          text: 'text-[#EFE7DA]',
          border: 'border-[#362C26]',
          subtleBg: 'bg-[#241E1A]',
          cardBg: 'bg-[#221C18]',
          cardBorder: 'border-[#423630]',
          mutedText: 'text-[#B3A398]',
          tagBg: 'bg-[#2A231E]',
          tagBorder: 'border-[#483B33]',
          tagText: 'text-[#E5DCBE]',
          btnSecondary: 'bg-white/10 hover:bg-white/15 text-white border-white/20',
          specLine: 'border-[#362C26]',
          itemBg: 'bg-[#241E1A]',
        };
      case 'forest':
        return {
          isDark: true,
          bg: 'bg-[#112016]',
          text: 'text-[#ECF1EC]',
          border: 'border-[#233829]',
          subtleBg: 'bg-[#172A1E]',
          cardBg: 'bg-[#15261B]',
          cardBorder: 'border-[#2C4634]',
          mutedText: 'text-[#9CB0A1]',
          tagBg: 'bg-[#1A3122]',
          tagBorder: 'border-[#32523A]',
          tagText: 'text-[#DDE7DE]',
          btnSecondary: 'bg-white/10 hover:bg-white/15 text-white border-white/20',
          specLine: 'border-[#233829]',
          itemBg: 'bg-[#172A1E]',
        };
      case 'indigo':
        return {
          isDark: true,
          bg: 'bg-[#101824]',
          text: 'text-[#F2F5F8]',
          border: 'border-[#223145]',
          subtleBg: 'bg-[#172130]',
          cardBg: 'bg-[#151E2B]',
          cardBorder: 'border-[#2A3B52]',
          mutedText: 'text-[#9EAEBF]',
          tagBg: 'bg-[#1B2738]',
          tagBorder: 'border-[#2E435E]',
          tagText: 'text-[#E1EAF2]',
          btnSecondary: 'bg-white/10 hover:bg-white/15 text-white border-white/20',
          specLine: 'border-[#223145]',
          itemBg: 'bg-[#172130]',
        };
      case 'terracotta':
        return {
          isDark: true,
          bg: 'bg-[#1E1715]',
          text: 'text-[#F4EDE4]',
          border: 'border-[#3D302B]',
          subtleBg: 'bg-[#291F1C]',
          cardBg: 'bg-[#241C19]',
          cardBorder: 'border-[#463732]',
          mutedText: 'text-[#BFAFA7]',
          tagBg: 'bg-[#302521]',
          tagBorder: 'border-[#4F3E38]',
          tagText: 'text-[#EFE5DC]',
          btnSecondary: 'bg-white/10 hover:bg-white/15 text-white border-white/20',
          specLine: 'border-[#3D302B]',
          itemBg: 'bg-[#291F1C]',
        };
      case 'sandstone':
        return {
          isDark: false,
          bg: 'bg-[#F2E8DC]',
          text: 'text-[#241E19]',
          border: 'border-[#DCD0BE]',
          subtleBg: 'bg-[#E6D9C8]',
          cardBg: 'bg-[#F7EFE4]',
          cardBorder: 'border-[#D9CCB7]',
          mutedText: 'text-[#6E6256]',
          tagBg: 'bg-[#E8DCCB]',
          tagBorder: 'border-[#CFC0AA]',
          tagText: 'text-[#3E342B]',
          btnSecondary: 'bg-black/5 hover:bg-black/10 text-[#241E19] border-[#D9CCB7]',
          specLine: 'border-[#DCD0BE]',
          itemBg: 'bg-[#E6D9C8]',
        };
      case 'sandalwood':
        return {
          isDark: false,
          bg: 'bg-[#F7EFE1]',
          text: 'text-[#26211C]',
          border: 'border-[#DDD0BA]',
          subtleBg: 'bg-[#EFE4D0]',
          cardBg: 'bg-[#FAF4E8]',
          cardBorder: 'border-[#DBCDB4]',
          mutedText: 'text-[#6D6357]',
          tagBg: 'bg-[#ECE0CC]',
          tagBorder: 'border-[#D4C3A7]',
          tagText: 'text-[#42392F]',
          btnSecondary: 'bg-black/5 hover:bg-black/10 text-[#26211C] border-[#DBCDB4]',
          specLine: 'border-[#DDD0BA]',
          itemBg: 'bg-[#EFE4D0]',
        };
      case 'multani':
        return {
          isDark: false,
          bg: 'bg-[#EDE6DA]',
          text: 'text-[#231F1C]',
          border: 'border-[#D6CABE]',
          subtleBg: 'bg-[#DFD3C4]',
          cardBg: 'bg-[#F4ECE1]',
          cardBorder: 'border-[#D5C7B7]',
          mutedText: 'text-[#6B6259]',
          tagBg: 'bg-[#DDD1C1]',
          tagBorder: 'border-[#C8B8A4]',
          tagText: 'text-[#3B342D]',
          btnSecondary: 'bg-black/5 hover:bg-black/10 text-[#231F1C] border-[#D5C7B7]',
          specLine: 'border-[#D6CABE]',
          itemBg: 'bg-[#DFD3C4]',
        };
      case 'linen':
        return {
          isDark: false,
          bg: 'bg-[#F6F3ED]',
          text: 'text-[#22201D]',
          border: 'border-[#DDD6CB]',
          subtleBg: 'bg-[#EDE7DC]',
          cardBg: 'bg-[#FAF7F2]',
          cardBorder: 'border-[#DCD4C7]',
          mutedText: 'text-[#6A645C]',
          tagBg: 'bg-[#E8E2D6]',
          tagBorder: 'border-[#CFC5B6]',
          tagText: 'text-[#3A3631]',
          btnSecondary: 'bg-black/5 hover:bg-black/10 text-[#22201D] border-[#DCD4C7]',
          specLine: 'border-[#DDD6CB]',
          itemBg: 'bg-[#EDE7DC]',
        };
      case 'bone':
      default:
        return {
          isDark: false,
          bg: 'bg-[#FFFFFF]',
          text: 'text-[#141413]',
          border: 'border-[#E5E0D8]',
          subtleBg: 'bg-[#FAF8F5]',
          cardBg: 'bg-[#FFFFFF]',
          cardBorder: 'border-[#E5E0D8]',
          mutedText: 'text-[#69645E]',
          tagBg: 'bg-[#F2EFE9]',
          tagBorder: 'border-[#D8D4CC]',
          tagText: 'text-[#2C2926]',
          btnSecondary: 'bg-[#FAF8F5] hover:bg-white text-[#141413] border-[#D8D4CE]',
          specLine: 'border-[#E5E0D8]',
          itemBg: 'bg-[#FAF8F5]',
        };
    }
  };

  const theme = getThemeClasses();

  const getDisplayFontClass = () => {
    switch (typography) {
      case 'cormorant':
        return 'font-cormorant italic font-normal';
      case 'playfair':
        return 'font-playfair font-normal';
      case 'cinzel':
        return 'font-cinzel uppercase font-semibold tracking-[0.14em]';
      case 'syne':
        return 'font-syne uppercase font-bold tracking-tight';
      case 'space':
        return 'font-jetbrains uppercase tracking-tight font-medium';
      case 'baskerville':
        return 'font-baskerville font-normal';
      case 'bodoni':
        return 'font-bodoni font-normal tracking-wide';
      default:
        return 'font-cormorant italic font-normal';
    }
  };

  const getHeaderFontClass = () => getDisplayFontClass();

  const getAspectClass = () => {
    if (aspectRatio === '1:1') return 'aspect-square';
    if (aspectRatio === '16:10') return 'aspect-[16/10]';
    if (aspectRatio === '3:4') return 'aspect-[3/4]';
    if (aspectRatio === '2:3') return 'aspect-[2/3]';
    if (aspectRatio === '5:4') return 'aspect-[5/4]';
    return 'aspect-[4/3]';
  };

  const getCardElevationClass = () => {
    if (borderStyle === 'matting') return 'border-2 p-3 sm:p-5 ring-1 ring-black/10';
    if (borderStyle === 'flush') return 'border-none p-0 shadow-none';
    if (borderStyle === 'float') return 'border shadow-md hover:shadow-lg transition-shadow p-3 sm:p-5';
    if (borderStyle === 'rivets') return 'border border-dashed p-3 sm:p-5 relative';
    return 'border p-3 sm:p-5';
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://atelier.art/@${customHandle}`);
    showToast(`Copied portfolio link: https://atelier.art/@${customHandle}`);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setActiveInquiryArtwork(null);
      setInquiryName('');
      setInquiryCity('');
      setInquiryMessage('');
      showToast('Inquiry relayed to studio! Mobile numbers protected.');
    }, 1200);
  };

  const handleSendBespokeInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setBespokeSent(true);
    setTimeout(() => {
      setBespokeSent(false);
      setIsBespokeModalOpen(false);
      setBespokeClientName('');
      setBespokeClientCity('');
      setBespokeScope('');
      showToast('Bespoke project brief submitted with 50% milestone escrow protection!');
    }, 1200);
  };

  const handleAddArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtTitle) return;
    const newItem: CatalogItem = {
      id: `CUSTOM-${Date.now()}`,
      title: newArtTitle,
      category: newArtCategory,
      medium: newArtMedium || 'Handcrafted Mixed Material',
      dims: newArtDims || 'Custom Scale',
      year: '2026',
      price: parseInt(newArtPrice) || 10000,
      status: 'Available',
      editionInfo: newArtEdition,
      img: newArtImg
    };
    setArtworksList(prev => [newItem, ...prev]);
    setIsAddArtworkOpen(false);
    setNewArtTitle('');
    setNewArtMedium('');
    setNewArtDims('');
    showToast(`Added "${newItem.title}" to Studio Catalog!`);
  };

  const handleRemoveArtwork = (id: string) => {
    setArtworksList(prev => prev.filter(item => item.id !== id));
    showToast('Artwork removed from catalog.');
  };

  const currentMasterworkImg = () => {
    if (masterworkAngle === 'texture') return masterworkImgTexture;
    if (masterworkAngle === 'profile') return masterworkImgProfile;
    if (masterworkAngle === 'spatial') return masterworkImgSpatial;
    return masterworkImgFront;
  };

  return (
    // Height capped to the window below the fixed studio header (h-16) so the
    // workspace never grows past the viewport — preview + controls scroll internally.
    <div className="h-[calc(100vh-4rem)] bg-[#F4F1EA] flex flex-col overflow-hidden text-[#141413]">
      
      {/* ROW 1: ACTIVE WORKSPACE & GLOBAL STATUS BAR */}
      <div className="h-10 bg-white border-b border-[#E7E4DF] px-3 sm:px-6 flex items-center justify-between shrink-0 select-none z-30">
        {/* Left: Active Workspace Pill */}
        <div className="border border-[#D4D0C8] bg-transparent px-2 sm:px-2.5 py-1 rounded-xs flex items-center gap-1.5 sm:gap-2 shrink min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#A84A28] shrink-0"></span>
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#4A4744] font-medium truncate">
            <span className="hidden xs:inline">ACTIVE WORKSPACE: </span>ELENA VANCE
          </span>
        </div>

        {/* Right: View Public Portfolio, Notifications, User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              setIsPreviewExpanded(true);
              showToast('Viewing Public Portfolio');
            }}
            className="text-[11px] sm:text-xs font-mono font-medium tracking-wider text-[#2D2A28] hover:text-black flex items-center gap-1 transition-colors cursor-pointer mr-0.5 sm:mr-2"
            title="Open Public Portfolio"
          >
            <span className="hidden sm:inline">VIEW PUBLIC PORTFOLIO</span>
            <span className="sm:hidden">PUBLIC PORTFOLIO</span>
            <span className="text-xs sm:text-sm">↗</span>
          </button>

          <button
            onClick={() => showToast('All notifications caught up')}
            className="relative p-1 text-[#5A5754] hover:text-[#141413] transition-colors cursor-pointer"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#C85A32] ring-2 ring-white"></span>
          </button>

          <div
            className="w-7 h-7 rounded-full bg-[#8C3A27] text-white flex items-center justify-center font-medium text-xs shadow-xs cursor-pointer select-none shrink-0"
            title="Elena Vance (Active Studio)"
          >
            <span className="material-symbols-outlined text-[16px]">person</span>
          </div>
        </div>
      </div>

      {/* ROW 2: SUB-HEADER TOOLBAR & PREVIEW CONTROLLER */}
      <div className="h-14 bg-white border-b border-[#E7E4DF] px-3 sm:px-6 flex items-center justify-between shrink-0 select-none z-20 gap-2">
        
        {/* Brand & Breadcrumbs */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink min-w-0">
          <button
            onClick={() => onNavigate('studio-overview')}
            className="flex items-center gap-1 text-xs sm:text-sm font-sans text-[#716E68] hover:text-[#141413] transition-colors cursor-pointer shrink-0"
            title="Back to Studio Hub"
          >
            <span className="text-base leading-none">←</span>
            <span className="hidden xs:inline">Studio Hub</span>
          </button>
          <span className="text-[#D0C8B8] shrink-0">/</span>
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="font-sans font-bold text-xs sm:text-base text-[#141413] tracking-tight truncate">
              Portfolio Customiser
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF7EE] text-[#1E7E34] border border-[#BDE3C6] text-xs font-sans font-medium shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]"></span>
              Live Sync Active
            </span>
          </div>
        </div>

        {/* Viewport Screen Switcher (Mobile, Tablet, Desktop) on Desktop/Tablet */}
        <div className="hidden md:flex items-center bg-[#FAF9F6] border border-[#D8D4CE] p-0.5 rounded-md shadow-xs shrink-0">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`px-2.5 lg:px-3 py-1 text-xs font-sans font-medium rounded flex items-center gap-1.5 transition-all cursor-pointer ${
              viewportMode === 'desktop'
                ? 'bg-white text-[#141413] shadow-xs border border-[#D8D4CE]/70 font-semibold'
                : 'text-[#706C66] hover:text-[#141413]'
            }`}
            title="Desktop 1440px"
          >
            <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
            <span>Desktop</span>
          </button>

          <button
            onClick={() => setViewportMode('tablet')}
            className={`px-2.5 lg:px-3 py-1 text-xs font-sans font-medium rounded flex items-center gap-1.5 transition-all cursor-pointer ${
              viewportMode === 'tablet'
                ? 'bg-white text-[#141413] shadow-xs border border-[#D8D4CE]/70 font-semibold'
                : 'text-[#706C66] hover:text-[#141413]'
            }`}
            title="Tablet 768px"
          >
            <span className="material-symbols-outlined text-[15px]">tablet_mac</span>
            <span>Tablet</span>
          </button>

          <button
            onClick={() => setViewportMode('mobile')}
            className={`px-2.5 lg:px-3 py-1 text-xs font-sans font-medium rounded flex items-center gap-1.5 transition-all cursor-pointer ${
              viewportMode === 'mobile'
                ? 'bg-white text-[#141413] shadow-xs border border-[#D8D4CE]/70 font-semibold'
                : 'text-[#706C66] hover:text-[#141413]'
            }`}
            title="Mobile 390px"
          >
            <span className="material-symbols-outlined text-[15px]">stay_current_portrait</span>
            <span>Mobile</span>
          </button>
        </div>

        {/* Small Screen Tab Switcher (Preview on Left, Controls on Right) */}
        <div className="flex lg:hidden items-center bg-[#FAF9F6] border border-[#D8D4CE] p-0.5 rounded-md shrink-0">
          <button
            onClick={() => setHostSmallScreenTab('preview')}
            className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-mono cursor-pointer rounded transition-all ${
              hostSmallScreenTab === 'preview' ? 'bg-white text-[#141413] font-semibold shadow-xs' : 'text-[#716E68]'
            }`}
          >
            Live Canvas
          </button>
          <button
            onClick={() => setHostSmallScreenTab('controls')}
            className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-mono cursor-pointer rounded transition-all ${
              hostSmallScreenTab === 'controls' ? 'bg-white text-[#141413] font-semibold shadow-xs' : 'text-[#716E68]'
            }`}
          >
            Customiser
          </button>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Copy Public Link */}
          <button
            onClick={handleCopyLink}
            className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-white hover:bg-[#FAF9F6] border border-[#D8D4CE] text-[#2C2A29] text-xs font-sans font-medium rounded-md shadow-xs transition-colors cursor-pointer"
            title="Copy Public Link"
          >
            <span className="material-symbols-outlined text-[15px]">link</span>
            <span className="whitespace-nowrap">Copy Link</span>
          </button>

          {/* Expand Full Preview (Hidden on small mobile screens where toggle handles view) */}
          <button
            onClick={() => {
              setIsPreviewExpanded(!isPreviewExpanded);
              showToast(isPreviewExpanded ? 'Split Studio view' : 'Expanded Full Preview');
            }}
            className="hidden sm:flex w-8 h-8 items-center justify-center bg-white hover:bg-[#FAF9F6] border border-[#D8D4CE] text-[#2C2A29] rounded-md shadow-xs transition-colors cursor-pointer shrink-0"
            title={isPreviewExpanded ? 'Split Controls' : 'Expand Preview'}
          >
            <span className="material-symbols-outlined text-[18px] block">
              {isPreviewExpanded ? 'splitscreen' : 'fullscreen'}
            </span>
          </button>

          {/* Publish Site Button */}
          <button 
            onClick={() => showToast('Portfolio Published! Changes live on your public handle.')} 
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#0F3B4C] hover:bg-[#0B2E3D] text-white rounded-md font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 shadow-xs transition-all cursor-pointer shrink-0"
          >
            <span className="whitespace-nowrap">PUBLISH<span className="hidden xs:inline"> SITE</span></span>
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white/80 shrink-0"></span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 right-4 sm:right-6 z-50 bg-[#141413] text-white px-4 py-2.5 shadow-xl font-mono text-xs flex items-center gap-2.5 border border-white/20 animate-fade-in max-w-sm">
          <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN STUDIO WORKSPACE */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 relative flex-1 min-h-0 min-w-0 overflow-hidden">
        
        {/* LEFT PANEL: LIVE RESPONSIVE PREVIEW CANVAS */}
        <div className={`col-span-1 ${isPreviewExpanded ? 'lg:col-span-12' : 'lg:col-span-7 xl:col-span-8 border-r border-[#E7E4DF]'} bg-[#EBE8E2] overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 lg:p-8 transition-all ${hostSmallScreenTab !== 'preview' && !isPreviewExpanded ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Responsive Device Mockup Container */}
          <div
            id="portfolio-mockup-frame"
            className={`transition-all duration-300 shadow-2xl bg-white flex flex-col shrink-0 relative overflow-hidden ${
              isMobileViewport
                ? 'w-[390px] max-w-full rounded-[40px] border-[10px] border-[#181715]'
                : isTabletViewport
                ? 'w-[768px] max-w-full rounded-[24px] border-[8px] border-[#22211F]'
                : 'w-[1240px] max-w-full rounded-md border border-[#D5D0C7]'
            }`}
          >
            
            {/* Top Device Chrome */}
            {isMobileViewport && (
              <div className="bg-[#181715] text-white px-6 pt-3 pb-2 flex flex-col items-center select-none shrink-0 z-30">
                <div className="w-full flex items-center justify-between text-[11px] font-mono opacity-80 px-1">
                  <span>9:41</span>
                  {/* Dynamic Island */}
                  <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center gap-1.5 shadow-inner">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-white/20"></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">wifi</span>
                    <span className="material-symbols-outlined text-[13px]">battery_full</span>
                  </div>
                </div>
                {/* Mobile URL Bar */}
                <div className="w-full mt-2 bg-white/10 rounded-full px-3 py-1 flex items-center justify-between text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="material-symbols-outlined text-[11px] text-emerald-400">lock</span>
                    <span className="truncate">atelier.art/@{customHandle}</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-1.5 rounded-full">
                    Protected
                  </span>
                </div>
              </div>
            )}

            {isTabletViewport && (
              <div className="h-9 bg-[#FAF8F5] border-b border-[#E7E4DF] px-4 flex items-center justify-between select-none shrink-0 z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E7E4DF]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#E7E4DF]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#E7E4DF]"></span>
                  <span className="h-3 w-px bg-[#E7E4DF] mx-1"></span>
                  <span className="material-symbols-outlined text-[13px] text-emerald-700">lock</span>
                  <span className="font-mono text-[10px] text-[#141413]">
                    atelier.art/@{customHandle} · iPad Edition
                  </span>
                </div>
                <span className="font-mono text-[9px] bg-[#141413] text-white px-2 py-0.5 rounded-xs uppercase tracking-wider font-semibold">
                  768px Tablet
                </span>
              </div>
            )}

            {!isMobileViewport && !isTabletViewport && (
              <div className="h-10 bg-[#FAF8F5] border-b border-[#E7E4DF] px-4 flex items-center justify-between select-none shrink-0 z-20">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E7E4DF]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E7E4DF]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E7E4DF]"></span>
                  <span className="h-3.5 w-px bg-[#E7E4DF] mx-1"></span>
                  <span className="material-symbols-outlined text-[14px] text-emerald-700 shrink-0">lock</span>
                  <span className="font-mono text-[11px] text-[#141413] font-medium truncate">
                    atelier.art/@{customHandle}?view={archetype}&palette={canvasColor}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 font-semibold">
                    Atelier Escrow Verified
                  </span>
                  <span className="font-mono text-[9px] bg-[#141413] text-white px-2 py-0.5 uppercase tracking-wider font-semibold">
                    1440px Desktop
                  </span>
                </div>
              </div>
            )}

            {/* LIVE PORTFOLIO CONTENT (Simulated website with real professional market styling) */}
            <div className={`overflow-visible transition-colors duration-300 ${theme.bg} ${theme.text}`}>
              <div className={`space-y-12 sm:space-y-16 ${isMobileViewport ? 'p-4 sm:p-5' : isTabletViewport ? 'p-6 sm:p-8' : 'p-8 sm:p-14'}`}>
                
                {/* 1. Header Navigation & Hero */}
                {toggles.showHeroSection && (
                  <>
                    {/* Archetype-Specific Top Navigation Bar */}
                    {archetype === 'monograph' ? (
                      <header className={`border-b ${theme.border} pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 select-none`}>
                        <div className="space-y-1">
                          {toggles.devanagariScript && (
                            <span className="font-serif text-xs text-[#C25E3E] tracking-widest uppercase block">
                              {customHindiTitle}
                            </span>
                          )}
                          <h1 className={`font-bold tracking-tight ${getDisplayFontClass()} ${isMobileViewport ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
                            {customStudioName}
                          </h1>
                          <p className={`font-sans text-xs ${theme.mutedText}`}>
                            {customArtistName} · {toggles.maskExactAddress ? customLocation : `${customLocation} (Studio Direct)`}
                          </p>
                        </div>

                        {/* Quiet Monograph Navigation */}
                        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                          <a href="#works" className={`${theme.mutedText} hover:${theme.text} transition-colors`}>Works</a>
                          <span className={theme.mutedText}>·</span>
                          <a href="#about" className={`${theme.mutedText} hover:${theme.text} transition-colors`}>Provenance</a>
                          <span className={theme.mutedText}>·</span>
                          <a href="#contact" className={`${theme.mutedText} hover:${theme.text} transition-colors`}>Inquiries</a>
                          {toggles.escrowBadge && (
                            <span className={`font-mono text-[10px] px-2 py-0.5 border ${theme.tagBg} ${theme.tagBorder} ${theme.tagText}`}>
                              50% Escrow
                            </span>
                          )}
                        </div>
                      </header>
                    ) : archetype === 'grid' ? (
                      <header className={`border-b ${theme.border} pb-4 flex flex-col items-center text-center gap-2 select-none`}>
                        {toggles.devanagariScript && (
                          <span className="font-serif text-xs text-[#C25E3E] tracking-widest uppercase">
                            {customHindiTitle}
                          </span>
                        )}
                        <h1 className={`font-bold tracking-tight ${getDisplayFontClass()} ${isMobileViewport ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
                          {customStudioName}
                        </h1>
                        <div className={`flex items-center gap-2 text-xs font-mono ${theme.mutedText}`}>
                          <span>{customDiscipline}</span>
                          <span>·</span>
                          <span>{toggles.maskExactAddress ? customLocation : `${customLocation} Studio`}</span>
                          {bespokeAccepting && toggles.commissionStatus && (
                            <>
                              <span>·</span>
                              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">● Commissions Open</span>
                            </>
                          )}
                        </div>
                      </header>
                    ) : (
                      /* Story Documentary Header */
                      <header className={`border-b ${theme.border} pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 select-none`}>
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-medium">
                            Artisan Studio Documentary · {customLocation}
                          </span>
                          <h1 className={`font-bold tracking-tight ${getDisplayFontClass()} ${isMobileViewport ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
                            {customStudioName}
                          </h1>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono">
                          {toggles.craftMasterBadge && (
                            <span className={`px-2 py-0.5 border ${theme.tagBg} ${theme.tagBorder} ${theme.tagText} text-[10px]`}>
                              ★ {guildTag.split('·')[0]}
                            </span>
                          )}
                          {toggles.escrowBadge && (
                            <span className="font-mono text-[10px] text-[#C25E3E] bg-[#C25E3E]/10 border border-[#C25E3E]/30 px-2 py-0.5">
                              Escrow Protected
                            </span>
                          )}
                        </div>
                      </header>
                    )}

                    {/* Hero Statement Section */}
                    <section className={`space-y-4 ${archetype === 'grid' ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'}`}>
                      <div className="flex items-center gap-2">
                        {archetype === 'monograph' && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C25E3E] font-semibold">
                            Catalogue Raisonné · 2026 Archive
                          </span>
                        )}
                        {archetype === 'story' && (
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold">
                            Generational Studio Craft · {customDiscipline}
                          </span>
                        )}
                      </div>

                      <h2 className={`text-xl sm:text-2xl md:text-3xl leading-snug font-serif ${getDisplayFontClass()}`}>
                        {customHeadline}
                      </h2>
                      
                      <p className={`font-sans text-xs sm:text-sm leading-relaxed ${theme.mutedText}`}>
                        {customSubheadline}
                      </p>

                      <div className={`pt-2 flex items-center gap-3 ${archetype === 'grid' ? 'justify-center' : ''}`}>
                        <button
                          onClick={() => setActiveInquiryArtwork(masterworkTitle)}
                          style={{ backgroundColor: accentColor }}
                          className="px-5 py-2.5 text-white font-mono text-xs uppercase tracking-wider shadow-xs font-semibold cursor-pointer transition-transform hover:scale-[1.02]"
                        >
                          {heroCtaLabel}
                        </button>
                        {bespokeAccepting && (
                          <button
                            onClick={() => setIsBespokeModalOpen(true)}
                            className={`px-4 py-2.5 border font-mono text-xs uppercase tracking-wider cursor-pointer ${theme.btnSecondary}`}
                          >
                            Request Bespoke Project
                          </button>
                        )}
                      </div>
                    </section>
                  </>
                )}

                {/* 2. Hero Masterwork Showcase / Featured Work */}
                {toggles.showFeaturedWorkSection && (
                  <section className={`${getCardElevationClass()} ${theme.cardBorder} ${theme.cardBg} space-y-6 shadow-sm`}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b pb-3 gap-2" style={{ borderColor: 'inherit' }}>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E]">
                          {archetype === 'monograph' ? 'Plate I — Curated Masterwork' : archetype === 'story' ? 'Kiln Fired Centerpiece' : 'Featured Masterwork'}
                        </span>
                        <h3 className={`font-serif text-2xl font-bold ${getDisplayFontClass()} ${theme.text}`}>{masterworkTitle}</h3>
                        <p className={`font-sans text-xs ${theme.mutedText}`}>{masterworkSpecs}</p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        {pricingMode === 'transparent' ? (
                          <span className={`font-serif text-xl sm:text-2xl font-bold ${theme.text}`}>
                            ₹{masterworkPrice.toLocaleString('en-IN')}
                          </span>
                        ) : pricingMode === 'range' ? (
                          <span className={`font-serif text-base sm:text-lg font-bold ${theme.text}`}>
                            ₹{Math.round(masterworkPrice * 0.9).toLocaleString('en-IN')} — ₹{Math.round(masterworkPrice * 1.15).toLocaleString('en-IN')}
                          </span>
                        ) : (
                          <span className={`font-mono text-xs uppercase px-2.5 py-1 border ${theme.tagBg} ${theme.tagBorder} ${theme.mutedText}`}>
                            Price on Inquiry
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      <div className={`lg:col-span-8 ${theme.subtleBg} p-2.5 border ${theme.border} overflow-hidden`}>
                        <div 
                          className={`${getAspectClass()} bg-black/10 overflow-hidden relative cursor-pointer group`}
                          onClick={() => setZoomedImage({ url: currentMasterworkImg(), title: masterworkTitle, specs: masterworkSpecs })}
                        >
                          <img
                            src={currentMasterworkImg()}
                            alt={masterworkTitle}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          {toggles.watermarkProtection && (
                            <div className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-widest text-white/80 bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                              © {customStudioName} Sovereign Archive
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[9px] px-2.5 py-1 flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[13px]">zoom_in</span>
                            <span>Click to Inspect High-Res</span>
                          </div>
                        </div>

                        {/* 4 Interactive Viewing Angles */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-2.5">
                          {[
                            { id: 'front', label: 'Front View' },
                            { id: 'texture', label: 'Craft Texture' },
                            { id: 'profile', label: 'Side Scale' },
                            { id: 'spatial', label: 'In Architecture' },
                          ].map(angle => (
                            <button
                              key={angle.id}
                              onClick={() => setMasterworkAngle(angle.id as any)}
                              className={`py-1.5 text-[10px] font-mono uppercase border transition-colors cursor-pointer text-center ${
                                masterworkAngle === angle.id
                                  ? 'bg-black text-white dark:bg-white dark:text-black border-transparent font-bold'
                                  : `${theme.cardBg} ${theme.mutedText} ${theme.border} hover:border-black dark:hover:border-white`
                              }`}
                            >
                              {angle.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Technical Specs & Provenance */}
                      <div className="lg:col-span-4 space-y-4">
                        <div className="space-y-2 text-xs">
                          <div className={`flex justify-between border-b pb-1.5 ${theme.specLine}`}>
                            <span className={`font-mono text-[10px] uppercase ${theme.mutedText}`}>Dimensions</span>
                            <span className={`font-mono font-medium ${theme.text}`}>{masterworkDims}</span>
                          </div>
                          <div className={`flex justify-between border-b pb-1.5 ${theme.specLine}`}>
                            <span className={`font-mono text-[10px] uppercase ${theme.mutedText}`}>Weight</span>
                            <span className={`font-mono font-medium ${theme.text}`}>{masterworkWeight}</span>
                          </div>
                          <div className={`flex justify-between border-b pb-1.5 ${theme.specLine}`}>
                            <span className={`font-mono text-[10px] uppercase ${theme.mutedText}`}>Craft Cycle</span>
                            <span className={`font-sans ${theme.text}`}>{masterworkFiring}</span>
                          </div>
                          <div className={`flex justify-between border-b pb-1.5 ${theme.specLine}`}>
                            <span className={`font-mono text-[10px] uppercase ${theme.mutedText}`}>Provenance</span>
                            <span className={`font-sans text-right ${theme.text}`}>{masterworkProvenance}</span>
                          </div>
                          {toggles.insuredTransitBadge && (
                            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono pt-1">
                              <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                              <span>Insured All-India Fine Art Transit</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2 pt-2">
                          {toggles.inAppInquiryShield && (
                            <button
                              onClick={() => setActiveInquiryArtwork(masterworkTitle)}
                              style={{ backgroundColor: accentColor }}
                              className="w-full text-white py-2.5 px-4 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs font-semibold hover:opacity-95"
                            >
                              <span className="material-symbols-outlined text-[16px]">chat</span>
                              <span>Inquire via Atelier (Phone Masked)</span>
                            </button>
                          )}

                          {toggles.coaSeal && (
                            <button
                              onClick={() => setCoaModalArtwork({ ...baseArtist.masterwork, title: masterworkTitle, medium: masterworkMedium })}
                              className={`w-full py-2 px-3 font-mono text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer border ${theme.btnSecondary}`}
                            >
                              <span className="material-symbols-outlined text-[15px] text-[#C25E3E]">verified</span>
                              <span>Digital COA Certificate</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* 3. Artworks Catalog & Collections */}
                {toggles.showCollectionsSection && (
                  <section id="works" className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b pb-3 gap-2" style={{ borderColor: 'inherit' }}>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-medium">{gallerySubtitle}</span>
                        <h3 className={`font-serif text-2xl font-bold ${getDisplayFontClass()} ${theme.text}`}>{galleryTitle}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs ${theme.mutedText}`}>{artworksList.length} Pieces Documented</span>
                        <button
                          onClick={() => setIsAddArtworkOpen(true)}
                          className={`px-3 py-1 border text-[10px] font-mono uppercase cursor-pointer ${theme.btnSecondary}`}
                        >
                          + Add Piece
                        </button>
                      </div>
                    </div>

                    <div className={`grid ${galleryLayout === '2-col' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-6`}>
                      {artworksList.map(item => (
                        <div key={item.id} className={`${getCardElevationClass()} ${theme.cardBorder} ${theme.cardBg} space-y-3 flex flex-col justify-between shadow-2xs`}>
                          <div className="space-y-2.5">
                            <div 
                              className={`${getAspectClass()} bg-black/10 overflow-hidden cursor-pointer relative group`}
                              onClick={() => setZoomedImage({ url: item.img, title: item.title, specs: item.medium })}
                            >
                              <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-2 right-2 bg-black/80 text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider">
                                {item.category}
                              </div>
                            </div>

                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h4 className={`font-serif text-base font-semibold ${theme.text}`}>{item.title}</h4>
                                {pricingMode === 'transparent' ? (
                                  <span className={`font-serif text-sm font-bold ${theme.text} shrink-0`}>
                                    ₹{item.price.toLocaleString('en-IN')}
                                  </span>
                                ) : pricingMode === 'range' ? (
                                  <span className={`font-serif text-xs font-bold ${theme.text} shrink-0`}>
                                    ₹{Math.round(item.price * 0.9).toLocaleString('en-IN')}+
                                  </span>
                                ) : (
                                  <span className={`font-mono text-[10px] ${theme.mutedText} shrink-0`}>On Inquiry</span>
                                )}
                              </div>
                              <p className={`font-sans text-xs ${theme.mutedText} pt-0.5 leading-relaxed`}>{item.medium}</p>
                              <p className={`font-mono text-[10px] ${theme.mutedText} pt-1`}>{item.dims} · {item.year}</p>
                            </div>
                          </div>

                          <div className={`pt-2.5 border-t ${theme.border} space-y-2`}>
                            {toggles.limitedEditionsStock && item.editionInfo && (
                              <div className="font-mono text-[10px] text-[#C25E3E] font-medium">
                                {item.editionInfo}
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setActiveInquiryArtwork(item.title)}
                                style={{ backgroundColor: accentColor }}
                                className="flex-1 py-1.5 px-2 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer hover:opacity-90 font-semibold text-center"
                              >
                                Inquire
                              </button>
                              {toggles.coaSeal && (
                                <button
                                  onClick={() => setCoaModalArtwork(item)}
                                  className={`p-1.5 border cursor-pointer ${theme.btnSecondary}`}
                                  title="Certificate of Authenticity"
                                >
                                  <span className="material-symbols-outlined text-[16px] block text-[#C25E3E]">verified</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 4. About & Studio Heritage */}
                {toggles.showAboutSection && (
                  <section id="about" className={`border ${theme.cardBorder} ${theme.subtleBg} p-6 sm:p-8 space-y-5`}>
                    <div className="border-b pb-3" style={{ borderColor: 'inherit' }}>
                      <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-medium tracking-wider">Materiality & Provenance</span>
                      <h3 className={`font-serif text-xl font-bold ${getDisplayFontClass()} ${theme.text}`}>{processTitle}</h3>
                      <p className={`font-sans text-xs ${theme.mutedText}`}>{processSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                      <div>
                        <span className={`font-mono text-[10px] uppercase ${theme.mutedText} block`}>{spec1Label}</span>
                        <span className={`font-sans text-xs font-semibold ${theme.text}`}>{spec1Val}</span>
                      </div>
                      <div>
                        <span className={`font-mono text-[10px] uppercase ${theme.mutedText} block`}>{spec2Label}</span>
                        <span className={`font-sans text-xs font-semibold ${theme.text}`}>{spec2Val}</span>
                      </div>
                      <div>
                        <span className={`font-mono text-[10px] uppercase ${theme.mutedText} block`}>{spec3Label}</span>
                        <span className={`font-sans text-xs font-semibold ${theme.text}`}>{spec3Val}</span>
                      </div>
                      <div>
                        <span className={`font-mono text-[10px] uppercase ${theme.mutedText} block`}>{spec4Label}</span>
                        <span className="font-sans text-xs font-semibold text-emerald-700 dark:text-emerald-400">{spec4Val}</span>
                      </div>
                    </div>

                    <p className={`font-sans text-xs leading-relaxed ${theme.text} opacity-90 pt-2 border-t ${theme.border}`}>
                      {processSummary}
                    </p>
                  </section>
                )}

                {/* 5. Commissions Section */}
                {toggles.showCommissionsSection && bespokeAccepting && (
                  <section className={`border ${theme.cardBorder} ${theme.cardBg} p-6 sm:p-8 space-y-4 shadow-xs`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 gap-2" style={{ borderColor: 'inherit' }}>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-wider">Architectural & Private Commissions</span>
                        <h3 className={`font-serif text-xl font-bold ${getDisplayFontClass()} ${theme.text}`}>{bespokeTitle}</h3>
                      </div>
                      <span className="font-mono text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/30">
                        ● Accepting Bespoke Projects
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                      <div className={`${theme.subtleBg} p-3.5 border ${theme.border}`}>
                        <span className={`font-mono text-[10px] uppercase ${theme.mutedText} block`}>Lead Time</span>
                        <span className={`font-semibold ${theme.text} mt-0.5 block`}>{bespokeLeadTime}</span>
                      </div>
                      <div className={`${theme.subtleBg} p-3.5 border ${theme.border}`}>
                        <span className={`font-mono text-[10px] uppercase ${theme.mutedText} block`}>Minimum Budget</span>
                        <span className={`font-semibold ${theme.text} mt-0.5 block`}>{bespokeMinBudget}</span>
                      </div>
                      <div className={`${theme.subtleBg} p-3.5 border ${theme.border}`}>
                        <span className={`font-mono text-[10px] uppercase ${theme.mutedText} block`}>Escrow Protection</span>
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5 block">50% Advance in Escrow</span>
                      </div>
                    </div>

                    <p className={`font-sans text-xs ${theme.mutedText} leading-relaxed`}>
                      {bespokeTerms}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => setIsBespokeModalOpen(true)}
                        style={{ backgroundColor: accentColor }}
                        className="px-5 py-2.5 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs font-semibold hover:opacity-95"
                      >
                        <span className="material-symbols-outlined text-[16px]">draw</span>
                        <span>{bespokeCtaLabel}</span>
                      </button>
                    </div>
                  </section>
                )}

                {/* 6. Contact & Footer */}
                {toggles.showContactSection && (
                  <footer id="contact" className={`border-t ${theme.border} pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono ${theme.mutedText}`}>
                    <div>
                      <span className={theme.text}>© {customStudioName} · Atelier Verified Independent Studio</span>
                      {toggles.studioVisitPolicy && (
                        <span className={`block text-[11px] pt-0.5 ${theme.mutedText}`}>
                          {visitPolicyText}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5">
                        Phone Masked · In-App Inquiry Hub
                      </span>
                    </div>
                  </footer>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: 6 Collapsible Panels (Templates, Content, Section, Theme, Typography, Contact & Privacy) */}
        {(!isPreviewExpanded) && (
          <div className={`lg:col-span-5 xl:col-span-4 bg-white border border-[#E7E4DF] shadow-xs rounded-lg m-2.5 sm:m-4 lg:my-4 lg:mr-4 lg:ml-0 flex flex-col h-[calc(100vh-7.5rem)] lg:h-auto lg:max-h-[calc(100vh-8rem)] overflow-hidden ${hostSmallScreenTab !== 'controls' ? 'hidden lg:flex' : 'flex'}`}>
            
            {/* VERTICAL COLLAPSIBLE SECTIONS */}
            <div className="flex-1 overflow-y-auto">
              
              {/* SECTION: SECTION */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('section')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#A25838]">
                      <span className="material-symbols-outlined text-[20px]">table_rows</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        Section
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight">
                        Choose which parts of your portfolio are visible
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.section ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.section && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F2EFE9] bg-white">
                    <div className="space-y-4">
                      <div className="border-b border-[#E7E4DF] pb-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">Section Architecture</span>
                        <h3 className="font-serif text-lg text-[#141413]">Portfolio Section Visibility & Layout</h3>
                        <p className="font-sans text-xs text-[#716E68] mt-0.5">
                          Choose which parts of your portfolio are visible and select your market layout archetype.
                        </p>
                      </div>

                      {/* Layout Archetype Selector */}
                      <div className="bg-[#FAF8F5] p-3 border border-[#E7E4DF] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs uppercase text-[#141413] font-bold">
                            Layout Archetype Architecture
                          </span>
                          <span className="font-mono text-[10px] text-[#C25E3E] uppercase font-semibold">
                            {archetype} active
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-[#716E68]">
                          Structural layout engines modeled after award-winning market portfolios:
                        </p>
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          {[
                            { id: 'monograph', label: 'Monograph', desc: 'Archival Plate & Editorial Monogram' },
                            { id: 'grid', label: 'Salon Grid', desc: 'Balanced Contemporary Art Salon' },
                            { id: 'story', label: 'Craft Story', desc: 'Documentary Kiln & Studio Journal' },
                          ].map(arch => (
                            <button
                              key={arch.id}
                              onClick={() => {
                                setArchetype(arch.id as any);
                                showToast(`Applied ${arch.label} Archetype`);
                              }}
                              className={`p-2 border text-center transition-all cursor-pointer ${
                                archetype === arch.id ? 'border-[#141413] bg-white ring-1 ring-black font-semibold shadow-2xs' : 'border-[#E7E4DF] bg-[#FAF8F5] hover:bg-white'
                              }`}
                            >
                              <span className="font-mono text-xs block font-bold text-[#141413]">{arch.label}</span>
                              <span className="font-sans text-[9px] text-[#716E68] block mt-0.5">{arch.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        {[
                          { key: "showHeroSection" as keyof FeatureToggles, label: "Hero Section", desc: "Studio statement, title, and craft telemetry" },
                          { key: "showFeaturedWorkSection" as keyof FeatureToggles, label: "Featured Work", desc: "Curated centerpiece masterwork spotlight" },
                          { key: "showCollectionsSection" as keyof FeatureToggles, label: "Collections", desc: "Available artworks and catalog inventory" },
                          { key: "showAboutSection" as keyof FeatureToggles, label: "About & Heritage", desc: "Artisan lineage and master craft tradition" },
                          { key: "showCommissionsSection" as keyof FeatureToggles, label: "Commissions", desc: "Bespoke order inquiries and patron liaison" },
                          { key: "showContactSection" as keyof FeatureToggles, label: "Contact", desc: "Studio visit inquiries and direct liaison" },
                        ].map(sec => {
                          const enabled = toggles[sec.key];
                          return (
                            <div
                              key={sec.key}
                              onClick={() => handleToggle(sec.key)}
                              className="p-3 bg-[#FAF8F5] border border-[#E7E4DF] rounded-xs flex items-center justify-between gap-3 select-none cursor-pointer hover:bg-white transition-colors"
                            >
                              <div className="min-w-0 pr-2">
                                <span className="font-serif text-sm font-medium text-[#141413] block">{sec.label}</span>
                                <p className="font-sans text-[11px] text-[#716E68] mt-0.5">{sec.desc}</p>
                              </div>
                              <div
                                className="w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0"
                                style={{ backgroundColor: enabled ? accentColor : "#E5E2DC" }}
                              >
                                <div
                                  className="bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform"
                                  style={{ transform: enabled ? "translateX(20px)" : "translateX(0px)" }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 1: TEMPLATES */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('templates')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#A25838]">
                      <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        Templates
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight">
                        Pick a ready-made look for your portfolio
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.templates ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.templates && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F2EFE9] bg-white">
                    <div className="space-y-4">
                      <div className="border-b border-[#E7E4DF] pb-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold">
                            Master Craft Presets
                          </span>
                          <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-300 font-medium">
                            10 Available
                          </span>
                        </div>
                        <h3 className="font-serif text-lg text-[#141413] mt-0.5">Select a Handcrafted Theme</h3>
                        <p className="font-sans text-xs text-[#716E68] mt-0.5">
                          Curated Indian craft aesthetics with harmonious mineral grounds, typography pairings, and layout archetypes.
                        </p>
                      </div>

                      {/* Discipline Category Filter */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                        {['All', 'Ceramics', 'Textiles', 'Metal', 'Wood', 'Heritage Arts', 'Painting'].map(cat => (
                          <button
                            key={cat}
                            onClick={() => setTemplateFilter(cat)}
                            className={`px-2.5 py-1 font-mono text-[10px] uppercase whitespace-nowrap border transition-colors cursor-pointer ${
                              templateFilter === cat ? 'bg-[#141413] text-white border-[#141413] font-semibold' : 'bg-[#FAF8F5] text-[#716E68] border-[#E7E4DF] hover:border-black'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      
                      {/* 10 Template Cards (Compact Grid) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {filteredTemplates.map(preset => (
                          <div
                            key={preset.id}
                            onClick={() => applyTemplate(preset)}
                            className={`p-3 border transition-all cursor-pointer flex flex-col justify-between ${
                              activeTemplateId === preset.id 
                                ? 'border-[#141413] bg-[#FAF8F5] ring-1 ring-black shadow-xs' 
                                : 'border-[#E7E4DF] bg-white hover:border-[#141413]/50'
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <span className="font-serif text-xs font-bold text-[#141413] leading-tight">{preset.name}</span>
                                {activeTemplateId === preset.id && (
                                  <span className="font-mono text-[9px] bg-[#141413] text-white px-1.5 py-0.2 uppercase tracking-wider font-semibold shrink-0">Active</span>
                                )}
                              </div>
                              <span className="font-mono text-[9px] text-[#C25E3E] uppercase block mt-0.5">{preset.craftSubhead}</span>
                              <p className="font-sans text-[11px] text-[#56423d] mt-1 line-clamp-2 leading-snug">{preset.description}</p>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E7E4DF]/60">
                              <div className="flex items-center gap-1">
                                {preset.swatches.map((color, idx) => (
                                  <span key={idx} className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: color }} />
                                ))}
                              </div>
                              <span className="font-mono text-[9px] text-[#716E68] uppercase">
                                {preset.typography}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION: THEME */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('theme')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#A25838]">
                      <span className="material-symbols-outlined text-[20px]">palette</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        Theme
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight">
                        Background color, image framing, and accents
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.theme ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.theme && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F2EFE9] bg-white">
                    <div className="space-y-6">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">01 / Mineral Grounds</span>
                        <h3 className="font-serif text-lg text-[#141413]">Canvas Ground Tones (10 Mineral Palettes)</h3>
                        <p className="font-sans text-xs text-[#716E68] mt-0.5">
                          Authentic Indian mineral tones reflecting terracotta, handmade wasli, and raw silk.
                        </p>

                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {[
                            { id: "bone", label: "Kora Kagaz", bg: "#FFFFFF", desc: "Museum Bone" },
                            { id: "linen", label: "Khadi Linen", bg: "#F6F3ED", desc: "Raw Sand" },
                            { id: "multani", label: "Multani Mitti", bg: "#EDE6DA", desc: "Fuller’s Earth" },
                            { id: "sandalwood", label: "Chandan Wasli", bg: "#F7EFE1", desc: "Warm Ivory" },
                            { id: "terracotta", label: "Geru Clay", bg: "#221A18", desc: "Baked Umber" },
                            { id: "sandstone", label: "Marwar Sand", bg: "#F2E8DC", desc: "Dune Ochre" },
                            { id: "forest", label: "Pichwai Neem", bg: "#16241B", desc: "Deep Forest" },
                            { id: "teak", label: "Haveli Teak", bg: "#2A1F1B", desc: "Aged Sheesham" },
                            { id: "indigo", label: "Kashi Neel", bg: "#121A24", desc: "Deep Indigo" },
                            { id: "basalt", label: "Kajal Basalt", bg: "#141413", desc: "Charcoal Night" },
                          ].map(c => (
                            <button
                              key={c.id}
                              onClick={() => {
                                setCanvasColor(c.id as any);
                                showToast(`Ground set to ${c.label}`);
                              }}
                              className={`p-2.5 border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                                canvasColor === c.id ? "border-[#141413] ring-1 ring-black bg-[#FAF8F5]" : "border-[#E7E4DF] bg-white hover:border-[#141413]/40"
                              }`}
                            >
                              <span className="w-4 h-4 rounded-full border border-black/20 shrink-0 mt-0.5" style={{ backgroundColor: c.bg }}></span>
                              <div>
                                <div className="font-mono text-xs font-semibold text-[#141413]">{c.label}</div>
                                <div className="font-sans text-[10px] text-[#716E68]">{c.desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Image Aspect Ratio Options */}
                      <div className="border-t border-[#E7E4DF] pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">02 / Aspect Ratio</span>
                        <h3 className="font-serif text-lg text-[#141413]">Artwork Image Framing (6 Formats)</h3>

                        <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                          {[
                            { id: "4:3", label: "4:3 Classical" },
                            { id: "1:1", label: "1:1 Square" },
                            { id: "16:10", label: "16:10 Cinema" },
                            { id: "3:4", label: "3:4 Tapestry" },
                            { id: "2:3", label: "2:3 Tall" },
                            { id: "5:4", label: "5:4 Gallery" },
                          ].map(ar => (
                            <button
                              key={ar.id}
                              onClick={() => {
                                setAspectRatio(ar.id as any);
                                showToast(`Image frame: ${ar.label}`);
                              }}
                              className={`p-2 border transition-all cursor-pointer ${
                                aspectRatio === ar.id ? "border-[#141413] bg-[#FAF8F5] ring-1 ring-black font-semibold" : "border-[#E7E4DF] bg-white"
                              }`}
                            >
                              <span className="font-mono text-xs block">{ar.id}</span>
                              <span className="font-sans text-[9px] text-[#716E68]">{ar.label.split(" ")[1]}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Card Border & Matting Style */}
                      <div className="border-t border-[#E7E4DF] pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">03 / Border & Elevation</span>
                        <h3 className="font-serif text-lg text-[#141413]">Matting & Framing Architecture</h3>

                        <div className="grid grid-cols-3 gap-2 mt-3">
                          {[
                            { id: "hairline", label: "Hairline", desc: "1px clean edge" },
                            { id: "matting", label: "Gallery Mat", desc: "Framed margin" },
                            { id: "flush", label: "Borderless", desc: "Flush bleeding" },
                            { id: "float", label: "Archival Float", desc: "Soft shadow" },
                            { id: "rivets", label: "Brass Rivets", desc: "Corner studs" },
                          ].map(b => (
                            <button
                              key={b.id}
                              onClick={() => {
                                setBorderStyle(b.id as any);
                                showToast(`Border style: ${b.label}`);
                              }}
                              className={`p-2 border text-center transition-all cursor-pointer ${
                                borderStyle === b.id ? "border-[#141413] bg-[#FAF8F5] ring-1 ring-black font-semibold" : "border-[#E7E4DF] bg-white"
                              }`}
                            >
                              <span className="font-mono text-xs block">{b.label}</span>
                              <span className="font-sans text-[10px] text-[#716E68]">{b.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Accent Color Palettes */}
                      <div className="border-t border-[#E7E4DF] pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">04 / Accents</span>
                        <h3 className="font-serif text-lg text-[#141413]">Heritage Mineral Accents</h3>

                        <div className="flex items-center gap-2.5 mt-3 flex-wrap">
                          {[
                            { color: "#C25E3E", label: "Terracotta Oxide" },
                            { color: "#2B4C6F", label: "Kashi Indigo" },
                            { color: "#C89D55", label: "Bell Metal Gold" },
                            { color: "#3F5342", label: "Forest Neem Green" },
                            { color: "#B8860B", label: "Kishangarh 24k Gold" },
                            { color: "#D9531E", label: "Kutch Rogan Ochre" },
                            { color: "#943826", label: "Bengal Madder Red" },
                            { color: "#155278", label: "Jaipur Cobalt Blue" },
                            { color: "#94A3B8", label: "Bidri Sterling Silver" },
                            { color: "#33322E", label: "Bastar Charcoal" },
                          ].map(swatch => (
                            <button
                              key={swatch.color}
                              onClick={() => {
                                setAccentColor(swatch.color);
                                showToast(`Accent: ${swatch.label}`);
                              }}
                              style={{ backgroundColor: swatch.color }}
                              className={`w-7 h-7 rounded-full cursor-pointer transition-transform ${
                                accentColor === swatch.color ? "scale-125 ring-2 ring-black ring-offset-2" : "hover:scale-110"
                              }`}
                              title={swatch.label}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION: TYPOGRAPHY */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('typography')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 font-serif font-bold text-[#A25838] leading-none select-none">
                      <span className="text-[15px]">T</span><span className="text-[11px] -ml-0.5">T</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        Typography
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight">
                        Choose the font style for your portfolio
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.typography ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.typography && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F2EFE9] bg-white">
                    <div className="space-y-4">
                      <div className="border-b border-[#E7E4DF] pb-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">Artisanal Letterforms</span>
                        <h3 className="font-serif text-lg text-[#141413]">Indian Fine Art Type Pairings (7 Styles)</h3>
                        <p className="font-sans text-xs text-[#716E68] mt-0.5">
                          Selected typefaces paired for Indian gallery aesthetics, fine press publications, and museum catalogues.
                        </p>
                      </div>

                      <div className="space-y-2">
                        {[
                          { id: "cormorant", name: "Editorial Gallery (Cormorant)", sample: "Tectonic Monograph", desc: "Classical italic serif with poetic craft authority" },
                          { id: "playfair", name: "Heritage Museum (Playfair)", sample: "Indian Heritage Arts", desc: "Bold display serif celebrating historical weights" },
                          { id: "cinzel", name: "Architectural Stone (Cinzel)", sample: "TEMPLE MONUMENTAL", desc: "Carved stone serif inspired by ancient inscriptions" },
                          { id: "syne", name: "Contemporary Avant-Garde (Syne)", sample: "MODERN ATELIER", desc: "Crisp architectural sans-serif for clean geometry" },
                          { id: "space", name: "Craft & Spec Telemetry (Space)", sample: "1280°C VITRIFIED", desc: "Monospace studio spec sheet font" },
                          { id: "baskerville", name: "Scholarly Classic (Baskerville)", sample: "Sovereign Archives", desc: "Time-honored fine printing tradition" },
                          { id: "bodoni", name: "Haute Atelier Luxury (Bodoni)", sample: "ATELIER MONOGRAPH", desc: "High-contrast luxury headlines" },
                        ].map(t => (
                          <div
                            key={t.id}
                            onClick={() => {
                              setTypography(t.id as any);
                              showToast(`Typography set to ${t.name}`);
                            }}
                            className={`p-3 border transition-all cursor-pointer ${
                              typography === t.id ? "border-[#141413] ring-1 ring-black bg-[#FAF8F5]" : "border-[#E7E4DF] bg-white hover:border-[#141413]/40"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-[#141413]">{t.name}</span>
                              {typography === t.id && <span className="font-mono text-[10px] text-[#C25E3E] font-semibold">Active</span>}
                            </div>
                            <div className="text-sm text-[#141413] mt-1 font-serif">{t.sample}</div>
                            <p className="font-sans text-[10px] text-[#716E68] mt-0.5">{t.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>



              {/* SECTION: DASHBOARD ARTWORKS (MINIMAL & COMPACT) */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('dashboardArtworks')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#A25838]">
                      <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        Dashboard Artworks
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight truncate">
                        Add or remove studio artworks from portfolio
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.dashboardArtworks ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.dashboardArtworks && (
                  <div className="px-4 pb-4 pt-1 border-t border-[#F2EFE9] bg-white space-y-3">
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-300 font-medium">
                        {portfolioArtworkIds.length}/{studioArtworks.length} in Portfolio
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setIsAddDashboardArtModalOpen(true)}
                          className="px-2.5 py-1 bg-[#141413] text-white text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer font-medium hover:bg-[#C25E3E]"
                        >
                          <span className="material-symbols-outlined text-[13px]">add</span>
                          <span>Add</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleIncludeAllDashboardArtworks}
                          className="px-2 py-1 bg-white border border-[#D8D4CE] text-[#141413] text-[10px] font-mono uppercase cursor-pointer hover:bg-[#FAF8F5]"
                        >
                          All
                        </button>
                        <button
                          type="button"
                          onClick={handleResetPortfolioArtworks}
                          className="px-2 py-1 bg-white border border-[#D8D4CE] text-[#716E68] text-[10px] font-mono uppercase cursor-pointer hover:bg-[#FAF8F5]"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    {/* Compact Artworks List */}
                    <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                      {studioArtworks.map(art => {
                        const isInPortfolio = portfolioArtworkIds.includes(art.id);
                        return (
                          <div
                            key={art.id}
                            className={`p-2 border rounded-xs transition-all flex items-center justify-between gap-2 text-xs ${
                              isInPortfolio ? 'bg-[#FAF8F5] border-[#141413]/30' : 'bg-white border-[#E7E4DF] opacity-70'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={art.image}
                                alt={art.title}
                                className="w-10 h-10 object-cover border border-black/10 shrink-0 cursor-pointer"
                                onClick={() => setZoomedImage({ url: art.image, title: art.title, specs: art.medium })}
                              />
                              <div className="min-w-0">
                                <h5 className="font-serif font-bold text-xs text-[#141413] truncate">{art.title}</h5>
                                <div className="font-mono text-[9px] text-[#716E68] truncate">{art.price} · {art.discipline}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => toggleArtworkInPortfolio(art.id)}
                                className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider flex items-center gap-0.5 cursor-pointer ${
                                  isInPortfolio
                                    ? 'bg-emerald-700 text-white font-medium'
                                    : 'bg-white text-[#141413] border border-[#141413]'
                                }`}
                                title={isInPortfolio ? 'Remove from portfolio' : 'Add to portfolio'}
                              >
                                <span className="material-symbols-outlined text-[12px]">
                                  {isInPortfolio ? 'check' : 'add'}
                                </span>
                                <span>{isInPortfolio ? 'Active' : 'Add'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteDashboardArtwork(art.id, art.title)}
                                className="p-1 text-[#716E68] hover:text-red-700 cursor-pointer"
                                title="Delete"
                              >
                                <span className="material-symbols-outlined text-[14px]">delete</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 3: ARTIST & STUDIO IDENTITY */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('identity')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#A25838]">
                      <span className="material-symbols-outlined text-[20px]">badge</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        Identity & Lineage
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight truncate">
                        Brand name, artist name, handle, location & Devanagari
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.identity ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.identity && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F2EFE9] bg-white space-y-4">
                    <div className="border-b border-[#E7E4DF] pb-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">Brand Identity</span>
                      <h3 className="font-serif text-lg text-[#141413]">Artist & Studio Moniker</h3>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5">
                        Configure how your studio name, artisan heritage, and geographic cluster appear.
                      </p>
                    </div>

                    {/* Discipline Quick Preset Switcher */}
                    <div className="flex items-center justify-between bg-[#FAF8F5] p-2.5 border border-[#E7E4DF] text-xs">
                      <span className="font-mono text-[10px] text-[#716E68] uppercase font-semibold">Artisan Lineage Preset:</span>
                      <div className="flex items-center gap-1 font-mono text-[11px]">
                        <button type="button" onClick={() => handleSelectArtistPreset("aarav")} className={`px-2.5 py-1 cursor-pointer transition-colors ${selectedArtistId === "aarav" ? "bg-[#141413] text-white font-medium" : "text-[#716E68] hover:text-[#141413]"}`}>Potter (Aarav)</button>
                        <button type="button" onClick={() => handleSelectArtistPreset("ananya")} className={`px-2.5 py-1 cursor-pointer transition-colors ${selectedArtistId === "ananya" ? "bg-[#141413] text-white font-medium" : "text-[#716E68] hover:text-[#141413]"}`}>Weaver (Ananya)</button>
                        <button type="button" onClick={() => handleSelectArtistPreset("devendra")} className={`px-2.5 py-1 cursor-pointer transition-colors ${selectedArtistId === "devendra" ? "bg-[#141413] text-white font-medium" : "text-[#716E68] hover:text-[#141413]"}`}>Sculptor (Devendra)</button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Studio Brand Name</label>
                      <input
                        type="text"
                        value={customStudioName}
                        onChange={e => setCustomStudioName(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-serif text-[#141413] focus:outline-none focus:border-[#141413]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Artist / Founder Name</label>
                      <input
                        type="text"
                        value={customArtistName}
                        onChange={e => setCustomArtistName(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] focus:outline-none focus:border-[#141413]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Public Handle</label>
                      <div className="flex items-center">
                        <span className="px-2.5 py-2 bg-[#FAF8F5] border border-r-0 border-[#E7E4DF] text-xs font-mono text-[#716E68]">
                          atelier.art/@
                        </span>
                        <input
                          type="text"
                          value={customHandle}
                          onChange={e => setCustomHandle(e.target.value)}
                          className="flex-1 px-3 py-2 border border-[#E7E4DF] text-xs font-mono text-[#141413] focus:outline-none focus:border-[#141413]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Heritage Hindi Devanagari Title</label>
                      <input
                        type="text"
                        value={customHindiTitle}
                        onChange={e => setCustomHindiTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-serif text-[#141413]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Craft Discipline & Medium</label>
                      <input
                        type="text"
                        value={customDiscipline}
                        onChange={e => setCustomDiscipline(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] focus:outline-none focus:border-[#141413]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Studio Geographic Cluster</label>
                      <input
                        type="text"
                        value={customLocation}
                        onChange={e => setCustomLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] focus:outline-none focus:border-[#141413]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 4: HERO & STATEMENT */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('hero')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#A25838]">
                      <span className="material-symbols-outlined text-[20px]">title</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        Hero & Statement
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight truncate">
                        Hero headline, mission statement & layout variant
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.hero ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.hero && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F2EFE9] bg-white space-y-4">
                    <div className="border-b border-[#E7E4DF] pb-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">Opening Impact</span>
                      <h3 className="font-serif text-lg text-[#141413]">Hero Section Presentation</h3>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5">
                        Craft an authoritative opening statement for visiting collectors and curators.
                      </p>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Hero Craft Statement / Headline</label>
                      <textarea
                        rows={2}
                        value={customHeadline}
                        onChange={e => setCustomHeadline(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-serif text-[#141413] focus:outline-none focus:border-[#141413]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Hero Practice Philosophy / Subheadline</label>
                      <textarea
                        rows={3}
                        value={customSubheadline}
                        onChange={e => setCustomSubheadline(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] focus:outline-none focus:border-[#141413]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Hero CTA Label</label>
                        <input
                          type="text"
                          value={heroCtaLabel}
                          onChange={e => setHeroCtaLabel(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Hero Layout Variant</label>
                        <select
                          value={heroLayoutVariant}
                          onChange={e => setHeroLayoutVariant(e.target.value as any)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] bg-white"
                        >
                          <option value="monograph">Centered Monograph</option>
                          <option value="split">Split Studio Photo</option>
                          <option value="architectural">Architectural Headline</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 5: FEATURED MASTERWORK */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('masterwork')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#A25838]">
                      <span className="material-symbols-outlined text-[20px]">star</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        Featured Masterwork
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight truncate">
                        Centerpiece spotlight, 4-angle imagery & provenance
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.masterwork ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.masterwork && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F2EFE9] bg-white space-y-4">
                    <div className="border-b border-[#E7E4DF] pb-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">Centerpiece</span>
                      <h3 className="font-serif text-lg text-[#141413]">Signature Masterwork Spotlight</h3>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5">
                        Multi-angle inspection, technical firing or loom specifications, and pricing for your premier piece.
                      </p>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Masterwork Artwork Title</label>
                      <input
                        type="text"
                        value={masterworkTitle}
                        onChange={e => setMasterworkTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-serif text-[#141413]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Hindi Calligraphy Name</label>
                        <input
                          type="text"
                          value={masterworkHindiName}
                          onChange={e => setMasterworkHindiName(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-serif text-[#141413]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Price (₹ INR)</label>
                        <input
                          type="number"
                          value={masterworkPrice}
                          onChange={e => setMasterworkPrice(parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-mono text-[#141413]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Material & Reduction Specs</label>
                      <input
                        type="text"
                        value={masterworkSpecs}
                        onChange={e => setMasterworkSpecs(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Dimensions</label>
                        <input
                          type="text"
                          value={masterworkDims}
                          onChange={e => setMasterworkDims(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-mono text-[#141413]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Net Weight</label>
                        <input
                          type="text"
                          value={masterworkWeight}
                          onChange={e => setMasterworkWeight(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-mono text-[#141413]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Firing Cycle / Loom Time</label>
                        <input
                          type="text"
                          value={masterworkFiring}
                          onChange={e => setMasterworkFiring(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Provenance Record</label>
                        <input
                          type="text"
                          value={masterworkProvenance}
                          onChange={e => setMasterworkProvenance(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                        />
                      </div>
                    </div>

                    {/* 4 Image URLs */}
                    <div className="border-t border-[#E7E4DF] pt-3 space-y-2">
                      <label className="block font-mono text-[10px] uppercase text-[#141413] font-bold">4-Angle Masterwork Imagery</label>
                      <div>
                        <span className="font-mono text-[9px] text-[#716E68] uppercase block">Angle 1: Front Elevation URL</span>
                        <input
                          type="text"
                          value={masterworkImgFront}
                          onChange={e => setMasterworkImgFront(e.target.value)}
                          className="w-full px-2 py-1.5 border border-[#E7E4DF] text-[11px] font-mono text-[#141413]"
                        />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-[#716E68] uppercase block">Angle 2: Micro-Texture URL</span>
                        <input
                          type="text"
                          value={masterworkImgTexture}
                          onChange={e => setMasterworkImgTexture(e.target.value)}
                          className="w-full px-2 py-1.5 border border-[#E7E4DF] text-[11px] font-mono text-[#141413]"
                        />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-[#716E68] uppercase block">Angle 3: Silhouette Profile URL</span>
                        <input
                          type="text"
                          value={masterworkImgProfile}
                          onChange={e => setMasterworkImgProfile(e.target.value)}
                          className="w-full px-2 py-1.5 border border-[#E7E4DF] text-[11px] font-mono text-[#141413]"
                        />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-[#716E68] uppercase block">Angle 4: Spatial Context Living Space URL</span>
                        <input
                          type="text"
                          value={masterworkImgSpatial}
                          onChange={e => setMasterworkImgSpatial(e.target.value)}
                          className="w-full px-2 py-1.5 border border-[#E7E4DF] text-[11px] font-mono text-[#141413]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 6: PORTFOLIO CATALOG WORKS */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('catalog')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#A25838]">
                      <span className="material-symbols-outlined text-[20px]">grid_view</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        Portfolio Catalog Works
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight truncate">
                        Customize titles, pricing & grid display for active works ({artworksList.length})
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.catalog ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.catalog && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F2EFE9] bg-white space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-3">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-bold block">Gallery Layout</span>
                        <h3 className="font-serif text-lg text-[#141413]">Documented Catalog Works</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAddArtworkOpen(true)}
                        className="px-2.5 py-1 bg-[#141413] text-white text-[10px] font-mono uppercase flex items-center gap-1 cursor-pointer hover:bg-[#C25E3E]"
                      >
                        <span className="material-symbols-outlined text-[13px]">add</span>
                        <span>Add Custom Work</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Catalog Section Title</label>
                        <input
                          type="text"
                          value={galleryTitle}
                          onChange={e => setGalleryTitle(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-serif text-[#141413]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Catalog Subtitle</label>
                        <input
                          type="text"
                          value={gallerySubtitle}
                          onChange={e => setGallerySubtitle(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "3-col", label: "3 Columns" },
                        { id: "2-col", label: "2 Columns" },
                        { id: "masonry", label: "Masonry Flow" },
                      ].map(l => (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => setGalleryLayout(l.id as any)}
                          className={`py-1.5 text-center font-mono text-[10px] uppercase border cursor-pointer ${
                            galleryLayout === l.id ? "bg-[#141413] text-white border-black font-semibold" : "bg-white text-[#716E68] border-[#E7E4DF]"
                          }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>

                    {/* Items List with Edit/Delete */}
                    <div className="space-y-2 border-t border-[#E7E4DF] pt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-[#716E68] font-semibold">
                          Active Pieces in Live Portfolio ({artworksList.length})
                        </span>
                        <span className="font-sans text-[11px] text-[#716E68]">
                          Manage via Dashboard Artworks tab
                        </span>
                      </div>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                        {artworksList.map(item => (
                          <div key={item.id} className="p-2 border border-[#E7E4DF] bg-[#FAF8F5] flex items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              <img src={item.img} alt={item.title} className="w-8 h-8 object-cover border border-black/10 shrink-0" />
                              <div className="min-w-0">
                                <div className="font-serif font-bold text-[#141413] truncate">{item.title}</div>
                                <div className="font-mono text-[10px] text-[#716E68]">₹{item.price.toLocaleString("en-IN")} · {item.category}</div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveArtwork(item.id)}
                              className="text-red-700 hover:text-red-900 p-1 cursor-pointer shrink-0"
                              title="Remove from portfolio"
                            >
                              <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 7: CRAFT & KILN TELEMETRY (PROCESS) */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('process')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#A25838]">
                      <span className="material-symbols-outlined text-[20px]">science</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        Craft & Kiln Telemetry
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight truncate">
                        Raw material sourcing, kiln firing cycles & telemetry
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.process ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.process && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F2EFE9] bg-white space-y-4">
                    <div className="border-b border-[#E7E4DF] pb-3">
                      <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-bold block">Materiality</span>
                      <h3 className="font-serif text-lg text-[#141413]">Kiln, Loom & Craft Telemetry</h3>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5">
                        Document the mineral sourcing, high-temperature firing, and artisan provenance.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Process Section Title</label>
                        <input
                          type="text"
                          value={processTitle}
                          onChange={e => setProcessTitle(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-serif text-[#141413]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Process Subtitle</label>
                        <input
                          type="text"
                          value={processSubtitle}
                          onChange={e => setProcessSubtitle(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                        />
                      </div>
                    </div>

                    {/* 4 Telemetry Spec Cards */}
                    <div className="space-y-2 border-t border-[#E7E4DF] pt-3">
                      <span className="font-mono text-[10px] uppercase text-[#141413] font-bold block">4 Craft Telemetry Metrics</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-mono text-[9px] uppercase text-[#716E68] block">Metric 1: Material Sourcing</span>
                          <input
                            type="text"
                            value={spec1Label}
                            onChange={e => setSpec1Label(e.target.value)}
                            className="w-full px-2 py-1 border border-[#E7E4DF] text-[10px] font-mono text-[#716E68] mb-1"
                          />
                          <input
                            type="text"
                            value={spec1Val}
                            onChange={e => setSpec1Val(e.target.value)}
                            className="w-full px-2 py-1.5 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                          />
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase text-[#716E68] block">Metric 2: Temperature / Cycle</span>
                          <input
                            type="text"
                            value={spec2Label}
                            onChange={e => setSpec2Label(e.target.value)}
                            className="w-full px-2 py-1 border border-[#E7E4DF] text-[10px] font-mono text-[#716E68] mb-1"
                          />
                          <input
                            type="text"
                            value={spec2Val}
                            onChange={e => setSpec2Val(e.target.value)}
                            className="w-full px-2 py-1.5 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                          />
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase text-[#716E68] block">Metric 3: Fuel / Vat</span>
                          <input
                            type="text"
                            value={spec3Label}
                            onChange={e => setSpec3Label(e.target.value)}
                            className="w-full px-2 py-1 border border-[#E7E4DF] text-[10px] font-mono text-[#716E68] mb-1"
                          />
                          <input
                            type="text"
                            value={spec3Val}
                            onChange={e => setSpec3Val(e.target.value)}
                            className="w-full px-2 py-1.5 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                          />
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase text-[#716E68] block">Metric 4: Escrow Protection</span>
                          <input
                            type="text"
                            value={spec4Label}
                            onChange={e => setSpec4Label(e.target.value)}
                            className="w-full px-2 py-1 border border-[#E7E4DF] text-[10px] font-mono text-[#716E68] mb-1"
                          />
                          <input
                            type="text"
                            value={spec4Val}
                            onChange={e => setSpec4Val(e.target.value)}
                            className="w-full px-2 py-1.5 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Process Story Narrative</label>
                      <textarea
                        rows={3}
                        value={processSummary}
                        onChange={e => setProcessSummary(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] focus:outline-none focus:border-[#141413]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Guild Certification Tag</label>
                      <input
                        type="text"
                        value={guildTag}
                        onChange={e => setGuildTag(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 8: BESPOKE COMMISSIONS */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('bespoke')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#A25838]">
                      <span className="material-symbols-outlined text-[20px]">handshake</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        Bespoke Commissions
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight truncate">
                        Commission terms, lead times, minimum budgets & inquiries
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.bespoke ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.bespoke && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F2EFE9] bg-white space-y-4">
                    <div className="border-b border-[#E7E4DF] pb-3">
                      <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-bold block">Private Patronage</span>
                      <h3 className="font-serif text-lg text-[#141413]">Architectural & Custom Commissions</h3>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5">
                        Enable patrons, architects, and galleries to inquire on site-specific custom commissions.
                      </p>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Commission Section Heading</label>
                      <input
                        type="text"
                        value={bespokeTitle}
                        onChange={e => setBespokeTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-serif text-[#141413]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Lead Time</label>
                        <input
                          type="text"
                          value={bespokeLeadTime}
                          onChange={e => setBespokeLeadTime(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Minimum Budget</label>
                        <input
                          type="text"
                          value={bespokeMinBudget}
                          onChange={e => setBespokeMinBudget(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-mono text-[#141413]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Milestone Escrow Terms Explanation</label>
                      <textarea
                        rows={2}
                        value={bespokeTerms}
                        onChange={e => setBespokeTerms(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#E7E4DF]">
                      <div>
                        <div className="font-mono text-xs font-bold text-[#141413]">Accepting Bespoke Commissions</div>
                        <div className="font-sans text-[11px] text-[#716E68]">Displays "Open for Commissions" badge on portfolio</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={bespokeAccepting}
                        onChange={e => setBespokeAccepting(e.target.checked)}
                        className="w-4 h-4 cursor-pointer accent-[#141413]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 9: ABOUT & STUDIO HERITAGE */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('about')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#A25838]">
                      <span className="material-symbols-outlined text-[20px]">history_edu</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        About & Heritage
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight truncate">
                        Artisan lineage, studio photography & philosophy
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.about ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.about && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F2EFE9] bg-white space-y-4">
                    <div className="border-b border-[#E7E4DF] pb-3">
                      <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-bold block">Heritage</span>
                      <h3 className="font-serif text-lg text-[#141413]">Studio Story & Heritage Note</h3>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5">
                        Share your craft lineage, regional cluster history, and studio appointment terms.
                      </p>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Artisan Lineage & Heritage Note</label>
                      <textarea
                        rows={3}
                        value={craftHeritageNote}
                        onChange={e => setCraftHeritageNote(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] focus:outline-none focus:border-[#141413]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Studio Visiting Policy (Scheduled via Atelier)</label>
                      <input
                        type="text"
                        value={visitPolicyText}
                        onChange={e => setVisitPolicyText(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] focus:outline-none focus:border-[#141413]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Press, Biennales & Museum Mentions</label>
                      <input
                        type="text"
                        value={pressMention}
                        onChange={e => setPressMention(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] focus:outline-none focus:border-[#141413]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Domestic Transit Insurance & Courier Policy</label>
                      <textarea
                        rows={2}
                        value={shippingPolicyText}
                        onChange={e => setShippingPolicyText(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                      />
                    </div>
                  </div>
                )}
              </div>


              {/* SECTION 6: CONTACT & PRIVACY */}
              <div className="border-b border-[#E7E4DF] last:border-b-0">
                <button 
                  type="button"
                  onClick={() => toggleCollapsibleSection('contact')}
                  className="w-full py-4 px-5 flex items-center justify-between text-left transition-colors hover:bg-[#FAF8F5] cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#A25838]">
                      <span className="material-symbols-outlined text-[20px]">shield</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-[15px] font-semibold text-[#141413] group-hover:text-[#A25838] transition-colors leading-tight">
                        Contact & Privacy
                      </h4>
                      <p className="font-sans text-xs text-[#716E68] mt-0.5 leading-tight">
                        Control how collectors reach you safely
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#8E8B85] text-[20px] shrink-0 ml-2 transition-transform duration-200">
                    {expandedSections.contact ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSections.contact && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F2EFE9] bg-white">
                    <div className="space-y-6">
                      {/* Pricing Mode Selector */}
                      <div className="bg-[#FAF8F5] p-3.5 border border-[#E7E4DF] space-y-2">
                        <span className="font-mono text-xs uppercase text-[#141413] font-bold block">
                          Price Transparency Display Mode
                        </span>
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          {[
                            { id: "transparent", label: "Exact ₹ INR", desc: "Direct amounts" },
                            { id: "inquire", label: "On Inquiry", desc: "Hidden for VIP" },
                            { id: "range", label: "Price Range", desc: "Estimated band" },
                          ].map(pm => (
                            <button
                              key={pm.id}
                              onClick={() => {
                                setPricingMode(pm.id as any);
                                showToast(`Pricing display: ${pm.label}`);
                              }}
                              className={`p-2 border text-center transition-all cursor-pointer ${
                                pricingMode === pm.id ? "border-[#141413] bg-white ring-1 ring-black font-semibold" : "border-[#E7E4DF] bg-[#FAF8F5]"
                              }`}
                            >
                              <span className="font-mono text-xs block">{pm.label}</span>
                              <span className="font-sans text-[9px] text-[#716E68]">{pm.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* SECURITY & PROTECTION SUITE */}
                      <div className="space-y-2 pt-1">
                        <div className="font-serif text-sm font-bold uppercase tracking-wider text-[#141413] border-b border-[#E7E4DF] pb-2 flex items-center justify-between">
                          <span>SECURITY & PROTECTION SUITE</span>
                          <span className="font-mono text-[10px] text-[#C25E3E] bg-[#FAF8F5] px-2 py-0.5 border border-[#E7E4DF]">7 Active Guards</span>
                        </div>
                        {[
                          { key: "inAppInquiryShield" as keyof FeatureToggles, title: "Inquire via Atelier (Phone Masked)", desc: "Hides artist phone numbers and keeps all client communication safely inside the platform messenger." },
                          { key: "maskExactAddress" as keyof FeatureToggles, title: "Mask Exact Street Address", desc: "Only displays the craft cluster (e.g., Khurja, UP) instead of home address until platform verified visit." },
                          { key: "escrowBadge" as keyof FeatureToggles, title: "50% Milestone Escrow Protection", desc: "Reassures collectors and guarantees creator payout upon verified dispatch tracking." },
                          { key: "insuredTransitBadge" as keyof FeatureToggles, title: "Insured Domestic Transit Badge", desc: "Displays \"All-India Insured Transit via Blue Dart & Delhivery\" on every artwork page." },
                          { key: "coaSeal" as keyof FeatureToggles, title: "Digital Certificate of Authenticity (COA)", desc: "Displays an inspectable digital Certificate of Authenticity with ledger registry hash." },
                          { key: "watermarkProtection" as keyof FeatureToggles, title: "Archival Watermark & Right-Click Shield", desc: "Protects studio photography from unauthorized copying and scraping." },
                          { key: "devanagariScript" as keyof FeatureToggles, title: "Bilingual Hindi / English Devanagari Title", desc: "Honors regional Indian craft roots with dual-script Devanagari calligraphy header." },
                        ].map(feat => {
                          const enabled = toggles[feat.key];
                          return (
                            <div
                              key={feat.key}
                              onClick={() => handleToggle(feat.key)}
                              className="p-3 bg-[#FAF8F5] border-b border-[#E7E4DF] flex items-center justify-between gap-3 select-none cursor-pointer hover:bg-white transition-colors"
                            >
                              <div className="min-w-0 pr-2">
                                <span className="font-serif text-sm font-medium text-[#141413] block">{feat.title}</span>
                                <p className="font-sans text-[11px] text-[#716E68] mt-0.5 leading-relaxed">{feat.desc}</p>
                              </div>
                              <div
                                className="w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0"
                                style={{ backgroundColor: enabled ? accentColor : "#E5E2DC" }}
                              >
                                <div
                                  className="bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform"
                                  style={{ transform: enabled ? "translateX(20px)" : "translateX(0px)" }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* INTERACTIVE MODAL 1: ATELIER IN-APP INQUIRY DRAWER */}
      {activeInquiryArtwork && (
        <div className="fixed inset-0 bg-[#141413]/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white border border-[#E7E4DF] max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#C25E3E]">In-App Studio Messenger</span>
                <h3 className="font-serif text-2xl text-[#141413]">Inquire on "{activeInquiryArtwork}"</h3>
              </div>
              <button
                onClick={() => setActiveInquiryArtwork(null)}
                className="text-[#716E68] hover:text-[#141413] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Privacy Shield Notice */}
            <div className="bg-[#FAF8F5] p-3 border border-[#E7E4DF] flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#C25E3E] text-[18px] shrink-0 mt-0.5">shield</span>
              <p className="font-sans text-xs text-[#56423d] leading-relaxed">
                <strong>Platform Protection Shield:</strong> Your personal phone number is never disclosed to the creator, and the creator’s mobile number is not shared. Inquiries, dimension discussions, and milestone escrow settlements are protected through Atelier.
              </p>
            </div>

            <form onSubmit={handleSendInquiry} className="space-y-3">
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Your Name / Collector Identity *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram & Priya Singhal"
                  value={inquiryName}
                  onChange={e => setInquiryName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] focus:outline-none focus:border-[#141413]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Delivery City in India *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai, Maharashtra"
                  value={inquiryCity}
                  onChange={e => setInquiryCity(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] focus:outline-none focus:border-[#141413]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Message / Dimension Request</label>
                <textarea
                  rows={3}
                  required
                  placeholder="I am interested in acquiring this piece for our residence foyer. Please confirm crated courier delivery and milestone schedule."
                  value={inquiryMessage}
                  onChange={e => setInquiryMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] focus:outline-none focus:border-[#141413]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveInquiryArtwork(null)}
                  className="px-4 py-2 border border-[#E7E4DF] text-xs font-mono text-[#716E68] hover:text-[#141413]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inquirySent}
                  style={{ backgroundColor: accentColor }}
                  className="px-5 py-2 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 font-semibold"
                >
                  {inquirySent ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                      <span>Relaying via Atelier...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">send</span>
                      <span>Send via Atelier Messenger</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INTERACTIVE MODAL 2: CERTIFICATE OF AUTHENTICITY (COA) */}
      {coaModalArtwork && (
        <div className="fixed inset-0 bg-[#141413]/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-[#FAF8F5] border-2 border-[#141413] max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setCoaModalArtwork(null)}
              className="absolute top-4 right-4 text-[#716E68] hover:text-[#141413] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Decorative Heritage Border */}
            <div className="border border-[#141413]/30 p-6 space-y-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[#C25E3E]">
                <span className="material-symbols-outlined text-[24px]">verified</span>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#141413]">Atelier India · Certificate of Authenticity</span>
              </div>

              <div className="space-y-1">
                <div className="font-serif text-2xl font-bold text-[#141413]">{coaModalArtwork.title}</div>
                <div className="font-sans text-xs text-[#56423d]">{coaModalArtwork.medium || coaModalArtwork.specs}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left bg-white p-3 border border-[#E7E4DF] text-xs font-mono">
                <div>
                  <span className="text-[10px] uppercase text-[#716E68] block">Lead Artist</span>
                  <strong className="text-[#141413]">{customArtistName}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#716E68] block">Studio Moniker</span>
                  <strong className="text-[#141413]">{customStudioName}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#716E68] block">Ledger Registry Hash</span>
                  <span className="text-[#C25E3E] font-bold">#ATL-{baseArtist.ledgerId.replace('#', '')}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#716E68] block">Date of Creation</span>
                  <span className="text-[#141413]">2026 · {customLocation.split('&')[0]}</span>
                </div>
              </div>

              <p className="font-sans text-[11px] text-[#716E68] leading-relaxed italic">
                This document certifies that the aforementioned work is a verified original piece created by the artist’s hand in India, documented in the sovereign Atelier Registry.
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-[#E7E4DF]">
                <div className="text-left">
                  <div className="font-serif italic text-sm text-[#141413]">{customArtistName}</div>
                  <div className="font-mono text-[9px] uppercase text-[#716E68]">Artist Studio Seal</div>
                </div>
                <div className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-300">
                  Cryptographically Signed
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  window.print?.();
                  showToast('Prepared Certificate for Print / Archival PDF.');
                }}
                className="px-4 py-1.5 bg-[#141413] text-white font-mono text-xs uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">print</span>
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE MODAL 3: HIGH-RESOLUTION CRAFT DETAIL ZOOM */}
      {zoomedImage && (
        <div className="fixed inset-0 bg-[#141413]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="max-w-4xl w-full bg-[#141413] text-white p-4 space-y-3 relative border border-white/20">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-3 right-3 text-white/70 hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <div className="aspect-[16/10] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={zoomedImage.url}
                alt={zoomedImage.title}
                className="max-h-[75vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <h4 className="font-serif text-lg font-bold text-white">{zoomedImage.title}</h4>
                <p className="font-sans text-xs text-white/70">{zoomedImage.specs}</p>
              </div>
              <span className="font-mono text-xs text-[#C25E3E]">High-Resolution Studio Zoom</span>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE MODAL 4: BESPOKE COMMISSION INTAKE */}
      {isBespokeModalOpen && (
        <div className="fixed inset-0 bg-[#141413]/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white border border-[#E7E4DF] max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#C25E3E]">Atelier Bespoke Portal</span>
                <h3 className="font-serif text-2xl text-[#141413]">Commission Brief for {customStudioName}</h3>
              </div>
              <button
                onClick={() => setIsBespokeModalOpen(false)}
                className="text-[#716E68] hover:text-[#141413] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="bg-[#FAF8F5] p-3 border border-[#E7E4DF] text-xs text-[#56423d] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#141413]">
                <span className="material-symbols-outlined text-emerald-700 text-[16px]">verified_user</span>
                <span>Atelier Milestone Escrow Protection Guaranteed</span>
              </div>
              <p>
                50% advance is held securely in platform escrow. The artisan begins handcrafting once the brief is agreed upon. Remaining 50% is released only after you approve insured dispatch inspection.
              </p>
            </div>

            <form onSubmit={handleSendBespokeInquiry} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Your Name / Design Firm *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Studio Lotus / Ananya Roy"
                    value={bespokeClientName}
                    onChange={e => setBespokeClientName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Project City in India *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Delhi, BLR, Mumbai"
                    value={bespokeClientCity}
                    onChange={e => setBespokeClientCity(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Target Project Budget *</label>
                <select
                  value={bespokeBudget}
                  onChange={e => setBespokeBudget(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] bg-white"
                >
                  <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (Studio Edition)</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 (Architectural Centerpiece)</option>
                  <option value="₹1,00,000 - ₹3,00,000">₹1,00,000 - ₹3,00,000 (Monolithic Scale)</option>
                  <option value="₹3,00,000+">₹3,00,000+ (Hospitality / Museum Installation)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Project Scope & Material Brief *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe desired dimensions, color palette, installation context, and architectural delivery deadline."
                  value={bespokeScope}
                  onChange={e => setBespokeScope(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBespokeModalOpen(false)}
                  className="px-4 py-2 border border-[#E7E4DF] text-xs font-mono text-[#716E68]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bespokeSent}
                  style={{ backgroundColor: accentColor }}
                  className="px-5 py-2 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 font-semibold"
                >
                  {bespokeSent ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                      <span>Relaying Brief via Escrow...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">send</span>
                      <span>Submit Protected Commission Brief</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INTERACTIVE MODAL 5: ADD NEW ARTWORK TO GALLERY */}
      {isAddArtworkOpen && (
        <div className="fixed inset-0 bg-[#141413]/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white border border-[#E7E4DF] max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#C25E3E]">Studio Catalog Editor</span>
                <h3 className="font-serif text-2xl text-[#141413]">Document New Piece</h3>
              </div>
              <button
                onClick={() => setIsAddArtworkOpen(false)}
                className="text-[#716E68] hover:text-[#141413] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddArtwork} className="space-y-3">
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Piece Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Terra Sigillata Ceremonial Bowl"
                  value={newArtTitle}
                  onChange={e => setNewArtTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-serif text-[#141413]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Discipline Category</label>
                  <select
                    value={newArtCategory}
                    onChange={e => setNewArtCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] bg-white"
                  >
                    <option value="Vessel">Vessel / Pottery</option>
                    <option value="Sculpture">Sculpture</option>
                    <option value="Tapestry">Tapestry / Handloom</option>
                    <option value="Tableware">Tableware</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Wearables">Wearables</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    value={newArtPrice}
                    onChange={e => setNewArtPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-mono text-[#141413]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Medium & Natural Pigments</label>
                <input
                  type="text"
                  placeholder="e.g. Wood-fired Gangetic stoneware with natural iron glaze"
                  value={newArtMedium}
                  onChange={e => setNewArtMedium(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Dimensions</label>
                  <input
                    type="text"
                    placeholder="e.g. 34 × 22 × 22 cm"
                    value={newArtDims}
                    onChange={e => setNewArtDims(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-mono text-[#141413]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Edition Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Unique Original · 1 of 1"
                    value={newArtEdition}
                    onChange={e => setNewArtEdition(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">High-Res Photograph URL</label>
                <input
                  type="text"
                  value={newArtImg}
                  onChange={e => setNewArtImg(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-mono text-[#141413]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddArtworkOpen(false)}
                  className="px-4 py-2 border border-[#E7E4DF] text-xs font-mono text-[#716E68]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: accentColor }}
                  className="px-5 py-2 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs font-semibold"
                >
                  <span className="material-symbols-outlined text-[15px]">add</span>
                  <span>Publish to Catalog</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INTERACTIVE MODAL 6: LOOKBOOK & EXHIBITION CATALOG EXPORT */}
      {isLookbookModalOpen && (
        <div className="fixed inset-0 bg-[#141413]/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white border-2 border-[#141413] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#C25E3E]">Architectural Lookbook & Catalog</span>
                <h3 className="font-serif text-2xl text-[#141413]">{customStudioName} · Exhibition Dossier</h3>
              </div>
              <button
                onClick={() => setIsLookbookModalOpen(false)}
                className="text-[#716E68] hover:text-[#141413] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-sans text-xs text-[#56423d] leading-relaxed">
              Generate a printable, museum-grade PDF Lookbook with high-resolution imagery, material telemetry, and Atelier Escrow QR codes for interior architects, collectors, and galleries.
            </p>

            <div className="p-4 bg-[#FAF8F5] border border-[#E7E4DF] space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b pb-1">
                <span className="text-[#716E68]">Studio Moniker</span>
                <span className="font-bold text-[#141413]">{customStudioName}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-[#716E68]">Documented Pieces</span>
                <span className="font-bold text-[#141413]">{artworksList.length + 1} Artworks</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-[#716E68]">Atelier Escrow Protection</span>
                <span className="text-emerald-800 font-bold">Verified QR Settlement Included</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#716E68]">Master Artisan</span>
                <span className="text-[#141413]">{customArtistName}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsLookbookModalOpen(false)}
                className="px-4 py-2 border border-[#E7E4DF] text-xs font-mono text-[#716E68]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print?.();
                  showToast('Prepared Lookbook for Export & Print!');
                }}
                className="px-5 py-2 bg-[#141413] text-white font-mono text-xs uppercase flex items-center gap-2 cursor-pointer shadow-xs font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                <span>Download Print-Ready PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE MODAL 7: ADD NEW ARTWORK TO STUDIO DASHBOARD */}
      {isAddDashboardArtModalOpen && (
        <div className="fixed inset-0 bg-[#141413]/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white border-2 border-[#141413] max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-bold">Studio Dashboard Inventory</span>
                <h3 className="font-serif text-2xl text-[#141413]">Add New Studio Artwork</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddDashboardArtModalOpen(false)}
                className="text-[#716E68] hover:text-[#141413] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-sans text-xs text-[#56423d]">
              This piece will be saved directly into your <strong>Studio Dashboard Original Artworks</strong> and automatically toggled into your active portfolio.
            </p>

            <form onSubmit={handleCreateDashboardArtwork} className="space-y-3.5">
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Artwork Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaipur Blue Glazed Ceremonial Platter"
                  value={dashArtTitle}
                  onChange={e => setDashArtTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-serif text-[#141413] focus:outline-none focus:border-[#141413]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Discipline *</label>
                  <select
                    value={dashArtDiscipline}
                    onChange={e => setDashArtDiscipline(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] bg-white"
                  >
                    <option value="Clay & Terracotta">Clay & Terracotta</option>
                    <option value="Metal & Bronze">Metal & Bronze</option>
                    <option value="Wash Painting">Wash Painting</option>
                    <option value="Heritage Textiles">Heritage Textiles</option>
                    <option value="Woodcraft">Woodcraft</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Price (₹ INR) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹22,000"
                    value={dashArtPrice}
                    onChange={e => setDashArtPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-mono text-[#141413]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Medium & Natural Pigments</label>
                <input
                  type="text"
                  placeholder="e.g. Ground quartz and natural copper cobalt reduction slip"
                  value={dashArtMedium}
                  onChange={e => setDashArtMedium(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Dimensions</label>
                  <input
                    type="text"
                    placeholder="e.g. 40 × 40 × 6 cm"
                    value={dashArtDimensions}
                    onChange={e => setDashArtDimensions(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-mono text-[#141413]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Status</label>
                  <select
                    value={dashArtStatus}
                    onChange={e => setDashArtStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413] bg-white"
                  >
                    <option value="Available">Available for Purchase</option>
                    <option value="Reserved">Reserved by Collector</option>
                    <option value="Sold">Sold / In Archive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Collection / Series Name</label>
                <input
                  type="text"
                  placeholder="e.g. Neel: Jaipur Cobalt & Copper"
                  value={dashArtCollection}
                  onChange={e => setDashArtCollection(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-mono text-[10px] uppercase text-[#716E68]">Photograph URL</label>
                  <span className="font-mono text-[9px] text-[#C25E3E]">Or pick a curated sample below:</span>
                </div>
                <input
                  type="text"
                  value={dashArtImage}
                  onChange={e => setDashArtImage(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-mono text-[#141413] mb-2"
                />
                
                {/* Image sample presets */}
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { label: 'Ceramics', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80' },
                    { label: 'Terracotta', url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80' },
                    { label: 'Bronze', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpcvJIiJqG-61uu2eZzkd-p7joH3nu1pR4OJJIV9YgWhOwLv0T9bJ_qMFiilDALU0uE2Y8-C-rxDm5JGipt7B7qGYcIPO4N7Z0hExdku7JA3S5PVs3yWnBt6mi7Odbpif0cz_LzIuGf4uh5wlfumfy-HCiZbITrze-heFJtDNuh0u-SkCaKN2_Z-rp4Y5eSxNAz9czuVNVEzKMBbIeVzaHpn1exfY1yH_tyVizctSQFJ0yPB9dSyA7w' },
                    { label: 'Textile', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtbRtqiIwj_7gW7_R2Dfcv-Ajybri2Wzww23lFMSPT2D2qv36SPptttwuK13Ow8aQHKZFmU7K9YZBb3O0jiLTePLEd6PgePbcxIddAuLMel87nozygj1_RnjYFG0QHx5pSFFrvG1ht-vwmWFjj70S0OHaBCOeBNa_ML0JQxYuL8RmiHJT2lF_Uv6fhFj21Q93VKp_wIMOOJ0wgydcLU3HS6qxwGpfY38XAtv1t6ZcQAk7JY2DBSqkoTg' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setDashArtImage(preset.url)}
                      className={`p-1 border text-center transition-all cursor-pointer ${
                        dashArtImage === preset.url ? 'border-[#141413] bg-[#FAF8F5] ring-1 ring-black' : 'border-[#E7E4DF] hover:border-black'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-8 object-cover" />
                      <span className="font-mono text-[9px] text-[#716E68] block mt-0.5">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Craft Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Reduction wood-fired for 48 hours at Khurja pottery cluster."
                  value={dashArtNotes}
                  onChange={e => setDashArtNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E7E4DF]">
                <button
                  type="button"
                  onClick={() => setIsAddDashboardArtModalOpen(false)}
                  className="px-4 py-2 border border-[#E7E4DF] text-xs font-mono text-[#716E68]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: accentColor }}
                  className="px-5 py-2 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs font-semibold"
                >
                  <span className="material-symbols-outlined text-[15px]">add</span>
                  <span>Add to Studio & Portfolio</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
