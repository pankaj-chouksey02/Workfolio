import React, { useState, useMemo } from 'react';

interface PortfolioCustomizerScreenProps {
  onNavigate: (path: string) => void;
}

// 10 Distinct Master Templates for Indian Craft Disciplines
export interface TemplatePreset {
  id: string;
  name: string;
  craftSubhead: string;
  categoryTag: 'Ceramics' | 'Textiles' | 'Metal' | 'Wood' | 'Heritage Arts' | 'Painting';
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

  // Primary Customizer Tabs: Templates (10), Content (Section-wise), Style, Security
  const [expandedSections, setExpandedSections] = useState({ templates: true, studio: false, styles: false, security: false });

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

  // Suggestions & Roadmap Modal ("What more can we do")
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

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

  // 10 Distinct Master Templates for Indian Craft Disciplines
  const TEN_TEMPLATES: TemplatePreset[] = [
    {
      id: 'kora',
      name: '01. Kora Kagaz Minimal',
      craftSubhead: 'Khurja Ceramics & Fine Arts',
      categoryTag: 'Ceramics',
      canvasColor: 'bone',
      typography: 'cormorant',
      archetype: 'monograph',
      aspectRatio: '16:10',
      borderStyle: 'hairline',
      accentColor: '#C25E3E',
      description: 'Crisp museum bone paper, terracotta oxide accents, and prominent unglazed ceramic monographs.',
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
      craftSubhead: 'Varanasi Pit-Loom Handloom',
      categoryTag: 'Textiles',
      canvasColor: 'linen',
      typography: 'playfair',
      archetype: 'grid',
      aspectRatio: '4:3',
      borderStyle: 'hairline',
      accentColor: '#2B4C6F',
      description: 'Warm unbleached handloom linen, wild indigo accents, and clean balanced catalog layout.',
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
      name: '03. Geru & Clay Kiln',
      craftSubhead: 'Earthen Red Clay Terracotta',
      categoryTag: 'Ceramics',
      canvasColor: 'terracotta',
      typography: 'cormorant',
      archetype: 'story',
      aspectRatio: '4:3',
      borderStyle: 'matting',
      accentColor: '#C25E3E',
      description: 'Warm baked earthen umber with roasted clay tones celebrating centuries of Khurja and Bastar craft.',
      swatches: ['#221A18', '#C25E3E', '#F4EDE4', '#453531'],
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
      craftSubhead: 'Bastar Lost-Wax Bell Metal',
      categoryTag: 'Metal',
      canvasColor: 'basalt',
      typography: 'syne',
      archetype: 'monograph',
      aspectRatio: '16:10',
      borderStyle: 'hairline',
      accentColor: '#C89D55',
      description: 'Quiet darkroom luxury with antique bell-metal gold accents and high-contrast masterwork inspection.',
      swatches: ['#141413', '#C89D55', '#F5F2EB', '#2F2E2A'],
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
      craftSubhead: 'Jaipur Blue Pottery Tradition',
      categoryTag: 'Ceramics',
      canvasColor: 'bone',
      typography: 'playfair',
      archetype: 'grid',
      aspectRatio: '1:1',
      borderStyle: 'matting',
      accentColor: '#155278',
      description: 'Bright Persian cobalt blue, Egyptian paste quartz glaze, and crisp royal Rajasthani geometry.',
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
      craftSubhead: 'Miniature Painting & Pigments',
      categoryTag: 'Painting',
      canvasColor: 'sandalwood',
      typography: 'cormorant',
      archetype: 'monograph',
      aspectRatio: '3:4',
      borderStyle: 'matting',
      accentColor: '#B8860B',
      description: 'Handmade hemp wasli paper tones, genuine 24k gold leaf foil accents, and stone mineral colors.',
      swatches: ['#F7EFE1', '#B8860B', '#2C2723', '#D6C8B2'],
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
      craftSubhead: 'Haveli Woodcarving & Brass Inlay',
      categoryTag: 'Wood',
      canvasColor: 'teak',
      typography: 'cinzel',
      archetype: 'story',
      aspectRatio: '16:10',
      borderStyle: 'hairline',
      accentColor: '#C89D55',
      description: 'Aged Sheesham teakwood brown, hand-beaten brass studs, and architectural haveli craftsmanship.',
      swatches: ['#2A1F1B', '#C89D55', '#EFE7DA', '#42332C'],
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
      craftSubhead: 'Deccan Zinc-Alloy Damascening',
      categoryTag: 'Metal',
      canvasColor: 'basalt',
      typography: 'syne',
      archetype: 'grid',
      aspectRatio: '1:1',
      borderStyle: 'hairline',
      accentColor: '#E2E8F0',
      description: 'Jet-black oxidised zinc base adorned with pure sterling silver inlay from historic Bidar forts.',
      swatches: ['#141413', '#E2E8F0', '#94A3B8', '#272725'],
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
      craftSubhead: 'Castor Oil Paint & Earthen Relief',
      categoryTag: 'Heritage Arts',
      canvasColor: 'multani',
      typography: 'playfair',
      archetype: 'story',
      aspectRatio: '4:3',
      borderStyle: 'matting',
      accentColor: '#D9531E',
      description: 'Boiled wild castor oil elastic pigments, white clay lippan borders, and mirror stud reflections.',
      swatches: ['#EDE6DA', '#D9531E', '#3D312A', '#C7B7A3'],
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
      craftSubhead: 'Narrative Scroll & Vegetable Dye',
      categoryTag: 'Painting',
      canvasColor: 'sandstone',
      typography: 'cormorant',
      archetype: 'monograph',
      aspectRatio: '3:4',
      borderStyle: 'hairline',
      accentColor: '#943826',
      description: 'Traditional scroll storytelling with lampblack, conch shell white, and Indian madder root red.',
      swatches: ['#F2E8DC', '#943826', '#1E3A2F', '#E5DCB8'],
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

  // Color theme classes
  const getThemeClasses = () => {
    switch (canvasColor) {
      case 'basalt':
        return {
          bg: 'bg-[#141413]',
          text: 'text-[#F5F2EB]',
          border: 'border-[#2F2E2A]',
          subtleBg: 'bg-[#1E1E1B]',
          cardBg: 'bg-[#1A1A17]',
          cardBorder: 'border-[#33322E]',
          mutedText: 'text-[#A09D95]',
        };
      case 'teak':
        return {
          bg: 'bg-[#2A1F1B]',
          text: 'text-[#EFE7DA]',
          border: 'border-[#4A3730]',
          subtleBg: 'bg-[#352722]',
          cardBg: 'bg-[#2F231F]',
          cardBorder: 'border-[#533E37]',
          mutedText: 'text-[#B8A79E]',
        };
      case 'forest':
        return {
          bg: 'bg-[#16241B]',
          text: 'text-[#EDEFE9]',
          border: 'border-[#2C3F32]',
          subtleBg: 'bg-[#1E3024]',
          cardBg: 'bg-[#1A2A20]',
          cardBorder: 'border-[#344C3D]',
          mutedText: 'text-[#9CAD9E]',
        };
      case 'indigo':
        return {
          bg: 'bg-[#121A24]',
          text: 'text-[#F4F6F8]',
          border: 'border-[#263548]',
          subtleBg: 'bg-[#1A2533]',
          cardBg: 'bg-[#16202C]',
          cardBorder: 'border-[#2D3E54]',
          mutedText: 'text-[#A5B4C7]',
        };
      case 'terracotta':
        return {
          bg: 'bg-[#221A18]',
          text: 'text-[#F4EDE4]',
          border: 'border-[#433430]',
          subtleBg: 'bg-[#2C211E]',
          cardBg: 'bg-[#281E1B]',
          cardBorder: 'border-[#4B3B36]',
          mutedText: 'text-[#C7B5AF]',
        };
      case 'sandstone':
        return {
          bg: 'bg-[#F2E8DC]',
          text: 'text-[#26201B]',
          border: 'border-[#DFD1BF]',
          subtleBg: 'bg-[#E8DCCF]',
          cardBg: 'bg-[#F8F1E7]',
          cardBorder: 'border-[#DBD0BF]',
          mutedText: 'text-[#7A6C5F]',
        };
      case 'sandalwood':
        return {
          bg: 'bg-[#F7EFE1]',
          text: 'text-[#2C2723]',
          border: 'border-[#DFD3BF]',
          subtleBg: 'bg-[#EDE4D2]',
          cardBg: 'bg-[#FAF4E8]',
          cardBorder: 'border-[#DDD0BB]',
          mutedText: 'text-[#7D7368]',
        };
      case 'multani':
        return {
          bg: 'bg-[#EDE6DA]',
          text: 'text-[#25221E]',
          border: 'border-[#D6CCC0]',
          subtleBg: 'bg-[#E3D9CB]',
          cardBg: 'bg-[#F3ECE0]',
          cardBorder: 'border-[#D4C9BC]',
          mutedText: 'text-[#736B62]',
        };
      case 'linen':
        return {
          bg: 'bg-[#F6F3ED]',
          text: 'text-[#23211E]',
          border: 'border-[#DDD8CE]',
          subtleBg: 'bg-[#EFECE4]',
          cardBg: 'bg-[#FAF8F5]',
          cardBorder: 'border-[#DFDACF]',
          mutedText: 'text-[#6F6B64]',
        };
      case 'bone':
      default:
        return {
          bg: 'bg-[#FFFFFF]',
          text: 'text-[#141413]',
          border: 'border-[#E7E4DF]',
          subtleBg: 'bg-[#FAF8F5]',
          cardBg: 'bg-[#FFFFFF]',
          cardBorder: 'border-[#E7E4DF]',
          mutedText: 'text-[#716E68]',
        };
    }
  };

  const theme = getThemeClasses();

  const getHeaderFontClass = () => {
    if (typography === 'cormorant') return 'font-serif italic';
    if (typography === 'playfair') return 'font-serif';
    if (typography === 'cinzel') return 'font-serif uppercase tracking-widest font-semibold';
    if (typography === 'syne') return 'font-sans uppercase font-extrabold tracking-tight';
    if (typography === 'space') return 'font-mono uppercase font-bold tracking-tight';
    if (typography === 'baskerville') return 'font-serif font-medium';
    if (typography === 'bodoni') return 'font-serif font-black tracking-normal';
    return 'font-serif';
  };

  const getAspectClass = () => {
    if (aspectRatio === '1:1') return 'aspect-square';
    if (aspectRatio === '16:10') return 'aspect-[16/10]';
    if (aspectRatio === '3:4') return 'aspect-[3/4]';
    if (aspectRatio === '2:3') return 'aspect-[2/3]';
    if (aspectRatio === '5:4') return 'aspect-[5/4]';
    return 'aspect-[4/3]';
  };

  const getCardElevationClass = () => {
    if (borderStyle === 'matting') return 'border-2 p-3 sm:p-4 ring-1 ring-black/10';
    if (borderStyle === 'flush') return 'border-none p-0 shadow-none';
    if (borderStyle === 'float') return 'border shadow-md hover:shadow-lg transition-shadow p-3';
    if (borderStyle === 'rivets') return 'border border-dashed p-3 relative';
    return 'border p-3 sm:p-4';
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
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col overflow-hidden text-[#141413]">
      
      {/* TOP STUDIO TOOLBAR & PREVIEW CONTROLLER */}
      <div className="h-14 bg-white border-b border-[#E7E4DF] px-4 sm:px-6 flex items-center justify-between shrink-0 select-none z-30">
        
        {/* Brand & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('studio-overview')}
            className="flex items-center gap-1.5 text-xs font-mono text-[#716E68] hover:text-[#141413] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span className="hidden sm:inline">Studio Hub</span>
          </button>
          <span className="text-[#D0C8B8]">/</span>
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm font-bold text-[#141413]">Portfolio Customiser</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-mono border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
        </div>

        {/* Viewport Screen Switcher (Mobile, Tablet, Desktop) */}
        <div className="hidden md:flex items-center bg-[#FAF8F5] border border-[#E7E4DF] p-0.5 rounded-sm">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`px-2.5 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewportMode === 'desktop' ? 'bg-white text-[#141413] shadow-xs font-semibold' : 'text-[#716E68] hover:text-[#141413]'
            }`}
            title="Desktop 1440px"
          >
            <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
            <span>Desktop</span>
          </button>

          <button
            onClick={() => setViewportMode('tablet')}
            className={`px-2.5 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewportMode === 'tablet' ? 'bg-white text-[#141413] shadow-xs font-semibold' : 'text-[#716E68] hover:text-[#141413]'
            }`}
            title="Tablet 768px"
          >
            <span className="material-symbols-outlined text-[15px]">tablet_mac</span>
            <span>Tablet</span>
          </button>

          <button
            onClick={() => setViewportMode('mobile')}
            className={`px-2.5 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewportMode === 'mobile' ? 'bg-white text-[#141413] shadow-xs font-semibold' : 'text-[#716E68] hover:text-[#141413]'
            }`}
            title="Mobile 390px"
          >
            <span className="material-symbols-outlined text-[15px]">stay_current_portrait</span>
            <span>Mobile</span>
          </button>
        </div>

        {/* Small Screen Tab Switcher (Preview on Left, Controls on Right) */}
        <div className="flex lg:hidden items-center bg-[#FAF8F5] border border-[#E7E4DF] p-0.5">
          <button
            onClick={() => setHostSmallScreenTab('preview')}
            className={`px-2.5 py-1 text-xs font-mono cursor-pointer ${
              hostSmallScreenTab === 'preview' ? 'bg-white text-[#141413] font-semibold shadow-xs' : 'text-[#716E68]'
            }`}
          >
            Live Canvas
          </button>
          <button
            onClick={() => setHostSmallScreenTab('controls')}
            className={`px-2.5 py-1 text-xs font-mono cursor-pointer ${
              hostSmallScreenTab === 'controls' ? 'bg-white text-[#141413] font-semibold shadow-xs' : 'text-[#716E68]'
            }`}
          >
            Customiser
          </button>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Innovations Roadmap & Ideas Button */}
          <button
            onClick={() => setIsRoadmapOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] hover:bg-amber-50 text-amber-900 border border-amber-300 text-xs font-mono transition-colors cursor-pointer"
            title="Future Roadmap & Suggestions"
          >
            <span className="material-symbols-outlined text-[15px] text-amber-700">lightbulb</span>
            <span className="hidden sm:inline font-semibold">10 What's Next Ideas</span>
          </button>

          {/* Lookbook PDF Generator */}
          <button
            onClick={() => setIsLookbookModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[#E7E4DF] bg-white hover:bg-[#FAF8F5] text-xs font-mono text-[#141413] transition-colors cursor-pointer"
            title="Export Lookbook / Spec Sheet"
          >
            <span className="material-symbols-outlined text-[15px]">picture_as_pdf</span>
            <span>Lookbook</span>
          </button>

          {/* Copy Public Link */}
          <button
            onClick={handleCopyLink}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[#E7E4DF] bg-white hover:bg-[#FAF8F5] text-xs font-mono text-[#141413] transition-colors cursor-pointer"
            title="Copy Public Link"
          >
            <span className="material-symbols-outlined text-[15px]">link</span>
            <span>Copy Link</span>
          </button>

          {/* Expand Full Preview */}
          <button
            onClick={() => {
              setIsPreviewExpanded(!isPreviewExpanded);
              showToast(isPreviewExpanded ? 'Split Studio view' : 'Expanded Full Preview');
            }}
            className="p-1.5 border border-[#E7E4DF] bg-white hover:bg-[#FAF8F5] text-[#141413] transition-colors cursor-pointer"
            title={isPreviewExpanded ? 'Split Controls' : 'Expand Preview'}
          >
            <span className="material-symbols-outlined text-[16px] block">
              {isPreviewExpanded ? 'splitscreen' : 'fullscreen'}
            </span>
          </button>

          {/* Publish Site Button */}
          <button 
            onClick={() => showToast('Portfolio Published! Changes live on your public handle.')} 
            style={{ backgroundColor: accentColor }}
            className="px-3.5 py-1.5 text-white hover:opacity-90 transition-all flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider shadow-xs cursor-pointer font-semibold"
          >
            <span>Publish Site</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
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

            {/* LIVE PORTFOLIO CONTENT (Simulated website with real styling) */}
            <div className={`overflow-visible transition-colors duration-300 ${theme.bg} ${theme.text}`}>
              <div className={`space-y-12 ${isMobileViewport ? 'p-4 sm:p-5' : isTabletViewport ? 'p-6 sm:p-8' : 'p-8 sm:p-14'}`}>
                
                {/* 1. Header Navigation & Hero */}
                {toggles.showHeroSection && (
                  <>
                    <header className={`border-b ${theme.border} pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4`}>
                      <div className="space-y-1">
                        {toggles.devanagariScript && (
                          <span className="font-serif text-xs text-[#C25E3E] block">
                            {customHindiTitle}
                          </span>
                        )}
                        <h1 className={`font-bold tracking-tight ${getHeaderFontClass()} ${isMobileViewport ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
                          {customStudioName}
                        </h1>
                        <p className={`font-sans text-xs ${theme.mutedText}`}>
                          {customArtistName} · {toggles.maskExactAddress ? customLocation : `${customLocation} (Studio Direct)`}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {toggles.craftMasterBadge && (
                          <span className="font-mono text-[10px] text-amber-900 bg-amber-50 px-2 py-0.5 border border-amber-300">
                            ★ {guildTag.split('·')[0]}
                          </span>
                        )}
                        {toggles.commissionStatus && bespokeAccepting && (
                          <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-300">
                            ● Open for Commissions
                          </span>
                        )}
                        {toggles.escrowBadge && (
                          <span className="font-mono text-[10px] text-[#C25E3E] bg-[#FAF8F5] px-2 py-0.5 border border-[#E7E4DF]">
                            50% Escrow Protected
                          </span>
                        )}
                      </div>
                    </header>

                    <section className="space-y-3 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-medium">
                          Studio Practice · {customDiscipline}
                        </span>
                      </div>
                      <h2 className={`text-xl sm:text-2xl font-serif leading-snug`}>
                        {customHeadline}
                      </h2>
                      <p className={`font-sans text-xs sm:text-sm leading-relaxed ${theme.mutedText}`}>
                        {customSubheadline}
                      </p>

                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => setActiveInquiryArtwork(masterworkTitle)}
                          style={{ backgroundColor: accentColor }}
                          className="px-4 py-2 text-white font-mono text-xs uppercase tracking-wider shadow-xs font-semibold cursor-pointer"
                        >
                          {heroCtaLabel}
                        </button>
                        {bespokeAccepting && (
                          <button
                            onClick={() => setIsBespokeModalOpen(true)}
                            className={`px-4 py-2 border ${theme.border} font-mono text-xs uppercase tracking-wider hover:bg-black/5 cursor-pointer`}
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
                        <span className="font-mono text-[10px] uppercase text-[#C25E3E]">Featured Masterwork</span>
                        <h3 className={`font-serif text-2xl font-bold ${getHeaderFontClass()}`}>{masterworkTitle}</h3>
                        <p className={`font-sans text-xs ${theme.mutedText}`}>{masterworkSpecs}</p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        {pricingMode === 'transparent' ? (
                          <span className="font-serif text-xl font-bold text-[#141413]">
                            ₹{masterworkPrice.toLocaleString('en-IN')}
                          </span>
                        ) : pricingMode === 'range' ? (
                          <span className="font-serif text-base font-bold text-[#141413]">
                            ₹{Math.round(masterworkPrice * 0.9).toLocaleString('en-IN')} — ₹{Math.round(masterworkPrice * 1.15).toLocaleString('en-IN')}
                          </span>
                        ) : (
                          <span className="font-mono text-xs uppercase px-2 py-1 bg-[#FAF8F5] border border-[#E7E4DF] text-[#716E68]">
                            Price on Inquiry
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-8 bg-[#FAF8F5] p-2 border border-[#E7E4DF] overflow-hidden">
                        <div 
                          className={`${getAspectClass()} bg-[#efeeeb] overflow-hidden relative cursor-pointer`}
                          onClick={() => setZoomedImage({ url: currentMasterworkImg(), title: masterworkTitle, specs: masterworkSpecs })}
                        >
                          <img
                            src={currentMasterworkImg()}
                            alt={masterworkTitle}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          {toggles.watermarkProtection && (
                            <div className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-widest text-white/70 bg-black/40 px-2 py-0.5 backdrop-blur-xs">
                              © Atelier Sovereign Archive
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[9px] px-2 py-1 flex items-center gap-1 uppercase">
                            <span className="material-symbols-outlined text-[12px]">zoom_in</span>
                            <span>Click to Inspect High-Res</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2 pt-2">
                          {[
                            { id: 'front', label: 'Front View' },
                            { id: 'texture', label: 'Craft Texture' },
                            { id: 'profile', label: 'Side Scale' },
                            { id: 'spatial', label: 'In Architecture' },
                          ].map(angle => (
                            <button
                              key={angle.id}
                              onClick={() => setMasterworkAngle(angle.id as any)}
                              className={`py-1 text-[10px] font-mono uppercase border transition-colors cursor-pointer ${
                                masterworkAngle === angle.id
                                  ? 'bg-[#141413] text-white border-black font-semibold'
                                  : 'bg-white text-[#716E68] border-[#E7E4DF] hover:border-black'
                              }`}
                            >
                              {angle.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-4 space-y-4">
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between border-b pb-1" style={{ borderColor: 'inherit' }}>
                            <span className="font-mono text-[10px] uppercase text-[#716E68]">Dimensions</span>
                            <span className="font-mono text-[#141413]">{masterworkDims}</span>
                          </div>
                          <div className="flex justify-between border-b pb-1" style={{ borderColor: 'inherit' }}>
                            <span className="font-mono text-[10px] uppercase text-[#716E68]">Weight</span>
                            <span className="font-mono text-[#141413]">{masterworkWeight}</span>
                          </div>
                          <div className="flex justify-between border-b pb-1" style={{ borderColor: 'inherit' }}>
                            <span className="font-mono text-[10px] uppercase text-[#716E68]">Craft Cycle</span>
                            <span className="font-sans text-[#141413]">{masterworkFiring}</span>
                          </div>
                          <div className="flex justify-between border-b pb-1" style={{ borderColor: 'inherit' }}>
                            <span className="font-mono text-[10px] uppercase text-[#716E68]">Provenance</span>
                            <span className="font-sans text-[#141413] text-right">{masterworkProvenance}</span>
                          </div>
                          {toggles.insuredTransitBadge && (
                            <div className="flex items-center gap-1.5 text-emerald-800 text-[10px] font-mono pt-1">
                              <span className="material-symbols-outlined text-[13px]">local_shipping</span>
                              <span>Insured All-India Transit via Blue Dart</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2 pt-2">
                          {toggles.inAppInquiryShield && (
                            <button
                              onClick={() => setActiveInquiryArtwork(masterworkTitle)}
                              style={{ backgroundColor: accentColor }}
                              className="w-full text-white py-2.5 px-4 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs font-semibold"
                            >
                              <span className="material-symbols-outlined text-[16px]">chat</span>
                              <span>Inquire via Atelier (Phone Masked)</span>
                            </button>
                          )}

                          {toggles.coaSeal && (
                            <button
                              onClick={() => setCoaModalArtwork({ ...baseArtist.masterwork, title: masterworkTitle, medium: masterworkMedium })}
                              className="w-full bg-[#FAF8F5] hover:bg-white text-[#141413] border border-[#E7E4DF] py-2 px-3 font-mono text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
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
                  <section className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b pb-3 gap-2" style={{ borderColor: 'inherit' }}>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-medium">{gallerySubtitle}</span>
                        <h3 className="font-serif text-2xl font-bold">{galleryTitle}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#716E68]">{artworksList.length} Pieces Documented</span>
                        <button
                          onClick={() => setIsAddArtworkOpen(true)}
                          className="px-2.5 py-1 bg-white border border-[#E7E4DF] text-[#141413] text-[10px] font-mono uppercase hover:bg-black/5 cursor-pointer"
                        >
                          + Add Piece
                        </button>
                      </div>
                    </div>

                    <div className={`grid ${galleryLayout === '2-col' ? 'grid-cols-1 sm:grid-cols-2' : galleryLayout === 'masonry' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-6`}>
                      {artworksList.map(item => (
                        <div key={item.id} className={`${getCardElevationClass()} ${theme.cardBorder} ${theme.cardBg} space-y-3 flex flex-col justify-between shadow-2xs`}>
                          <div className="space-y-2">
                            <div 
                              className={`${getAspectClass()} bg-[#efeeeb] overflow-hidden cursor-pointer relative group`}
                              onClick={() => setZoomedImage({ url: item.img, title: item.title, specs: item.medium })}
                            >
                              <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-2 right-2 bg-black/80 text-white font-mono text-[9px] px-1.5 py-0.5">
                                {item.category}
                              </div>
                            </div>

                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="font-serif text-base font-semibold text-[#141413]">{item.title}</h4>
                                {pricingMode === 'transparent' ? (
                                  <span className="font-serif text-sm font-bold text-[#141413] shrink-0">
                                    ₹{item.price.toLocaleString('en-IN')}
                                  </span>
                                ) : pricingMode === 'range' ? (
                                  <span className="font-serif text-xs font-bold text-[#141413] shrink-0">
                                    ₹{Math.round(item.price * 0.9).toLocaleString('en-IN')}+
                                  </span>
                                ) : (
                                  <span className="font-mono text-[10px] text-[#716E68] shrink-0">On Inquiry</span>
                                )}
                              </div>
                              <p className="font-sans text-xs text-[#56423d] pt-0.5 leading-relaxed">{item.medium}</p>
                              <p className="font-mono text-[10px] text-[#716E68] pt-1">{item.dims} · {item.year}</p>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-[#E7E4DF]/60 space-y-2">
                            {toggles.limitedEditionsStock && item.editionInfo && (
                              <div className="font-mono text-[10px] text-[#C25E3E] font-medium">
                                {item.editionInfo}
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setActiveInquiryArtwork(item.title)}
                                className="flex-1 py-1.5 px-2 bg-[#141413] hover:bg-[#C25E3E] text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Inquire
                              </button>
                              {toggles.coaSeal && (
                                <button
                                  onClick={() => setCoaModalArtwork(item)}
                                  className="p-1.5 border border-[#E7E4DF] bg-white hover:bg-[#FAF8F5] text-[#141413] cursor-pointer"
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
                  <section className={`border ${theme.cardBorder} ${theme.subtleBg} p-6 sm:p-8 space-y-4`}>
                    <div className="border-b pb-2" style={{ borderColor: 'inherit' }}>
                      <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-medium">Materiality & Provenance</span>
                      <h3 className="font-serif text-xl font-bold">{processTitle}</h3>
                      <p className="font-sans text-xs text-[#716E68]">{processSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#716E68] block">{spec1Label}</span>
                        <span className="font-sans text-xs font-semibold text-[#141413]">{spec1Val}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#716E68] block">{spec2Label}</span>
                        <span className="font-sans text-xs font-semibold text-[#141413]">{spec2Val}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#716E68] block">{spec3Label}</span>
                        <span className="font-sans text-xs font-semibold text-[#141413]">{spec3Val}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#716E68] block">{spec4Label}</span>
                        <span className="font-sans text-xs font-semibold text-emerald-800">{spec4Val}</span>
                      </div>
                    </div>

                    <p className="font-sans text-xs leading-relaxed text-[#56423d] pt-2 border-t" style={{ borderColor: 'inherit' }}>
                      {processSummary}
                    </p>
                  </section>
                )}

                {/* 5. Commissions Section */}
                {toggles.showCommissionsSection && bespokeAccepting && (
                  <section className={`border ${theme.cardBorder} ${theme.cardBg} p-6 sm:p-8 space-y-4 shadow-xs`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 gap-2" style={{ borderColor: 'inherit' }}>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold">Architectural & Private Commissions</span>
                        <h3 className="font-serif text-xl font-bold">{bespokeTitle}</h3>
                      </div>
                      <span className="font-mono text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-300">
                        ● Accepting Bespoke Projects
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                      <div className="bg-[#FAF8F5] p-3 border border-[#E7E4DF]">
                        <span className="font-mono text-[10px] uppercase text-[#716E68] block">Lead Time</span>
                        <span className="font-semibold text-[#141413] mt-0.5 block">{bespokeLeadTime}</span>
                      </div>
                      <div className="bg-[#FAF8F5] p-3 border border-[#E7E4DF]">
                        <span className="font-mono text-[10px] uppercase text-[#716E68] block">Minimum Budget</span>
                        <span className="font-semibold text-[#141413] mt-0.5 block">{bespokeMinBudget}</span>
                      </div>
                      <div className="bg-[#FAF8F5] p-3 border border-[#E7E4DF]">
                        <span className="font-mono text-[10px] uppercase text-[#716E68] block">Escrow Protection</span>
                        <span className="font-semibold text-emerald-800 mt-0.5 block">50% Advance in Escrow</span>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-[#56423d] leading-relaxed">
                      {bespokeTerms}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => setIsBespokeModalOpen(true)}
                        style={{ backgroundColor: accentColor }}
                        className="px-5 py-2.5 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs font-semibold"
                      >
                        <span className="material-symbols-outlined text-[16px]">draw</span>
                        <span>{bespokeCtaLabel}</span>
                      </button>
                    </div>
                  </section>
                )}

                {/* 6. Contact & Footer */}
                {toggles.showContactSection && (
                  <footer className={`border-t ${theme.border} pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono ${theme.mutedText}`}>
                    <div>
                      <span>© {customStudioName} · Atelier Verified Independent Studio</span>
                      {toggles.studioVisitPolicy && (
                        <span className="block text-[11px] pt-0.5 text-[#56423d]">
                          {visitPolicyText}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5">
                        Phone Masked · In-App Inquiry Hub
                      </span>
                    </div>
                  </footer>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: 4 Extended Tabs (Templates, Content/Studio, Style, Security) - Window Height Restriction */}
        {(!isPreviewExpanded) && (
          <div className={`lg:col-span-5 xl:col-span-4 bg-white border border-[#E7E4DF] shadow-md rounded-md my-4 mr-4 flex flex-col max-h-[calc(100vh-10rem)] overflow-hidden ${hostSmallScreenTab !== 'controls' ? 'hidden lg:flex' : 'flex'}`}>
            
            {/* VERTICAL COLLAPSIBLE SECTIONS */}
            <div className="flex-1 overflow-y-auto border-t border-[#E7E4DF]">
              
              {/* SECTION 1: TEMPLATES */}
              <div className="border-b border-[#E7E4DF]">
                <button 
                  onClick={() => setExpandedSections(prev => ({...prev, templates: !prev.templates}))}
                  className="w-full py-4 px-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#141413] hover:text-[#C25E3E] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    <span>Templates (10)</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">{expandedSections.templates ? 'expand_less' : 'expand_more'}</span>
                </button>
                {expandedSections.templates && (
                  <div className="pb-4 px-4">
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

              {/* SECTION 2: STUDIO (CONTENT) */}
              <div className="border-b border-[#E7E4DF]">
                <button 
                  onClick={() => setExpandedSections(prev => ({...prev, studio: !prev.studio}))}
                  className="w-full py-4 px-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#141413] hover:text-[#C25E3E] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">dashboard_customize</span>
                    <span>Content</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">{expandedSections.studio ? "expand_less" : "expand_more"}</span>
                </button>
                {expandedSections.studio && (
                  <div className="pb-4 px-4">
                    <div className="space-y-5">
                      <div className="border-b border-[#E7E4DF] pb-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">Brand & Content</span>
                        <h3 className="font-serif text-lg text-[#141413]">Section-Wise Content Access</h3>
                        <p className="font-sans text-xs text-[#716E68] mt-0.5">
                          Tailor copy, telemetry, masterwork angles, and catalog items for each section of your portfolio.
                        </p>
                      </div>

                      {/* Discipline Quick Preset Switcher */}
                      <div className="flex items-center justify-between bg-[#FAF8F5] p-2 border border-[#E7E4DF] text-xs">
                        <span className="font-mono text-[10px] text-[#716E68] uppercase font-semibold">Artisan Lineage Preset:</span>
                        <div className="flex items-center gap-1 font-mono text-[11px]">
                          <button onClick={() => handleSelectArtistPreset("aarav")} className={`px-2 py-0.5 cursor-pointer ${selectedArtistId === "aarav" ? "bg-[#141413] text-white font-medium" : "text-[#716E68]"}`}>Potter</button>
                          <button onClick={() => handleSelectArtistPreset("ananya")} className={`px-2 py-0.5 cursor-pointer ${selectedArtistId === "ananya" ? "bg-[#141413] text-white font-medium" : "text-[#716E68]"}`}>Weaver</button>
                          <button onClick={() => handleSelectArtistPreset("devendra")} className={`px-2 py-0.5 cursor-pointer ${selectedArtistId === "devendra" ? "bg-[#141413] text-white font-medium" : "text-[#716E68]"}`}>Sculptor</button>
                        </div>
                      </div>

                      {/* Section-Wise Tabs Bar */}
                      <div className="grid grid-cols-4 gap-1 font-mono text-[9px] uppercase text-center border-b border-[#E7E4DF] pb-3">
                        <button onClick={() => setStudioEditSection("hero")} className={`py-1.5 px-1 border transition-colors cursor-pointer ${studioEditSection === "hero" ? "bg-[#141413] text-white border-black font-semibold" : "bg-[#FAF8F5] text-[#716E68] border-[#E7E4DF]"}`}>Hero</button>
                        <button onClick={() => setStudioEditSection("masterwork")} className={`py-1.5 px-1 border transition-colors cursor-pointer ${studioEditSection === "masterwork" ? "bg-[#141413] text-white border-black font-semibold" : "bg-[#FAF8F5] text-[#716E68] border-[#E7E4DF]"}`}>Masterwork</button>
                        <button onClick={() => setStudioEditSection("gallery")} className={`py-1.5 px-1 border transition-colors cursor-pointer ${studioEditSection === "gallery" ? "bg-[#141413] text-white border-black font-semibold" : "bg-[#FAF8F5] text-[#716E68] border-[#E7E4DF]"}`}>Catalog ({artworksList.length})</button>
                        <button onClick={() => setStudioEditSection("process")} className={`py-1.5 px-1 border transition-colors cursor-pointer ${studioEditSection === "process" ? "bg-[#141413] text-white border-black font-semibold" : "bg-[#FAF8F5] text-[#716E68] border-[#E7E4DF]"}`}>Process</button>
                        <button onClick={() => setStudioEditSection("bespoke")} className={`py-1.5 px-1 border transition-colors cursor-pointer ${studioEditSection === "bespoke" ? "bg-[#141413] text-white border-black font-semibold" : "bg-[#FAF8F5] text-[#716E68] border-[#E7E4DF]"}`}>Bespoke</button>
                        <button onClick={() => setStudioEditSection("about")} className={`py-1.5 px-1 border transition-colors cursor-pointer ${studioEditSection === "about" ? "bg-[#141413] text-white border-black font-semibold" : "bg-[#FAF8F5] text-[#716E68] border-[#E7E4DF]"}`}>Heritage</button>
                        <button onClick={() => setStudioEditSection("policies")} className={`py-1.5 px-1 border transition-colors cursor-pointer ${studioEditSection === "policies" ? "bg-[#141413] text-white border-black font-semibold" : "bg-[#FAF8F5] text-[#716E68] border-[#E7E4DF]"}`}>Policies</button>
                      </div>

                      {/* 1. HERO SECTION CONTROLS */}
                      {studioEditSection === "hero" && (
                        <div className="space-y-4 animate-fade-in">
                          <span className="font-mono text-xs uppercase text-[#C25E3E] font-bold block">Hero Section Customisation</span>
                          
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

                          <div className="grid grid-cols-2 gap-3">
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

                      {/* 2. MASTERWORK SECTION CONTROLS */}
                      {studioEditSection === "masterwork" && (
                        <div className="space-y-4 animate-fade-in">
                          <span className="font-mono text-xs uppercase text-[#C25E3E] font-bold block">Featured Masterwork Centerpiece</span>
                          
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
                              <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Provenance / Exhibition Record</label>
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

                      {/* 3. CATALOG & GALLERY SECTION CONTROLS */}
                      {studioEditSection === "gallery" && (
                        <div className="space-y-4 animate-fade-in">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs uppercase text-[#C25E3E] font-bold">Studio Catalog & Editions</span>
                            <button
                              onClick={() => setIsAddArtworkOpen(true)}
                              className="px-2.5 py-1 bg-[#141413] text-white text-[10px] font-mono uppercase flex items-center gap-1 cursor-pointer hover:bg-[#C25E3E]"
                            >
                              <span className="material-symbols-outlined text-[13px]">add</span>
                              <span>Add Artwork</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Catalog Title</label>
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
                            <span className="font-mono text-[10px] uppercase text-[#716E68] font-semibold block">
                              Documented Artworks ({artworksList.length})
                            </span>
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
                                  onClick={() => handleRemoveArtwork(item.id)}
                                  className="text-red-700 hover:text-red-900 p-1 cursor-pointer shrink-0"
                                  title="Remove Artwork"
                                >
                                  <span className="material-symbols-outlined text-[16px]">delete</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 4. PROCESS & TELEMETRY CONTROLS */}
                      {studioEditSection === "process" && (
                        <div className="space-y-4 animate-fade-in">
                          <span className="font-mono text-xs uppercase text-[#C25E3E] font-bold block">Kiln, Loom & Craft Telemetry</span>
                          
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
                                <span className="font-mono text-[9px] uppercase text-[#716E68] block">Metric 1 Label & Value</span>
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
                                <span className="font-mono text-[9px] uppercase text-[#716E68] block">Metric 2 Label & Value</span>
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
                                <span className="font-mono text-[9px] uppercase text-[#716E68] block">Metric 3 Label & Value</span>
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
                                <span className="font-mono text-[9px] uppercase text-[#716E68] block">Metric 4 Label & Value</span>
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

                      {/* 5. BESPOKE COMMISSIONS CONTROLS */}
                      {studioEditSection === "bespoke" && (
                        <div className="space-y-4 animate-fade-in">
                          <span className="font-mono text-xs uppercase text-[#C25E3E] font-bold block">Bespoke Architectural Commissions</span>
                          
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
                              <div className="font-sans text-[11px] text-[#716E68]">Displays \"Open for Commissions\" badge</div>
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

                      {/* 6. ABOUT & HERITAGE CONTROLS */}
                      {studioEditSection === "about" && (
                        <div className="space-y-4 animate-fade-in">
                          <span className="font-mono text-xs uppercase text-[#C25E3E] font-bold block">About & Studio Heritage</span>
                          
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
                        </div>
                      )}

                      {/* 7. POLICIES & GUARANTEES */}
                      {studioEditSection === "policies" && (
                        <div className="space-y-4 animate-fade-in">
                          <span className="font-mono text-xs uppercase text-[#C25E3E] font-bold block">Logistics & Buyer Guarantees</span>
                          
                          <div>
                            <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Domestic Transit Insurance & Courier Policy</label>
                            <textarea
                              rows={2}
                              value={shippingPolicyText}
                              onChange={e => setShippingPolicyText(e.target.value)}
                              className="w-full px-3 py-2 border border-[#E7E4DF] text-xs font-sans text-[#141413]"
                            />
                          </div>

                          <div className="p-3 bg-[#FAF8F5] border border-[#E7E4DF] space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-[#141413]">Insured Fine Art Logistics</span>
                              <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-300">Active</span>
                            </div>
                            <p className="font-sans text-[11px] text-[#56423d]">
                              Integrated Blue Dart Apex & Delhivery door-to-door insurance with transit damage protection.
                            </p>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 3: STYLE */}
              <div className="border-b border-[#E7E4DF]">
                <button 
                  onClick={() => setExpandedSections(prev => ({...prev, styles: !prev.styles}))}
                  className="w-full py-4 px-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#141413] hover:text-[#C25E3E] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">palette</span>
                    <span>Style</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">{expandedSections.styles ? "expand_less" : "expand_more"}</span>
                </button>
                {expandedSections.styles && (
                  <div className="pb-4 px-4">
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

                      {/* Typography Pairings */}
                      <div className="border-t border-[#E7E4DF] pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">02 / Typography</span>
                        <h3 className="font-serif text-lg text-[#141413]">Indian Fine Art Type Pairings (7 Styles)</h3>

                        <div className="space-y-2 mt-3">
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
                              className={`p-2.5 border transition-all cursor-pointer ${
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

                      {/* Image Aspect Ratio Options */}
                      <div className="border-t border-[#E7E4DF] pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">03 / Aspect Ratio</span>
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
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">04 / Border & Elevation</span>
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
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] font-semibold block">05 / Accents</span>
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

              {/* SECTION 4: SECURITY */}
              <div className="border-b border-[#E7E4DF]">
                <button 
                  onClick={() => setExpandedSections(prev => ({...prev, security: !prev.security}))}
                  className="w-full py-4 px-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#141413] hover:text-[#C25E3E] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">security</span>
                    <span>Security</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">{expandedSections.security ? "expand_less" : "expand_more"}</span>
                </button>
                {expandedSections.security && (
                  <div className="pb-4 px-4">
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
                      
                      {/* GROUP 1: SECTIONS (Matching Attached Image Style) */}
                      <div className="space-y-2">
                        <div className="font-serif text-sm font-bold uppercase tracking-wider text-[#141413] border-b border-[#E7E4DF] pb-2">
                          SECTIONS
                        </div>
                        {[
                          { key: "showHeroSection" as keyof FeatureToggles, label: "Hero" },
                          { key: "showFeaturedWorkSection" as keyof FeatureToggles, label: "Featured Work" },
                          { key: "showCollectionsSection" as keyof FeatureToggles, label: "Collections" },
                          { key: "showAboutSection" as keyof FeatureToggles, label: "About" },
                          { key: "showCommissionsSection" as keyof FeatureToggles, label: "Commissions" },
                          { key: "showContactSection" as keyof FeatureToggles, label: "Contact" },
                        ].map(sec => {
                          const enabled = toggles[sec.key];
                          return (
                            <div
                              key={sec.key}
                              onClick={() => handleToggle(sec.key)}
                              className="p-3 bg-[#FAF8F5] border-b border-[#E7E4DF] flex items-center justify-between gap-3 select-none cursor-pointer hover:bg-white transition-colors"
                            >
                              <span className="font-serif text-sm font-medium text-[#141413]">{sec.label}</span>
                              <div
                                className="w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0"
                                style={{ backgroundColor: enabled ? accentColor : "#E5E2DC" }}
                              >
                                <div
                                  className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform"
                                  style={{ transform: enabled ? "translateX(20px)" : "translateX(0px)" }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* GROUP 2: 7 IMPORTANT SECURITY & PROTECTION FEATURES */}
                      <div className="space-y-2 pt-2">
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
                                  className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform"
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
        <div className="fixed inset-0 bg-[#141413]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-[#E7E4DF] max-w-lg w-full p-6 shadow-2xl space-y-4">
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
        <div className="fixed inset-0 bg-[#141413]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FAF8F5] border-2 border-[#141413] max-w-lg w-full p-8 shadow-2xl space-y-6 relative">
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
        <div className="fixed inset-0 bg-[#141413]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-[#E7E4DF] max-w-lg w-full p-6 shadow-2xl space-y-4">
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
        <div className="fixed inset-0 bg-[#141413]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-[#E7E4DF] max-w-lg w-full p-6 shadow-2xl space-y-4">
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
        <div className="fixed inset-0 bg-[#141413]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border-2 border-[#141413] max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
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

      {/* INTERACTIVE MODAL 7: WHAT MORE CAN WE DO ROADMAP & INNOVATIONS */}
      {isRoadmapOpen && (
        <div className="fixed inset-0 bg-[#141413]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border-2 border-[#141413] max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-bold">Product Strategy & Future Upgrades</span>
                <h3 className="font-serif text-2xl text-[#141413]">10 Game-Changing Features for Portfolio Customiser</h3>
              </div>
              <button
                onClick={() => setIsRoadmapOpen(false)}
                className="text-[#716E68] hover:text-[#141413] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-sans text-xs text-[#56423d] leading-relaxed">
              These suggestions highlight high-leverage innovations that can make Atelier’s Portfolio Customiser the undisputed gold standard for small Indian craftspeople, independent studios, and global fine art collectors:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  num: '01',
                  title: 'Live AR / Spatial "View in Room" Simulator',
                  desc: 'Allow collectors using mobile devices to project the exact dimensions of a ceramic urn or handloom tapestry onto their living room walls with accurate scale indicators.'
                },
                {
                  num: '02',
                  title: 'Private VIP Collector Vault (Password / Link Gate)',
                  desc: 'Permit creators to upload new kiln batches 48 hours prior to public launch, generating private password-protected links for trusted architects and patron circles.'
                },
                {
                  num: '03',
                  title: 'CAD / DWG & High-Res Swatch Kit for Architects',
                  desc: 'Luxury interior designers specifying pieces for hotels and villas can download 3D CAD models and high-res raw texture swatches directly from the portfolio.'
                },
                {
                  num: '04',
                  title: 'Multi-Currency International Checkout (₹ INR / $ USD / € EUR)',
                  desc: 'Automate live real-time currency conversion with international DHL insured courier crating calculation and customs export documentation assist.'
                },
                {
                  num: '05',
                  title: 'Ambient Studio Soundscapes & Audio Commentary',
                  desc: 'Integrate subtle ambient audio players (e.g., sound of the potter’s wheel or pit-loom clack) and 45-second voice notes from the master craftsman explaining a piece.'
                },
                {
                  num: '06',
                  title: 'Custom Domain Mapping (yourstudio.in / yourname.art)',
                  desc: 'Allow creators to attach their personal custom domain with automatic SSL certificates while keeping all in-app messaging and 50% escrow checkouts fully mediated.'
                },
                {
                  num: '07',
                  title: 'Live Kiln Batch Countdown & Drop System',
                  desc: 'Create anticipation for limited firings or monsoon textile drops with a live countdown timer: "Next Wood Firing Unloading: Friday 4:00 PM IST".'
                },
                {
                  num: '08',
                  title: 'One-Click Print Lookbook & Exhibition Dossier',
                  desc: 'Auto-generate clean, high-resolution A4 and Letter PDF catalogs with QR codes linking directly to Atelier Escrow checkout for gallery booths and art fairs.'
                },
                {
                  num: '09',
                  title: 'AI Materiality & Craft Storyteller from Studio Photos',
                  desc: 'Creators upload 3 kiln/workshop photos; the system automatically draft technical specs (clay origin, firing cones, pit-loom thread counts) and poetic monographs.'
                },
                {
                  num: '10',
                  title: 'Collective Guild & Master-Apprentice Dual Sign-off',
                  desc: 'Allow cooperative craft clusters (like Khurja Potteries or Bastar Bell Metal Guild) to co-curate portfolios where senior master artisans digitally co-sign certificates.'
                }
              ].map(item => (
                <div key={item.num} className="p-3.5 border border-[#E7E4DF] bg-[#FAF8F5] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#C25E3E] font-bold">{item.num}</span>
                    <h4 className="font-serif text-sm font-bold text-[#141413]">{item.title}</h4>
                  </div>
                  <p className="font-sans text-xs text-[#56423d] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-[#E7E4DF]">
              <button
                onClick={() => setIsRoadmapOpen(false)}
                className="px-5 py-2 bg-[#141413] text-white font-mono text-xs uppercase cursor-pointer shadow-xs font-semibold"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
