import { useDistrict } from '../../context';

export interface HeroOverlayProps {
  onExploreClick: () => void;
  onDiscoverClick?: () => void;
  isExploreMode: boolean;
}

export function HeroOverlay({
  onExploreClick,
  onDiscoverClick,
  isExploreMode,
}: HeroOverlayProps) {
  const { selectDistrict, toggleTour } = useDistrict();

  if (isExploreMode) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-28 sm:pt-36 pb-8 sm:pb-12 max-w-7xl mx-auto w-full transition-opacity duration-700 font-sans"
    >
      {/* ── 1. CINEMATIC HERO EDITORIAL CONTENT ── */}
      <div className="max-w-2xl lg:max-w-3xl space-y-5 sm:space-y-6 pointer-events-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
        {/* Identity Kicker Badge */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-[#091426]/80 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-cyan-300 uppercase">
            TECHFEST 2026 • IIT BOMBAY • ASIA&apos;S LARGEST TECH FESTIVAL
          </span>
        </div>

        {/* Monumental Headline */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-gradient-pearl drop-shadow-2xl">
          WHERE THE FUTURE <br />
          <span className="text-gradient-cyan">TAKES SHAPE.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-sm sm:text-base lg:text-lg text-[#CBD5E1] font-normal leading-relaxed max-w-xl drop-shadow-md">
          Step into India&apos;s premier innovation ecosystem. An autonomous 3D architectural city where quantum artificial intelligence, deep-space telemetry, and advanced planetary robotics converge.
        </p>

        {/* CTA Button Row */}
        <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
          <button
            type="button"
            onClick={onExploreClick}
            className="group relative overflow-hidden px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 font-display font-bold text-xs sm:text-sm text-white tracking-widest uppercase shadow-[0_0_32px_rgba(0,229,255,0.4)] hover:shadow-[0_0_48px_rgba(0,229,255,0.7)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <span>EXPLORE THE INNOVATION DISTRICT</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onDiscoverClick) {
                onDiscoverClick();
              } else {
                toggleTour(true);
                onExploreClick();
              }
            }}
            className="px-5 sm:px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md font-mono text-xs font-semibold text-[#F8FAFC] hover:border-cyan-400/60 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-lg"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>DISCOVER TECHFEST</span>
          </button>
        </div>

        {/* Quick Sector Tags */}
        <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-[10px] text-[#94A3B8]">
          <span className="uppercase text-slate-400">Featured Sectors:</span>
          <button
            type="button"
            onClick={() => {
              selectDistrict('ai');
              onExploreClick();
            }}
            className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-500/20 cursor-pointer"
          >
            Quantum AI
          </button>
          <button
            type="button"
            onClick={() => {
              selectDistrict('robotics');
              onExploreClick();
            }}
            className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-amber-500/20 cursor-pointer"
          >
            NASA Rover Testbed
          </button>
          <button
            type="button"
            onClick={() => {
              selectDistrict('aerospace');
              onExploreClick();
            }}
            className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/20 cursor-pointer"
          >
            NASA 70m Dish & JWST
          </button>
        </div>
      </div>

      {/* ── 2. HERO BOTTOM METRIC TICKER & SCROLL PROMPT ── */}
      <div className="pointer-events-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-t border-white/10 pt-4 sm:pt-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full md:w-auto font-mono">
          <div className="border-l-2 border-cyan-400 pl-3">
            <div className="font-display font-bold text-lg sm:text-xl text-white">68M</div>
            <div className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Structural Apex</div>
          </div>
          <div className="border-l-2 border-blue-500 pl-3">
            <div className="font-display font-bold text-lg sm:text-xl text-white">04</div>
            <div className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Research Sectors</div>
          </div>
          <div className="border-l-2 border-cyan-400 pl-3">
            <div className="font-display font-bold text-lg sm:text-xl text-white">03</div>
            <div className="text-[10px] uppercase tracking-wider text-[#94A3B8]">NASA Mission Assets</div>
          </div>
          <div className="border-l-2 border-amber-400 pl-3">
            <div className="font-display font-bold text-lg sm:text-xl text-white">36.1K</div>
            <div className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Ecosystem m²</div>
          </div>
        </div>

        {/* 3D Interaction Hint */}
        <div className="hidden lg:flex items-center gap-3 text-right font-mono text-[10px] text-[#94A3B8]">
          <div className="flex flex-col items-end">
            <span className="text-white font-medium">3D INTERACTIVE ENGINE</span>
            <span>DRAG TO ORBIT • CLICK ARCHITECTURE</span>
          </div>
          <div className="h-8 w-5 rounded-full border border-white/20 flex items-start justify-center p-1">
            <span className="h-1.5 w-1 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
