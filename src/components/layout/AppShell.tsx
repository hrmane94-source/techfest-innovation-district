import { useState, useRef, type ReactNode } from 'react';
import { useDistrict } from '../../context';
import { Navbar } from '../navigation';
import { HeroOverlay } from '../hero/HeroOverlay';
import { DistrictSelectorDock, DistrictInfoDrawer, GuidedTourPill, CampusMinimap } from '../interface';
import { ScrollStorytelling } from '../storytelling';

export interface AppShellProps {
  children?: ReactNode;
  canvasSlot?: ReactNode;
}

/**
 * AppShell — Immersive 3D Experience & Cinematic Storytelling (Milestone 3 Phase 2)
 *
 * Capabilities:
 * - Bright Futurism Atmospheric 3D Canvas
 * - 6-Act GSAP Scroll Storytelling Engine (Arrival -> Core -> Districts -> NASA -> Experience -> Finale)
 * - Free-Roam Interactive 3D Explore Mode with Architectural District Matrix Dock & NASA Mission Assets
 * - Smooth camera interpolation & manual OrbitControls authority
 * - Global Navigation with district routing and responsive mobile menu
 */
export function AppShell({ children, canvasSlot }: AppShellProps) {
  const [isExploreMode, setIsExploreMode] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { resetToOverview } = useDistrict();

  const handleEnterExplore = () => {
    setIsExploreMode(true);
  };

  const handleReturnToHero = () => {
    setIsExploreMode(false);
    resetToOverview();
  };

  const handleScrollToStory = () => {
    const el = scrollContainerRef.current?.querySelector('.story-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#070E1C] text-[#F8FAFC] select-none font-sans">
      {/* ─────────────────────────────────────────────────────────────
          LAYER 0: 3D PROCEDURAL CITY CANVAS (STICKY BACKGROUND)
      ────────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        {canvasSlot ?? children}
      </div>

      {/* Atmospheric Vignette & Subtle Horizon Sheen */}
      <div 
        className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,14,28,0.65)_100%)]" 
        aria-hidden="true" 
      />
      <div
        className="pointer-events-none fixed inset-0 z-10 bg-gradient-to-t from-[#070E1C] via-transparent to-[#070E1C]/30"
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
          LAYER 2: CINEMATIC SCROLL STORYTELLING OR FREE-ROAM EXPLORATION
      ────────────────────────────────────────────────────────────── */}
      {!isExploreMode ? (
        <div
          ref={scrollContainerRef}
          className="relative z-20 h-screen w-screen overflow-y-auto overflow-x-hidden scrollbar-none"
        >
          {/* Arrival Hero View (First Screen) */}
          <div className="min-h-screen w-full relative">
            <HeroOverlay
              onExploreClick={handleEnterExplore}
              onDiscoverClick={handleScrollToStory}
              isExploreMode={isExploreMode}
            />
          </div>

          {/* 6-Act Scroll-Driven Narrative Exploration */}
          <ScrollStorytelling
            onEnterExploreMode={handleEnterExplore}
            visible={!isExploreMode}
          />
        </div>
      ) : (
        <>
          {/* District Switcher Dock (Left) */}
          <DistrictSelectorDock visible={isExploreMode} />

          {/* Floating Guided Tour Controller (Bottom Center) */}
          <GuidedTourPill />

          {/* Slide-In District Information Drawer (Right) */}
          <DistrictInfoDrawer />

          {/* Spatial Campus Orientation Minimap */}
          <CampusMinimap />

          {/* Return to Story Quick Switcher (Top Right floating pill) */}
          <div className="pointer-events-auto absolute top-20 sm:top-24 right-4 sm:right-8 z-20 hidden md:block">
            <button
              type="button"
              onClick={handleReturnToHero}
              className="px-3.5 py-1.5 rounded-full border border-white/15 bg-[#081120]/85 backdrop-blur-md text-xs font-mono text-[#94A3B8] hover:text-white hover:border-cyan-400/50 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>RETURN TO STORY</span>
            </button>
          </div>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────
          LAYER 4: BOTTOM EDITORIAL FOOTER CREDITS
      ────────────────────────────────────────────────────────────── */}
      <footer
        className={`pointer-events-none fixed bottom-2 left-0 right-0 z-20 ${
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
