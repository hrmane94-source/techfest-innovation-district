import { useState, type ReactNode } from 'react';
import { useDistrict } from '../../context';
import { DistrictInfoPanel, GuidedTourControls } from '../interface';

export interface AppShellProps {
  children?: ReactNode;
  canvasSlot?: ReactNode;
}

/**
 * AppShell — High-tech HUD layer positioned over the procedural 3D city (Milestone 3.0 Interactive)
 *
 * Capabilities:
 * - Interactive District Matrix allowing instant camera teleportation & focus
 * - Slide-in technical telemetry & research information panel for active districts
 * - Non-obstructive bottom guided tour controller
 * - Fully responsive across mobile, tablet, and desktop monitors
 */
export function AppShell({ children, canvasSlot }: AppShellProps) {
  const [telemetryOpen, setTelemetryOpen] = useState(true);
  const {
    selectedDistrict,
    selectDistrict,
    resetToOverview,
    isTourActive,
    toggleTour,
  } = useDistrict();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050A14] text-[#F4F7FC] select-none font-sans">
      {/* ─────────────────────────────────────────────────────────────
          LAYER 0: 3D PROCEDURAL CITY CANVAS (PRIMARY VISUAL FOCUS)
      ────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {canvasSlot ?? children}
      </div>

      {/* Subtle Vignette Overlay for Cinematic Depth */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,10,20,0.6)_100%)]" 
        aria-hidden="true" 
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 1: INTERFACE OVERLAY (POINTER-EVENTS-NONE BY DEFAULT)
      ────────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-3 sm:p-6 lg:p-8">
        
        {/* TOP HUD HEADER */}
        <header className="pointer-events-auto flex items-center justify-between border border-[rgba(57,221,244,0.18)] bg-[#050A14]/80 px-4 sm:px-6 py-3 backdrop-blur-md rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39DDF4] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#39DDF4] shadow-[0_0_12px_#39DDF4]" />
            </div>
            <div>
              <h1 className="font-mono text-xs sm:text-sm font-bold tracking-[0.22em] text-[#F4F7FC] uppercase">
                TECHFEST <span className="text-[#39DDF4]">//</span> THE INNOVATION DISTRICT
              </h1>
              <p className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#8A99AD] hidden sm:block">
                IIT BOMBAY INNOVATION ECOSYSTEM • 3D INTERACTIVE MATRIX
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-wider text-[#8A99AD]">
            <button
              type="button"
              onClick={() => toggleTour()}
              className={`hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                isTourActive
                  ? 'border-[#39DDF4] bg-[#39DDF4]/20 text-[#39DDF4]'
                  : 'border-[rgba(57,221,244,0.2)] bg-[#091426]/70 hover:border-[#39DDF4]/60 text-[#8A99AD] hover:text-[#39DDF4]'
              }`}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#39DDF4]" />
              <span>{isTourActive ? 'TOUR MODE ON' : 'EXPLORE TOUR'}</span>
            </button>
            <span className="text-[rgba(57,221,244,0.3)] hidden md:inline">|</span>
            <span className="text-[#F4F7FC] font-semibold bg-[#246BFD]/20 px-2 py-0.5 rounded border border-[#246BFD]/30">
              M3.0 INTERACTIVE
            </span>
          </div>
        </header>

        {/* LEFT COMPACT TELEMETRY PANEL & DISTRICT SELECTOR */}
        <div className="pointer-events-auto mt-3 max-w-[280px] sm:max-w-xs self-start">
          <div className="rounded-xl border border-[rgba(57,221,244,0.18)] bg-[#050A14]/85 p-3.5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(57,221,244,0.1)]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#39DDF4] flex items-center gap-1.5 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#39DDF4]" />
                DISTRICT MATRIX
              </span>
              <button
                type="button"
                onClick={() => setTelemetryOpen((prev) => !prev)}
                className="font-mono text-[9px] text-[#8A99AD] hover:text-[#39DDF4] transition-colors cursor-pointer px-2 py-0.5 rounded bg-[#091426] border border-[rgba(57,221,244,0.12)]"
              >
                {telemetryOpen ? 'MINIMIZE' : 'EXPAND'}
              </button>
            </div>

            {telemetryOpen && (
              <div className="mt-2.5 space-y-2 font-mono text-[10px]">
                {/* Core Tower Button */}
                <button
                  type="button"
                  onClick={() => selectDistrict('core')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer text-left ${
                    selectedDistrict === 'core'
                      ? 'border-[#39DDF4] bg-[#39DDF4]/20 text-[#39DDF4] shadow-[0_0_12px_rgba(57,221,244,0.25)]'
                      : 'border-l-2 border-l-[#39DDF4] border-transparent bg-[#091426]/85 text-[#F4F7FC] hover:bg-[#091426]'
                  }`}
                >
                  <span className="font-semibold">CORE: TECHFEST TOWER</span>
                  <span className="text-[9px] text-[#39DDF4] font-bold">Y=68M APEX</span>
                </button>

                {/* 4 District Buttons */}
                <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                  <button
                    type="button"
                    onClick={() => selectDistrict('ai')}
                    className={`px-2 py-1.5 rounded-lg border transition-all text-left cursor-pointer ${
                      selectedDistrict === 'ai'
                        ? 'border-[#246BFD] bg-[#246BFD]/25 text-[#39DDF4] shadow-[0_0_12px_rgba(36,107,253,0.3)]'
                        : 'border-l border-l-[#246BFD] border-transparent bg-[#091426]/60 text-[#8A99AD] hover:text-[#F4F7FC] hover:bg-[#091426]/90'
                    }`}
                  >
                    <div className="text-[#F4F7FC] font-semibold">SEC-01: AI</div>
                    <div className="text-[8px] text-[#39DDF4]">Quantum Labs</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectDistrict('robotics')}
                    className={`px-2 py-1.5 rounded-lg border transition-all text-left cursor-pointer ${
                      selectedDistrict === 'robotics'
                        ? 'border-[#FF9B54] bg-[#FF9B54]/25 text-[#FF9B54] shadow-[0_0_12px_rgba(255,155,84,0.3)]'
                        : 'border-l border-l-[#FF9B54] border-transparent bg-[#091426]/60 text-[#8A99AD] hover:text-[#F4F7FC] hover:bg-[#091426]/90'
                    }`}
                  >
                    <div className="text-[#F4F7FC] font-semibold">SEC-02: ROBOTICS</div>
                    <div className="text-[8px] text-[#FF9B54]">NASA Rover Pad</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectDistrict('aerospace')}
                    className={`px-2 py-1.5 rounded-lg border transition-all text-left cursor-pointer ${
                      selectedDistrict === 'aerospace'
                        ? 'border-[#39DDF4] bg-[#39DDF4]/25 text-[#39DDF4] shadow-[0_0_12px_rgba(57,221,244,0.3)]'
                        : 'border-l border-l-[#39DDF4] border-transparent bg-[#091426]/60 text-[#8A99AD] hover:text-[#F4F7FC] hover:bg-[#091426]/90'
                    }`}
                  >
                    <div className="text-[#F4F7FC] font-semibold">SEC-03: AERO</div>
                    <div className="text-[8px] text-[#39DDF4]">JWST & 70m Dish</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectDistrict('cyber')}
                    className={`px-2 py-1.5 rounded-lg border transition-all text-left cursor-pointer ${
                      selectedDistrict === 'cyber'
                        ? 'border-[#246BFD] bg-[#246BFD]/25 text-[#39DDF4] shadow-[0_0_12px_rgba(36,107,253,0.3)]'
                        : 'border-l border-l-[#246BFD] border-transparent bg-[#091426]/60 text-[#8A99AD] hover:text-[#F4F7FC] hover:bg-[#091426]/90'
                    }`}
                  >
                    <div className="text-[#F4F7FC] font-semibold">SEC-04: CYBER</div>
                    <div className="text-[8px] text-[#246BFD]">Fortified Matrix</div>
                  </button>
                </div>

                {/* City Overview Reset Option */}
                {selectedDistrict !== 'overview' && (
                  <button
                    type="button"
                    onClick={resetToOverview}
                    className="w-full flex items-center justify-center gap-1.5 py-1 rounded-lg border border-[rgba(57,221,244,0.2)] bg-[#091426] text-[#39DDF4] hover:bg-[#39DDF4]/15 transition-colors cursor-pointer text-[9px]"
                  >
                    <span>&#x21BA;</span> RESET TO CITY OVERVIEW
                  </button>
                )}

                <div className="pt-2 border-t border-[rgba(57,221,244,0.08)] text-[9px] text-[#8A99AD] flex items-center justify-between">
                  <span>CAMERA CONTROLS</span>
                  <span className="text-[#39DDF4] font-semibold">CLICK TO FOCUS / DRAG</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM GUIDED TOUR CONTROLLER */}
        <GuidedTourControls />

        {/* BOTTOM HUD FOOTER */}
        <footer className="pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-2 border border-[rgba(57,221,244,0.18)] bg-[#050A14]/80 px-4 sm:px-6 py-2.5 backdrop-blur-md rounded-xl font-mono text-[9px] sm:text-[10px] text-[#8A99AD] shadow-[0_-4px_24px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[#39DDF4] font-semibold">COORD:</span>
            <span>LAT 19.1334° N / LNG 72.9133° E</span>
            <span className="text-[rgba(57,221,244,0.3)]">|</span>
            <span className="text-[#8A99AD] hidden md:inline">ELEVATION: 48M</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[#4A5B73]">PROCEDURAL 3D CITY ENGINE</span>
            <span className="text-[rgba(57,221,244,0.3)] hidden sm:inline">|</span>
            <span className="text-[#39DDF4] font-semibold">TECHFEST IIT BOMBAY</span>
          </div>
        </footer>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: SLIDE-IN DISTRICT INFORMATION PANEL
      ────────────────────────────────────────────────────────────── */}
      <DistrictInfoPanel />
    </div>
  );
}
