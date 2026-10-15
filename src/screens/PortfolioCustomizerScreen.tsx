import React, { useState, useRef } from 'react';

interface PortfolioCustomizerScreenProps {
  onNavigate: (path: string) => void;
}

// Custom curated template presets
interface TemplatePreset {
  id: string;
  name: string;
  subtitle: string;
  canvasColor: 'bone' | 'linen' | 'basalt' | 'parchment';
  typography: 'playfair' | 'cormorant' | 'syne';
  archetype: 'editorial' | 'gallery' | 'masonry';
  accentColor: string;
  description: string;
  swatches: string[];
  toggles: FeatureToggles;
}

interface FeatureToggles {
  provenanceBadge: boolean;
  dualLanguage: boolean;
  kilnProcessLog: boolean;
  collectorPricing: boolean;
  curatorFootnotes: boolean;
  privateViewingRoom: boolean;
  coaSeal: boolean;
  microSpecs: boolean;
  timelineChronology: boolean;
  commissionGateway: boolean;
}

// Artist profiles for changing & enhancing preview content
interface ArtistProfile {
  id: 'elena' | 'kaito' | 'aurelia';
  name: string;
  discipline: string;
  locations: string;
  ledgerId: string;
  heroHeadline: string;
  heroSubheadline: string;
  secondaryLanguage: {
    label: string;
    edition: string;
    text: string;
  };
  representation: string;
  publicCollections: string;
  series: Array<{
    name: string;
    era: string;
    count: string;
    desc: string;
    img: string;
  }>;
  masterwork: {
    id: string;
    title: string;
    subtitle: string;
    year: string;
    medium: string;
    dims: string;
    weight: string;
    firingOrCasting: string;
    provenance: string;
    price: string;
    status: string;
    images: {
      front: string;
      profile: string;
      texture: string;
      spatial: string;
    };
  };
  artworks: Array<{
    id: string;
    title: string;
    series: string;
    year: string;
    dims: string;
    medium: string;
    price: string;
    status: string;
    img: string;
    provenance: string;
  }>;
  processLog: {
    title: string;
    subtitle: string;
    label1: string;
    val1: string;
    label2: string;
    val2: string;
    label3: string;
    val3: string;
    label4: string;
    val4: string;
    telemetryDesc: string;
  };
  audioNote: {
    title: string;
    duration: string;
    location: string;
  };
  review: {
    quote: string;
    author: string;
    role: string;
  };
}

const ARTIST_PROFILES: Record<'elena' | 'kaito' | 'aurelia', ArtistProfile> = {
  elena: {
    id: 'elena',
    name: 'Elena Vance',
    discipline: 'Ceramic Sculptor · Monumental Stoneware',
    locations: 'Zürich & Kyoto',
    ledgerId: '#ZUR-2024-EV',
    heroHeadline: 'Investigating geological fractures, thermal vitrification, and unglazed volcanic stoneware.',
    heroSubheadline: 'Sculptural artifacts born from high-temperature wood kilns. Each monolith interrogates tectonic tension, mineral shrinkage, and the silent permanence of physical earth.',
    secondaryLanguage: {
      label: 'Curatorial Monograph Translation (日本語 / JP Catalog Edition)',
      edition: 'Kyoto Craft Monograph #04',
      text: '地質学的破砕、高温ガラス化、そして無釉薬の火山性陶器の研究。信楽の天然山土と穴窯120時間の薪還元焼成による構造的彫刻。各作品は、構造的緊張と地球の静謐な恒久性を表現しています。'
    },
    representation: 'Galerie Meili (Zürich)',
    publicCollections: '14 Works Held (Kunstmuseum Basel, Kyoto Crafts Pavillion)',
    series: [
      {
        name: 'Tectonic Vessels',
        era: '2024 · Kyoto Anagama',
        count: '9 Masterworks',
        desc: 'Heavy ash melt, mineral fractures, and deep volcanic stoneware reduction.',
        img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Basalt Monoliths',
        era: '2023 — 2024 · Zürich',
        count: '6 Monoliths',
        desc: 'Vertical structural pillars interrogating tectonic shifts and natural crust collapse.',
        img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Sumi Ash Studies',
        era: '2022 — 2023 · Shigaraki',
        count: '12 Studies',
        desc: 'Atmospheric charcoal deposits and unglazed refractory clay vitrification.',
        img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'
      }
    ],
    masterwork: {
      id: 'EV-2024-004',
      title: 'Tectonic Vessel No. 04',
      subtitle: 'Wood-Fired Anagama Stoneware, 1320°C',
      year: '2024',
      medium: 'Unglazed Shigaraki Mountain Clay & Pine Ash',
      dims: '48 × 32 × 30 cm',
      weight: '14.2 kg (Museum Crating)',
      firingOrCasting: '120 Hours Continuous Reduction',
      provenance: '60th International Art Exhibition – La Biennale di Venezia',
      price: '$18,400 USD',
      status: 'Available',
      images: {
        front: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=85',
        profile: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=85',
        texture: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85',
        spatial: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
      }
    },
    artworks: [
      {
        id: 'EV-2024-001',
        title: 'Vitrified Monolith 07',
        series: 'Monoliths',
        year: '2024',
        dims: '72 × 28 × 22 cm',
        medium: 'Refractory stoneware, natural red pine fly ash melt',
        price: '$24,000 USD',
        status: 'Available',
        img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
        provenance: 'Venice Biennale 2024'
      },
      {
        id: 'EV-2024-002',
        title: 'Tectonic Fracture Bowl',
        series: 'Vessels',
        year: '2024',
        dims: '44 × 42 × 18 cm',
        medium: 'Coarse mountain clay with thermal quartz stress fractures',
        price: '$14,500 USD',
        status: 'Available',
        img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
        provenance: 'Kyoto Crafts Pavillion 2024'
      },
      {
        id: 'EV-2023-009',
        title: 'Basalt Strata Pillar No. 03',
        series: 'Monoliths',
        year: '2023',
        dims: '84 × 32 × 26 cm',
        medium: 'Basalt stoneware with vitrified thermal fractures',
        price: '$28,000 USD',
        status: 'Institutional Reserve',
        img: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80',
        provenance: 'Kunstmuseum Basel Loan'
      },
      {
        id: 'EV-2024-005',
        title: 'Atmospheric Ash Cylinder',
        series: 'Vessels',
        year: '2024',
        dims: '52 × 24 × 24 cm',
        medium: 'Single-fire wood kiln, continuous 120h reduction',
        price: '$16,800 USD',
        status: 'Available',
        img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
        provenance: 'Art Basel Parcours 2024'
      },
      {
        id: 'EV-2023-014',
        title: 'Geomorphic Cavity 02',
        series: 'Vessels',
        year: '2023',
        dims: '40 × 38 × 32 cm',
        medium: 'Unglazed red pine ash deposit, wood kiln',
        price: '$12,000 USD',
        status: 'Private Collection',
        img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
        provenance: 'Private Collection (Geneva)'
      },
      {
        id: 'EV-2024-008',
        title: 'Porous Tectonic Slab',
        series: 'Monoliths',
        year: '2024',
        dims: '58 × 36 × 20 cm',
        medium: 'High-temperature refractory stoneware',
        price: '$19,500 USD',
        status: 'Available',
        img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        provenance: 'Zürich Kunsthalle Showcase'
      }
    ],
    processLog: {
      title: 'Studio Kiln & Anagama Telemetry Log',
      subtitle: '120h Continuous Wood Reduction',
      label1: 'Kiln Architecture',
      val1: 'Single-Chamber Anagama Slope Kiln',
      label2: 'Wood Fuel Species',
      val2: 'Split Red Pine (Akamatsu), 10 Cords',
      label3: 'Peak Thermocouple',
      val3: '1,320°C (Cone 12 Vitrification)',
      label4: 'Atmosphere Cycle',
      val4: '48h Neutral → 72h Deep CO Reduction',
      telemetryDesc: 'Vitrification occurs without chemical fluxes or applied glazes. Surface colorations are created exclusively by aerodynamic pine ash accumulation and mineral vaporization.'
    },
    audioNote: {
      title: 'Listen: Anagama Kiln 120h Atmosphere (Shigaraki)',
      duration: '02:45',
      location: 'Recorded live at Shigaraki mountain slope'
    },
    review: {
      quote: '“Vance’s vessels do not merely occupy architectural space; they condense geologic time into unglazed stoneware, confronting the viewer with the silent weight of tectonic memory.”',
      author: 'Dr. Beatrix von Aesch',
      role: 'Senior Curator of Decorative Arts & Sculpture, Kunsthaus Zürich'
    }
  },
  kaito: {
    id: 'kaito',
    name: 'Kaito Tanaka',
    discipline: 'Spatial Optics · Dichroic Glass & Kinetic Light',
    locations: 'Tokyo & Berlin',
    ledgerId: '#TYO-2025-KT',
    heroHeadline: 'Sculpting pure chromatic diffraction, optical glass prisms, and architectural luminance.',
    heroSubheadline: 'Monolithic optical borosilicate structures that refract ambient daybeams into suspended spectrum fields. Each prism interacts dynamically with architectural circadian rhythms.',
    secondaryLanguage: {
      label: 'Curatorial Monograph Translation (Deutsch / Berlin Edition)',
      edition: 'Neue Nationalgalerie Monograph #08',
      text: 'Erforschung von optischer Beugung, dichroitischen Glasschichten und architektonischer Lichtarchitektur. Jedes Glasprisma bricht das Umgebungslicht in ein dynamisches Spektralfeld, das sich mit dem natürlichen Tageslauf transformiert.'
    },
    representation: 'Studio Tanaka / Esther Schipper (Berlin)',
    publicCollections: '9 Works Held (Mori Art Museum Tokyo, Centre Pompidou Paris)',
    series: [
      {
        name: 'Prismatic Monoliths',
        era: '2024 · Berlin Studio',
        count: '8 Columns',
        desc: 'Precision-ground optical crown glass with dichroic vapor-deposited nanofilms.',
        img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Diffraction Cavities',
        era: '2023 — 2025 · Tokyo',
        count: '11 Installations',
        desc: 'Recessed wall apertures capturing low-angled natural sunbeams to emit spectral gradients.',
        img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Spectral Slabs',
        era: '2023 · Venice Glass Week',
        count: '5 Works',
        desc: 'Massive slumped optical blocks annealed over 180 continuous hours in Murano.',
        img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80'
      }
    ],
    masterwork: {
      id: 'KT-2025-001',
      title: 'Prism Horizon No. 06',
      subtitle: 'Dichroic Crown Optical Borosilicate, Hand-Polished',
      year: '2025',
      medium: 'Multi-layer Titanium Oxide Nanocoating & Float Glass',
      dims: '95 × 38 × 22 cm',
      weight: '38.5 kg (Custom Museum Armature)',
      firingOrCasting: '180h Controlled Lehr Annealing',
      provenance: 'Art Basel Unlimited 2025 Special Feature',
      price: '$42,000 USD',
      status: 'Available',
      images: {
        front: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
        profile: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=85',
        texture: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85',
        spatial: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
      }
    },
    artworks: [
      {
        id: 'KT-2025-003',
        title: 'Chromatic Refraction Cube',
        series: 'Prismatic',
        year: '2025',
        dims: '35 × 35 × 35 cm',
        medium: 'Solid optical borosilicate with 99.8% light transmission',
        price: '$21,500 USD',
        status: 'Available',
        img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        provenance: 'Tokyo Gendai 2025'
      },
      {
        id: 'KT-2024-012',
        title: 'Spectral Blade Installation',
        series: 'Prismatic',
        year: '2024',
        dims: '120 × 18 × 12 cm',
        medium: 'Dichroic bevelled slab with architectural anchor mount',
        price: '$34,000 USD',
        status: 'Available',
        img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
        provenance: 'Venice Glass Week Showcase'
      },
      {
        id: 'KT-2024-008',
        title: 'Luminous Aperture Disc',
        series: 'Diffraction',
        year: '2024',
        dims: '60 × 60 × 6 cm',
        medium: 'Circular fused optic lens with iridescent coating',
        price: '$26,000 USD',
        status: 'Institutional Reserve',
        img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
        provenance: 'Mori Art Museum Collection'
      },
      {
        id: 'KT-2023-019',
        title: 'Dichroic Column IV',
        series: 'Prismatic',
        year: '2023',
        dims: '80 × 25 × 25 cm',
        medium: 'Slumped silica glass with vacuum vapor deposition',
        price: '$29,000 USD',
        status: 'Available',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        provenance: 'Art Cologne 2024'
      }
    ],
    processLog: {
      title: 'Optical Vacuum Deposition & Lehr Annealing Log',
      subtitle: '180h Continuous Thermal Gradient Cooling',
      label1: 'Substrate Spec',
      val1: 'Schott N-BK7 Ultra-Pure Crown Glass',
      label2: 'Nanofilm Coating',
      val2: '24-Layer Alternating TiO2 & SiO2 Vacuum Vapor',
      label3: 'Annealing Chamber',
      val3: '580°C Transition → 0.2°C/hr Stress Release',
      label4: 'Surface Polish',
      val4: 'Lambda/10 Optical Surface Wavefront Flatness',
      telemetryDesc: 'Zero visible grain or bubbles. Light passing through undergoes wavelength separation, casting radiant spectral gradients across interior walls with zero electrical wiring.'
    },
    audioNote: {
      title: 'Listen: Studio Glass Annealing Frequency (Berlin)',
      duration: '03:12',
      location: 'Recorded in ultrasonic polishing laboratory'
    },
    review: {
      quote: '“Tanaka treats light not as illumination, but as physical mass. In his monoliths, optical physics transcends into transcendent spatial meditation.”',
      author: 'Prof. Julian Lindemann',
      role: 'Curator of Contemporary Glass & Spatial Media, Hamburger Bahnhof Berlin'
    }
  },
  aurelia: {
    id: 'aurelia',
    name: 'Aurelia Vane',
    discipline: 'Monumental Bronze · Lost-Wax Casting & Obsidian',
    locations: 'London & Milan',
    ledgerId: '#LDN-2025-AV',
    heroHeadline: 'Monumental patinated bronze, raw volcanic obsidian, and lost-wax foundry casting.',
    heroSubheadline: 'Brutalist sculptural totems that explore balance, metallurgical oxidation, and deep geologic memory. Cast in historic Italian foundries using century-old ceramic shell protocols.',
    secondaryLanguage: {
      label: 'Curatorial Monograph Translation (Italiano / Milan Triennale Edition)',
      edition: 'Triennale Milano Monograph #12',
      text: 'Indagine sul bronzo monumentale patinato, l’ossidiana vulcanica grezza e la fusione a cera persa. Ciascuna scultura interroga l’equilibrio statico, l’ossidazione metallurgica e la memoria profonda della materia.'
    },
    representation: 'Victoria Miro Gallery (London)',
    publicCollections: '18 Works Held (Tate Modern, Swiss National Museum, Yorkshire Sculpture Park)',
    series: [
      {
        name: 'Tectonic Monoliths',
        era: '2024 · Verona Foundry',
        count: '7 Totems',
        desc: 'Lost-wax cast bronze with sulfur-liver patinas and raw obsidian insets.',
        img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Equilibrium Arcs',
        era: '2023 — 2025 · London',
        count: '10 Sculptures',
        desc: 'Counterbalanced cantilever bronze elements resting on solitary knife-edge pivots.',
        img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Obsidian Stele',
        era: '2022 — 2024 · Milan',
        count: '6 Works',
        desc: 'High-polish volcanic glass enveloped in bronze armature brackets.',
        img: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80'
      }
    ],
    masterwork: {
      id: 'AV-2025-009',
      title: 'Cantilever Totem No. 02',
      subtitle: 'Lost-Wax Bronze with Natural Sulfur Patina & Obsidian',
      year: '2025',
      medium: 'Cast Silicon Bronze & Icelandic Obsidian Stone',
      dims: '112 × 42 × 34 cm',
      weight: '64 kg (Reinforced Plinth Mount)',
      firingOrCasting: 'Foundry Pour at 1,180°C in Verona',
      provenance: 'Frieze Sculpture London 2025 Showcase',
      price: '$58,000 USD',
      status: 'Available',
      images: {
        front: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
        profile: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=85',
        texture: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=1200&q=85',
        spatial: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
      }
    },
    artworks: [
      {
        id: 'AV-2025-001',
        title: 'Obsidian Fracture Column',
        series: 'Monoliths',
        year: '2025',
        dims: '96 × 32 × 28 cm',
        medium: 'Cast bronze shell with trapped volcanic glass heart',
        price: '$38,000 USD',
        status: 'Available',
        img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        provenance: 'Milan Design Week Triennale'
      },
      {
        id: 'AV-2024-004',
        title: 'Kinetic Equilibrium Stele',
        series: 'Equilibrium',
        year: '2024',
        dims: '74 × 48 × 22 cm',
        medium: 'Counterbalanced solid bronze on tungsten pivot',
        price: '$32,000 USD',
        status: 'Available',
        img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
        provenance: 'Frieze London Exhibition'
      },
      {
        id: 'AV-2024-011',
        title: 'Porous Basalt Vessel',
        series: 'Monoliths',
        year: '2024',
        dims: '50 × 44 × 36 cm',
        medium: 'Oxidized green bronze patina with charcoal wax',
        price: '$24,000 USD',
        status: 'Institutional Reserve',
        img: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80',
        provenance: 'Tate Modern Sculpture Collection'
      }
    ],
    processLog: {
      title: 'Lost-Wax Foundry Casting & Chemical Patination Log',
      subtitle: 'Verona Artisan Foundry Batch #42',
      label1: 'Alloy Composition',
      val1: 'C95400 Aluminum Bronze (High Tensile Rigidity)',
      label2: 'Melt Temperature',
      val2: '1,180°C Induction Crucible Pour',
      label3: 'Patination Chemistry',
      val3: 'Potassium Polysulfide (Liver of Sulfur) & Cupric Nitrate',
      label4: 'Surface Sealing',
      val4: 'Microcrystalline Renaissance Wax, 3 Hand Coats',
      telemetryDesc: 'Sculptures are hand-carved in microcrystalline wax, invested in refractory ceramic slurry, dewaxed at 900°C, and cast with molten bronze. Patinas are torched onto the warm metal to produce deep archival tones.'
    },
    audioNote: {
      title: 'Listen: Foundry Bronze Pour & Anvil Resonance',
      duration: '01:58',
      location: 'Recorded in historic Verona casting foundry'
    },
    review: {
      quote: '“Aurelia Vane redefines contemporary sculpture with brutalist honesty. Her bronzes hold a tectonic gravity that resonates within any monumental architectural space.”',
      author: 'Dame Alistair Sterling',
      role: 'Curator Emeritus, Yorkshire Sculpture Park & Royal Academy'
    }
  }
};

