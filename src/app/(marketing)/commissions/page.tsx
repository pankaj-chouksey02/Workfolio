'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const WORKFLOW = [
	{
		step: '01',
		title: 'Formal Brief',
		body: 'Submit structured requirements: medium, scale, dimensions, reference imagery, and installation context.',
		icon: 'edit_note',
	},
	{
		step: '02',
		title: 'Curated Matching',
		body: 'Atelier routes your brief to artists working in the requested discipline with availability for your timeline.',
		icon: 'hub',
	},
	{
		step: '03',
		title: 'Proposal & Deposit',
		body: 'Receive a costed proposal with milestones. A refundable studio deposit reserves the atelier calendar.',
		icon: 'request_quote',
	},
	{
		step: '04',
		title: 'Creation Archive',
		body: 'Follow kiln firings, proofs, and finishing stages through private progress dossiers and studio notes.',
		icon: 'history_edu',
	},
	{
		step: '05',
		title: 'Delivery & Provenance',
		body: 'Insured crating, white-glove delivery, and a signed certificate of provenance recorded permanently.',
		icon: 'local_shipping',
	},
];

const TIERS = [
	{
		name: 'Studio Study',
		range: '$800 – $2,500',
		lead: '4 – 6 weeks',
		details: [
			'Single vessel or canvas',
			'Two revision stages',
			'Studio crate shipping',
			'Digital provenance card',
		],
		featured: false,
	},
	{
		name: 'Collector Work',
		range: '$2,500 – $12,000',
		lead: '8 – 14 weeks',
		details: [
			'Monumental scale supported',
			'Material sampling round',
			'Insured white-glove freight',
			'Signed archival certificate',
		],
		featured: true,
	},
	{
		name: 'Institutional',
		range: '$12,000+',
		lead: 'By arrangement',
		details: [
			'Site-specific fabrication',
			'Conservation consultation',
			'On-site installation oversight',
			'Full accession dossier',
		],
		featured: false,
	},
];

const OPEN_COMMISSIONS = [
	{
		name: 'Elena Vance',
		handle: 'elenavance',
		discipline: 'Ceramics & Stoneware',
		slots: '2 slots · Q4 2024',
		from: '$2,800',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuA_OZIHxQiVSi69bOnzUzDxaxc402g4IZXX16FUV2fc2s1Y-9ZfOS-EZwhXbX4BEPslXV7Q4RUT4KhIwC5I4uSG6fu6KBwRl2KkkoOfQ3bbJg-r_mc6n_ARg_E7nPUC2K6VWtCHJcBQFq3VpkEPBGXihmDamMguIThsYlY3DpnoTQdQLhMuCEXyO0-XolAuhrbbqsaU4vYqjFokHhI-OFQ6NWAa0j7GWJV03OArpe4SlJRGbRAcmTRFCA',
	},
	{
		name: 'Anya Lindqvist',
		handle: 'lindqvist',
		discipline: 'Textile & Fiber',
		slots: '3 slots · Q1 2025',
		from: '$3,600',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuCDQ7QH4io-6NiDdPEFV0rjeSyzpCq29OBf750r-KMCIAXB6LsaJdVMLhCdxzuFclkXCrw0cEbmWioHblTQfOqIhFz-JkExxP6FQay9bsFio_CUGN0vU4LGox0MIz1uxvbGPkL5iux9-GwIsygmxGzsu8RXuF72VpWRAdIXYAEcnKoQZ_7XfeaYYxDoeAOgbWYhuf3ttp9Z3qVWAG-YSnLivXaGZ2Ylomfa85CRrfntc1pBK3wkqXx10w',
	},
	{
		name: 'Kenzo Takahashi',
		handle: 'takahashi',
		discipline: 'Sculpture & Bronze',
		slots: '1 slot · Q4 2024',
		from: '$6,400',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuBAd26-G-ttNwsnAj2hEre4rnFje45GedTMR6yQIH3abiAtWVNMmGmfr6iUMNWM5bses2qNHUjOF9-PqQ_e_tbqwQmndurBkgy3A31uoVbZjqLr_TGBDw-VUqCigpFlupSpmA6B-CUW-8tvo2DteSX1vF_T1mJIqE8464OBjk1IXNmSS_vHnY6jMrQ3gnFJ7xVyKbamzdsG4Qm6pd-d-ck4nKR41f-4WvdlJtQtYYa4-87pF2hS4N7Edg',
	},
];

