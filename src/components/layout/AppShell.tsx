import { useState, type ReactNode } from 'react';

export interface AppShellProps {
  children?: ReactNode;
  canvasSlot?: ReactNode;
}

/**
 * AppShell — High-tech HUD layer positioned over the procedural 3D city
 *
 * - Non-obstructive layered DOM architecture
 * - The 3D Canvas occupies 100% of the viewport as the primary visual focus
 * - Technical HUD header & footer preserve the established visual identity
 * - Interactive controls allow toggling telemetry details without blocking the 3D scene
 */
export function AppShell({ children, canvasSlot }: AppShellProps) {
  const [telemetryOpen, setTelemetryOpen] = useState(true);

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
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-8">
        
        {/* TOP HUD HEADER */}
        <header className="pointer-events-auto flex items-center justify-between border-b border-[rgba(57,221,244,0.15)] bg-[#050A14]/75 px-5 py-3.5 backdrop-blur-md rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39DDF4] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#39DDF4] shadow-[0_0_12px_#39DDF4]" />
            </div>
            <div>
              <h1 className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#F4F7FC] uppercase">
                TECHFEST <span className="text-[#39DDF4]">//</span> THE INNOVATION DISTRICT
              </h1>
              <p className="font-mono text-[10px] tracking-widest text-[#8A99AD] hidden sm:block">
                IIT BOMBAY INNOVATION ECOSYSTEM • 3D ARCHITECTURAL MATRIX
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] tracking-wider text-[#8A99AD]">
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded border border-[rgba(57,221,244,0.2)] bg-[#091426]/70">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#39DDF4]" />
              <span className="text-[#39DDF4]">CITY ENGINE ACTIVE</span>
            </div>
            <span className="text-[rgba(57,221,244,0.3)] hidden md:inline">|</span>
            <span className="text-[#F4F7FC] font-semibold">MILESTONE 01</span>
          </div>
        </header>

        {/* LEFT COMPACT TELEMETRY PANEL (COLLAPSIBLE, NON-OBSTRUCTIVE) */}
        <div className="pointer-events-auto mt-4 max-w-xs self-start">
          <div className="rounded-lg border border-[rgba(57,221,244,0.18)] bg-[#050A14]/80 p-3.5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(57,221,244,0.1)]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#39DDF4] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#39DDF4]" />
                DISTRICT MATRIX
              </span>
              <button
                type="button"
                onClick={() => setTelemetryOpen((prev) => !prev)}
                className="font-mono text-[9px] text-[#8A99AD] hover:text-[#39DDF4] transition-colors cursor-pointer px-1.5 py-0.5 rounded bg-[#091426]"
              >
                {telemetryOpen ? 'MINIMIZE' : 'EXPAND'}
              </button>
            </div>

            {telemetryOpen && (
              <div className="mt-2.5 space-y-2 font-mono text-[10px]">
                <div className="flex items-center justify-between text-[#F4F7FC] bg-[#091426]/80 px-2 py-1.5 rounded border-l-2 border-[#39DDF4]">
                  <span>CORE: TECHFEST TOWER</span>
                  <span className="text-[#39DDF4] text-[9px]">MONUMENTAL</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[9px] text-[#8A99AD]">
                  <div className="px-2 py-1 rounded bg-[#091426]/50 border-l border-[#246BFD]">
                    <div className="text-[#F4F7FC]">SEC-01: AI</div>
                    <div>Stepped Towers</div>
                  </div>
                  <div className="px-2 py-1 rounded bg-[#091426]/50 border-l border-[#FF9B54]">
                    <div className="text-[#F4F7FC]">SEC-02: ROBOTICS</div>
                    <div>Industrial Complex</div>
                  </div>
                  <div className="px-2 py-1 rounded bg-[#091426]/50 border-l border-[#39DDF4]">
                    <div className="text-[#F4F7FC]">SEC-03: AEROSPACE</div>
                    <div>Hangar & Spire</div>
                  </div>
                  <div className="px-2 py-1 rounded bg-[#091426]/50 border-l border-[#246BFD]">
                    <div className="text-[#F4F7FC]">SEC-04: CYBER</div>
                    <div>Fortified Matrix</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[rgba(57,221,244,0.08)] text-[9px] text-[#8A99AD] flex items-center justify-between">
                  <span>CAMERA CONTROLS</span>
                  <span className="text-[#39DDF4]">DRAG TO ORBIT</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM HUD FOOTER */}
        <footer className="pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[rgba(57,221,244,0.15)] bg-[#050A14]/75 px-5 py-2.5 backdrop-blur-md rounded-lg font-mono text-[10px] text-[#8A99AD] shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3">
            <span className="text-[#39DDF4]">COORD:</span>
            <span>LAT 19.1334° N / LNG 72.9133° E</span>
            <span className="text-[rgba(57,221,244,0.3)]">|</span>
            <span className="text-[#8A99AD] hidden md:inline">ELEVATION: 48M</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[#4A5B73]">PROCEDURAL 3D CITY ENGINE</span>
            <span className="text-[rgba(57,221,244,0.3)] hidden sm:inline">|</span>
            <span className="text-[#39DDF4]">TECHFEST IIT BOMBAY</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
