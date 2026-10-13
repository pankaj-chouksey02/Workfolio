'use client';

import React, { useMemo, useState } from 'react';

type RangeKey = '7d' | '30d' | '90d' | 'ytd';
type MetricKey = 'views' | 'inquiries' | 'saves';
type SortKey = 'title' | 'views' | 'inquiries' | 'saves' | 'conversion';

interface Point {
  label: string;
  views: number;
  inquiries: number;
  saves: number;
}

const RANGE_ORDER: RangeKey[] = ['7d', '30d', '90d', 'ytd'];

const RANGE_LABELS: Record<RangeKey, string> = {
  '7d': '7 Days',
  '30d': '30 Days',
  '90d': '90 Days',
  ytd: 'Year to Date',
};

const RANGE_CONTEXT: Record<RangeKey, string> = {
  '7d': 'vs prior week',
  '30d': 'vs prior month',
  '90d': 'vs prior quarter',
  ytd: 'vs prior year',
};

const METRIC_LABELS: Record<MetricKey, string> = {
  views: 'Monograph Views',
  inquiries: 'Collector Inquiries',
  saves: 'Registry Saves',
};

const SERIES: Record<RangeKey, Point[]> = {
  '7d': [
    { label: 'Mon', views: 1420, inquiries: 2, saves: 38 },
    { label: 'Tue', views: 1680, inquiries: 3, saves: 44 },
    { label: 'Wed', views: 1510, inquiries: 2, saves: 41 },
    { label: 'Thu', views: 1860, inquiries: 4, saves: 57 },
    { label: 'Fri', views: 2140, inquiries: 5, saves: 68 },
    { label: 'Sat', views: 1980, inquiries: 3, saves: 52 },
    { label: 'Sun', views: 1540, inquiries: 2, saves: 39 },
  ],
  '30d': [
    { label: 'Oct 1', views: 2980, inquiries: 3, saves: 62 },
    { label: 'Oct 4', views: 3420, inquiries: 4, saves: 71 },
    { label: 'Oct 7', views: 3180, inquiries: 3, saves: 66 },
    { label: 'Oct 10', views: 3860, inquiries: 5, saves: 84 },
    { label: 'Oct 13', views: 4210, inquiries: 6, saves: 96 },
    { label: 'Oct 16', views: 3980, inquiries: 4, saves: 88 },
    { label: 'Oct 19', views: 4620, inquiries: 7, saves: 108 },
    { label: 'Oct 22', views: 5180, inquiries: 8, saves: 121 },
    { label: 'Oct 25', views: 4740, inquiries: 6, saves: 104 },
    { label: 'Oct 28', views: 6220, inquiries: 9, saves: 143 },
  ],
  '90d': [
    { label: 'W1', views: 8420, inquiries: 11, saves: 182 },
    { label: 'W2', views: 9180, inquiries: 13, saves: 204 },
    { label: 'W3', views: 8760, inquiries: 12, saves: 196 },
    { label: 'W4', views: 9640, inquiries: 15, saves: 221 },
    { label: 'W5', views: 10420, inquiries: 16, saves: 244 },
    { label: 'W6', views: 9860, inquiries: 14, saves: 228 },
    { label: 'W7', views: 11240, inquiries: 18, saves: 268 },
    { label: 'W8', views: 10880, inquiries: 17, saves: 254 },
    { label: 'W9', views: 11640, inquiries: 19, saves: 276 },
    { label: 'W10', views: 12220, inquiries: 21, saves: 294 },
    { label: 'W11', views: 11880, inquiries: 20, saves: 286 },
    { label: 'W12', views: 13260, inquiries: 24, saves: 318 },
  ],
  ytd: [
    { label: 'Jan', views: 18600, inquiries: 26, saves: 412 },
    { label: 'Feb', views: 21400, inquiries: 29, saves: 468 },
    { label: 'Mar', views: 24200, inquiries: 32, saves: 528 },
    { label: 'Apr', views: 26800, inquiries: 35, saves: 576 },
    { label: 'May', views: 29400, inquiries: 38, saves: 622 },
    { label: 'Jun', views: 32600, inquiries: 42, saves: 688 },
    { label: 'Jul', views: 35800, inquiries: 45, saves: 742 },
    { label: 'Aug', views: 38600, inquiries: 48, saves: 796 },
    { label: 'Sep', views: 42100, inquiries: 52, saves: 862 },
    { label: 'Oct', views: 45600, inquiries: 56, saves: 928 },
    { label: 'Nov', views: 48900, inquiries: 59, saves: 986 },
    { label: 'Dec', views: 52400, inquiries: 63, saves: 1054 },
  ],
};

