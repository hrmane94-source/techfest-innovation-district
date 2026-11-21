import { useDistrict, DISTRICT_ORDER, DISTRICT_DATA } from '../../context';

export function GuidedTourPill() {
  const {
    selectedDistrict,
    selectDistrict,
    nextDistrict,
    prevDistrict,
    resetToOverview,
    isTourActive,
    toggleTour,
  } = useDistrict();

  const currentIdx = DISTRICT_ORDER.indexOf(selectedDistrict);

  return (
    <nav
      aria-label="City Tour Controls"
      className="pointer-events-auto absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 rounded-full border border-white/20 bg-[#081120]/90 px-4 sm:px-5 py-2.5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.65)] font-mono text-xs transition-all duration-300"
    >
      {/* Tour Status Toggle */}
      <button
        type="button"
        onClick={() => toggleTour()}
        className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all cursor-pointer ${
          isTourActive
            ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
            : 'border-white/10 bg-white/5 text-[#94A3B8] hover:text-white'
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            isTourActive ? 'bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] animate-pulse' : 'bg-slate-500'
          }`}
        />
        <span className="hidden sm:inline">{isTourActive ? 'TOUR ACTIVE' : 'GUIDED TOUR'}</span>
        <span className="sm:hidden">TOUR</span>
      </button>

      {/* Prev Button */}
      <button
        type="button"
        onClick={prevDistrict}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-pointer"
        aria-label="Previous District"
      >
        &lt;
      </button>

      {/* Step Indicator Dots */}
      <div className="flex items-center gap-1.5 px-1 sm:px-2">
        {DISTRICT_ORDER.map((id) => {
          const isActive = selectedDistrict === id;
          const details = DISTRICT_DATA[id];
          return (
            <button
              key={`tour-dot-${id}`}
              type="button"
              onClick={() => selectDistrict(id)}
              className={`group relative flex items-center justify-center p-1 cursor-pointer transition-transform ${
                isActive ? 'scale-110' : 'opacity-50 hover:opacity-100'
              }`}
              title={details.title}
            >
              <span
                className={`block h-2 sm:h-2.5 rounded-full transition-all ${
                  isActive
                    ? 'w-6 sm:w-7 shadow-lg'
                    : 'w-2 sm:w-2.5 group-hover:scale-125'
                }`}
                style={{
                  backgroundColor: isActive ? details.accentColor : '#475569',
                  boxShadow: isActive ? `0 0 12px ${details.accentColor}` : 'none',
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={nextDistrict}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-pointer"
        aria-label="Next District"
      >
        &gt;
      </button>

      {/* Step Counter */}
      <span className="hidden md:inline pl-2 text-[10px] text-[#94A3B8] border-l border-white/10">
        STEP {String(currentIdx + 1).padStart(2, '0')}/06
      </span>

      {/* Quick Overview Reset */}
      {selectedDistrict !== 'overview' && (
        <button
          type="button"
          onClick={resetToOverview}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-cyan-400 hover:bg-cyan-500/15 transition-colors cursor-pointer text-[10px]"
        >
          RESET
        </button>
      )}
    </nav>
  );
}