export default function PortfolioCustomizerScreen({ onNavigate }: PortfolioCustomizerScreenProps) {
  // Viewport mode: desktop, tablet, mobile
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  // Preview scale mode: 'fit' to column or 'actual' full resolution (scrollable)
  const [previewScaleMode, setPreviewScaleMode] = useState<'fit' | 'actual'>('fit');
  
  // Scroll experience mode: 'frame' (interactive in-mockup scroll) vs 'canvas' (full-length artboard)
  const [scrollMode, setScrollMode] = useState<'frame' | 'canvas'>('frame');

  // Full Preview expansion toggle (collapses sidebar to show full portfolio)
  const [isPreviewExpanded, setIsPreviewExpanded] = useState<boolean>(false);

  // Host screen small viewport tab switcher (controls vs preview on < lg screens)
  const [hostSmallScreenTab, setHostSmallScreenTab] = useState<'controls' | 'preview'>('preview');

  // Simulated Mobile Navigation Menu Drawer toggle
  const [simulatedMobileNavOpen, setSimulatedMobileNavOpen] = useState(false);
  
  // Active customizer panel tab
  const [activeTab, setActiveTab] = useState<'toggles' | 'templates' | 'artist' | 'atmosphere' | 'layout'>('toggles');
  
  // Active Artist Edition (Elena Vance, Kaito Tanaka, Aurelia Vane)
  const [activeArtistId, setActiveArtistId] = useState<'elena' | 'kaito' | 'aurelia'>('elena');
  const currentArtist = ARTIST_PROFILES[activeArtistId];

  // Visual design settings
  const [archetype, setArchetype] = useState<'editorial' | 'gallery' | 'masonry'>('editorial');
  const [typography, setTypography] = useState<'playfair' | 'cormorant' | 'syne'>('cormorant');
  const [canvasColor, setCanvasColor] = useState<'bone' | 'linen' | 'basalt' | 'parchment'>('basalt');
  const [accentColor, setAccentColor] = useState('#C25E3E');
  const [gridDensity, setGridDensity] = useState<'airy' | 'balanced' | 'compact'>('balanced');
  const [activeTemplate, setActiveTemplate] = useState<string>('venice');

  // Selected work filter tab inside preview
  const [previewWorkFilter, setPreviewWorkFilter] = useState<'all' | 'monoliths' | 'vessels' | 'available'>('all');

  // Audio statement simulator
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // 360 Inspection angle view (front, profile, texture, spatial)
  const [masterworkAngle, setMasterworkAngle] = useState<'front' | 'profile' | 'texture' | 'spatial'>('front');

  // Inquiry form interactive state
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('$20,000 — $40,000');

  // Interactive Preview Modals & Feature States
  const [coaModalOpen, setCoaModalOpen] = useState(false);
  const [vipUnlocked, setVipUnlocked] = useState(false);
  const [vipPasscode, setVipPasscode] = useState('');

  // Interactive Feature Toggles (Turn on/off with instant preview response)
  const [toggles, setToggles] = useState<FeatureToggles>({
    provenanceBadge: true,
    dualLanguage: true,
    kilnProcessLog: true,
    collectorPricing: true,
    curatorFootnotes: true,
    privateViewingRoom: true,
    coaSeal: true,
    microSpecs: true,
    timelineChronology: true,
    commissionGateway: true,
  });

  // Highlight state to show which element was toggled in preview
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Ref for the internal scrollable container
  const innerMockupRef = useRef<HTMLDivElement>(null);
  const outerCanvasRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggle = (key: keyof FeatureToggles) => {
    setToggles(prev => {
      const next = { ...prev, [key]: !prev[key] };
      setHighlightedKey(key);
      setTimeout(() => setHighlightedKey(null), 1500);
      return next;
    });
  };

  // Viewport mode booleans for internal content responsiveness
  const isMobileViewport = viewportMode === 'mobile';
  const isTabletViewport = viewportMode === 'tablet';
  const isDesktopWidth = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;

  // Curated Master Templates
  const templates: TemplatePreset[] = [
    {
      id: 'venice',
      name: "Venice Biennale Pavilion",
      subtitle: 'Brutalist Monograph',
      canvasColor: 'basalt',
      typography: 'cormorant',
      archetype: 'editorial',
      accentColor: '#C25E3E',
      description: 'Charcoal volcanic ground, terracotta accents, dual-language monographs, and severe museum typography.',
      swatches: ['#141413', '#C25E3E', '#F5F2EB', '#7A766F'],
      toggles: {
        provenanceBadge: true,
        dualLanguage: true,
        kilnProcessLog: true,
        collectorPricing: false,
        curatorFootnotes: true,
        privateViewingRoom: true,
        coaSeal: true,
        microSpecs: true,
        timelineChronology: true,
        commissionGateway: true,
      }
    },
    {
      id: 'kyoto',
      name: "Kyoto Tea-Master Archive",
      subtitle: 'Quiet Wabi Curation',
      canvasColor: 'linen',
      typography: 'playfair',
      archetype: 'masonry',
      accentColor: '#4A5B4E',
      description: 'Warm unbleached Japanese linen, moss-green accents, organic masonry flow, and deep kiln telemetry.',
      swatches: ['#F7F4EE', '#4A5B4E', '#2B2A27', '#C4BCAB'],
      toggles: {
        provenanceBadge: true,
        dualLanguage: true,
        kilnProcessLog: true,
        collectorPricing: false,
        curatorFootnotes: false,
        privateViewingRoom: false,
        coaSeal: true,
        microSpecs: true,
        timelineChronology: true,
        commissionGateway: true,
      }
    },
    {
      id: 'basel',
      name: "Art Basel Cantonal Ledger",
      subtitle: 'Primary Market Commercial',
      canvasColor: 'bone',
      typography: 'syne',
      archetype: 'gallery',
      accentColor: '#1B4965',
      description: 'Stark alabaster canvas, cobalt accents, dense grid layout, transparent pricing, and instant acquisitions.',
      swatches: ['#FFFFFF', '#1B4965', '#141413', '#D6D4CF'],
      toggles: {
        provenanceBadge: true,
        dualLanguage: false,
        kilnProcessLog: false,
        collectorPricing: true,
        curatorFootnotes: true,
        privateViewingRoom: true,
        coaSeal: true,
        microSpecs: true,
        timelineChronology: true,
        commissionGateway: true,
      }
    },
    {
      id: 'sothebys',
      name: "Sotheby's Archival Provenance",
      subtitle: 'Gilded Antiquarian',
      canvasColor: 'parchment',
      typography: 'cormorant',
      archetype: 'editorial',
      accentColor: '#8C6D46',
      description: 'Aged antiquarian parchment, gilded bronze accents, cryptographic seals, and private collector viewing lounge.',
      swatches: ['#F2EDE4', '#8C6D46', '#211F1D', '#D9D0C1'],
      toggles: {
        provenanceBadge: true,
        dualLanguage: true,
        kilnProcessLog: true,
        collectorPricing: true,
        curatorFootnotes: true,
        privateViewingRoom: true,
        coaSeal: true,
        microSpecs: true,
        timelineChronology: true,
        commissionGateway: true,
      }
    }
  ];

  const applyTemplate = (preset: TemplatePreset) => {
    setActiveTemplate(preset.id);
    setCanvasColor(preset.canvasColor);
    setTypography(preset.typography);
    setArchetype(preset.archetype);
    setAccentColor(preset.accentColor);
    setToggles({ ...preset.toggles });
    showToast(`Template applied: ${preset.name}`);
  };

  // Scroll jump helper
  const scrollToPreviewSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Nudge scroll helper
  const nudgeScroll = (direction: 'up' | 'down' | 'left' | 'right') => {
    const target = scrollMode === 'frame' ? innerMockupRef.current : outerCanvasRef.current;
    if (!target) return;
    const delta = 300;
    if (direction === 'up') target.scrollBy({ top: -delta, behavior: 'smooth' });
    if (direction === 'down') target.scrollBy({ top: delta, behavior: 'smooth' });
    if (direction === 'left') target.scrollBy({ left: -delta, behavior: 'smooth' });
    if (direction === 'right') target.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // Color theme mapper
  const getThemeClasses = () => {
    switch (canvasColor) {
      case 'basalt':
        return {
          bg: 'bg-[#181816]',
          text: 'text-[#F3F0EA]',
          border: 'border-[#2F2E2A]',
          subtleBg: 'bg-[#21211E]',
          cardBg: 'bg-[#1D1D1A]',
          cardBorder: 'border-[#353430]',
        };
      case 'bone':
        return {
          bg: 'bg-[#FFFFFF]',
          text: 'text-[#141413]',
          border: 'border-[#E7E4DF]',
          subtleBg: 'bg-[#F9F8F6]',
          cardBg: 'bg-[#FFFFFF]',
          cardBorder: 'border-[#E7E4DF]',
        };
      case 'linen':
        return {
          bg: 'bg-[#F6F3ED]',
          text: 'text-[#23211E]',
          border: 'border-[#DDD8CE]',
          subtleBg: 'bg-[#EFECE4]',
          cardBg: 'bg-[#FAF8F5]',
          cardBorder: 'border-[#DFDACF]',
        };
      case 'parchment':
      default:
        return {
          bg: 'bg-[#F2EDE4]',
          text: 'text-[#22201D]',
          border: 'border-[#D9D1C1]',
          subtleBg: 'bg-[#E8E1D2]',
          cardBg: 'bg-[#FAF6EF]',
          cardBorder: 'border-[#DDD4C2]',
        };
    }
  };

  const theme = getThemeClasses();

  // Typography font class mapper
  const getHeaderFontClass = () => {
    if (typography === 'cormorant') return 'font-serif italic';
    if (typography === 'playfair') return 'font-serif';
    return 'font-sans font-bold tracking-tight';
  };

  // Filter artworks for preview
  const filteredArtworks = currentArtist.artworks.filter(item => {
    if (previewWorkFilter === 'vessels') return item.series.toLowerCase().includes('vessel');
    if (previewWorkFilter === 'monoliths') return item.series.toLowerCase().includes('monolith');
    if (previewWorkFilter === 'available') return item.status === 'Available';
    return true;
  });

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-hidden bg-[#FAF8F5]">
      
      {/* Top Action & Viewport Context Bar (Ultra Compact & Uncluttered) */}
      <div className="w-full bg-white border-b border-[#E7E4DF] px-3 sm:px-6 py-2 flex items-center justify-between gap-3 shadow-2xs shrink-0 z-30">
        
        {/* Left: Minimal Brand & Status */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="font-serif text-sm sm:text-base font-bold text-[#141413] tracking-tight truncate">
            {currentArtist.name}
          </span>
          <span className="text-[#D5D0C7] hidden sm:inline">/</span>
          <span className="font-mono text-[11px] text-[#716E68] uppercase tracking-wider hidden sm:inline truncate">
            Portfolio Customizer
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Live Preview Synchronized"></span>
        </div>

        {/* Right: Consolidated Controls (Dropdowns + Icon Actions) */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-end">
          
          {/* Host Small-Screen Switcher (< lg screens) */}
          <div className="flex lg:hidden items-center bg-[#141413] p-0.5 rounded-sm">
            <button
              onClick={() => setHostSmallScreenTab('controls')}
              className={`px-2 py-0.5 text-[11px] font-mono cursor-pointer rounded-xs ${
                hostSmallScreenTab === 'controls' ? 'bg-white text-black font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              Controls
            </button>
            <button
              onClick={() => setHostSmallScreenTab('preview')}
              className={`px-2 py-0.5 text-[11px] font-mono cursor-pointer rounded-xs ${
                hostSmallScreenTab === 'preview' ? 'bg-white text-black font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              Preview
            </button>
          </div>

          {/* 1. Content Discipline Dropdown (Replaces Ceramics / Optics / Bronze button group) */}
          <div className="relative flex items-center">
            <span className="material-symbols-outlined text-[14px] text-[#716E68] absolute left-2 pointer-events-none">
              palette
            </span>
            <select
              value={activeArtistId}
              onChange={(e) => {
                const val = e.target.value as 'elena' | 'kaito' | 'aurelia';
                setActiveArtistId(val);
                showToast(`Switched content to ${ARTIST_PROFILES[val].name}`);
              }}
              className="bg-[#FAF8F5] border border-[#E7E4DF] hover:border-[#141413] text-[#141413] text-xs font-mono pl-7 pr-6 py-1 rounded-xs outline-none cursor-pointer transition-colors appearance-none"
              title="Select Artist & Discipline Content Preset"
            >
              <option value="elena">Ceramics · Elena Vance</option>
              <option value="kaito">Optics · Kaito Tanaka</option>
              <option value="aurelia">Bronze · Aurelia Vane</option>
            </select>
            <span className="material-symbols-outlined text-[13px] text-[#716E68] absolute right-1.5 pointer-events-none">
              expand_more
            </span>
          </div>

          {/* 2. Display & Scroll Mode Dropdown (Replaces Window / Canvas & Fit / 100% buttons) */}
          <div className="hidden sm:relative sm:flex items-center">
            <span className="material-symbols-outlined text-[14px] text-[#716E68] absolute left-2 pointer-events-none">
              tune
            </span>
            <select
              value={`${scrollMode}-${previewScaleMode}`}
              onChange={(e) => {
                const [sMode, scMode] = e.target.value.split('-') as ['frame' | 'canvas', 'fit' | 'actual'];
                setScrollMode(sMode);
                setPreviewScaleMode(scMode);
                showToast(`Display: ${sMode === 'frame' ? 'Window Scroll' : 'Canvas Artboard'} (${scMode === 'fit' ? 'Fit Screen' : '100% Actual'})`);
              }}
              className="bg-[#FAF8F5] border border-[#E7E4DF] hover:border-[#141413] text-[#141413] text-xs font-mono pl-7 pr-6 py-1 rounded-xs outline-none cursor-pointer transition-colors appearance-none"
              title="Select Preview Display & Scroll Behavior"
            >
              <option value="frame-fit">Window Scroll · Fit Screen</option>
              <option value="frame-actual">Window Scroll · 100% Actual</option>
              <option value="canvas-fit">Canvas Artboard · Fit Screen</option>
              <option value="canvas-actual">Canvas Artboard · 100% Actual</option>
            </select>
            <span className="material-symbols-outlined text-[13px] text-[#716E68] absolute right-1.5 pointer-events-none">
              expand_more
            </span>
          </div>

          {/* 3. Device Viewport Icons (Compact 3-icon group, no labels) */}
          <div className="flex items-center bg-[#FAF8F5] p-0.5 border border-[#E7E4DF] rounded-xs">
            <button 
              onClick={() => {
                setViewportMode('desktop');
                showToast('Desktop Viewport (1240px)');
              }} 
              className={`p-1 sm:p-1.5 rounded-xs transition-colors cursor-pointer ${
                viewportMode === 'desktop' ? 'bg-[#141413] text-white shadow-2xs' : 'text-[#716E68] hover:text-black'
              }`}
              title="Desktop Viewport"
            >
              <span className="material-symbols-outlined text-[16px] block">desktop_windows</span>
            </button>
            <button 
              onClick={() => {
                setViewportMode('tablet');
                showToast('Tablet Viewport (768px)');
              }} 
              className={`p-1 sm:p-1.5 rounded-xs transition-colors cursor-pointer ${
                viewportMode === 'tablet' ? 'bg-[#141413] text-white shadow-2xs' : 'text-[#716E68] hover:text-black'
              }`}
              title="Tablet Viewport (768px)"
            >
              <span className="material-symbols-outlined text-[16px] block">tablet_mac</span>
            </button>
            <button 
              onClick={() => {
                setViewportMode('mobile');
                showToast('Mobile Viewport (390px iPhone)');
              }} 
              className={`p-1 sm:p-1.5 rounded-xs transition-colors cursor-pointer ${
                viewportMode === 'mobile' ? 'bg-[#141413] text-white shadow-2xs' : 'text-[#716E68] hover:text-black'
              }`}
              title="Mobile Viewport (390px)"
            >
              <span className="material-symbols-outlined text-[16px] block">smartphone</span>
            </button>
          </div>

          {/* 4. Full Preview Toggle (ICON ONLY - as requested) */}
          <button
            onClick={() => {
              setIsPreviewExpanded(!isPreviewExpanded);
              showToast(isPreviewExpanded ? 'Returned to Split Studio view' : 'Expanded to Full-Screen Preview');
            }}
            className={`p-1.5 border transition-all flex items-center justify-center cursor-pointer rounded-xs ${
              isPreviewExpanded 
                ? 'bg-[#141413] text-white border-black shadow-xs' 
                : 'bg-white text-[#141413] border-[#E7E4DF] hover:border-black hover:bg-[#FAF8F5]'
            }`}
            title={isPreviewExpanded ? 'Exit Full Preview (Split View)' : 'Expand to Full Preview'}
            aria-label={isPreviewExpanded ? 'Exit Full Preview' : 'Expand to Full Preview'}
          >
            <span className="material-symbols-outlined text-[17px] block">
              {isPreviewExpanded ? 'splitscreen' : 'fullscreen'}
            </span>
          </button>

          {/* 5. Publish Action Button */}
          <button 
            onClick={() => showToast('Portfolio Published! Sovereign Atelier Domain Signed.')} 
            style={{ backgroundColor: accentColor }}
            className="px-3 py-1 text-white hover:opacity-90 transition-all flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider shadow-sm cursor-pointer font-semibold rounded-xs"
          >
            <span>Publish</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-[#141413] text-white px-4 sm:px-5 py-2.5 shadow-2xl font-mono text-xs flex items-center gap-2.5 border border-white/20 animate-fade-in max-w-sm">
          <span className="material-symbols-outlined text-emerald-400 text-sm">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Dual-Column / Full-Width Canvas */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 relative flex-1 min-h-0 min-w-0 overflow-hidden">
        
        {/* LEFT COLUMN: Controls (Visible on lg, or on small screen when hostSmallScreenTab === 'controls') */}
        {(!isPreviewExpanded && (hostSmallScreenTab === 'controls' || isDesktopWidth)) && (
          <div className="lg:col-span-5 xl:col-span-4 bg-white border-r border-[#E7E4DF] flex flex-col h-full min-h-0 min-w-0 overflow-hidden transition-all duration-300">
            
            {/* Sub-navigation tabs */}
            <div className="flex border-b border-[#E7E4DF] bg-[#FAF8F5] overflow-x-auto select-none shrink-0">
              <button
                onClick={() => setActiveTab('toggles')}
                className={`px-3 py-3 font-mono text-xs tracking-wider uppercase border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'toggles' 
                    ? 'border-[#141413] text-[#141413] font-semibold bg-white' 
                    : 'border-transparent text-[#716E68] hover:text-[#141413]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">toggle_on</span>
                <span>Switches ({Object.values(toggles).filter(Boolean).length}/10)</span>
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`px-3 py-3 font-mono text-xs tracking-wider uppercase border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'templates' 
                    ? 'border-[#141413] text-[#141413] font-semibold bg-white' 
                    : 'border-transparent text-[#716E68] hover:text-[#141413]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>Templates</span>
              </button>
              <button
                onClick={() => setActiveTab('artist')}
                className={`px-3 py-3 font-mono text-xs tracking-wider uppercase border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'artist' 
                    ? 'border-[#141413] text-[#141413] font-semibold bg-white' 
                    : 'border-transparent text-[#716E68] hover:text-[#141413]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">person</span>
                <span>Content</span>
              </button>
              <button
                onClick={() => setActiveTab('atmosphere')}
                className={`px-3 py-3 font-mono text-xs tracking-wider uppercase border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'atmosphere' 
                    ? 'border-[#141413] text-[#141413] font-semibold bg-white' 
                    : 'border-transparent text-[#716E68] hover:text-[#141413]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">palette</span>
                <span>Theme</span>
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* TAB 1: FEATURE TOGGLE SWITCHES */}
              {activeTab === 'toggles' && (
                <div className="space-y-4">
                  <div className="border-b border-[#E7E4DF] pb-3">
                    <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#141413]">
                      Direct Curatorial Feature Switches
                    </h2>
                    <p className="font-mono text-xs text-[#716E68] mt-1">
                      Toggle controls directly apply, animate, and configure museum components inside the live preview.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        key: 'provenanceBadge' as keyof FeatureToggles,
                        title: 'Provenance & Ledger Badge',
                        desc: 'Seals artworks with verifiable atelier registry identity and smart contract hash.',
                        icon: 'verified_user',
                        tag: 'Registry'
                      },
                      {
                        key: 'dualLanguage' as keyof FeatureToggles,
                        title: 'Dual-Language Curatorial Monograph',
                        desc: 'Renders parallel translated scholarly statement (Japanese / German / Italian editions).',
                        icon: 'translate',
                        tag: 'Editorial'
                      },
                      {
                        key: 'kilnProcessLog' as keyof FeatureToggles,
                        title: 'Studio Kiln & Process Telemetry',
                        desc: 'Displays thermal vitrification curve, fuel cords, and continuous reduction hours.',
                        icon: 'local_fire_department',
                        tag: 'Craft'
                      },
                      {
                        key: 'collectorPricing' as keyof FeatureToggles,
                        title: 'Primary Market Pricing & Valuation',
                        desc: 'Toggles between public collector acquisitions ($) and private institutional inquiries.',
                        icon: 'payments',
                        tag: 'Commerce'
                      },
                      {
                        key: 'curatorFootnotes' as keyof FeatureToggles,
                        title: 'Scholarly Footnotes & Citations',
                        desc: 'Attaches peer-reviewed curatorial citations from Venice Biennale & Kyoto Crafts Pavillion.',
                        icon: 'menu_book',
                        tag: 'Scholarly'
                      },
                      {
                        key: 'privateViewingRoom' as keyof FeatureToggles,
                        title: 'VIP Collector Viewing Lounge',
                        desc: 'Passkey-protected portal for unreleased reserve monoliths prior to exhibition.',
                        icon: 'lock',
                        tag: 'VIP'
                      },
                      {
                        key: 'coaSeal' as keyof FeatureToggles,
                        title: 'Tamper-Proof Certificate (CoA)',
                        desc: 'Inspectable cryptographic NFC Certificate of Authenticity and physical wax stamp.',
                        icon: 'shield_with_heart',
                        tag: 'Authenticity'
                      },
                      {
                        key: 'microSpecs' as keyof FeatureToggles,
                        title: 'Material Chemistry & Spec Sheet',
                        desc: 'Technical breakdown of mountain clay sourcing, dimensions, crated weight, and cycle.',
                        icon: 'data_object',
                        tag: 'Technical'
                      },
                      {
                        key: 'timelineChronology' as keyof FeatureToggles,
                        title: 'Exhibition Retrospective Timeline',
                        desc: 'Chronological timeline of international institutional exhibitions (2020 — 2026).',
                        icon: 'history',
                        tag: 'History'
                      },
                      {
                        key: 'commissionGateway' as keyof FeatureToggles,
                        title: 'Architectural Commission Protocol',
                        desc: 'Direct commission reservation banner and structured spatial inquiry matrix.',
                        icon: 'design_services',
                        tag: 'Bespoke'
                      }
                    ].map((feature) => {
                      const enabled = toggles[feature.key];
                      return (
                        <div 
                          key={feature.key}
                          onClick={() => handleToggle(feature.key)}
                          className={`p-3.5 border transition-all cursor-pointer flex items-start gap-3 select-none ${
                            enabled 
                              ? 'border-[#141413] bg-[#FAF8F5] shadow-xs' 
                              : 'border-[#E7E4DF] bg-white opacity-80 hover:opacity-100 hover:border-[#141413]/40'
                          }`}
                        >
                          <div className="pt-0.5">
                            <span 
                              className="material-symbols-outlined text-base"
                              style={{ color: enabled ? accentColor : '#716E68' }}
                            >
                              {feature.icon}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-xs font-semibold text-[#141413]">
                                {feature.title}
                              </span>
                              <span className="font-mono text-[9px] px-1.5 py-0.5 border border-[#E7E4DF] uppercase text-[#716E68]">
                                {feature.tag}
                              </span>
                            </div>
                            <p className="font-mono text-[11px] text-[#716E68] mt-1 leading-relaxed">
                              {feature.desc}
                            </p>
                          </div>
                          
                          {/* Tactile Toggle Switch */}
                          <div className="pt-1">
                            <div 
                              className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                                enabled ? 'bg-[#141413]' : 'bg-[#E7E4DF]'
                              }`}
                            >
                              <div 
                                className={`w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform duration-200 ease-in-out ${
                                  enabled ? 'translate-x-4' : 'translate-x-0'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: MASTER TEMPLATES */}
              {activeTab === 'templates' && (
                <div className="space-y-4">
                  <div className="border-b border-[#E7E4DF] pb-3">
                    <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#141413]">
                      Curated Master Templates
                    </h2>
                    <p className="font-mono text-xs text-[#716E68] mt-1">
                      One-click master configurations that balance ground colors, typography, layout archetype, and active features.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {templates.map(preset => (
                      <div 
                        key={preset.id}
                        onClick={() => applyTemplate(preset)}
                        className={`p-4 border transition-all cursor-pointer ${
                          activeTemplate === preset.id 
                            ? 'border-[#141413] bg-[#FAF8F5] ring-1 ring-black shadow-sm' 
                            : 'border-[#E7E4DF] bg-white hover:border-[#141413]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-serif text-sm font-bold text-[#141413] block">
                              {preset.name}
                            </span>
                            <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-wider">
                              {preset.subtitle}
                            </span>
                          </div>
                          {activeTemplate === preset.id && (
                            <span className="font-mono text-[10px] bg-[#141413] text-white px-2 py-0.5 uppercase tracking-wider font-semibold">
                              Active
                            </span>
                          )}
                        </div>

                        <p className="font-mono text-xs text-[#716E68] mt-2 leading-relaxed">
                          {preset.description}
                        </p>

                        <div className="mt-3 flex items-center justify-between border-t border-[#E7E4DF] pt-3">
                          <div className="flex items-center gap-1.5">
                            {preset.swatches.map((color, idx) => (
                              <span 
                                key={idx} 
                                className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <span className="font-mono text-[10px] text-[#141413] font-semibold underline">
                            Apply Template →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: ARTIST CONTENT SWITCHER */}
              {activeTab === 'artist' && (
                <div className="space-y-5">
                  <div className="border-b border-[#E7E4DF] pb-3">
                    <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#141413]">
                      Preview Content & Artistic Identity
                    </h2>
                    <p className="font-mono text-xs text-[#716E68] mt-1">
                      Choose between three curated creative disciplines to see how your portfolio customizer adapts to different artistic media.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {Object.values(ARTIST_PROFILES).map((prof) => (
                      <div 
                        key={prof.id}
                        onClick={() => {
                          setActiveArtistId(prof.id);
                          showToast(`Portfolio content updated to ${prof.name}`);
                        }}
                        className={`p-4 border transition-all cursor-pointer ${
                          activeArtistId === prof.id 
                            ? 'border-[#141413] bg-[#FAF8F5] ring-1 ring-black shadow-sm' 
                            : 'border-[#E7E4DF] bg-white hover:border-[#141413]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-base font-bold text-[#141413]">{prof.name}</h3>
                          {activeArtistId === prof.id && (
                            <span className="bg-emerald-600 text-white font-mono text-[9px] px-1.5 py-0.5 uppercase tracking-wider font-semibold">
                              Active Preset
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-[#716E68] block mt-0.5">{prof.discipline}</span>
                        <span className="font-mono text-[10px] text-[#716E68] opacity-80 block">{prof.locations}</span>
                        
                        <p className="font-mono text-[11px] text-[#141413] mt-2 line-clamp-2 italic">
                          "{prof.heroHeadline}"
                        </p>

                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {prof.series.map((s, idx) => (
                            <div key={idx} className="aspect-video overflow-hidden bg-neutral-200 border border-black/10">
                              <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: ATMOSPHERE & THEME */}
              {activeTab === 'atmosphere' && (
                <div className="space-y-6">
                  {/* Canvas Ground */}
                  <div className="space-y-3">
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-[#141413] block">
                      Canvas Ground Atmosphere
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'basalt', name: 'Volcanic Basalt', desc: 'Charcoal Ground', color: '#181816' },
                        { id: 'bone', name: 'Alabaster Bone', desc: 'Stark Gallery White', color: '#FFFFFF' },
                        { id: 'linen', name: 'Unbleached Linen', desc: 'Warm Japanese Paper', color: '#F6F3ED' },
                        { id: 'parchment', name: 'Aged Parchment', desc: 'Museum Archival', color: '#F2EDE4' }
                      ].map(g => (
                        <button
                          key={g.id}
                          onClick={() => setCanvasColor(g.id as any)}
                          className={`p-3 border text-left cursor-pointer transition-all ${
                            canvasColor === g.id 
                              ? 'border-[#141413] ring-1 ring-black shadow-xs bg-[#FAF8F5]' 
                              : 'border-[#E7E4DF] bg-white hover:border-[#141413]/40'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: g.color }} />
                            <span className="font-mono text-xs font-semibold">{g.name}</span>
                          </div>
                          <span className="font-mono text-[10px] text-[#716E68]">{g.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accent Swatch Picker */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="font-mono text-xs font-bold uppercase tracking-wider text-[#141413]">
                        Curatorial Accent Color
                      </label>
                      <span className="font-mono text-xs font-semibold text-[#141413]">{accentColor}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {['#C25E3E', '#4A5B4E', '#1B4965', '#8C6D46', '#B45309', '#141413', '#7C3AED'].map(color => (
                        <button
                          key={color}
                          onClick={() => setAccentColor(color)}
                          style={{ backgroundColor: color }}
                          className={`w-7 h-7 rounded-full border cursor-pointer transition-transform hover:scale-110 ${
                            accentColor === color ? 'ring-2 ring-offset-2 ring-black scale-105 border-white' : 'border-black/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Typography Pairing */}
                  <div className="space-y-3">
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-[#141413] block">
                      Typography Monograph Pairing
                    </label>

                    <div className="space-y-2">
                      <label 
                        onClick={() => setTypography('cormorant')}
                        className={`flex items-start gap-3 p-3 border cursor-pointer transition-all ${
                          typography === 'cormorant' ? 'border-[#141413] bg-[#FAF8F5]' : 'border-[#E7E4DF] bg-white'
                        }`}
                      >
                        <input type="radio" checked={typography === 'cormorant'} onChange={() => setTypography('cormorant')} className="mt-1 accent-[#141413]" />
                        <div>
                          <span className="font-serif text-sm italic font-semibold text-[#141413]">Cormorant Garamond + Inter</span>
                          <p className="font-mono text-[11px] text-[#716E68] mt-0.5">Refined continental publishing face with ultra-neutral modern sans details.</p>
                        </div>
                      </label>

                      <label 
                        onClick={() => setTypography('playfair')}
                        className={`flex items-start gap-3 p-3 border cursor-pointer transition-all ${
                          typography === 'playfair' ? 'border-[#141413] bg-[#FAF8F5]' : 'border-[#E7E4DF] bg-white'
                        }`}
                      >
                        <input type="radio" checked={typography === 'playfair'} onChange={() => setTypography('playfair')} className="mt-1 accent-[#141413]" />
                        <div>
                          <span className="font-serif text-sm font-semibold text-[#141413]">Playfair Display + JetBrains Mono</span>
                          <p className="font-mono text-[11px] text-[#716E68] mt-0.5">Exhibition title serif paired with archival cold monospace technical specs.</p>
                        </div>
                      </label>

                      <label 
                        onClick={() => setTypography('syne')}
                        className={`flex items-start gap-3 p-3 border cursor-pointer transition-all ${
                          typography === 'syne' ? 'border-[#141413] bg-[#FAF8F5]' : 'border-[#E7E4DF] bg-white'
                        }`}
                      >
                        <input type="radio" checked={typography === 'syne'} onChange={() => setTypography('syne')} className="mt-1 accent-[#141413]" />
                        <div>
                          <span className="font-sans text-sm font-bold tracking-tight text-[#141413]">Syne Modernism + Archival Mono</span>
                          <p className="font-mono text-[11px] text-[#716E68] mt-0.5">Sculptural avant-garde European sans for contemporary biennial presentations.</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Archetype Layout */}
                  <div className="space-y-3">
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-[#141413] block">
                      Grid Archetype
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['editorial', 'gallery', 'masonry'] as const).map(mode => (
                        <button
                          key={mode}
                          onClick={() => setArchetype(mode)}
                          className={`p-2.5 border text-center font-mono text-xs capitalize cursor-pointer transition-all ${
                            archetype === mode 
                              ? 'border-[#141413] bg-[#FAF8F5] font-semibold text-black shadow-2xs' 
                              : 'border-[#E7E4DF] bg-white text-[#716E68]'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Quick Footer Summary */}
            <div className="p-3 bg-[#FAF8F5] border-t border-[#E7E4DF] flex items-center justify-between text-[11px] font-mono text-[#716E68] shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Active Content: {currentArtist.name}</span>
              </div>
              <button 
                onClick={() => {
                  setHostSmallScreenTab('preview');
                  setIsPreviewExpanded(true);
                }}
                className="text-[#141413] underline hover:opacity-75 cursor-pointer font-semibold flex items-center gap-1"
              >
                <span>Full Preview</span>
                <span className="material-symbols-outlined text-[13px]">fullscreen</span>
              </button>
            </div>

          </div>
        )}

        {/* RIGHT COLUMN: Interactive High-Fidelity Studio Live Viewport */}
        {(isPreviewExpanded || hostSmallScreenTab === 'preview' || window.innerWidth >= 1024) && (
          <div 
            ref={outerCanvasRef}
            id="customizer-viewport-container"
            className={`${
              isPreviewExpanded ? 'col-span-12 w-full p-2 sm:p-5 lg:p-8' : 'lg:col-span-7 xl:col-span-8 p-2 sm:p-4 lg:p-6'
            } bg-[#DCD8D0] h-full min-h-0 min-w-0 overflow-x-auto overflow-y-auto preview-scroll-canvas transition-all duration-300 relative flex flex-col`}
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Scroll Navigation Jump Bar & Nudge Controls (Sticky Header for Preview) */}
            <div className="sticky top-0 z-30 mb-3 bg-[#141413]/90 text-white backdrop-blur-md px-3 sm:px-4 py-2 shadow-lg flex items-center justify-between gap-2 font-mono text-xs flex-wrap border border-white/10 rounded-sm">
              
              {/* Quick jump anchor links */}
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider text-white/50 pr-1 hidden sm:inline">Jump:</span>
                <button onClick={() => scrollToPreviewSection('hero-section')} className="hover:text-emerald-400 cursor-pointer text-[11px] px-1">Hero</button>
                <span className="text-white/20">·</span>
                <button onClick={() => scrollToPreviewSection('collections-section')} className="hover:text-emerald-400 cursor-pointer text-[11px] px-1">Series</button>
                <span className="text-white/20">·</span>
                <button onClick={() => scrollToPreviewSection('masterwork-section')} className="hover:text-emerald-400 cursor-pointer text-[11px] px-1">Masterwork</button>
                <span className="text-white/20">·</span>
                <button onClick={() => scrollToPreviewSection('works-section')} className="hover:text-emerald-400 cursor-pointer text-[11px] px-1">Catalog ({filteredArtworks.length})</button>
                <span className="text-white/20">·</span>
                {toggles.kilnProcessLog && (
                  <>
                    <button onClick={() => scrollToPreviewSection('process-section')} className="hover:text-emerald-400 cursor-pointer text-[11px] px-1">Telemetry</button>
                    <span className="text-white/20">·</span>
                  </>
                )}
                <button onClick={() => scrollToPreviewSection('commission-section')} className="hover:text-amber-400 cursor-pointer text-[11px] font-semibold px-1" style={{ color: accentColor }}>Inquire</button>
              </div>

              {/* Scroll Nudge Controls & Directional Arrows */}
              <div className="flex items-center gap-1 ml-auto">
                <span className="text-[10px] text-white/50 mr-1 hidden md:inline">Scroll:</span>
                <button 
                  onClick={() => nudgeScroll('up')}
                  className="w-6 h-6 rounded-xs bg-white/10 hover:bg-white/25 flex items-center justify-center cursor-pointer transition-colors"
                  title="Scroll Preview Up"
                >
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                </button>
                <button 
                  onClick={() => nudgeScroll('down')}
                  className="w-6 h-6 rounded-xs bg-white/10 hover:bg-white/25 flex items-center justify-center cursor-pointer transition-colors"
                  title="Scroll Preview Down"
                >
                  <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                </button>
                {previewScaleMode === 'actual' && (
                  <>
                    <button 
                      onClick={() => nudgeScroll('left')}
                      className="w-6 h-6 rounded-xs bg-white/10 hover:bg-white/25 flex items-center justify-center cursor-pointer transition-colors"
                      title="Scroll Preview Left"
                    >
                      <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                    </button>
                    <button 
                      onClick={() => nudgeScroll('right')}
                      className="w-6 h-6 rounded-xs bg-white/10 hover:bg-white/25 flex items-center justify-center cursor-pointer transition-colors"
                      title="Scroll Preview Right"
                    >
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </>
                )}

                {/* Back to top shortcut */}
                <button 
                  onClick={() => {
                    const target = scrollMode === 'frame' ? innerMockupRef.current : outerCanvasRef.current;
                    if (target) target.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-2 py-0.5 rounded-xs bg-white/10 hover:bg-white/25 text-[10px] uppercase font-semibold cursor-pointer ml-1"
                  title="Scroll to Top"
                >
                  Top
                </button>
              </div>
            </div>

            {/* Canvas Wrapper */}
            <div className="w-full flex-1 flex flex-col items-center justify-start pb-20">
              
              {/* Perfectly Responsive Device Mockup Shell */}
              <div 
                id="portfolio-mockup-frame"
                className={`transition-all duration-300 shadow-2xl bg-white flex flex-col shrink-0 relative ${
                  isMobileViewport 
                    ? 'rounded-[36px] sm:rounded-[42px] border-[8px] sm:border-[10px] border-[#181715] overflow-hidden' 
                    : isTabletViewport 
                    ? 'rounded-[20px] sm:rounded-[26px] border-[6px] sm:border-[8px] border-[#252422] overflow-hidden' 
                    : 'rounded-md border border-[#C5BFB4] overflow-hidden'
                } ${previewScaleMode === 'fit' && !isMobileViewport && !isTabletViewport ? 'w-full' : ''}`}
                style={{
                  width: previewScaleMode === 'fit'
                    ? (isMobileViewport ? 'min(390px, 100%)' : isTabletViewport ? 'min(768px, 100%)' : '100%')
                    : (isMobileViewport ? '390px' : isTabletViewport ? '768px' : '1240px'),
                  minWidth: previewScaleMode === 'actual'
                    ? (isMobileViewport ? '390px' : isTabletViewport ? '768px' : '1240px')
                    : undefined,
                  maxWidth: isMobileViewport ? '390px' : isTabletViewport ? '768px' : '1240px',
                  maxHeight: scrollMode === 'frame' ? 'calc(100vh - 12rem)' : undefined,
                  height: scrollMode === 'frame' ? 'calc(100vh - 12rem)' : undefined
                }}
              >
                {/* 1. Mobile Top Dynamic Island & Status Bar */}
                {isMobileViewport && (
                  <div className="bg-[#181715] text-white px-5 pt-2 pb-1.5 flex flex-col items-center select-none shrink-0 z-30">
                    <div className="w-full flex items-center justify-between text-[11px] font-mono opacity-80 px-1">
                      <span>9:41</span>
                      {/* Dynamic Island Pill */}
                      <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center gap-1.5 shadow-inner">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="w-2 h-2 rounded-full bg-white/20"></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">wifi</span>
                        <span className="material-symbols-outlined text-[13px]">battery_full</span>
                      </div>
                    </div>

                    {/* Simulated Mobile Browser URL Bar */}
                    <div className="w-full mt-1.5 bg-white/10 rounded-full px-3 py-1 flex items-center justify-between text-[10px] font-mono">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="material-symbols-outlined text-[11px] text-emerald-400">lock</span>
                        <span className="truncate">atelier.art/@{currentArtist.id}</span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-1.5 rounded-full">
                        DNS-SEC
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. Tablet Top Status & Minimalist Chrome Bar */}
                {isTabletViewport && (
                  <div className="h-9 bg-[#FAF8F5] border-b border-[#E7E4DF] px-4 flex items-center justify-between select-none shrink-0 z-20">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E7E4DF]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#E7E4DF]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#E7E4DF]"></span>
                      <span className="h-3 w-px bg-[#E7E4DF] mx-1"></span>
                      <span className="material-symbols-outlined text-[13px] text-emerald-700">lock</span>
                      <span className="font-mono text-[10px] text-[#141413] font-medium">
                        atelier.art/@{currentArtist.id} · Tablet Monograph
                      </span>
                    </div>
                    <span className="font-mono text-[9px] bg-black text-white px-2 py-0.5 rounded-xs uppercase tracking-wider font-semibold">
                      iPad 768px
                    </span>
                  </div>
                )}

                {/* 3. Desktop Simulated High-End Browser Chrome Bar */}
                {!isMobileViewport && !isTabletViewport && (
                  <div className="h-10 bg-[#FAF8F5] border-b border-[#E7E4DF] px-3 sm:px-4 flex items-center justify-between select-none shrink-0 z-20">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E7E4DF]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E7E4DF]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E7E4DF]"></span>
                      <span className="h-3.5 w-px bg-[#E7E4DF] mx-1"></span>
                      <span className="material-symbols-outlined text-[14px] text-emerald-700 shrink-0">lock</span>
                      <span className="font-mono text-[11px] text-[#141413] font-medium truncate">
                        atelier.art/@{currentArtist.id}?view={archetype}&layout=full_monograph
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-xs uppercase tracking-wider font-semibold">
                        DNS-SEC Verified
                      </span>
                      <span className="font-mono text-[9px] bg-[#141413] text-white px-1.5 py-0.5 rounded-xs uppercase tracking-wider font-semibold">
                        DESKTOP VIEW
                      </span>
                    </div>
                  </div>
                )}

                {/* LIVE PORTFOLIO PREVIEW CANVAS */}
                <div 
                  ref={innerMockupRef}
                  className={`flex-1 transition-colors duration-300 relative ${theme.bg} ${theme.text} ${
                    scrollMode === 'frame' ? 'overflow-y-auto overflow-x-hidden preview-viewport-window' : ''
                  }`}
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollBehavior: 'smooth'
                  }}
                >
                  <div 
                    className={`transition-all duration-300 ${
                      isMobileViewport 
                        ? 'p-4 sm:p-5 space-y-10' 
                        : isTabletViewport 
                        ? 'p-6 sm:p-8 space-y-12' 
                        : 'p-6 sm:p-12 lg:p-16 space-y-16'
                    }`}
                    style={{
                      paddingTop: gridDensity === 'compact' ? (isMobileViewport ? '1.5rem' : '2rem') : gridDensity === 'airy' ? (isMobileViewport ? '3rem' : '4.5rem') : (isMobileViewport ? '2rem' : '3.5rem')
                    }}
                  >
                    
                    {/* 1. Monograph Navigation Bar (Mobile Drawer vs Desktop Ribbon) */}
                    <div className={`border-b ${theme.border} pb-4 flex flex-col justify-between gap-3 relative`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2.5">
                          <span className={`font-bold tracking-tight ${getHeaderFontClass()} ${isMobileViewport ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>
                            {currentArtist.name}
                          </span>
                          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest opacity-60">
                            {isMobileViewport ? 'Monograph' : 'Atelier Monograph & Provenance'}
                          </span>
                        </div>

                        {/* Mobile Hamburger Drawer Trigger */}
                        {isMobileViewport ? (
                          <button
                            onClick={() => setSimulatedMobileNavOpen(!simulatedMobileNavOpen)}
                            className="p-1.5 border border-black/20 hover:bg-black/5 cursor-pointer rounded-xs flex items-center gap-1 font-mono text-[10px]"
                            title="Toggle Monograph Navigation"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {simulatedMobileNavOpen ? 'close' : 'menu'}
                            </span>
                            <span>{simulatedMobileNavOpen ? 'Close' : 'Menu'}</span>
                          </button>
                        ) : (
                          <nav className="flex items-center gap-4 sm:gap-6 font-mono text-xs flex-wrap">
                            <button onClick={() => scrollToPreviewSection('works-section')} className="font-semibold border-b pb-0.5 cursor-pointer" style={{ borderColor: accentColor }}>
                              Works ({filteredArtworks.length})
                            </button>
                            <button onClick={() => scrollToPreviewSection('collections-section')} className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                              Series ({currentArtist.series.length})
                            </button>
                            {toggles.kilnProcessLog && (
                              <button onClick={() => scrollToPreviewSection('process-section')} className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                                Process
                              </button>
                            )}
                            <button onClick={() => scrollToPreviewSection('curator-review')} className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                              Provenance
                            </button>
                            {toggles.commissionGateway && (
                              <button 
                                onClick={() => scrollToPreviewSection('commission-section')}
                                className="font-semibold flex items-center gap-1.5 cursor-pointer"
                                style={{ color: accentColor }}
                              >
                                <span>Commission</span>
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }}></span>
                              </button>
                            )}
                          </nav>
                        )}
                      </div>

                      {/* Simulated Mobile Dropdown Menu Sheet */}
                      {isMobileViewport && simulatedMobileNavOpen && (
                        <div className={`mt-2 p-4 border border-black/15 shadow-xl font-mono text-xs space-y-3 animate-fade-in ${theme.subtleBg}`}>
                          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: theme.border }}>
                            <span className="text-[10px] uppercase font-bold tracking-wider">Navigation Index</span>
                            <span className="text-[10px] text-emerald-600 font-semibold">Atelier Online</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <button 
                              onClick={() => {
                                scrollToPreviewSection('works-section');
                                setSimulatedMobileNavOpen(false);
                              }}
                              className="p-2 border border-black/10 text-left hover:bg-black/5"
                            >
                              Selected Works ({filteredArtworks.length})
                            </button>
                            <button 
                              onClick={() => {
                                scrollToPreviewSection('collections-section');
                                setSimulatedMobileNavOpen(false);
                              }}
                              className="p-2 border border-black/10 text-left hover:bg-black/5"
                            >
                              Series ({currentArtist.series.length})
                            </button>
                            <button 
                              onClick={() => {
                                scrollToPreviewSection('masterwork-section');
                                setSimulatedMobileNavOpen(false);
                              }}
                              className="p-2 border border-black/10 text-left hover:bg-black/5"
                            >
                              Featured Piece
                            </button>
                            <button 
                              onClick={() => {
                                scrollToPreviewSection('process-section');
                                setSimulatedMobileNavOpen(false);
                              }}
                              className="p-2 border border-black/10 text-left hover:bg-black/5"
                            >
                              Studio Process
                            </button>
                          </div>
                          <button 
                            onClick={() => {
                              scrollToPreviewSection('commission-section');
                              setSimulatedMobileNavOpen(false);
                            }}
                            style={{ backgroundColor: accentColor }}
                            className="w-full py-2.5 text-white font-mono text-xs uppercase tracking-wider font-semibold text-center block shadow-sm"
                          >
                            Reserve Commission Slot →
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 2. Direct Commission Protocol Indicator Banner */}
                    {toggles.commissionGateway && (
                      <div 
                        className={`p-3 sm:p-4 border font-mono text-xs transition-all duration-300 ${theme.cardBg} ${theme.cardBorder} ${
                          isMobileViewport 
                            ? 'flex flex-col items-start gap-2 text-[11px]' 
                            : 'flex flex-row items-center justify-between gap-3'
                        } ${highlightedKey === 'commissionGateway' ? 'ring-2 ring-emerald-500 scale-[1.01]' : ''}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                          <span className="font-semibold text-emerald-600">Active Commission Protocol:</span>
                          <span className="truncate">2 Slots Open for 2026</span>
                        </div>
                        <button onClick={() => scrollToPreviewSection('commission-section')} className="text-[11px] font-semibold underline cursor-pointer hover:opacity-100 flex items-center gap-1">
                          <span>Reserve Slot</span>
                          <span className="material-symbols-outlined text-[13px]">arrow_downward</span>
                        </button>
                      </div>
                    )}

                    {/* 3. Hero Statement Section (Mobile Stacked vs Desktop Multi-Column) */}
                    <div 
                      id="hero-section" 
                      className={`pt-1 ${
                        isMobileViewport 
                          ? 'flex flex-col gap-6' 
                          : isTabletViewport 
                          ? 'grid grid-cols-12 gap-6 items-end' 
                          : 'grid grid-cols-12 gap-8 lg:gap-12 items-end'
                      }`}
                    >
                      <div className={`${isMobileViewport ? 'w-full' : isTabletViewport ? 'col-span-7' : 'col-span-8'} space-y-4 sm:space-y-5`}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[9px] sm:text-[10px] bg-[#141413] text-white px-2 py-0.5 tracking-widest uppercase">
                            {currentArtist.discipline}
                          </span>
                          {toggles.provenanceBadge && (
                            <span className="font-mono text-[9px] sm:text-[10px] border border-emerald-600 text-emerald-600 px-2 py-0.5 tracking-widest uppercase flex items-center gap-1">
                              <span className="material-symbols-outlined text-[11px]">verified</span>
                              Verified Atelier
                            </span>
                          )}
                          <span className="font-mono text-[9px] sm:text-[10px] opacity-60 uppercase tracking-widest">
                            {currentArtist.ledgerId}
                          </span>
                        </div>

                        <h2 className={`tracking-tight leading-[1.15] ${getHeaderFontClass()} ${
                          isMobileViewport ? 'text-2xl font-bold' : isTabletViewport ? 'text-3xl sm:text-4xl' : 'text-3xl sm:text-5xl'
                        }`}>
                          {currentArtist.heroHeadline}
                        </h2>

                        {/* Dual-Language Curatorial Monograph Toggle Output */}
                        {toggles.dualLanguage && (
                          <div className={`p-3.5 sm:p-5 border-l-2 space-y-1.5 font-serif text-sm italic transition-all duration-300 ${theme.subtleBg} ${highlightedKey === 'dualLanguage' ? 'ring-2 ring-blue-500' : ''}`} style={{ borderColor: accentColor }}>
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[9px] uppercase tracking-widest block not-italic opacity-60">
                                {currentArtist.secondaryLanguage.label}
                              </span>
                              <span className="font-mono text-[9px] opacity-50 not-italic hidden sm:inline">
                                {currentArtist.secondaryLanguage.edition}
                              </span>
                            </div>
                            <p className="opacity-90 leading-relaxed font-sans text-xs">
                              {currentArtist.secondaryLanguage.text}
                            </p>
                          </div>
                        )}

                        {/* Audio Statement Simulator */}
                        <div className={`p-3 sm:p-3.5 border flex items-center justify-between gap-3 font-mono text-xs ${theme.cardBg} ${theme.cardBorder}`}>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <button 
                              onClick={() => {
                                setIsPlayingAudio(!isPlayingAudio);
                                showToast(isPlayingAudio ? 'Audio recording paused' : 'Playing studio atmospheric audio');
                              }}
                              style={{ backgroundColor: accentColor }}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full text-white flex items-center justify-center cursor-pointer shadow-xs shrink-0"
                            >
                              <span className="material-symbols-outlined text-sm">
                                {isPlayingAudio ? 'pause' : 'play_arrow'}
                              </span>
                            </button>
                            <div className="truncate">
                              <span className="font-semibold block truncate text-[11px] sm:text-xs">{currentArtist.audioNote.title}</span>
                              <span className="text-[9px] sm:text-[10px] opacity-60 block truncate">{currentArtist.audioNote.location}</span>
                            </div>
                          </div>

                          {/* Audio waveform */}
                          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                            {[16, 24, 12, 28, 20, 32, 18, 26].map((h, idx) => (
                              <span 
                                key={idx}
                                style={{ 
                                  height: isPlayingAudio ? `${h * (isMobileViewport ? 0.7 : 1)}px` : '4px',
                                  backgroundColor: accentColor
                                }}
                                className="w-0.5 sm:w-1 rounded-full transition-all duration-200"
                              />
                            ))}
                            <span className="font-mono text-[9px] sm:text-[10px] opacity-60 pl-1.5">{currentArtist.audioNote.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Bio Column */}
                      <div className={`${isMobileViewport ? 'w-full' : isTabletViewport ? 'col-span-5' : 'col-span-4'} space-y-3 ${!isMobileViewport ? `border-l ${theme.border} pl-6` : 'border-t border-black/10 pt-4'}`}>
                        <p className="font-sans text-xs sm:text-sm opacity-80 leading-relaxed">
                          {currentArtist.heroSubheadline}
                        </p>
                        <div className="space-y-1.5 pt-2 border-t border-black/10 font-mono text-[10px] sm:text-[11px]">
                          <div className="flex justify-between gap-2">
                            <span className="opacity-60">Representation:</span>
                            <span className="font-semibold truncate">{currentArtist.representation}</span>
                          </div>
                          <div className="flex justify-between gap-2">
                            <span className="opacity-60">Public Loans:</span>
                            <span className="font-semibold truncate">{currentArtist.publicCollections}</span>
                          </div>
                          <div className="flex justify-between gap-2">
                            <span className="opacity-60">Provenance:</span>
                            <span className="font-semibold text-emerald-600">100% Ledger Hash</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4. Curated Collections & Series Strip */}
                    <div id="collections-section" className="space-y-4 pt-4">
                      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: `${accentColor}33` }}>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm" style={{ color: accentColor }}>folder_special</span>
                          <h3 className="font-mono text-xs uppercase tracking-widest font-bold">
                            Archival Collections & Series ({currentArtist.series.length})
                          </h3>
                        </div>
                        <span className="font-mono text-[11px] opacity-60 hidden sm:inline">2022 — 2026 Archive</span>
                      </div>

                      {/* Grid changes responsively based on viewport mode */}
                      <div className={`grid ${
                        isMobileViewport 
                          ? 'grid-cols-1 gap-4' 
                          : isTabletViewport 
                          ? 'grid-cols-2 gap-4' 
                          : 'grid-cols-3 gap-6'
                      }`}>
                        {currentArtist.series.map((series, idx) => (
                          <div 
                            key={idx} 
                            className={`p-3.5 sm:p-4 border space-y-3 cursor-pointer hover:border-black/40 transition-all ${theme.cardBg} ${theme.cardBorder}`}
                          >
                            <div className="aspect-[16/10] overflow-hidden bg-neutral-200">
                              <img src={series.img} alt={series.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-baseline">
                                <h4 className="font-serif text-sm sm:text-base font-semibold">{series.name}</h4>
                                <span className="font-mono text-[9px] sm:text-[10px] opacity-60">{series.count}</span>
                              </div>
                              <span className="font-mono text-[9px] sm:text-[10px] opacity-60 block">{series.era}</span>
                              <p className="font-sans text-xs opacity-75 line-clamp-2">{series.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Curatorial Critical Reception Pullquote */}
                    <div id="curator-review" className={`p-5 sm:p-8 border-y ${theme.border} text-center space-y-2.5 bg-black/5`}>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#716E68]">Institutional Monograph Review</span>
                      <blockquote className={`italic max-w-2xl mx-auto leading-relaxed ${getHeaderFontClass()} ${
                        isMobileViewport ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'
                      }`}>
                        {currentArtist.review.quote}
                      </blockquote>
                      <div className="font-mono text-[11px] opacity-75">
                        <strong>{currentArtist.review.author}</strong> · {currentArtist.review.role}
                      </div>
                    </div>

                    {/* 5. Featured Masterwork Hero Card */}
                    <div 
                      id="masterwork-section"
                      className={`p-4 sm:p-8 space-y-6 sm:space-y-8 border transition-all duration-300 ${theme.cardBg} ${theme.cardBorder}`}
                    >
                      {/* Masterwork Header Bar */}
                      <div className={`flex items-center justify-between border-b ${theme.border} pb-3 flex-wrap gap-2`}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] sm:text-[10px] uppercase font-bold tracking-wider" style={{ color: accentColor }}>
                            Featured Masterwork
                          </span>
                          <span className="opacity-40">·</span>
                          <span className="font-mono text-[11px] sm:text-[10px] opacity-75 font-semibold">INV #{currentArtist.masterwork.id}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {toggles.provenanceBadge && (
                            <span className="font-mono text-[9px] sm:text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 flex items-center gap-1 font-semibold">
                              <span className="material-symbols-outlined text-[11px]">verified_user</span>
                              <span>Verified</span>
                            </span>
                          )}
                          {toggles.coaSeal && (
                            <button 
                              onClick={() => setCoaModalOpen(true)}
                              className="font-mono text-[9px] sm:text-[10px] bg-white/10 hover:bg-white/20 border border-white/20 px-2 py-0.5 flex items-center gap-1 opacity-90 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[11px]">qr_code_scanner</span>
                              <span>CoA Seal</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Masterwork Content Layout: Stacked on Mobile vs Split on Desktop */}
                      <div className={`${
                        isMobileViewport 
                          ? 'flex flex-col gap-6' 
                          : isTabletViewport 
                          ? 'grid grid-cols-12 gap-6 items-center' 
                          : 'grid grid-cols-12 gap-8 lg:gap-12 items-center'
                      }`}>
                        <div className={`${isMobileViewport ? 'w-full' : isTabletViewport ? 'col-span-6' : 'col-span-7'} space-y-3`}>
                          <div className="overflow-hidden relative group aspect-[4/3] bg-neutral-200">
                            <img 
                              src={currentArtist.masterwork.images[masterworkAngle]} 
                              alt={currentArtist.masterwork.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                            />
                            <div className="absolute top-2.5 left-2.5 bg-black/80 text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider">
                              Angle: {masterworkAngle.toUpperCase()}
                            </div>
                          </div>

                          {/* Interactive Angle Switcher */}
                          <div className="flex items-center justify-between font-mono text-xs border p-1.5 bg-black/5" style={{ borderColor: theme.border }}>
                            <span className="text-[9px] opacity-60 uppercase pl-1">Perspective:</span>
                            <div className="flex items-center gap-1">
                              {(['front', 'profile', 'texture', 'spatial'] as const).map(angle => (
                                <button
                                  key={angle}
                                  onClick={() => setMasterworkAngle(angle)}
                                  className={`px-2 py-0.5 text-[9px] sm:text-[10px] uppercase cursor-pointer transition-all ${
                                    masterworkAngle === angle 
                                      ? 'bg-[#141413] text-white font-semibold' 
                                      : 'hover:bg-black/10 text-black/70'
                                  }`}
                                >
                                  {angle}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className={`${isMobileViewport ? 'w-full' : isTabletViewport ? 'col-span-6' : 'col-span-5'} space-y-4`}>
                          <div>
                            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest opacity-60 block mb-1">
                              Catalog Monograph · Solitary Piece
                            </span>
                            <h3 className={`font-bold tracking-tight ${getHeaderFontClass()} ${isMobileViewport ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>
                              {currentArtist.masterwork.title}
                            </h3>
                            <p className="font-serif italic text-xs sm:text-sm opacity-75 mt-1">
                              {currentArtist.masterwork.subtitle}
                            </p>
                          </div>

                          {/* Micro-Specs Overlay */}
                          {toggles.microSpecs && (
                            <div 
                              className={`space-y-1.5 py-2.5 border-y font-mono text-[11px] transition-all duration-300 ${theme.border} ${highlightedKey === 'microSpecs' ? 'ring-2 ring-blue-500 p-2' : ''}`}
                            >
                              <div className="flex justify-between gap-2">
                                <span className="opacity-60">Medium:</span>
                                <span className="font-semibold truncate">{currentArtist.masterwork.medium}</span>
                              </div>
                              <div className="flex justify-between gap-2">
                                <span className="opacity-60">Dimensions:</span>
                                <span className="font-semibold">{currentArtist.masterwork.dims}</span>
                              </div>
                              <div className="flex justify-between gap-2">
                                <span className="opacity-60">Weight:</span>
                                <span className="font-semibold">{currentArtist.masterwork.weight}</span>
                              </div>
                              <div className="flex justify-between gap-2">
                                <span className="opacity-60">Production:</span>
                                <span className="font-semibold truncate">{currentArtist.masterwork.firingOrCasting}</span>
                              </div>
                            </div>
                          )}

                          {/* Pricing & Acquisition */}
                          {toggles.collectorPricing ? (
                            <div className={`p-3.5 border space-y-2 font-mono text-xs ${theme.subtleBg} ${theme.border}`}>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase opacity-70">Primary Market</span>
                                <span className="text-sm sm:text-base font-bold text-emerald-600">{currentArtist.masterwork.price}</span>
                              </div>
                              <button 
                                onClick={() => showToast(`Inquiry opened for ${currentArtist.masterwork.title}.`)}
                                style={{ backgroundColor: accentColor }}
                                className="w-full py-2.5 text-white font-mono text-xs uppercase tracking-wider font-semibold"
                              >
                                Acquire Masterwork
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => showToast(`Inquiry opened for ${currentArtist.masterwork.title}.`)}
                              style={{ backgroundColor: accentColor }}
                              className="w-full py-2.5 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm cursor-pointer"
                            >
                              Inquire on Work
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 6. Physical Archive & Selected Artworks Catalog Grid */}
                    <div id="works-section" className="space-y-4 pt-2">
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b pb-3" style={{ borderColor: `${accentColor}33` }}>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-widest opacity-60 block">
                            Physical Catalog & Archive
                          </span>
                          <h3 className={`font-bold tracking-tight ${getHeaderFontClass()} ${isMobileViewport ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>
                            Selected Works ({filteredArtworks.length})
                          </h3>
                        </div>

                        {/* Filter tabs */}
                        <div className="flex items-center gap-1.5 font-mono text-xs flex-wrap">
                          {(['all', 'monoliths', 'vessels', 'available'] as const).map(filter => (
                            <button
                              key={filter}
                              onClick={() => setPreviewWorkFilter(filter)}
                              className={`px-2.5 py-0.5 border text-[11px] capitalize cursor-pointer transition-colors ${
                                previewWorkFilter === filter 
                                  ? 'bg-black text-white border-black font-semibold' 
                                  : 'bg-transparent border-black/20 opacity-70 hover:opacity-100'
                              }`}
                            >
                              {filter}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Works Grid formatted by device viewport mode */}
                      <div className={`grid ${
                        isMobileViewport 
                          ? 'grid-cols-1 gap-4' 
                          : isTabletViewport 
                          ? 'grid-cols-2 gap-4' 
                          : archetype === 'editorial' 
                          ? 'grid-cols-1 md:grid-cols-2 gap-8' 
                          : archetype === 'gallery' 
                          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                          : 'grid-cols-1 sm:grid-cols-2 gap-6'
                      }`}>
                        {filteredArtworks.map((item, idx) => (
                          <div 
                            key={item.id} 
                            className={`border p-4 space-y-3 transition-all duration-300 hover:border-black/50 ${theme.cardBg} ${theme.cardBorder}`}
                          >
                            <div className={`overflow-hidden relative group bg-neutral-200 ${idx % 3 === 0 && archetype === 'editorial' && !isMobileViewport ? 'aspect-[16/10]' : 'aspect-square'}`}>
                              <img 
                                src={item.img} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                              />
                              <div className="absolute top-2 left-2 bg-black/80 text-white font-mono text-[9px] px-1.5 py-0.5 uppercase tracking-wider">
                                {item.id}
                              </div>
                              <div className="absolute bottom-2 right-2">
                                <span className={`font-mono text-[9px] px-1.5 py-0.5 uppercase tracking-wider font-semibold ${
                                  item.status === 'Available' ? 'bg-emerald-600 text-white' : 'bg-black/80 text-white/80'
                                }`}>
                                  {item.status}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex justify-between items-baseline">
                                <h4 className="font-serif text-base font-bold">{item.title}</h4>
                                <span className="font-mono text-[11px] opacity-60">{item.year}</span>
                              </div>
                              <p className="font-serif italic text-xs opacity-75">{item.medium}</p>
                              <div className="flex justify-between font-mono text-[10px] opacity-70 border-t pt-1.5" style={{ borderColor: `${accentColor}22` }}>
                                <span>{item.dims}</span>
                                <span className="truncate max-w-[130px]">{item.provenance}</span>
                              </div>

                              <div className="flex items-center justify-between pt-1.5">
                                {toggles.collectorPricing ? (
                                  <span className="font-mono text-xs font-bold text-emerald-600">{item.price}</span>
                                ) : (
                                  <span className="font-mono text-[10px] opacity-60">Price Upon Request</span>
                                )}

                                <button 
                                  onClick={() => showToast(`Inquiry initiated for ${item.title}`)}
                                  className="font-mono text-[11px] px-2.5 py-0.5 border hover:bg-black hover:text-white transition-colors cursor-pointer"
                                  style={{ borderColor: accentColor, color: accentColor }}
                                >
                                  Inquire →
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 7. Studio Kiln & Process Log Section */}
                    {toggles.kilnProcessLog && (
                      <div 
                        id="process-section"
                        className={`p-4 sm:p-6 border space-y-4 transition-all duration-300 ${theme.cardBg} ${theme.cardBorder}`}
                      >
                        <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: `${accentColor}33` }}>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm" style={{ color: accentColor }}>local_fire_department</span>
                            <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                              {currentArtist.processLog.title}
                            </h3>
                          </div>
                          <span className="font-mono text-[9px] px-1.5 py-0.5 bg-amber-500/10 text-amber-600 font-semibold uppercase">
                            {currentArtist.processLog.subtitle}
                          </span>
                        </div>

                        <div className={`${
                          isMobileViewport ? 'flex flex-col gap-4' : 'grid grid-cols-12 gap-6 items-center'
                        }`}>
                          <div className={`${isMobileViewport ? 'w-full' : 'col-span-5'} space-y-2 font-mono text-xs`}>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-2 bg-black/5 border border-black/10">
                                <span className="text-[9px] opacity-60 uppercase block">{currentArtist.processLog.label1}</span>
                                <strong className="text-xs font-semibold">{currentArtist.processLog.val1}</strong>
                              </div>
                              <div className="p-2 bg-black/5 border border-black/10">
                                <span className="text-[9px] opacity-60 uppercase block">{currentArtist.processLog.label2}</span>
                                <span className="text-xs font-semibold">{currentArtist.processLog.val2}</span>
                              </div>
                              <div className="p-2 bg-black/5 border border-black/10">
                                <span className="text-[9px] opacity-60 uppercase block">{currentArtist.processLog.label3}</span>
                                <strong className="text-xs font-bold" style={{ color: accentColor }}>{currentArtist.processLog.val3}</strong>
                              </div>
                              <div className="p-2 bg-black/5 border border-black/10">
                                <span className="text-[9px] opacity-60 uppercase block">{currentArtist.processLog.label4}</span>
                                <span className="text-xs font-semibold">{currentArtist.processLog.val4}</span>
                              </div>
                            </div>
                          </div>

                          <div className={`${isMobileViewport ? 'w-full' : 'col-span-7'} bg-black/5 p-3.5 border border-black/10 space-y-2 overflow-x-auto`}>
                            <span className="font-mono text-[9px] uppercase opacity-60 block">Thermal & Stress Curve</span>
                            <div className="h-24 min-w-[280px] flex items-end justify-between gap-1 pt-3 pb-2 border-b border-black/20 font-mono text-[9px]">
                              {[
                                { hour: '0h', temp: '20°C', bar: 'h-4' },
                                { hour: '24h', temp: '450°C', bar: 'h-8' },
                                { hour: '48h', temp: '920°C', bar: 'h-12' },
                                { hour: '72h', temp: '1150°C', bar: 'h-16' },
                                { hour: '96h', temp: '1280°C', bar: 'h-20' },
                                { hour: '120h', temp: '1320°C', bar: 'h-24 bg-red-600' }
                              ].map((point, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                                  <span className="text-[8px] opacity-60">{point.temp}</span>
                                  <div className={`w-full bg-[#141413] ${point.bar} rounded-2xs`}></div>
                                  <span className="text-[8px] opacity-75">{point.hour}</span>
                                </div>
                              ))}
                            </div>
                            <p className="font-mono text-[10px] opacity-75 leading-tight pt-0.5">
                              {currentArtist.processLog.telemetryDesc}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 8. Exhibition Retrospective Timeline */}
                    {toggles.timelineChronology && (
                      <div 
                        id="timeline-section"
                        className={`p-4 sm:p-6 border space-y-3 transition-all duration-300 ${theme.cardBg} ${theme.cardBorder}`}
                      >
                        <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: `${accentColor}33` }}>
                          <span className="font-mono text-xs font-bold uppercase tracking-wider">
                            Provenance & Retrospective
                          </span>
                          <span className="font-mono text-[10px] opacity-60">2020 — 2026 Archive</span>
                        </div>
                        <div className={`grid ${
                          isMobileViewport ? 'grid-cols-1 gap-2' : isTabletViewport ? 'grid-cols-2 gap-3' : 'grid-cols-4 gap-3'
                        } font-mono text-xs`}>
                          {[
                            { year: '2025', show: 'Art Basel Unlimited', desc: 'Cantonal Museum Showcase' },
                            { year: '2024', show: 'Venice Biennale', desc: 'Arsenale Special Mention' },
                            { year: '2023', show: 'Kyoto Crafts Pavillion', desc: 'Solo Retrospective: The Earth' },
                            { year: '2020', show: 'Studio Foundation', desc: 'Archive Establishment' }
                          ].map((t, idx) => (
                            <div key={idx} className="p-2.5 border border-black/10 space-y-0.5 bg-black/5">
                              <span className="text-xs font-bold" style={{ color: accentColor }}>{t.year}</span>
                              <strong className="block font-sans text-xs">{t.show}</strong>
                              <span className="opacity-70 text-[10px] block truncate">{t.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 9. VIP Private Viewing Room Gateway */}
                    {toggles.privateViewingRoom && (
                      <div 
                        id="vip-section"
                        className={`p-5 sm:p-8 border text-center space-y-3.5 transition-all duration-300 ${theme.subtleBg} ${theme.border}`}
                      >
                        <div className="w-8 h-8 mx-auto rounded-full bg-black/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-lg" style={{ color: accentColor }}>lock</span>
                        </div>
                        <div className="space-y-1">
                          <h4 className={`font-bold ${getHeaderFontClass()} ${isMobileViewport ? 'text-lg' : 'text-xl'}`}>
                            VIP Private Viewing Lounge
                          </h4>
                          <p className="font-mono text-xs opacity-75 max-w-md mx-auto">
                            Access 6 unreleased reserve masterworks currently held in studio reserve (Try passkey "VIP2026").
                          </p>
                        </div>

                        {vipUnlocked ? (
                          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-800 space-y-1 max-w-sm mx-auto">
                            <span className="material-symbols-outlined text-xl text-emerald-600">lock_open</span>
                            <p className="font-semibold">VIP Passkey Authenticated</p>
                            <p className="text-[10px] opacity-80">6 unreleased reserve pieces are now unlocked.</p>
                          </div>
                        ) : (
                          <div className={`flex items-center justify-center gap-2 pt-1 ${isMobileViewport ? 'flex-col w-full' : 'flex-row'}`}>
                            <input 
                              type="password" 
                              value={vipPasscode}
                              onChange={(e) => setVipPasscode(e.target.value)}
                              placeholder="Passkey (VIP2026)" 
                              className={`font-mono text-xs px-3 py-1.5 border border-black/20 bg-white/80 text-[#141413] outline-none ${isMobileViewport ? 'w-full' : 'w-48'}`}
                            />
                            <button 
                              onClick={() => {
                                if (vipPasscode.toUpperCase() === 'VIP2026') {
                                  setVipUnlocked(true);
                                  showToast('VIP Vault Unlocked: 6 reserve pieces accessible');
                                } else {
                                  showToast('Invalid passkey. Hint: enter "VIP2026"');
                                }
                              }}
                              style={{ backgroundColor: accentColor }}
                              className={`px-4 py-1.5 text-white font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer ${isMobileViewport ? 'w-full' : ''}`}
                            >
                              Unlock Vault
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 10. Collector Commission Inquiry Gateway */}
                    <div id="commission-section" className={`p-5 sm:p-8 border space-y-4 ${theme.cardBg} ${theme.cardBorder}`}>
                      <div className="border-b pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1" style={{ borderColor: `${accentColor}33` }}>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-widest opacity-60 block">
                            Direct Inquiry Protocol
                          </span>
                          <h3 className={`font-bold ${getHeaderFontClass()} ${isMobileViewport ? 'text-xl' : 'text-2xl'}`}>
                            Commission a Monolith
                          </h3>
                        </div>
                        <span className="font-mono text-[11px] text-emerald-600 font-semibold">
                          Accepting Q1/Q2 2026
                        </span>
                      </div>

                      {inquirySubmitted ? (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-800 space-y-1.5 text-center">
                          <span className="material-symbols-outlined text-2xl text-emerald-600">check_circle</span>
                          <p className="font-semibold text-xs sm:text-sm">Inquiry Transmitted to {currentArtist.name} Studio</p>
                          <p className="text-[10px] opacity-80">
                            You will receive a formal studio dossier within 48 hours.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3.5">
                          <p className="font-sans text-xs opacity-80">
                            Each commissioned piece is conceived for specific architectural coordinates in dialogue with the collector.
                          </p>

                          <div className={`grid ${isMobileViewport ? 'grid-cols-1 gap-1.5' : 'grid-cols-3 gap-2'} pt-1`}>
                            {['$10k — $20k', '$20k — $40k', '$40k+ (Monumental)'].map((bracket) => (
                              <button
                                key={bracket}
                                onClick={() => setSelectedBudget(bracket)}
                                className={`p-2 text-left font-mono text-xs border cursor-pointer transition-all ${
                                  selectedBudget === bracket 
                                    ? 'border-black bg-black text-white font-semibold' 
                                    : 'border-black/20 bg-transparent opacity-80 hover:opacity-100'
                                }`}
                              >
                                <span className="text-[9px] uppercase opacity-60 block">Budget Tier</span>
                                <span className="text-[11px] font-semibold">{bracket}</span>
                              </button>
                            ))}
                          </div>

                          <div className={`grid ${isMobileViewport ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-3'} pt-1`}>
                            <input 
                              type="text" 
                              placeholder="Full Name / Curator" 
                              className="font-mono text-xs p-2.5 border border-black/20 bg-transparent outline-none w-full"
                            />
                            <input 
                              type="email" 
                              placeholder="Official Email Address" 
                              className="font-mono text-xs p-2.5 border border-black/20 bg-transparent outline-none w-full"
                            />
                          </div>

                          <textarea 
                            rows={2}
                            placeholder="Spatial project context (e.g. Zurich Residence atrium, Kyoto tearoom alcove)..."
                            className="w-full font-mono text-xs p-2.5 border border-black/20 bg-transparent outline-none"
                          ></textarea>

                          <button 
                            onClick={() => {
                              setInquirySubmitted(true);
                              showToast(`Commission dossier dispatched directly to ${currentArtist.name} studio.`);
                            }}
                            style={{ backgroundColor: accentColor }}
                            className="w-full sm:w-auto px-6 py-2.5 text-white font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer shadow-md hover:opacity-90"
                          >
                            Transmit Commission Request →
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 11. Monograph Colophon & Blockchain/DNS Verification Footer */}
                    <div className={`pt-6 border-t ${theme.border} space-y-2 font-mono text-xs opacity-75`}>
                      <div className={`flex ${isMobileViewport ? 'flex-col gap-2' : 'flex-row items-center justify-between gap-3'}`}>
                        <div className="space-y-0.5">
                          <span className="font-bold text-xs">{currentArtist.name} Atelier · Monograph Registry</span>
                          <p className="text-[10px] opacity-75">Sovereign Domain: atelier.art/@{currentArtist.id} · DNS-SEC</p>
                        </div>
                        <div className="text-[10px] space-y-0.5 sm:text-right">
                          <span>Smart Contract: 0x8F94...B492</span>
                          <span className="block opacity-60">Studio Batch #88 · 2026</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Mobile Bottom Home Bar Indicator */}
                {isMobileViewport && (
                  <div className="bg-[#181715] py-2 flex justify-center shrink-0">
                    <div className="w-28 h-1 bg-white/40 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* CoA Seal Modal */}
      {coaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] text-[#141413] border border-[#D5D0C7] max-w-lg w-full p-5 sm:p-7 space-y-5 shadow-2xl relative">
            <button 
              onClick={() => setCoaModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-black cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="border-b border-[#E7E4DF] pb-3 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#716E68]">Certificate of Authenticity</span>
                <h3 className="font-serif text-lg sm:text-xl font-bold mt-0.5">Physical Tamper-Proof NFC Seal</h3>
              </div>
              <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold font-serif text-sm">
                EV
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between border-b border-[#E7E4DF] pb-2">
                <span className="text-[#716E68]">Certificate Node ID:</span>
                <span className="font-semibold">#COA-9982-ZUR-2024</span>
              </div>
              <div className="flex justify-between border-b border-[#E7E4DF] pb-2">
                <span className="text-[#716E68]">Sha-256 Ledger Hash:</span>
                <span className="font-semibold text-[10px] truncate max-w-[200px] sm:max-w-[240px]">0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f...</span>
              </div>
              <div className="flex justify-between border-b border-[#E7E4DF] pb-2">
                <span className="text-[#716E68]">Physical Media Seal:</span>
                <span className="font-semibold">NXP NTAG213 Embedded Chip</span>
              </div>
              <div className="flex justify-between border-b border-[#E7E4DF] pb-2">
                <span className="text-[#716E68]">Atelier Signatory:</span>
                <span className="font-semibold">{currentArtist.name}</span>
              </div>
            </div>

            <p className="font-serif italic text-xs text-[#716E68] text-center">
              This certificate certifies original fabrication under direct studio supervision.
            </p>

            <button
              onClick={() => {
                setCoaModalOpen(false);
                showToast('Cryptographic certificate downloaded (PDF + JSON)');
              }}
              style={{ backgroundColor: accentColor }}
              className="w-full py-2.5 text-white font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            >
              Export Signed Dossier (PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