interface RangeSummary {
  valuation: string;
  accepted: number;
  conversion: string;
  storage: string;
  deltas: { views: string; inquiries: string; valuation: string; conversion: string };
  positive: { views: boolean; inquiries: boolean; valuation: boolean; conversion: boolean };
}

const SUMMARY: Record<RangeKey, RangeSummary> = {
  '7d': {
    valuation: '$18,400',
    accepted: 8,
    conversion: '1.42%',
    storage: '18.4 GB',
    deltas: { views: '+6.2%', inquiries: '+4.0%', valuation: '+9.4%', conversion: '+0.08pt' },
    positive: { views: true, inquiries: true, valuation: true, conversion: true },
  },
  '30d': {
    valuation: '$134,200',
    accepted: 28,
    conversion: '1.28%',
    storage: '18.4 GB',
    deltas: { views: '+18.4%', inquiries: '+12.1%', valuation: '+22.0%', conversion: '+0.14pt' },
    positive: { views: true, inquiries: true, valuation: true, conversion: true },
  },
  '90d': {
    valuation: '$402,600',
    accepted: 74,
    conversion: '1.19%',
    storage: '18.4 GB',
    deltas: { views: '+31.6%', inquiries: '+19.5%', valuation: '+28.7%', conversion: '-0.06pt' },
    positive: { views: true, inquiries: true, valuation: true, conversion: false },
  },
  ytd: {
    valuation: '$1,284,000',
    accepted: 216,
    conversion: '1.11%',
    storage: '18.4 GB',
    deltas: { views: '+152%', inquiries: '+138%', valuation: '+164%', conversion: '+0.21pt' },
    positive: { views: true, inquiries: true, valuation: true, conversion: true },
  },
};

const CHANNELS = [
  { label: 'Sovereign URI (@elenavance)', value: 52, tone: 'dark' as const },
  { label: 'Curated Explore / Biennale Registry', value: 24, tone: 'accent' as const },
  { label: 'Private Exhibition Links', value: 14, tone: 'muted' as const },
  { label: 'Press & Catalog Citations', value: 10, tone: 'outline' as const },
];

const GEOGRAPHY = [
  { region: 'Zurich & Geneva, CH', share: 38, visits: '16,240' },
  { region: 'Kyoto & Tokyo, JP', share: 26, visits: '11,120' },
  { region: 'Paris & London, EU', share: 22, visits: '9,410' },
  { region: 'New York & Boston, US', share: 14, visits: '5,980' },
];

const REFERRALS = [
  { source: 'Kunsthalle Zurich', type: 'Institution', visits: '2,140' },
  { source: 'Biennale di Venezia Index', type: 'Biennale', visits: '1,780' },
  { source: 'Palais des Arts Contemporains', type: 'Institution', visits: '1,240' },
  { source: 'Ceramic Review Quarterly', type: 'Press', visits: '860' },
];

interface WorkRow {
  title: string;
  medium: string;
  views: number;
  inquiries: number;
  saves: number;
  conversion: number;
}