const FAQS = [
	{
		q: 'Does Atelier take a commission on commissions?',
		a: 'No platform take is applied to commission agreements. Artists set their own pricing and Atelier charges a flat studio membership instead.',
	},
	{
		q: 'What happens if the piece does not match the brief?',
		a: 'Every commission includes defined revision stages. If the final work deviates materially from the approved proposal, the studio deposit is refunded in full.',
	},
	{
		q: 'Are international shipments and duties covered?',
		a: 'Insured freight is quoted transparently inside the proposal. Duties and customs documentation are handled by the Atelier logistics desk.',
	},
	{
		q: 'Can institutions request site-specific fabrication?',
		a: 'Yes. Institutional briefs support on-site fabrication, conservation consultation, and full accession dossiers.',
	},
];

export default function CommissionsPage() {
	const [submitted, setSubmitted] = useState(false);
	const [openFaq, setOpenFaq] = useState<number | null>(0);
	const [referenceCode, setReferenceCode] = useState('');

	const [brief, setBrief] = useState({
		name: '',
		email: '',
		discipline: 'Ceramics',
		budget: '$2,500 – $12,000',
		deadline: '',
		details: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const nextRef = `COM-2024-${String(Math.floor(100 + Math.random() * 900))}`;
		setReferenceCode(nextRef);
		setSubmitted(true);
	};

	return (
		<div className="flex flex-col w-full bg-[#FAF8F5] text-[#1B1C1A]">
			{/* HERO */}
			<section className="relative w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 pt-12 pb-12 overflow-hidden">
				<div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#C25E3E]/5 blur-3xl pointer-events-none -z-10"></div>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
					<div className="lg:col-span-8 space-y-5">
						<div className="inline-flex items-center gap-2">
							<span className="w-2 h-2 bg-[#C25E3E]"></span>
							<span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-medium">
								Structured Commission Protocol
							</span>
							<span className="text-[#716E68] font-mono text-xs">/ V. 2024</span>
						</div>
						<h1 className="font-serif text-5xl sm:text-6xl text-[#141413] tracking-tight leading-[1.08] max-w-3xl">
							Commission a Masterwork
						</h1>
						<p className="font-sans text-lg text-[#5f5e5d] max-w-2xl leading-relaxed">
							End scattered DMs and vague email threads. Atelier turns commissioned craft into a
							formal, documented process with clear scope, budget brackets, and provenance records.
						</p>
						<div className="flex flex-wrap items-center gap-4 pt-2">
							<a
								href="#commission-brief"
								className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider bg-[#C25E3E] text-white px-6 py-3.5 hover:bg-[#141413] transition-colors shadow-sm"
							>
								<span>Submit a Brief</span>
								<span className="material-symbols-outlined text-[16px]">edit_note</span>
							</a>
							<Link
								href="/discover"
								className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider bg-[#141413] text-white px-6 py-3.5 hover:bg-[#C25E3E] transition-colors shadow-sm"
							>
								<span>Browse Open Commissions</span>
								<span className="material-symbols-outlined text-[16px]">north_east</span>
							</Link>
						</div>
					</div>

					<div className="lg:col-span-4 bg-white border border-[#E7E4DF] shadow-sm p-6">
						<span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider block mb-3">
							Commission Ledger
						</span>
						<div className="space-y-2 font-mono text-[11px]">
							<div className="flex items-center justify-between bg-[#f5f3f0] px-3 py-2 border border-[#E7E4DF]">
								<span className="text-[#5f5e5d]">Commission Take</span>
								<span className="text-[#141413] font-semibold">0.00%</span>
							</div>
							<div className="flex items-center justify-between bg-[#f5f3f0] px-3 py-2 border border-[#E7E4DF]">
								<span className="text-[#5f5e5d]">Avg. Brief Response</span>
								<span className="text-[#141413] font-semibold">36 hrs</span>
							</div>
							<div className="flex items-center justify-between bg-[#f5f3f0] px-3 py-2 border border-[#E7E4DF]">
								<span className="text-[#5f5e5d]">Disciplines Supported</span>
								<span className="text-[#141413] font-semibold">8</span>
							</div>
							<div className="flex items-center justify-between bg-[#f5f3f0] px-3 py-2 border border-[#E7E4DF]">
								<span className="text-[#5f5e5d]">Provenance Logged</span>
								<span className="text-[#C25E3E] font-semibold">100%</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* WORKFLOW */}
			<section className="w-full bg-[#f5f3f0] py-16 border-y border-[#E7E4DF]">
				<div className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16">
					<div className="max-w-2xl mb-10">
						<span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-widest block mb-1">
							The Process
						</span>
						<h2 className="font-serif text-3xl md:text-4xl text-[#141413]">
							From Brief to Provenance
						</h2>
						<p className="font-sans text-base text-[#5f5e5d] mt-2">
							Five documented stages keep collectors, artists, and institutions aligned from first
							inquiry to final accession.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
						{WORKFLOW.map((w) => (
							<div
								key={w.step}
								className="bg-white border border-[#E7E4DF] p-6 flex flex-col h-full"
							>
								<div className="flex items-center justify-between mb-4">
									<span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-wider">
										Stage {w.step}
									</span>
									<span className="material-symbols-outlined text-[20px] text-[#716E68]">
										{w.icon}
									</span>
								</div>
								<h3 className="font-serif text-lg text-[#141413] mb-2">{w.title}</h3>
								<p className="font-sans text-xs text-[#5f5e5d] leading-relaxed">{w.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* BRIEF FORM */}
			<section
				id="commission-brief"
				className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 py-16"
			>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
					<div className="lg:col-span-5 space-y-5">
						<span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-widest block">
							Initiate Brief
						</span>
						<h2 className="font-serif text-3xl md:text-4xl text-[#141413] leading-tight">
							Tell us what you want made.
						</h2>
						<p className="font-sans text-sm text-[#5f5e5d] leading-relaxed">
							Your brief is transmitted directly to matching studios. Nothing is published publicly
							and you can withdraw at any stage before a deposit is placed.
						</p>
						<ul className="pt-2 space-y-3 font-sans text-xs text-[#56423d]">
							<li className="flex items-center gap-2">
								<span className="material-symbols-outlined text-[16px] text-[#C25E3E]">check</span>
								Reference image and dimension upload supported
							</li>
							<li className="flex items-center gap-2">
								<span className="material-symbols-outlined text-[16px] text-[#C25E3E]">check</span>
								Budget brackets routed to artists who work at that scale
							</li>
							<li className="flex items-center gap-2">
								<span className="material-symbols-outlined text-[16px] text-[#C25E3E]">check</span>
								Every stage recorded in a permanent provenance log
							</li>
						</ul>

						<div className="mt-6 p-5 bg-[#efeeeb] border border-[#E7E4DF]">
							<span className="font-serif text-3xl text-[#C25E3E] leading-none">“</span>
							<p className="font-sans text-sm text-[#141413] leading-relaxed mt-1">
								Serious collectors fill out dimensions and budget upfront. I accepted three
								monumental commissions in two months.
							</p>
							<span className="font-mono text-[11px] text-[#716E68] block mt-3">
								Mateo Rossi · Oil Painter · Milan
							</span>
						</div>
					</div>

					<div className="lg:col-span-7 bg-white border border-[#E7E4DF] shadow-md p-6 md:p-8">
						{submitted ? (
							<div className="py-12 text-center space-y-4">
								<span className="material-symbols-outlined text-[48px] text-[#C25E3E]">
									check_circle
								</span>
								<h3 className="font-serif text-2xl text-[#141413]">Brief Transmitted</h3>
								<p className="font-sans text-sm text-[#5f5e5d] max-w-md mx-auto">
									Thank you, {brief.name || 'collector'}. Your commission reference has been logged
									and matching studios in {brief.discipline} will respond within 36 hours.
								</p>
								<div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#716E68] bg-[#f5f3f0] border border-[#E7E4DF] px-3 py-2">
									<span>REF:</span>
									<span className="text-[#141413] font-medium">
										{referenceCode || 'COM-2024-000'}
									</span>
								</div>
								<div className="pt-4">
									<button
										onClick={() => setSubmitted(false)}
										className="font-sans text-xs uppercase tracking-wider text-[#C25E3E] hover:text-[#141413] cursor-pointer"
									>
										Submit another brief
									</button>
								</div>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-5">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
									<div>
										<label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">
											Your Full Name
										</label>
										<input
											type="text"
											required
											value={brief.name}
											onChange={(e) => setBrief({ ...brief, name: e.target.value })}
											placeholder="Dr. Arthur Pendelton"
											className="w-full bg-[#f5f3f0] px-3 py-2.5 font-sans text-xs text-[#141413] placeholder:text-[#a9a6a3] focus:outline-none focus:border-[#C25E3E] border border-[#E7E4DF]"
										/>
									</div>
									<div>
										<label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">
											Collector / Institutional Email
										</label>
										<input
											type="email"
											required
											value={brief.email}
											onChange={(e) => setBrief({ ...brief, email: e.target.value })}
											placeholder="arthur@curatorial.org"
											className="w-full bg-[#f5f3f0] px-3 py-2.5 font-sans text-xs text-[#141413] placeholder:text-[#a9a6a3] focus:outline-none focus:border-[#C25E3E] border border-[#E7E4DF]"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
									<div>
										<label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">
											Discipline
										</label>
										<select
											value={brief.discipline}
											onChange={(e) => setBrief({ ...brief, discipline: e.target.value })}
											className="w-full bg-[#f5f3f0] px-3 py-2.5 font-sans text-xs text-[#141413] focus:outline-none focus:border-[#C25E3E] border border-[#E7E4DF]"
										>
											{[
												'Ceramics',
												'Sculpture',
												'Oil Painting',
												'Printmaking',
												'Textile & Fiber',
												'Photography',
												'Woodwork',
												'Mixed Media',
											].map((d) => (
												<option key={d} value={d}>
													{d}
												</option>
											))}
										</select>
									</div>
									<div>
										<label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">
											Budget Bracket
										</label>
										<select
											value={brief.budget}
											onChange={(e) => setBrief({ ...brief, budget: e.target.value })}
											className="w-full bg-[#f5f3f0] px-3 py-2.5 font-sans text-xs text-[#141413] focus:outline-none focus:border-[#C25E3E] border border-[#E7E4DF]"
										>
											{['$800 – $2,500', '$2,500 – $12,000', '$12,000+'].map((b) => (
												<option key={b} value={b}>
													{b}
												</option>
											))}
										</select>
									</div>
									<div>
										<label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">
											Target Delivery
										</label>
										<input
											type="month"
											value={brief.deadline}
											onChange={(e) => setBrief({ ...brief, deadline: e.target.value })}
											className="w-full bg-[#f5f3f0] px-3 py-2.5 font-sans text-xs text-[#141413] focus:outline-none focus:border-[#C25E3E] border border-[#E7E4DF]"
										/>
									</div>
								</div>

								<div>
									<label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">
										Medium & Scale Vision
									</label>
									<textarea
										rows={5}
										required
										value={brief.details}
										onChange={(e) => setBrief({ ...brief, details: e.target.value })}
										placeholder="Commissioning a standalone monumental vessel for a hotel lobby, roughly 90cm tall, high-iron reduction glaze..."
										className="w-full bg-[#f5f3f0] px-3 py-2.5 font-sans text-xs text-[#141413] placeholder:text-[#a9a6a3] focus:outline-none focus:border-[#C25E3E] border border-[#E7E4DF]"
									></textarea>
								</div>

								<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
									<span className="font-mono text-[11px] text-[#716E68]">
										No deposit required at this stage.
									</span>
									<button
										type="submit"
										className="w-full sm:w-auto bg-[#141413] text-white font-sans text-xs uppercase tracking-wider px-7 py-3 hover:bg-[#C25E3E] transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
									>
										<span>Transmit Brief</span>
										<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			</section>

			{/* TIERS */}
			<section className="w-full bg-[#f5f3f0] py-16 border-y border-[#E7E4DF]">
				<div className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16">
					<div className="max-w-2xl mb-10">
						<span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-widest block mb-1">
							Scope Brackets
						</span>
						<h2 className="font-serif text-3xl md:text-4xl text-[#141413]">Commission Tiers</h2>
						<p className="font-sans text-base text-[#5f5e5d] mt-2">
							Indicative ranges only — final pricing is set by the artist inside their formal
							proposal.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{TIERS.map((t) => (
							<div
								key={t.name}
								className={`relative flex flex-col p-8 border ${
									t.featured
										? 'bg-[#141413] text-white border-[#141413]'
										: 'bg-white border-[#E7E4DF]'
								}`}
							>
								{t.featured && (
									<span className="absolute top-0 right-0 bg-[#C25E3E] text-white font-mono text-[10px] uppercase tracking-wider px-3 py-1">
										Most Requested
									</span>
								)}
								<h3
									className={`font-serif text-2xl ${
										t.featured ? 'text-white' : 'text-[#141413]'
									}`}
								>
									{t.name}
								</h3>
								<span
									className={`font-mono text-sm mt-2 ${
										t.featured ? 'text-[#ffb59e]' : 'text-[#C25E3E]'
									}`}
								>
									{t.range}
								</span>
								<span
									className={`font-mono text-[11px] uppercase mt-1 ${
										t.featured ? 'text-[#a9a6a3]' : 'text-[#716E68]'
									}`}
								>
									Lead time: {t.lead}
								</span>
								<ul
									className={`mt-6 space-y-3 font-sans text-xs flex-1 ${
										t.featured ? 'text-[#e4e2df]' : 'text-[#56423d]'
									}`}
								>
									{t.details.map((d) => (
										<li key={d} className="flex items-start gap-2">
											<span
												className={`material-symbols-outlined text-[16px] ${
													t.featured ? 'text-[#ffb59e]' : 'text-[#C25E3E]'
												}`}
											>
												check
											</span>
											{d}
										</li>
									))}
								</ul>
								<a
									href="#commission-brief"
									className={`mt-8 text-center font-sans text-xs uppercase tracking-wider px-6 py-3 transition-colors ${
										t.featured
											? 'bg-[#C25E3E] text-white hover:bg-white hover:text-[#141413]'
											: 'border border-[#141413] text-[#141413] hover:bg-[#141413] hover:text-white'
									}`}
								>
									Begin at this Tier
								</a>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* OPEN COMMISSIONS */}
			<section className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 py-16">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
					<div>
						<div className="flex items-center gap-2 text-[#C25E3E] mb-2">
							<span className="w-2 h-2 rounded-full bg-[#C25E3E] animate-pulse"></span>
							<span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
								Accepting Now
							</span>
						</div>
						<h2 className="font-serif text-3xl md:text-4xl text-[#141413]">
							Studios Open for Commission
						</h2>
					</div>
					<Link
						href="/discover"
						className="font-sans text-xs uppercase tracking-wider text-[#141413] hover:text-[#C25E3E] flex items-center gap-1 mt-3 md:mt-0"
					>
						View all creators{' '}
						<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{OPEN_COMMISSIONS.map((c) => (
						<div
							key={c.handle}
							className="bg-white border border-[#E7E4DF] shadow-sm flex flex-col"
						>
							<div className="aspect-[16/10] bg-[#efeeeb] overflow-hidden">
								<img
									src={c.image}
									alt={c.name}
									className="w-full h-full object-cover"
									referrerPolicy="no-referrer"
								/>
							</div>
							<div className="p-5 flex-1 flex flex-col">
								<div className="flex items-start justify-between">
									<div>
										<h3 className="font-serif text-lg text-[#141413]">{c.name}</h3>
										<span className="font-mono text-xs text-[#C25E3E]">
											atelier.art/@{c.handle}
										</span>
									</div>
									<span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-emerald-800 bg-[#eae8e5] px-2 py-1">
										<span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Open
									</span>
								</div>
								<p className="font-mono text-[11px] text-[#716E68] mt-3">{c.discipline}</p>
								<div className="mt-4 pt-3 border-t border-[#E7E4DF] flex items-center justify-between font-mono text-[11px]">
									<span className="text-[#716E68]">{c.slots}</span>
									<span className="text-[#141413] font-medium">from {c.from}</span>
								</div>
							</div>
							<Link
								href="/discover"
								className="border-t border-[#E7E4DF] px-5 py-3 font-sans text-xs uppercase tracking-wider text-[#141413] hover:text-[#C25E3E] flex items-center justify-between"
							>
								<span>Request Commission</span>
								<span className="material-symbols-outlined text-[16px]">edit_note</span>
							</Link>
						</div>
					))}
				</div>
			</section>

			{/* FAQ */}
			<section className="w-full bg-[#f5f3f0] py-16 border-y border-[#E7E4DF]">
				<div className="w-full max-w-[900px] mx-auto px-5 md:px-12">
					<div className="text-center mb-10">
						<span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-widest block mb-1">
							Collector Questions
						</span>
						<h2 className="font-serif text-3xl md:text-4xl text-[#141413]">
							Commission Terms, Answered
						</h2>
					</div>

					<div className="bg-white border border-[#E7E4DF] divide-y divide-[#E7E4DF]">
						{FAQS.map((f, i) => (
							<div key={f.q}>
								<button
									onClick={() => setOpenFaq(openFaq === i ? null : i)}
									className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer hover:bg-[#FAF8F5] transition-colors"
								>
									<span className="font-serif text-base text-[#141413]">{f.q}</span>
									<span className="material-symbols-outlined text-[20px] text-[#C25E3E] shrink-0">
										{openFaq === i ? 'remove' : 'add'}
									</span>
								</button>
								{openFaq === i && (
									<p className="px-6 pb-5 font-sans text-sm text-[#5f5e5d] leading-relaxed">
										{f.a}
									</p>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 py-16">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#141413] text-white p-8 md:p-12">
					<div className="lg:col-span-8 space-y-4">
						<span className="font-mono text-[10px] uppercase tracking-widest text-[#ffb59e]">
							Artists: Open Your Calendar
						</span>
						<h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
							Receive structured briefs instead of scattered messages.
						</h2>
						<p className="font-sans text-sm text-[#e4e2df] max-w-xl font-light">
							Publish your commission availability, set your own thresholds, and let Atelier handle
							intake, deposits, and provenance documentation.
						</p>
					</div>
					<div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
						<Link
							href="/studio/commissions"
							className="bg-[#C25E3E] text-white font-sans text-xs uppercase tracking-wider px-7 py-3.5 hover:bg-white hover:text-[#141413] transition-colors text-center"
						>
							Open Commission Desk
						</Link>
						<Link
							href="/disciplines"
							className="border border-white/30 text-white font-sans text-xs uppercase tracking-wider px-7 py-3.5 hover:bg-white/10 transition-colors text-center"
						>
							Explore Disciplines
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
