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
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-[#091426]/85 backdrop-blur-md shadow-[0_0_24px_rgba(0,229,255,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-cyan-300 uppercase">
            TECHFEST • THE UNIVERSITY OF TOMORROW • IIT BOMBAY
          </span>
        </div>

        {/* Monumental Headline */}
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-gradient-pearl drop-shadow-2xl">
          TECHFEST <br />
          <span className="text-gradient-cyan">WHERE IDEAS BECOME THE FUTURE.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-sm sm:text-base lg:text-lg text-[#CBD5E1] font-normal leading-relaxed max-w-xl drop-shadow-md">
          Explore a living innovation ecosystem where research, technology, creativity and human imagination converge across six master-planned districts at the University of Tomorrow.
        </p>

        {/* CTA Button Row */}
        <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
          <button
            type="button"
            onClick={onExploreClick}
            className="group relative overflow-hidden px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 font-display font-bold text-xs sm:text-sm text-white tracking-widest uppercase shadow-[0_0_32px_rgba(0,229,255,0.4)] hover:shadow-[0_0_48px_rgba(0,229,255,0.7)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <span>EXPLORE CAMPUS</span>
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
            <span>CAMPUS GUIDED TOUR</span>
          </button>
        </div>

        {/* Quick Master District Tags */}
        <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-[10px] text-[#94A3B8]">
          <span className="uppercase text-slate-400">Campus Districts:</span>
          <button
            type="button"
            onClick={() => {
              selectDistrict('core');
              onExploreClick();
            }}
            className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/20 cursor-pointer"
          >
            DIST-A // Central Innovation
          </button>
          <button
            type="button"
            onClick={() => {
              selectDistrict('academic');
              onExploreClick();
            }}
            className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300 hover:text-white hover:bg-sky-500/20 cursor-pointer"
          >
            DIST-B // Academic
          </button>
          <button
            type="button"
            onClick={() => {
              selectDistrict('research');
              onExploreClick();
            }}
            className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-500/20 cursor-pointer"
          >
            DIST-C // Advanced Research
          </button>
          <button
            type="button"
            onClick={() => {
              selectDistrict('student-life');
              onExploreClick();
            }}
            className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-amber-500/20 cursor-pointer"
          >
            DIST-D // Student Life
          </button>
          <button
            type="button"
            onClick={() => {
              selectDistrict('knowledge');
              onExploreClick();
            }}
            className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300 hover:text-white hover:bg-sky-500/20 cursor-pointer"
          >
            DIST-E // Knowledge
          </button>
          <button
            type="button"
            onClick={() => {
              selectDistrict('recreation');
              onExploreClick();
            }}
            className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-500/20 cursor-pointer"
          >
            DIST-F // Recreation
          </button>
        </div>
      </div>

      {/* ── 2. HERO BOTTOM METRIC TICKER & SCROLL PROMPT ── */}
      <div className="pointer-events-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-t border-white/10 pt-4 sm:pt-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full md:w-auto font-mono">
          <div className="border-l-2 border-cyan-400 pl-3">
            <div className="font-display font-bold text-lg sm:text-xl text-white">68M</div>
            <div className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Central Landmark Apex</div>
          </div>
          <div className="border-l-2 border-sky-400 pl-3">
            <div className="font-display font-bold text-lg sm:text-xl text-white">06</div>
            <div className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Master Districts</div>
          </div>
          <div className="border-l-2 border-blue-400 pl-3">
            <div className="font-display font-bold text-lg sm:text-xl text-white">280M</div>
            <div className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Master Campus Territory</div>
          </div>
          <div className="border-l-2 border-amber-400 pl-3">
            <div className="font-display font-bold text-lg sm:text-xl text-white">160+</div>
            <div className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Living Campus Population</div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="hidden md:flex items-center gap-3 text-right font-mono text-xs text-[#94A3B8]">
          <div>
            <span className="block font-semibold text-white">SCROLL TO TOUR CAMPUS</span>
            <span className="text-[10px] text-cyan-400">EXPLORE DEPARTMENTS & FACILITIES</span>
          </div>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
            <span className="h-2 w-1 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