const WORKS: WorkRow[] = [
  { title: 'Tectonic Vessel No. 04', medium: 'Unglazed Stoneware', views: 6240, inquiries: 8, saves: 142, conversion: 1.28 },
  { title: 'Strata Monolith IX', medium: 'Iron-Reduction Clay', views: 5120, inquiries: 6, saves: 118, conversion: 1.17 },
  { title: 'Vessel in Ochre & Ash', medium: 'Wood-fired Stoneware', views: 3980, inquiries: 4, saves: 96, conversion: 1.01 },
  { title: 'Erosion Bowl II', medium: 'Black Mountain Clay', views: 2640, inquiries: 2, saves: 71, conversion: 0.76 },
  { title: 'Solstice Urn IV', medium: 'Reduction Stoneware', views: 1920, inquiries: 3, saves: 54, conversion: 1.56 },
];

const CHART_W = 760;
const CHART_H = 260;
const PAD = { l: 48, r: 20, t: 20, b: 32 };

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return `${n}`;
}

function buildChart(points: Point[], metric: MetricKey) {
  const values = points.map((p) => p[metric]);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const plotW = CHART_W - PAD.l - PAD.r;
  const plotH = CHART_H - PAD.t - PAD.b;
  const step = points.length > 1 ? plotW / (points.length - 1) : plotW;

  const coords = points.map((p, i) => {
    const x = PAD.l + i * step;
    const y = PAD.t + (1 - (p[metric] - min) / span) * plotH;
    return { x, y, value: p[metric], label: p.label };
  });

  const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const area = `${line} L${coords[coords.length - 1].x.toFixed(1)},${CHART_H - PAD.b} L${coords[0].x.toFixed(1)},${CHART_H - PAD.b} Z`;

  // Prior period ghost line (for the compare overlay) — offset downward, clamped to the plot area
  const ghost = coords.map((c) => {
    const gy = Math.min(PAD.t + (c.y - PAD.t) * 1.16, CHART_H - PAD.b);
    return `${c.x.toFixed(1)},${gy.toFixed(1)}`;
  });

  return { coords, line, area, ghost, min, max, plotH, step };
}

