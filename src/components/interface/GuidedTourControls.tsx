import { useDistrict, DISTRICT_ORDER, DISTRICT_DATA } from '../../context';

/**
 * GuidedTourControls — Non-intrusive interactive tour bar allowing linear and random-access
 * navigation across the 6 major innovation landmarks (Milestone 3.0)
 */
export function GuidedTourControls() {
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
      className="pointer-events-auto absolute bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2.5 rounded-full border border-[rgba(57,221,244,0.2)] bg-[#050A14]/85 px-3 sm:px-4 py-2 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.6)] font-mono text-[10px]"
    >
      {/* Tour Status Toggle */}
      <button
        type="button"
        onClick={() => toggleTour()}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
          isTourActive
            ? 'border-[#39DDF4] bg-[#39DDF4]/20 text-[#39DDF4] font-bold'
            : 'border-[rgba(57,221,244,0.2)] bg-[#091426] text-[#8A99AD] hover:text-[#F4F7FC]'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isTourActive ? 'bg-[#39DDF4] shadow-[0_0_8px_#39DDF4] animate-pulse' : 'bg-[#8A99AD]'
          }`}
        />
        <span className="hidden sm:inline">{isTourActive ? 'TOUR ACTIVE' : 'START TOUR'}</span>
        <span className="sm:hidden">{isTourActive ? 'TOUR' : 'TOUR'}</span>
      </button>

      {/* Prev Button */}
      <button
        type="button"
        onClick={prevDistrict}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(57,221,244,0.2)] bg-[#091426] text-[#F4F7FC] hover:border-[#39DDF4] hover:text-[#39DDF4] transition-colors cursor-pointer"
        aria-label="Previous District"
      >
        &lt;
      </button>

      {/* Interactive Step Indicator Dots & Labels */}
      <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2">
        {DISTRICT_ORDER.map((id) => {
          const isActive = selectedDistrict === id;
          const details = DISTRICT_DATA[id];
          return (
            <button
              key={`tour-dot-${id}`}
              type="button"
              onClick={() => selectDistrict(id)}
              className={`group relative flex items-center justify-center p-1 cursor-pointer transition-transform ${
                isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'
              }`}
              title={details.title}
            >
              <span
                className={`block h-2 sm:h-2.5 rounded-full transition-all ${
                  isActive
                    ? 'w-5 sm:w-6 shadow-[0_0_8px]'
                    : 'w-2 sm:w-2.5 group-hover:scale-125'
                }`}
                style={{
                  backgroundColor: isActive ? details.accentColor : '#4A5B73',
                  boxShadow: isActive ? `0 0 10px ${details.accentColor}` : 'none',
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
        className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(57,221,244,0.2)] bg-[#091426] text-[#F4F7FC] hover:border-[#39DDF4] hover:text-[#39DDF4] transition-colors cursor-pointer"
        aria-label="Next District"
      >
        &gt;
      </button>

      {/* Current Step Readout */}
      <span className="hidden md:inline pl-1 text-[9px] text-[#8A99AD] border-l border-[rgba(57,221,244,0.15)] pl-2">
        STEP {String(currentIdx + 1).padStart(2, '0')}/06
      </span>

      {/* Quick Overview Reset */}
      {selectedDistrict !== 'overview' && (
        <button
          type="button"
          onClick={resetToOverview}
          className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full border border-[rgba(57,221,244,0.2)] bg-[#091426] text-[#39DDF4] hover:bg-[#39DDF4]/20 transition-colors cursor-pointer text-[9px]"
        >
          RESET
        </button>
      )}
    </nav>
  );
}
