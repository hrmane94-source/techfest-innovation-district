import { useState, type ReactNode } from 'react';
import { useDistrict } from '../../context';
import { Navbar } from '../navigation';
import { HeroOverlay } from '../hero/HeroOverlay';
import { DistrictSelectorDock, DistrictInfoDrawer, GuidedTourPill } from '../interface';

export interface AppShellProps {
  children?: ReactNode;
  canvasSlot?: ReactNode;
}

/**
 * AppShell — Complete Redesign for M3 Phase 1: Bright Futurism × Premium Architecture
 *
 * Capabilities:
 * - Hybrid Cinematic Hero with editorial typography and atmospheric lighting
 * - Global Techfest Navigation with active district routing and responsive mobile menu
 * - Architectural District Switcher Dock & slide-in Info Drawer
 * - Floating Guided Tour Controller
 * - Smooth transition between Cinematic Hero Presentation and Interactive City Exploration
 */
export function AppShell({ children, canvasSlot }: AppShellProps) {
  const [isExploreMode, setIsExploreMode] = useState(false);
  const { resetToOverview } = useDistrict();

  const handleEnterExplore = () => {
    setIsExploreMode(true);
  };

  const handleReturnToHero = () => {
    setIsExploreMode(false);
    resetToOverview();
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050A14] text-[#F8FAFC] select-none font-sans">
      {/* ─────────────────────────────────────────────────────────────
          LAYER 0: 3D PROCEDURAL CITY CANVAS (CENTRAL VISUAL ASSET)
      ────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {canvasSlot ?? children}
      </div>

      {/* Atmospheric Vignette & Subtle Horizon Sheen */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,10,20,0.7)_100%)]" 
        aria-hidden="true" 
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#050A14] via-transparent to-[#050A14]/40"
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 1: GLOBAL TECHFEST NAVIGATION BAR
      ────────────────────────────────────────────────────────────── */}
      <Navbar
        onExploreClick={handleEnterExplore}
        isExploreMode={isExploreMode}
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: HYBRID CINEMATIC HERO OVERLAY
      ────────────────────────────────────────────────────────────── */}
      <HeroOverlay
        onExploreClick={handleEnterExplore}
        onDiscoverClick={handleEnterExplore}
        isExploreMode={isExploreMode}
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3: INTERACTIVE DISTRICT EXPLORATION INTERFACE
      ────────────────────────────────────────────────────────────── */}
      {isExploreMode && (
        <>
          {/* District Switcher Dock (Left) */}
          <DistrictSelectorDock visible={isExploreMode} />

          {/* Floating Guided Tour Controller (Bottom Center) */}
          <GuidedTourPill />

          {/* Slide-In District Information Drawer (Right) */}
          <DistrictInfoDrawer />

          {/* Return to Hero Quick Switcher (Top Right floating pill) */}
          <div className="pointer-events-auto absolute top-20 sm:top-24 right-4 sm:right-8 z-20 hidden md:block">
            <button
              type="button"
              onClick={handleReturnToHero}
              className="px-3.5 py-1.5 rounded-full border border-white/15 bg-[#081120]/80 backdrop-blur-md text-xs font-mono text-[#94A3B8] hover:text-white hover:border-cyan-400/50 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>RETURN TO HERO VIEW</span>
            </button>
          </div>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────
          LAYER 4: BOTTOM EDITORIAL FOOTER CREDITS
      ────────────────────────────────────────────────────────────── */}
      <footer
        className={`pointer-events-none absolute bottom-2 left-0 right-0 z-20 ${
          isExploreMode ? 'flex' : 'hidden sm:flex'
        } items-center justify-between px-4 sm:px-8 font-mono text-[9px] text-[#64748B]`}
      >
        <div className="flex items-center gap-2">
          <span className="text-cyan-400/80 font-bold">TECHFEST 2026</span>
          <span>•</span>
          <span>INDIAN INSTITUTE OF TECHNOLOGY BOMBAY</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>THE INNOVATION DISTRICT</span>
          <span>•</span>
          <span className="text-white/60">AUTONOMOUS 3D CITY</span>
        </div>
      </footer>
    </div>
  );
}
