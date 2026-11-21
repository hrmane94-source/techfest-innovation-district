import { useDistrict } from '../../context';

export function DistrictInfoDrawer() {
  const {
    selectedDistrict,
    selectedDetails,
    resetToOverview,
    nextDistrict,
    prevDistrict,
    selectDistrict,
  } = useDistrict();

  if (selectedDistrict === 'overview') {
    return null;
  }

  return (
    <aside
      aria-label={`${selectedDetails.title} Information Drawer`}
      className="pointer-events-auto absolute right-3 sm:right-8 top-20 sm:top-24 bottom-20 sm:bottom-24 z-30 flex w-[calc(100vw-24px)] sm:w-[410px] flex-col overflow-hidden rounded-3xl border border-white/20 bg-[#081120]/90 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-300 font-sans animate-in fade-in slide-in-from-right-6 duration-300"
    >
      {/* ── 1. HEADER: BADGE, TITLE & DISMISS ── */}
      <div className="flex items-start justify-between border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full shadow-lg"
              style={{
                backgroundColor: selectedDetails.accentColor,
                boxShadow: `0 0 12px ${selectedDetails.accentColor}`,
              }}
            />
            <span
              className="font-mono text-xs font-bold tracking-widest uppercase"
              style={{ color: selectedDetails.accentColor }}
            >
              {selectedDetails.code}
            </span>
          </div>
          <h2 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-white font-display">
            {selectedDetails.title}
          </h2>
          <p className="font-mono text-[11px] tracking-wider text-[#94A3B8]">
            {selectedDetails.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={resetToOverview}
          className="rounded-full p-2 text-[#94A3B8] transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          aria-label="Close panel"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── 2. SCROLLABLE DETAILS BODY ── */}
      <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1 text-sm text-[#CBD5E1] scrollbar-thin">
        {/* Research Overview */}
        <div>
          <h3 className="font-mono text-[10px] font-bold tracking-widest uppercase text-cyan-400 flex items-center gap-1.5">
            <span className="h-1 w-1 bg-cyan-400 rounded-full" />
            RESEARCH FOCUS & ARCHITECTURE
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
            {selectedDetails.description}
          </p>
        </div>

        {/* Technical Stats Grid */}
        {selectedDetails.stats && (
          <div className="grid grid-cols-2 gap-2.5 pt-1 font-mono">
            {selectedDetails.stats.map((stat, idx) => (
              <div
                key={`stat-${idx}`}
                className="rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-md"
              >
                <div className="text-[9px] uppercase tracking-wider text-[#94A3B8]">
                  {stat.label}
                </div>
                <div
                  className="mt-1 text-xs font-bold text-white"
                  style={{ color: selectedDetails.accentColor }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Key Installations (Highlighted NASA models & facilities) */}
        <div>
          <h3 className="font-mono text-[10px] font-bold tracking-widest uppercase text-cyan-400 flex items-center gap-1.5">
            <span className="h-1 w-1 bg-cyan-400 rounded-full" />
            KEY INSTALLATIONS & 3D ASSETS
          </h3>
          <ul className="mt-2 space-y-2 font-mono text-xs">
            {selectedDetails.keyInstallations.map((item, idx) => {
              const isNasa = item.includes('NASA') || item.includes('James Webb');
              return (
                <li
                  key={`inst-${idx}`}
                  className={`flex items-start gap-2.5 rounded-xl p-2.5 border transition-all ${
                    isNasa
                      ? 'border-cyan-400/40 bg-cyan-500/10 text-white shadow-[0_0_16px_rgba(0,229,255,0.15)]'
                      : 'border-white/10 bg-white/5 text-[#CBD5E1]'
                  }`}
                >
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span className="leading-snug">{item}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Core Facilities */}
        <div>
          <h3 className="font-mono text-[10px] font-bold tracking-widest uppercase text-cyan-400 flex items-center gap-1.5">
            <span className="h-1 w-1 bg-cyan-400 rounded-full" />
            RESEARCH FACILITIES
          </h3>
          <ul className="mt-2 space-y-1.5 font-mono text-[11px] text-[#94A3B8]">
            {selectedDetails.facilities.map((fac, idx) => (
              <li key={`fac-${idx}`} className="flex items-center gap-2">
                <span className="text-cyan-400">//</span>
                <span>{fac}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── 3. CONTROLS FOOTER ── */}
      <div className="border-t border-white/10 pt-4 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={prevDistrict}
            className="flex-1 py-2.5 rounded-xl border border-white/15 bg-white/5 font-mono text-xs font-semibold text-white transition-colors hover:border-cyan-400 hover:text-cyan-400 cursor-pointer text-center"
          >
            &lt; PREV
          </button>
          <button
            type="button"
            onClick={() => selectDistrict(selectedDistrict)}
            className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 font-mono text-xs text-[#94A3B8] hover:text-white cursor-pointer"
            title="Center view"
          >
            FOCUS
          </button>
          <button
            type="button"
            onClick={nextDistrict}
            className="flex-1 py-2.5 rounded-xl border border-white/15 bg-white/5 font-mono text-xs font-semibold text-white transition-colors hover:border-cyan-400 hover:text-cyan-400 cursor-pointer text-center"
          >
            NEXT &gt;
          </button>
        </div>

        <button
          type="button"
          onClick={resetToOverview}
          className="w-full py-2.5 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-blue-600/30 font-mono text-xs font-bold tracking-wider text-cyan-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer uppercase shadow-[0_0_16px_rgba(0,229,255,0.2)] text-center"
        >
          RETURN TO CITY OVERVIEW
        </button>
      </div>
    </aside>
  );
}