export function AnalyticsDashboard() {
  const [range, setRange] = useState<RangeKey>('30d');
  const [metric, setMetric] = useState<MetricKey>('views');
  const [compare, setCompare] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('views');
  const [sortAsc, setSortAsc] = useState(false);

  const points = SERIES[range];
  const summary = SUMMARY[range];
  const chart = useMemo(() => buildChart(points, metric), [points, metric]);

  const totals = useMemo(
    () => ({
      views: points.reduce((s, p) => s + p.views, 0),
      inquiries: points.reduce((s, p) => s + p.inquiries, 0),
      saves: points.reduce((s, p) => s + p.saves, 0),
    }),
    [points],
  );

  const sortedWorks = useMemo(() => {
    const rows = [...WORKS];
    rows.sort((a, b) => {
      if (sortKey === 'title') return sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      return sortAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
    });
    return rows;
  }, [sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(key === 'title');
    }
  };

  const exportCsv = () => {
    const header = 'period,views,inquiries,saves';
    const rows = points.map((p) => `${p.label},${p.views},${p.inquiries},${p.saves}`);
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atelier-analytics-${range}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const kpiCards = [
    {
      label: 'Monograph Views',
      value: totals.views.toLocaleString(),
      delta: summary.deltas.views,
      positive: summary.positive.views,
      note: `${formatValue(totals.saves)} registry saves`,
      icon: 'visibility',
      spark: points.map((p) => p.views),
    },
    {
      label: 'Collector Inquiries',
      value: `${totals.inquiries} Direct`,
      delta: summary.deltas.inquiries,
      positive: summary.positive.inquiries,
      note: `${summary.accepted} accepted into scope`,
      icon: 'mail',
      spark: points.map((p) => p.inquiries),
    },
    {
      label: 'Valuation Transacted',
      value: summary.valuation,
      delta: summary.deltas.valuation,
      positive: summary.positive.valuation,
      note: '0% platform take',
      icon: 'payments',
      spark: points.map((p) => p.views * 3.4),
    },
    {
      label: 'Inquiry Conversion',
      value: summary.conversion,
      delta: summary.deltas.conversion,
      positive: summary.positive.conversion,
      note: 'Target: 1.50%',
      icon: 'conversion_path',
      spark: points.map((p) => p.inquiries * 4),
    },
  ];

  const toneClass: Record<'dark' | 'accent' | 'muted' | 'outline', string> = {
    dark: 'bg-[#141413]',
    accent: 'bg-[#C25E3E]',
    muted: 'bg-[#716E68]',
    outline: 'bg-[#c9c6c4]',
  };

  const sortIndicator = (key: SortKey) => (sortKey === key ? (sortAsc ? 'arrow_upward' : 'arrow_downward') : 'unfold_more');

  return (
    <div className="w-full px-5 lg:px-12 py-8 max-w-[1440px] mx-auto space-y-8">
      {/* HEADER */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-[#E7E4DF] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-widest">Registry Telemetry // EV-8820</span>
            <span className="text-[#716E68]">/</span>
            <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold">Curatorial Analytics</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#141413]">Studio Audience & Provenance Insights</h1>
          <p className="font-sans text-sm text-[#56423d] max-w-2xl">
            How curators, collectors, and institutions traverse your archival registry.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white border border-[#E7E4DF] shadow-sm">
            {RANGE_ORDER.map((key) => (
              <button
                key={key}
                onClick={() => setRange(key)}
                className={`px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                  range === key ? 'bg-[#141413] text-white' : 'text-[#56423d] hover:bg-[#f5f3f0]'
                }`}
              >
                {RANGE_LABELS[key]}
              </button>
            ))}
          </div>
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 bg-[#efeeeb] hover:bg-[#e4e2df] transition-colors text-[#141413] py-2.5 px-4 font-sans text-xs uppercase tracking-wider cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </header>

      {/* KPI CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((k) => {
          const max = Math.max(...k.spark, 1);
          return (
            <div key={k.label} className="bg-white p-5 flex flex-col justify-between shadow-sm border border-[#E7E4DF]">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[#716E68]">
                  <span className="font-mono text-[10px] uppercase tracking-wider">{k.label}</span>
                  <span className="material-symbols-outlined text-[18px]">{k.icon}</span>
                </div>
                <p className="font-serif text-3xl text-[#141413]">{k.value}</p>
              </div>
              <div className="mt-4 flex items-end gap-1 h-8" aria-hidden="true">
                {k.spark.map((v, i) => (
                  <span
                    key={i}
                    className={`flex-1 ${i === k.spark.length - 1 ? 'bg-[#C25E3E]' : 'bg-[#eae8e5]'}`}
                    style={{ height: `${Math.max(12, (v / max) * 100)}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 pt-3 bg-[#f5f3f0] px-3 py-2 flex items-center justify-between border border-[#E7E4DF]">
                <span className="font-mono text-[11px] text-[#716E68]">{k.note}</span>
                <span className={`font-mono text-[10px] font-medium ${k.positive ? 'text-[#C25E3E]' : 'text-[#ba1a1a]'}`}>
                  {k.delta}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* TREND CHART */}
      <section className="bg-white shadow-sm border border-[#E7E4DF]">
        <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E7E4DF]">
          <div>
            <h3 className="font-serif text-xl text-[#141413]">Registry Traversal Trend</h3>
            <p className="font-mono text-[11px] text-[#716E68] uppercase tracking-wider mt-0.5">
              {METRIC_LABELS[metric]} · {RANGE_LABELS[range]} · {RANGE_CONTEXT[range]}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-[#FAF8F5] border border-[#E7E4DF]">
              {(Object.keys(METRIC_LABELS) as MetricKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setMetric(key)}
                  className={`px-3 py-2 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                    metric === key ? 'bg-[#141413] text-white' : 'text-[#56423d] hover:bg-[#efeeeb]'
                  }`}
                >
                  {METRIC_LABELS[key].split(' ')[METRIC_LABELS[key].split(' ').length - 1]}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={compare}
                onChange={(e) => setCompare(e.target.checked)}
                className="sr-only peer"
              />
              <span className="w-9 h-5 bg-[#e4e2df] relative transition-colors peer-checked:bg-[#141413] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#716E68]">Prior period</span>
            </label>
          </div>
        </div>

        <div className="p-5">
          <svg
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            className="w-full h-auto"
            role="img"
            aria-label={`${METRIC_LABELS[metric]} over ${RANGE_LABELS[range]}`}
            onMouseLeave={() => setHovered(null)}
          >
            <defs>
              <linearGradient id="analytics-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C25E3E" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#C25E3E" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Gridlines + y labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const y = PAD.t + t * chart.plotH;
              const value = chart.max - t * (chart.max - chart.min);
              return (
                <g key={t}>
                  <line x1={PAD.l} y1={y} x2={CHART_W - PAD.r} y2={y} stroke="#E7E4DF" strokeWidth="1" />
                  <text x={PAD.l - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#716E68" fontFamily="monospace">
                    {formatValue(Math.round(value))}
                  </text>
                </g>
              );
            })}

            {/* Prior period ghost */}
            {compare && (
              <polyline
                points={chart.ghost.join(' ')}
                fill="none"
                stroke="#716E68"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.7"
              />
            )}

            {/* Area + line */}
            <path d={chart.area} fill="url(#analytics-fill)" />
            <path d={chart.line} fill="none" stroke="#141413" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

            {/* Points + hover bands */}
            {chart.coords.map((c, i) => {
              const bandX = i === 0 ? PAD.l : c.x - chart.step / 2;
              const bandW = chart.step || (CHART_W - PAD.l - PAD.r);
              return (
                <g key={c.label}>
                  <rect
                    x={bandX}
                    y={PAD.t}
                    width={bandW}
                    height={chart.plotH}
                    fill="transparent"
                    onMouseEnter={() => setHovered(i)}
                    style={{ cursor: 'crosshair' }}
                  />
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={hovered === i ? 5 : 3}
                    fill={hovered === i ? '#C25E3E' : '#FAF8F5'}
                    stroke={hovered === i ? '#C25E3E' : '#141413'}
                    strokeWidth="2"
                  />
                  <text x={c.x} y={CHART_H - 10} textAnchor="middle" fontSize="10" fill="#716E68" fontFamily="monospace">
                    {c.label}
                  </text>
                </g>
              );
            })}

            {/* Tooltip */}
            {hovered !== null && (() => {
              const c = chart.coords[hovered];
              const tipW = 132;
              const tipX = Math.min(Math.max(c.x - tipW / 2, PAD.l), CHART_W - PAD.r - tipW);
              const tipY = Math.max(c.y - 52, PAD.t);
              return (
                <g style={{ pointerEvents: 'none' }}>
                  <line x1={c.x} y1={PAD.t} x2={c.x} y2={CHART_H - PAD.b} stroke="#C25E3E" strokeWidth="1" strokeDasharray="3 3" />
                  <rect x={tipX} y={tipY} width={tipW} height={42} fill="#141413" />
                  <text x={tipX + 10} y={tipY + 17} fontSize="10" fill="#a9a6a3" fontFamily="monospace">
                    {c.label}
                  </text>
                  <text x={tipX + 10} y={tipY + 33} fontSize="13" fill="#ffffff" fontFamily="monospace">
                    {c.value.toLocaleString()} {metric}
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>
      </section>

      {/* CHANNELS + GEOGRAPHY */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 shadow-sm space-y-4 border border-[#E7E4DF] lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-[#141413]">Provenance Traversal Channels</h3>
            <span className="font-mono text-[10px] uppercase text-[#716E68]">{RANGE_LABELS[range]}</span>
          </div>
          <div className="space-y-3.5">
            {CHANNELS.map((c) => (
              <div key={c.label}>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-[#141413]">{c.label}</span>
                  <span className="text-[#716E68]">{c.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#efeeeb]">
                  <div className={`h-full ${toneClass[c.tone]}`} style={{ width: `${c.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 shadow-sm space-y-4 border border-[#E7E4DF]">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-[#141413]">Collector Geography</h3>
            <span className="material-symbols-outlined text-[18px] text-[#716E68]">public</span>
          </div>
          <div className="space-y-3">
            {GEOGRAPHY.map((g) => (
              <div key={g.region} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between font-mono text-xs mb-1">
                    <span className="text-[#141413] truncate pr-2">{g.region}</span>
                    <span className="text-[#716E68] shrink-0">{g.share}%</span>
                  </div>
                  <div className="w-full h-1 bg-[#efeeeb]">
                    <div className="h-full bg-[#141413]" style={{ width: `${g.share}%` }} />
                  </div>
                </div>
                <span className="font-mono text-[11px] text-[#716E68] w-14 text-right shrink-0">{g.visits}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS TABLE + REFERRALS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-sm border border-[#E7E4DF] lg:col-span-2">
          <div className="p-5 flex items-center justify-between border-b border-[#E7E4DF]">
            <h3 className="font-serif text-lg text-[#141413]">Top Performing Works</h3>
            <span className="font-mono text-[10px] uppercase text-[#716E68]">Sort by column</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px]">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E7E4DF]">
                  {(
                    [
                      ['title', 'Artwork'],
                      ['views', 'Views'],
                      ['inquiries', 'Inquiries'],
                      ['saves', 'Saves'],
                      ['conversion', 'Conv.'],
                    ] as [SortKey, string][]
                  ).map(([key, label]) => (
                    <th key={key} className={`px-5 py-3 ${key === 'title' ? 'text-left' : 'text-right'}`}>
                      <button
                        onClick={() => toggleSort(key)}
                        className="font-mono text-[10px] uppercase tracking-wider text-[#716E68] hover:text-[#141413] transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        {label}
                        <span className="material-symbols-outlined text-[12px]">{sortIndicator(key)}</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#efeeeb]">
                {sortedWorks.map((w) => (
                  <tr key={w.title} className="hover:bg-[#f5f3f0] transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="font-serif text-sm text-[#141413] block">{w.title}</span>
                      <span className="font-mono text-[11px] text-[#716E68]">{w.medium}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs text-[#141413]">{w.views.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs text-[#141413]">{w.inquiries}</td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs text-[#141413]">{w.saves}</td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs text-[#C25E3E]">{w.conversion.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 shadow-sm border border-[#E7E4DF] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg text-[#141413]">Institutional Referrals</h3>
              <span className="material-symbols-outlined text-[18px] text-[#716E68]">account_balance</span>
            </div>
            {REFERRALS.map((r) => (
              <div key={r.source} className="flex items-center justify-between gap-3 pb-2 border-b border-[#efeeeb] last:border-b-0 last:pb-0">
                <div className="min-w-0">
                  <span className="font-sans text-xs text-[#141413] block truncate">{r.source}</span>
                  <span className="font-mono text-[10px] uppercase text-[#716E68]">{r.type}</span>
                </div>
                <span className="font-mono text-xs text-[#141413] shrink-0">{r.visits}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#efeeeb] p-5 shadow-sm border border-[#E7E4DF] space-y-2">
            <div className="flex items-center gap-1.5 text-[#C25E3E]">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Curatorial Recommendation</span>
            </div>
            <p className="font-sans text-sm text-[#141413] leading-relaxed">
              Collector inquiries are up {summary.deltas.inquiries} for {RANGE_LABELS[range]}. Works with a high-zoom
              macro crop convert <strong className="font-semibold">34% better</strong> — add one to{' '}
              <strong className="font-semibold">Erosion Bowl II</strong>.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#716E68]">Insight #412</span>
              <span className="font-mono text-[11px] text-[#716E68]">Storage: {summary.storage}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnalyticsDashboard;
