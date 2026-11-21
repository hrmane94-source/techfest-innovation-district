import { useDistrict } from '../../context';

/**
 * DistrictInfoPanel — Premium slide-in architectural information panel (Milestone 3.0)
 *
 * Displays rich technical telemetry, research focus, facilities, and key NASA installations
 * for the currently active district or landmark.
 */
export function DistrictInfoPanel() {
  const {
    selectedDistrict,
    selectedDetails,
    resetToOverview,
    nextDistrict,
    prevDistrict,
    selectDistrict,
  } = useDistrict();

  // If viewing the general overview, panel remains hidden or compact
  if (selectedDistrict === 'overview') {
    return null;
  }

  return (
    <aside
      aria-label={`${selectedDetails.title} Information Panel`}
      className="pointer-events-auto absolute right-3 sm:right-6 top-20 sm:top-24 bottom-16 sm:bottom-20 z-30 flex w-[calc(100vw-24px)] sm:w-96 flex-col overflow-hidden rounded-2xl border border-[rgba(57,221,244,0.22)] bg-[#050A14]/90 p-5 shadow-[0_12px_48px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 font-sans"
    >
      {/* ── 1. HEADER: CODE BADGE, TITLE & CLOSE BUTTON ── */}
      <div className="flex items-start justify-between border-b border-[rgba(57,221,244,0.12)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full shadow-[0_0_8px]"
              style={{
                backgroundColor: selectedDetails.accentColor,
                boxShadow: `0 0 10px ${selectedDetails.accentColor}`,
              }}
            />
            <span
              className="font-mono text-[10px] font-bold tracking-widest uppercase"
              style={{ color: selectedDetails.accentColor }}
            >
              {selectedDetails.code}
            </span>
          </div>
          <h2 className="mt-1 text-base sm:text-lg font-bold tracking-wide text-[#F4F7FC]">
            {selectedDetails.title}
          </h2>
          <p className="font-mono text-[10px] tracking-wider text-[#8A99AD]">
            {selectedDetails.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={resetToOverview}
          className="rounded-lg p-1.5 text-[#8A99AD] transition-colors hover:bg-[#091426] hover:text-[#39DDF4] cursor-pointer"
          aria-label="Close panel and return to overview"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── 2. SCROLLABLE CONTENT BODY ── */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-sm text-[#C2D0E2] scrollbar-thin">
        {/* Research Overview */}
        <div>
          <h3 className="font-mono text-[10px] font-bold tracking-widest uppercase text-[#39DDF4] flex items-center gap-1.5">
            <span className="h-1 w-1 bg-[#39DDF4] rounded-full" />
            RESEARCH FOCUS & ARCHITECTURE
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[#9EB0C7]">
            {selectedDetails.description}
          </p>
        </div>

        {/* Technical Stats Grid */}
        {selectedDetails.stats && (
          <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
            {selectedDetails.stats.map((stat, idx) => (
              <div
                key={`stat-${idx}`}
                className="rounded-lg border border-[rgba(57,221,244,0.12)] bg-[#091426]/70 p-2"
              >
                <div className="text-[9px] uppercase tracking-wider text-[#8A99AD]">
                  {stat.label}
                </div>
                <div
                  className="mt-0.5 text-[11px] font-bold"
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
          <h3 className="font-mono text-[10px] font-bold tracking-widest uppercase text-[#39DDF4] flex items-center gap-1.5">
            <span className="h-1 w-1 bg-[#39DDF4] rounded-full" />
            KEY INSTALLATIONS & 3D ASSETS
          </h3>
          <ul className="mt-2 space-y-1.5 font-mono text-[11px]">
            {selectedDetails.keyInstallations.map((item, idx) => {
              const isNasa = item.includes('NASA') || item.includes('James Webb');
              return (
                <li
                  key={`inst-${idx}`}
                  className={`flex items-start gap-2 rounded-lg p-2 border ${
                    isNasa
                      ? 'border-[#39DDF4]/30 bg-[#39DDF4]/10 text-[#F4F7FC]'
                      : 'border-[rgba(57,221,244,0.1)] bg-[#091426]/50 text-[#9EB0C7]'
                  }`}
                >
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#39DDF4]" />
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Core Facilities */}
        <div>
          <h3 className="font-mono text-[10px] font-bold tracking-widest uppercase text-[#39DDF4] flex items-center gap-1.5">
            <span className="h-1 w-1 bg-[#39DDF4] rounded-full" />
            RESEARCH FACILITIES
          </h3>
          <ul className="mt-2 space-y-1 font-mono text-[10px] text-[#8A99AD]">
            {selectedDetails.facilities.map((fac, idx) => (
              <li key={`fac-${idx}`} className="flex items-center gap-2">
                <span className="text-[#39DDF4]">//</span>
                <span>{fac}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── 3. FOOTER NAVIGATION CONTROLS ── */}
      <div className="border-t border-[rgba(57,221,244,0.12)] pt-3.5 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={prevDistrict}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-[rgba(57,221,244,0.2)] bg-[#091426] py-2 font-mono text-[10px] font-semibold text-[#F4F7FC] transition-colors hover:border-[#39DDF4] hover:text-[#39DDF4] cursor-pointer"
          >
            <span>&lt;</span> PREV
          </button>
          <button
            type="button"
            onClick={() => selectDistrict(selectedDistrict)}
            className="rounded-lg border border-[rgba(57,221,244,0.2)] bg-[#091426] px-3 py-2 font-mono text-[10px] text-[#8A99AD] hover:text-[#39DDF4] cursor-pointer"
            title="Re-center camera on district"
          >
            FOCUS
          </button>
          <button
            type="button"
            onClick={nextDistrict}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-[rgba(57,221,244,0.2)] bg-[#091426] py-2 font-mono text-[10px] font-semibold text-[#F4F7FC] transition-colors hover:border-[#39DDF4] hover:text-[#39DDF4] cursor-pointer"
          >
            NEXT <span>&gt;</span>
          </button>
        </div>

        <button
          type="button"
          onClick={resetToOverview}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#39DDF4]/40 bg-[#246BFD]/20 py-2 font-mono text-[10px] font-bold tracking-wider text-[#39DDF4] hover:bg-[#246BFD]/35 transition-colors cursor-pointer uppercase shadow-[0_0_12px_rgba(57,221,244,0.2)]"
        >
          RETURN TO CITY OVERVIEW
        </button>
      </div>
    </aside>
  );
}
