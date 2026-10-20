import React, { useState, useEffect } from 'react';
import {
  type Artwork,
  getStoredStudioArtworks,
  saveStoredStudioArtworks,
} from '../components/data/studioArtworksStore';

interface ArtworksScreenProps {
  onNavigate: (path: string) => void;
}

export type { Artwork };

export default function ArtworksScreen({ onNavigate }: ArtworksScreenProps) {
  const [artworks, setArtworks] = useState<Artwork[]>(() => getStoredStudioArtworks());

  useEffect(() => {
    const handleUpdate = () => {
      setArtworks(getStoredStudioArtworks());
    };
    window.addEventListener('atelier_artworks_updated', handleUpdate);
    return () => window.removeEventListener('atelier_artworks_updated', handleUpdate);
  }, []);

  const [statusFilter, setStatusFilter] = useState<'all' | 'Available' | 'Reserved' | 'Sold'>('all');
  const [disciplineFilter, setDisciplineFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New artwork form state
  const [newTitle, setNewTitle] = useState('');
  const [newDiscipline, setNewDiscipline] = useState('Clay & Terracotta');
  const [newMedium, setNewMedium] = useState('');
  const [newDimensions, setNewDimensions] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStatus, setNewStatus] = useState<'Available' | 'Reserved' | 'Sold'>('Available');
  const [newNotes, setNewNotes] = useState('');

  const disciplinesList = [
    'All Disciplines',
    'Clay & Terracotta',
    'Metal & Bronze',
    'Wash Painting',
    'Heritage Textiles',
    'Woodcraft'
  ];

  const handleAddArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const formattedPrice = newPrice.startsWith('₹') ? newPrice : `₹${newPrice}`;
    const rawVal = parseInt(newPrice.replace(/[^0-9]/g, '')) || 10000;

    const newArt: Artwork = {
      id: `ART-2024-${String(artworks.length + 1).padStart(3, '0')}`,
      title: newTitle.trim(),
      discipline: newDiscipline,
      medium: newMedium.trim() || 'Handcrafted traditional medium',
      dimensions: newDimensions.trim() || 'Custom studio scale',
      weight: 'Studio packaged',
      price: formattedPrice,
      rawPrice: rawVal,
      status: newStatus,
      collection: 'Independent Works',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGGZkTPGHcGB4-v9e4XT9hbifCYNSkihL52Aeraq7uphyWzcv1nZhc_g_lzlBw3P9HjkWw_aa58DSRL4Gi5dAIYasc8LCSVDN2Z7gfok5Q95LU5GShp6SXiVdBtFX00NmrTnB87nh1SvXoyFo6Hz8O7Z3wnVtEQrMD_LN3aZt2-QAon_88L6cjkqF6I9VlJkY5GpiAWWdbjvHDO438OECVYyjDz6peMF2jME428MR0mPON6z-H28YzbA',
      notes: newNotes.trim() || 'Direct from Jaipur & Khurja studio workshop.'
    };

    const updated = [newArt, ...artworks];
    setArtworks(updated);
    saveStoredStudioArtworks(updated);
    setIsModalOpen(false);

    // Reset form
    setNewTitle('');
    setNewMedium('');
    setNewDimensions('');
    setNewPrice('');
    setNewNotes('');
  };

  const toggleStatus = (id: string) => {
    const updated: Artwork[] = artworks.map(art => {
      if (art.id === id) {
        const nextStatus: 'Available' | 'Reserved' | 'Sold' =
          art.status === 'Available' ? 'Reserved' : art.status === 'Reserved' ? 'Sold' : 'Available';
        return { ...art, status: nextStatus };
      }
      return art;
    });
    setArtworks(updated);
    saveStoredStudioArtworks(updated);
  };

  const copyShareLink = (art: Artwork) => {
    navigator.clipboard.writeText(`https://atelier.in/@aarav.studio/work/${art.id}`);
    setCopiedId(art.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered artworks
  const filteredArtworks = artworks.filter(art => {
    const matchesStatus = statusFilter === 'all' || art.status === statusFilter;
    const matchesDiscipline = disciplineFilter === 'all' || art.discipline === disciplineFilter;
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.medium.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.discipline.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesDiscipline && matchesSearch;
  });

  return (
    <div className="px-5 lg:px-12 py-8 space-y-8 max-w-[1400px] mx-auto w-full">
      {/* 1. Header with Breadcrumbs & Primary Action */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E7E4DF]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#716E68]">Studio</span>
            <span className="text-[#716E68]">/</span>
            <span className="font-mono text-[11px] uppercase text-[#C25E3E] font-semibold">Artworks Catalogue</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#141413] tracking-tight">Original Artworks</h1>
          <p className="font-sans text-sm text-[#56423d] max-w-2xl leading-relaxed">
            Every piece here is a unique, one-of-a-kind original work. Update prices in ₹ INR, mark items as Reserved or Sold, and share direct public links with collectors and galleries.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#141413] text-white hover:bg-[#C25E3E] transition-colors py-2.5 px-5 font-sans text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm self-start md:self-end"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>+ Add Artwork</span>
        </button>
      </header>

      {/* 2. Filter Controls (Status, Discipline, Search) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 border border-[#E7E4DF] shadow-sm">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors ${statusFilter === 'all' ? 'bg-[#141413] text-white' : 'bg-[#FAF8F5] text-[#716E68] hover:bg-[#eae8e5]'}`}
          >
            All Works ({artworks.length})
          </button>
          <button 
            onClick={() => setStatusFilter('Available')}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors ${statusFilter === 'Available' ? 'bg-emerald-800 text-white' : 'bg-[#FAF8F5] text-[#716E68] hover:bg-[#eae8e5]'}`}
          >
            Available ({artworks.filter(a => a.status === 'Available').length})
          </button>
          <button 
            onClick={() => setStatusFilter('Reserved')}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors ${statusFilter === 'Reserved' ? 'bg-amber-800 text-white' : 'bg-[#FAF8F5] text-[#716E68] hover:bg-[#eae8e5]'}`}
          >
            Reserved ({artworks.filter(a => a.status === 'Reserved').length})
          </button>
          <button 
            onClick={() => setStatusFilter('Sold')}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors ${statusFilter === 'Sold' ? 'bg-[#716E68] text-white' : 'bg-[#FAF8F5] text-[#716E68] hover:bg-[#eae8e5]'}`}
          >
            Sold ({artworks.filter(a => a.status === 'Sold').length})
          </button>
        </div>

        {/* Discipline & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={disciplineFilter} 
            onChange={(e) => setDisciplineFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#FAF8F5] border border-[#E7E4DF] text-xs font-sans text-[#141413] focus:outline-none cursor-pointer"
          >
            <option value="all">All Mediums</option>
            <option value="Clay & Terracotta">Clay & Terracotta</option>
            <option value="Metal & Bronze">Metal & Bronze</option>
            <option value="Wash Painting">Wash Painting</option>
            <option value="Heritage Textiles">Heritage Textiles</option>
            <option value="Woodcraft">Woodcraft</option>
          </select>

          <div className="relative min-w-[200px]">
            <input 
              type="text"
              placeholder="Search by title, medium..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E7E4DF] text-[#141413] placeholder-[#716E68] focus:outline-none"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-[14px] text-[#716E68]">
              search
            </span>
          </div>
        </div>
      </div>

      {/* 3. Artworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((art) => (
          <div 
            key={art.id}
            className="bg-white border border-[#E7E4DF] shadow-sm flex flex-col justify-between overflow-hidden group hover:border-[#C25E3E] transition-colors"
          >
            {/* Image & Status Badge */}
            <div className="relative aspect-[4/3] bg-[#efeeeb] overflow-hidden">
              <img 
                src={art.image} 
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Status Indicator */}
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider shadow-sm font-semibold ${
                  art.status === 'Available' ? 'bg-emerald-700 text-white' :
                  art.status === 'Reserved' ? 'bg-amber-600 text-white' :
                  'bg-[#141413] text-white'
                }`}>
                  {art.status}
                </span>
              </div>

              {/* Discipline tag */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-mono text-[#141413] border border-[#E7E4DF]">
                {art.discipline}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg text-[#141413] font-medium leading-snug">
                    {art.title}
                  </h3>
                  <span className="font-serif text-lg font-semibold text-[#141413] whitespace-nowrap">
                    {art.price}
                  </span>
                </div>
                <p className="font-sans text-xs text-[#56423d]">
                  {art.medium}
                </p>
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#716E68] pt-1">
                  <span>{art.dimensions}</span>
                  <span>·</span>
                  <span>{art.weight}</span>
                </div>
              </div>

              {/* Studio Notes & Series */}
              <div className="pt-2 border-t border-[#E7E4DF] space-y-2">
                <div className="text-[11px] font-mono text-[#716E68]">
                  Series: <span className="text-[#141413]">{art.collection}</span>
                </div>
                <p className="font-sans text-[11px] text-[#716E68] italic line-clamp-2">
                  "{art.notes}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E7E4DF] flex items-center justify-between gap-2">
                <button 
                  onClick={() => toggleStatus(art.id)}
                  className="px-2.5 py-1.5 bg-[#FAF8F5] hover:bg-[#eae8e5] text-[#141413] border border-[#E7E4DF] font-sans text-xs cursor-pointer transition-colors"
                  title="Click to cycle status: Available -> Reserved -> Sold"
                >
                  Change Status
                </button>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => copyShareLink(art)}
                    className="px-2.5 py-1.5 bg-white hover:bg-[#FAF8F5] text-[#141413] border border-[#E7E4DF] font-sans text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    title="Copy artwork link"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copiedId === art.id ? 'check' : 'share'}
                    </span>
                    <span>{copiedId === art.id ? 'Copied' : 'Share'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArtworks.length === 0 && (
        <div className="bg-white p-12 text-center border border-[#E7E4DF] space-y-3">
          <span className="material-symbols-outlined text-[36px] text-[#716E68]">palette</span>
          <h3 className="font-serif text-lg text-[#141413]">No artworks match your search</h3>
          <p className="font-sans text-xs text-[#716E68] max-w-sm mx-auto">
            Try resetting your search filters or add a new piece to your catalogue.
          </p>
          <button 
            onClick={() => { setStatusFilter('all'); setDisciplineFilter('all'); setSearchTerm(''); }}
            className="px-4 py-2 bg-[#141413] text-white text-xs font-sans uppercase tracking-wider cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* 4. Add Artwork Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 md:p-8 space-y-5 border border-[#E7E4DF] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-3">
              <div>
                <h2 className="font-serif text-xl text-[#141413]">Add New Original Artwork</h2>
                <p className="font-sans text-xs text-[#716E68]">Catalogue a new original creation into your studio registry.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[#716E68] hover:text-[#141413] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddArtwork} className="space-y-4">
              <div>
                <label className="block font-sans text-xs font-semibold text-[#141413] mb-1">
                  Artwork Title *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Khurja Black Clay Urn No. 06"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E4DF] text-xs text-[#141413] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs font-semibold text-[#141413] mb-1">
                    Discipline / Craft
                  </label>
                  <select 
                    value={newDiscipline}
                    onChange={(e) => setNewDiscipline(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E4DF] text-xs text-[#141413] focus:outline-none cursor-pointer"
                  >
                    <option value="Clay & Terracotta">Clay & Terracotta</option>
                    <option value="Metal & Bronze">Metal & Bronze</option>
                    <option value="Wash Painting">Wash Painting</option>
                    <option value="Heritage Textiles">Heritage Textiles</option>
                    <option value="Woodcraft">Woodcraft</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold text-[#141413] mb-1">
                    Price (in ₹ INR) *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. ₹22,000"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E4DF] text-xs text-[#141413] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-[#141413] mb-1">
                  Medium & Technique
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Unglazed Shigaraki clay, wood-fired at 1280°C"
                  value={newMedium}
                  onChange={(e) => setNewMedium(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E4DF] text-xs text-[#141413] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs font-semibold text-[#141413] mb-1">
                    Dimensions (cm)
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. 45 × 30 × 28 cm"
                    value={newDimensions}
                    onChange={(e) => setNewDimensions(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E4DF] text-xs text-[#141413] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold text-[#141413] mb-1">
                    Initial Status
                  </label>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E4DF] text-xs text-[#141413] focus:outline-none cursor-pointer"
                  >
                    <option value="Available">Available for Sale</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold / Private Archive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-[#141413] mb-1">
                  Studio Notes & Provenance
                </label>
                <textarea 
                  rows={3}
                  placeholder="Details regarding firing, natural pigments, or studio story..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E7E4DF] text-xs text-[#141413] focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E7E4DF]">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white hover:bg-[#FAF8F5] text-[#141413] border border-[#E7E4DF] text-xs font-sans cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-[#141413] hover:bg-[#C25E3E] text-white text-xs font-sans uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                >
                  Save Artwork
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
