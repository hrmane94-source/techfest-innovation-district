import { useState, useEffect, useRef, useCallback } from 'react';
import { useDistrict, DISTRICT_ORDER, DISTRICT_DATA } from '../../context';

const TOUR_STEP_DURATION_SEC = 7.5;

/**
 * GuidedTourPill — Cinematic Guided Tour Controller (Milestone 6: Ultimate Experience)
 * Features auto-advance choreography, play/pause controls, keyboard shortcuts, and direct district jump indicators.
 */
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

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100
  const progressIntervalRef = useRef<number | null>(null);
  const lastDistrictRef = useRef(selectedDistrict);

  // Reset progress asynchronously when district changes
  useEffect(() => {
    if (lastDistrictRef.current !== selectedDistrict) {
      lastDistrictRef.current = selectedDistrict;
      const timer = window.setTimeout(() => setProgress(0), 0);
      return () => window.clearTimeout(timer);
    }
  }, [selectedDistrict]);

  const currentIdx = DISTRICT_ORDER.indexOf(selectedDistrict);
  const totalSteps = DISTRICT_ORDER.length;

  // Advance to next stop
  const handleAutoAdvance = useCallback(() => {
    nextDistrict();
    setProgress(0);
  }, [nextDistrict]);

  // Auto-play timer loop
  useEffect(() => {
    if (!isTourActive || !isPlaying) {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }

    const intervalMs = 100;
    const stepIncrement = (intervalMs / (TOUR_STEP_DURATION_SEC * 1000)) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleAutoAdvance();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isTourActive, isPlaying, handleAutoAdvance]);



  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight') {
        nextDistrict();
      } else if (e.key === 'ArrowLeft') {
        prevDistrict();
      } else if (e.key === ' ' && isTourActive) {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextDistrict, prevDistrict, isTourActive]);

  return (
    <nav
      aria-label="Cinematic Campus Tour Controls"
      className="pointer-events-auto fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 font-mono text-xs transition-all duration-300"
    >
      <div className="relative flex items-center gap-1.5 sm:gap-2.5 rounded-full border border-white/20 bg-[#081120]/92 px-3.5 sm:px-5 py-2 sm:py-2.5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
        {/* Tour Status & Play/Pause Toggle */}
        <button
          type="button"
          onClick={() => {
            if (!isTourActive) {
              toggleTour(true);
              setIsPlaying(true);
            } else {
              setIsPlaying((prev) => !prev);
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer ${
            isTourActive
              ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold shadow-[0_0_14px_rgba(0,229,255,0.35)]'
              : 'border-white/10 bg-white/5 text-[#94A3B8] hover:text-white'
          }`}
          title={isTourActive ? (isPlaying ? 'Pause auto-play' : 'Resume auto-play') : 'Start Guided Tour'}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isTourActive
                ? isPlaying
                  ? 'bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] animate-pulse'
                  : 'bg-amber-400'
                : 'bg-slate-500'
            }`}
          />
          <span className="text-[11px]">
            {!isTourActive ? 'START TOUR' : isPlaying ? 'PLAYING' : 'PAUSED'}
          </span>
        </button>

        {/* Prev Stop Button */}
        <button
          type="button"
          onClick={prevDistrict}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-pointer text-sm"
          aria-label="Previous District Stop"
          title="Previous stop (ArrowLeft)"
        >
          &lt;
        </button>

        {/* Interactive Step Indicator Dots & Jump Links */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2">
          {DISTRICT_ORDER.map((id, idx) => {
            const isActive = selectedDistrict === id;
            const details = DISTRICT_DATA[id];
            return (
              <button
                key={`tour-dot-${id}`}
                type="button"
                onClick={() => {
                  selectDistrict(id);
                  setProgress(0);
                }}
                className={`group relative flex items-center justify-center p-1 cursor-pointer transition-transform ${
                  isActive ? 'scale-110' : 'opacity-45 hover:opacity-100'
                }`}
                title={`Stop ${idx + 1}: ${details.title}`}
                aria-label={`Jump to stop ${idx + 1}: ${details.name}`}
              >
                <span
                  className={`block h-2 sm:h-2.5 rounded-full transition-all ${
                    isActive
                      ? 'w-5 sm:w-7 shadow-lg'
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

        {/* Next Stop Button */}
        <button
          type="button"
          onClick={nextDistrict}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-pointer text-sm"
          aria-label="Next District Stop"
          title="Next stop (ArrowRight)"
        >
          &gt;
        </button>

        {/* Dynamic Step Counter */}
        <span className="hidden md:inline pl-2 text-[10px] text-[#94A3B8] border-l border-white/10">
          STOP {String(currentIdx + 1).padStart(2, '0')}/{String(totalSteps).padStart(2, '0')}
        </span>

        {/* Quick Exit / Reset */}
        {selectedDistrict !== 'overview' && (
          <button
            type="button"
            onClick={resetToOverview}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-cyan-400 hover:bg-cyan-500/15 transition-colors cursor-pointer text-[9px]"
            title="Return to aerial overview"
          >
            OVERVIEW
          </button>
        )}

        {/* Close/Exit Tour */}
        {isTourActive && (
          <button
            type="button"
            onClick={() => toggleTour(false)}
            className="text-[#94A3B8] hover:text-white px-1.5 py-0.5 text-xs transition-colors cursor-pointer"
            title="Exit guided tour and explore freely"
            aria-label="Exit tour"
          >
            ✕
          </button>
        )}
      </div>

      {/* Auto-Advance Countdown Progress Bar */}
      {isTourActive && isPlaying && (
        <div className="w-36 sm:w-48 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </nav>
  );
}

export default GuidedTourPill;
