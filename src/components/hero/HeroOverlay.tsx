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
      className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-6 sm:pb-8 w-full h-full transition-opacity duration-700 font-sans"
    >
      {/* ── 1. CINEMATIC HERO EDITORIAL HUD PANEL (Top-Left Architectural Card) ── */}
      <div className="max-w-md lg:max-w-lg p-5 sm:p-6 rounded-2xl bg-[#081325]/85 backdrop-blur-md border border-white/12 shadow-[0_12px_40px_rgba(0,0,0,0.5)] pointer-events-auto space-y-4 animate-in fade-in slide-in-from-left-4 duration-700">
        {/* Identity Kicker Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/40 shadow-[0_0_16px_rgba(0,229,255,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-cyan-300 uppercase">
            TECHFEST • IIT BOMBAY
          </span>
        </div>

        {/* Monumental Headline */}
        <div className="space-y-1">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight text-white drop-shadow-md">
            THE UNIVERSITY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              OF TOMORROW
            </span>
          </h1>
          <p className="font-mono text-xs sm:text-sm font-medium text-cyan-400/90 tracking-wide uppercase">
            Where Ideas Become The Future
          </p>
        </div>

        {/* Supporting Copy */}
        <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
          An interconnected 280-meter futuristic campus uniting six master academic districts with authentic NASA space exploration exhibits at Techfest IIT Bombay.
        </p>

        {/* CTA Button Row */}
        <div className="pt-1 flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onExploreClick}
            className="group relative overflow-hidden px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 font-display font-bold text-xs text-white tracking-wider uppercase shadow-[0_0_24px_rgba(0,229,255,0.4)] hover:shadow-[0_0_36px_rgba(0,229,255,0.65)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>EXPLORE CAMPUS</span>
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
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
            className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm font-mono text-xs font-semibold text-[#F8FAFC] hover:border-cyan-400/60 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>GUIDED TOUR</span>
          </button>
        </div>

        {/* Quick Master District Tags */}
        <div className="pt-1 border-t border-white/10 flex flex-wrap items-center gap-1.5 font-mono text-[9px] text-[#94A3B8]">
          <span className="uppercase text-slate-400 mr-0.5">Districts:</span>
          <button
            type="button"
            onClick={() => {
              selectDistrict('core');
              onExploreClick();
            }}
            className="px-1.5 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/25 cursor-pointer"
          >
            A: Innovation
          </button>
          <button
            type="button"
            onClick={() => {
              selectDistrict('academic');
              onExploreClick();
            }}
            className="px-1.5 py-0.5 rounded bg-sky-500/15 border border-sky-500/30 text-sky-300 hover:text-white hover:bg-sky-500/25 cursor-pointer"
          >
            B: Academic
          </button>
          <button
            type="button"
            onClick={() => {
              selectDistrict('research');
              onExploreClick();
            }}
            className="px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-500/25 cursor-pointer"
          >
            C: Research
          </button>
          <button
            type="button"
            onClick={() => {
              selectDistrict('student-life');
              onExploreClick();
            }}
            className="px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-amber-500/25 cursor-pointer"
          >
            D: Student
          </button>
          <button
            type="button"
            onClick={() => {
              selectDistrict('knowledge');
              onExploreClick();
            }}
            className="px-1.5 py-0.5 rounded bg-sky-500/15 border border-sky-500/30 text-sky-300 hover:text-white hover:bg-sky-500/25 cursor-pointer"
          >
            E: Knowledge
          </button>
          <button
            type="button"
            onClick={() => {
              selectDistrict('recreation');
              onExploreClick();
            }}
            className="px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-500/25 cursor-pointer"
          >
            F: Recreation
          </button>
        </div>
      </div>

      {/* ── 2. HERO BOTTOM METRIC TICKER & SCROLL PROMPT ── */}
      <div className="pointer-events-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-4 p-3 sm:p-4 rounded-xl bg-[#081325]/80 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full md:w-auto font-mono">
          <div className="border-l-2 border-cyan-400 pl-3">
            <div className="font-display font-bold text-base sm:text-lg text-white">68M</div>
            <div className="text-[9px] uppercase tracking-wider text-[#94A3B8]">Central Landmark Apex</div>
          </div>
          <div className="border-l-2 border-sky-400 pl-3">
            <div className="font-display font-bold text-base sm:text-lg text-white">06</div>
            <div className="text-[9px] uppercase tracking-wider text-[#94A3B8]">Master Districts</div>
          </div>
          <div className="border-l-2 border-blue-400 pl-3">
            <div className="font-display font-bold text-base sm:text-lg text-white">280M</div>
            <div className="text-[9px] uppercase tracking-wider text-[#94A3B8]">Master Campus Territory</div>
          </div>
          <div className="border-l-2 border-amber-400 pl-3">
            <div className="font-display font-bold text-base sm:text-lg text-white">160+</div>
            <div className="text-[9px] uppercase tracking-wider text-[#94A3B8]">Living Campus Population</div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="hidden md:flex items-center gap-3 text-right font-mono text-xs text-[#94A3B8]">
          <div>
            <span className="block font-semibold text-white">SCROLL TO TOUR CAMPUS</span>
            <span className="text-[10px] text-cyan-400">EXPLORE DEPARTMENTS & FACILITIES</span>
          </div>
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <span className="h-2 w-1 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
