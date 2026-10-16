'use client';

import React, { useState } from 'react';

interface ProfileScreenProps {
  onNavigate: (path: string) => void;
}

const DISCIPLINES = [
  'Ceramics', 'Sculpture', 'Oil Painting', 'Watercolour', 'Printmaking',
  'Textile & Fiber', 'Photography', 'Woodwork', 'Mixed Media', 'Drawing',
  'Digital Art', 'Bronze Casting',
];

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [saved, setSaved] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);

  const [profile, setProfile] = useState({
    displayName: 'Elena Vance',
    handle: 'elenavance',
    headline: 'Ceramic Artist & Sculptor',
    bio: 'Working at the intersection of functional form and sculptural gesture. My practice centres on high-fire reduction stoneware, monumental vessel forms, and site-specific ceramic installations for institutional and private collectors.',
    location: 'Amsterdam, Netherlands',
    website: 'https://elenavance.studio',
    instagram: '@elenavance',
    email: 'elena@elenavance.studio',
    commissionStatus: 'open',
    nextSlot: '2024-11',
    selectedDisciplines: ['Ceramics', 'Sculpture'],
    pronouns: 'she/her',
    foundedYear: '2017',
  });

  const toggleDiscipline = (d: string) => {
    setProfile((prev) => ({
      ...prev,
      selectedDisciplines: prev.selectedDisciplines.includes(d)
        ? prev.selectedDisciplines.filter((x) => x !== d)
        : [...prev.selectedDisciplines, d],
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const field = (
    label: string,
    key: keyof typeof profile,
    type: string = 'text',
    placeholder = ''
  ) => (
    <div>
      <label className="block font-mono text-[10px] uppercase text-[#716E68] tracking-wider mb-1">
        {label}
      </label>
      <input
        type={type}
        value={profile[key] as string}
        onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full bg-[#f5f3f0] px-3 py-2.5 font-sans text-xs text-[#141413] placeholder:text-[#a9a6a3] focus:outline-none focus:ring-1 focus:ring-[#C25E3E] border border-[#E7E4DF] transition-all"
      />
    </div>
  );

  return (
    <div className="px-5 lg:px-12 py-8 max-w-[1440px] mx-auto w-full space-y-8">

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-widest">Studio Profile</span>
            <span className="text-[#716E68]">/</span>
            <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold">Public Identity</span>
          </div>
          <h1 className="font-serif text-4xl text-[#141413] tracking-tight">Your Artist Profile</h1>
          <p className="font-sans text-sm text-[#56423d] max-w-xl">
            This information appears on your public portfolio at{' '}
            <span className="font-mono text-[#C25E3E]">atelier.art/@{profile.handle}</span> and in collector-facing commission briefs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('portfolio-customizer')}
            className="bg-[#efeeeb] hover:bg-[#e4e2df] text-[#141413] py-3 px-4 font-sans text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">palette</span>
            <span>Customise Portfolio</span>
          </button>
          <a
            href={`/u/${profile.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#efeeeb] hover:bg-[#e4e2df] text-[#141413] py-3 px-4 font-sans text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            <span>Preview Public Page</span>
          </a>
        </div>
      </header>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT: Avatar + Identity */}
          <div className="lg:col-span-4 space-y-6">

            {/* Avatar */}
            <div className="bg-white border border-[#E7E4DF] shadow-sm p-6 space-y-4">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider block">Profile Image</span>
              <div className="flex flex-col items-center gap-4">
                <div
                  className="relative w-28 h-28 rounded-full overflow-hidden cursor-pointer group"
                  onMouseEnter={() => setAvatarHover(true)}
                  onMouseLeave={() => setAvatarHover(false)}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_OZIHxQiVSi69bOnzUzDxaxc402g4IZXX16FUV2fc2s1Y-9ZfOS-EZwhXbX4BEPslXV7Q4RUT4KhIwC5I4uSG6fu6KBwRl2KkkoOfQ3bbJg-r_mc6n_ARg_E7nPUC2K6VWtCHJcBQFq3VpkEPBGXihmDamMguIThsYlY3DpnoTQdQLhMuCEXyO0-XolAuhrbbqsaU4vYqjFokHhI-OFQ6NWAa0j7GWJV03OArpe4SlJRGbRAcmTRFCA"
                    alt="Artist Avatar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {avatarHover && (
                    <div className="absolute inset-0 bg-[#141413]/70 flex flex-col items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-white text-[22px]">photo_camera</span>
                      <span className="font-mono text-[10px] text-white uppercase tracking-wider">Change</span>
                    </div>
                  )}
                </div>
                <div className="text-center space-y-1">
                  <p className="font-sans text-xs text-[#5f5e5d]">Minimum 400 × 400px · JPG or PNG</p>
                  <button
                    type="button"
                    className="font-mono text-[10px] uppercase tracking-wider text-[#C25E3E] hover:text-[#141413] transition-colors cursor-pointer"
                  >
                    Upload New Photo
                  </button>
                </div>
              </div>
            </div>

            {/* Commission Availability */}
            <div className="bg-white border border-[#E7E4DF] shadow-sm p-6 space-y-4">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider block">Commission Status</span>
              <div className="space-y-3">
                {[
                  { value: 'open', label: 'Open for Commissions', color: 'text-emerald-700' },
                  { value: 'waitlist', label: 'Waitlist Only', color: 'text-amber-700' },
                  { value: 'closed', label: 'Closed', color: 'text-[#ba1a1a]' },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-4 h-4 border-2 flex items-center justify-center transition-colors shrink-0 ${
                        profile.commissionStatus === opt.value
                          ? 'border-[#141413] bg-[#141413]'
                          : 'border-[#E7E4DF] group-hover:border-[#141413]'
                      }`}
                    >
                      {profile.commissionStatus === opt.value && (
                        <span className="material-symbols-outlined text-white text-[12px]">check</span>
                      )}
                    </div>
                    <span className={`font-sans text-xs ${opt.color}`}>{opt.label}</span>
                    <input
                      type="radio"
                      name="commissionStatus"
                      value={opt.value}
                      checked={profile.commissionStatus === opt.value}
                      onChange={(e) => setProfile({ ...profile, commissionStatus: e.target.value })}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
              {profile.commissionStatus !== 'closed' && (
                <div className="pt-2 border-t border-[#E7E4DF]">
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] tracking-wider mb-1">
                    Next Available Slot
                  </label>
                  <input
                    type="month"
                    value={profile.nextSlot}
                    onChange={(e) => setProfile({ ...profile, nextSlot: e.target.value })}
                    className="w-full bg-[#f5f3f0] px-3 py-2 font-sans text-xs text-[#141413] focus:outline-none focus:ring-1 focus:ring-[#C25E3E] border border-[#E7E4DF]"
                  />
                </div>
              )}
            </div>

            {/* Disciplines */}
            <div className="bg-white border border-[#E7E4DF] shadow-sm p-6 space-y-4">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider block mb-1">Disciplines</span>
                <p className="font-sans text-[11px] text-[#a9a6a3]">Select all that apply to your practice</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {DISCIPLINES.map((d) => {
                  const active = profile.selectedDisciplines.includes(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDiscipline(d)}
                      className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#141413] text-white border-[#141413]'
                          : 'bg-white text-[#716E68] border-[#E7E4DF] hover:border-[#141413] hover:text-[#141413]'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Form Fields */}
          <div className="lg:col-span-8 space-y-6">

            {/* Identity */}
            <div className="bg-white border border-[#E7E4DF] shadow-sm p-6 space-y-5">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider block">Identity</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {field('Display Name', 'displayName', 'text', 'Elena Vance')}
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] tracking-wider mb-1">
                    Portfolio Handle
                  </label>
                  <div className="flex items-center bg-[#f5f3f0] border border-[#E7E4DF] focus-within:ring-1 focus-within:ring-[#C25E3E] transition-all">
                    <span className="font-mono text-xs text-[#a9a6a3] pl-3">@</span>
                    <input
                      type="text"
                      value={profile.handle}
                      onChange={(e) => setProfile({ ...profile, handle: e.target.value.replace(/\s/g, '').toLowerCase() })}
                      placeholder="elenavance"
                      className="flex-1 bg-transparent px-2 py-2.5 font-mono text-xs text-[#141413] focus:outline-none"
                    />
                  </div>
                  <p className="font-mono text-[10px] text-[#a9a6a3] mt-1">atelier.art/@{profile.handle || '…'}</p>
                </div>
                {field('Headline', 'headline', 'text', 'Ceramic Artist & Sculptor')}
                {field('Pronouns', 'pronouns', 'text', 'she/her')}
                {field('Location', 'location', 'text', 'Amsterdam, Netherlands')}
                {field('Practice Founded', 'foundedYear', 'text', '2017')}
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] tracking-wider mb-1">
                  Artist Statement / Bio
                </label>
                <textarea
                  rows={5}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Describe your practice, materials, and approach…"
                  className="w-full bg-[#f5f3f0] px-3 py-2.5 font-sans text-xs text-[#141413] placeholder:text-[#a9a6a3] focus:outline-none focus:ring-1 focus:ring-[#C25E3E] border border-[#E7E4DF] transition-all resize-none"
                />
                <p className="font-mono text-[10px] text-[#a9a6a3] mt-1 text-right">{profile.bio.length} / 600 chars</p>
              </div>
            </div>

            {/* Links & Contact */}
            <div className="bg-white border border-[#E7E4DF] shadow-sm p-6 space-y-5">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider block">Links & Contact</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {field('Personal Website', 'website', 'url', 'https://yourname.studio')}
                {field('Collector Email', 'email', 'email', 'you@studio.com')}
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] tracking-wider mb-1">
                    Instagram
                  </label>
                  <div className="flex items-center bg-[#f5f3f0] border border-[#E7E4DF] focus-within:ring-1 focus-within:ring-[#C25E3E] transition-all">
                    <span className="material-symbols-outlined text-[15px] text-[#a9a6a3] pl-3">photo_camera</span>
                    <input
                      type="text"
                      value={profile.instagram}
                      onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                      placeholder="@yourstudio"
                      className="flex-1 bg-transparent px-2 py-2.5 font-mono text-xs text-[#141413] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Public portfolio preview strip */}
            <div className="bg-[#f5f3f0] border border-[#E7E4DF] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider">Public profile preview</span>
                <span className="font-mono text-[10px] text-[#C25E3E]">atelier.art/@{profile.handle}</span>
              </div>
              <div className="bg-white border border-[#E7E4DF] p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#eae8e5]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_OZIHxQiVSi69bOnzUzDxaxc402g4IZXX16FUV2fc2s1Y-9ZfOS-EZwhXbX4BEPslXV7Q4RUT4KhIwC5I4uSG6fu6KBwRl2KkkoOfQ3bbJg-r_mc6n_ARg_E7nPUC2K6VWtCHJcBQFq3VpkEPBGXihmDamMguIThsYlY3DpnoTQdQLhMuCEXyO0-XolAuhrbbqsaU4vYqjFokHhI-OFQ6NWAa0j7GWJV03OArpe4SlJRGbRAcmTRFCA"
                    alt="preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base text-[#141413] truncate">{profile.displayName || 'Your Name'}</p>
                  <p className="font-mono text-[11px] text-[#C25E3E]">@{profile.handle || 'handle'}</p>
                  <p className="font-sans text-xs text-[#716E68] truncate">{profile.headline || 'Your headline'}</p>
                </div>
                <div className="shrink-0">
                  {profile.commissionStatus === 'open' && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-emerald-800 bg-emerald-50 px-2 py-1 border border-emerald-200">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>Open
                    </span>
                  )}
                  {profile.commissionStatus === 'waitlist' && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-amber-800 bg-amber-50 px-2 py-1 border border-amber-200">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>Waitlist
                    </span>
                  )}
                  {profile.commissionStatus === 'closed' && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-[#716E68] bg-[#efeeeb] px-2 py-1 border border-[#E7E4DF]">
                      <span className="w-1.5 h-1.5 bg-[#716E68] rounded-full"></span>Closed
                    </span>
                  )}
                </div>
              </div>
              {profile.selectedDisciplines.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {profile.selectedDisciplines.map((d) => (
                    <span key={d} className="font-mono text-[10px] uppercase tracking-wider text-[#56423d] bg-white border border-[#E7E4DF] px-2 py-1">
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Save Bar */}
            <div className="flex items-center justify-between border-t border-[#E7E4DF] pt-5">
              <span className="font-mono text-[11px] text-[#716E68]">
                Changes are saved to your public profile immediately.
              </span>
              <button
                type="submit"
                className="bg-[#141413] text-white font-sans text-xs uppercase tracking-wider px-8 py-3 hover:bg-[#C25E3E] transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
              >
                {saved ? (
                  <>
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <span>Save Profile</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
