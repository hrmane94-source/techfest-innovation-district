import { useState, useEffect } from 'react';
import { useDistrict } from '../../context';
import type { DistrictId } from '../../types/district';

export interface NavbarProps {
  onExploreClick?: () => void;
  isExploreMode?: boolean;
}

export function Navbar({ onExploreClick, isExploreMode = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [districtsDropdownOpen, setDistrictsDropdownOpen] = useState(false);

  const {
    selectedDistrict,
    selectDistrict,
    resetToOverview,
    isTourActive,
    toggleTour,
  } = useDistrict();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDistrictSelect = (id: DistrictId) => {
    selectDistrict(id);
    setDistrictsDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onExploreClick && !isExploreMode) {
      onExploreClick();
    }
  };

  return (
    <nav
      aria-label="Global Navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans ${
        scrolled || isExploreMode
          ? 'py-3 bg-[#050A14]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'py-4 sm:py-6 bg-gradient-to-b from-[#050A14]/90 via-[#050A14]/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* ── 1. TECHFEST BRANDING & LOGO MARK ── */}
        <button
          type="button"
          onClick={resetToOverview}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          {/* Futuristic Hexagonal Gem Logo Mark */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-[#091426] shadow-[0_0_16px_rgba(0,229,255,0.2)] transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-400/60">
            <svg
              className="h-5 w-5 text-[#00E5FF] transition-transform duration-500 group-hover:rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 21 8.5 21 15.5 12 22 3 15.5 3 8.5" />
              <circle cx="12" cy="12" r="3" fill="#00E5FF" fillOpacity="0.4" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-sm sm:text-base tracking-[0.2em] text-white">
                TECHFEST
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-[#00E5FF] border border-cyan-500/20 font-semibold">
                2026
              </span>
            </div>
            <p className="font-mono text-[9px] tracking-widest text-[#94A3B8] uppercase">
              IIT BOMBAY <span className="text-cyan-400/60">•</span> INNOVATION DISTRICT
            </p>
          </div>
        </button>

        {/* ── 2. DESKTOP NAVIGATION LINKS ── */}
        <div className="hidden lg:flex items-center gap-1 bg-[#081120]/70 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <button
            type="button"
            onClick={resetToOverview}
            className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedDistrict === 'overview'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Overview
          </button>

          {/* Districts Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDistrictsDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedDistrict !== 'overview' && selectedDistrict !== 'core'
                  ? 'bg-cyan-500/15 text-[#00E5FF] border border-cyan-500/30'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <span>Districts</span>
              <svg
                className={`h-3 w-3 transition-transform ${districtsDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {districtsDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 w-64 rounded-xl border border-white/15 bg-[#081120]/95 backdrop-blur-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  type="button"
                  onClick={() => handleDistrictSelect('ai')}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-white/10 transition-colors group cursor-pointer"
                >
                  <div>
                    <div className="font-semibold text-white group-hover:text-blue-400">
                      SEC-01 // Artificial Intelligence
                    </div>
                    <div className="text-[10px] text-[#94A3B8]">Quantum & Neural Computing</div>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDistrictSelect('robotics')}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-white/10 transition-colors group cursor-pointer"
                >
                  <div>
                    <div className="font-semibold text-white group-hover:text-amber-400">
                      SEC-02 // Robotics & Automation
                    </div>
                    <div className="text-[10px] text-[#94A3B8]">NASA Perseverance Rover Pad</div>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDistrictSelect('aerospace')}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-white/10 transition-colors group cursor-pointer"
                >
                  <div>
                    <div className="font-semibold text-white group-hover:text-cyan-400">
                      SEC-03 // Aerospace & Deep Space
                    </div>
                    <div className="text-[10px] text-[#94A3B8]">NASA 70m Dish & JWST Pavilion</div>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDistrictSelect('cyber')}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-white/10 transition-colors group cursor-pointer"
                >
                  <div>
                    <div className="font-semibold text-white group-hover:text-blue-400">
                      SEC-04 // Cybersecurity
                    </div>
                    <div className="text-[10px] text-[#94A3B8]">Fortified Data Matrix</div>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleDistrictSelect('core')}
            className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedDistrict === 'core'
                ? 'bg-cyan-500/15 text-[#00E5FF] border border-cyan-500/30'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Innovation Tower
          </button>
        </div>

        {/* ── 3. PRIMARY CTA ACTION BUTTONS ── */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => toggleTour()}
            className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-medium border transition-all cursor-pointer flex items-center gap-2 ${
              isTourActive
                ? 'border-cyan-400 bg-cyan-500/20 text-[#00E5FF] shadow-[0_0_16px_rgba(0,229,255,0.3)]'
                : 'border-white/15 bg-white/5 text-[#E2E8F0] hover:border-cyan-400/50 hover:text-white'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isTourActive ? 'bg-[#00E5FF] animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span>{isTourActive ? 'TOUR ACTIVE' : 'GUIDED TOUR'}</span>
          </button>

          <button
            type="button"
            onClick={onExploreClick}
            className="relative group overflow-hidden px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 font-sans text-xs font-bold text-white tracking-wider uppercase shadow-[0_0_24px_rgba(0,229,255,0.35)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(0,229,255,0.6)] hover:scale-[1.02] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>EXPLORE DISTRICT</span>
              <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>

        {/* ── 4. MOBILE HAMBURGER TOGGLE ── */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg border border-white/10 bg-[#091426] text-white hover:text-cyan-400 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── 5. MOBILE ACCORDION / DRAWER ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-4 p-4 rounded-2xl border border-white/15 bg-[#050A14]/95 backdrop-blur-2xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-mono text-xs font-bold text-cyan-400">NAVIGATION</span>
            <button
              type="button"
              onClick={resetToOverview}
              className="text-xs text-white hover:text-cyan-400 cursor-pointer"
            >
              Reset Overview
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => handleDistrictSelect('core')}
              className="p-2.5 rounded-lg border border-white/10 bg-[#091426] text-left hover:border-cyan-400 cursor-pointer"
            >
              <div className="text-[10px] text-cyan-400">CORE</div>
              <div className="font-bold text-white">Innovation Tower</div>
            </button>
            <button
              type="button"
              onClick={() => handleDistrictSelect('ai')}
              className="p-2.5 rounded-lg border border-white/10 bg-[#091426] text-left hover:border-blue-400 cursor-pointer"
            >
              <div className="text-[10px] text-blue-400">SEC-01</div>
              <div className="font-bold text-white">AI Labs</div>
            </button>
            <button
              type="button"
              onClick={() => handleDistrictSelect('robotics')}
              className="p-2.5 rounded-lg border border-white/10 bg-[#091426] text-left hover:border-amber-400 cursor-pointer"
            >
              <div className="text-[10px] text-amber-400">SEC-02</div>
              <div className="font-bold text-white">Robotics Pad</div>
            </button>
            <button
              type="button"
              onClick={() => handleDistrictSelect('aerospace')}
              className="p-2.5 rounded-lg border border-white/10 bg-[#091426] text-left hover:border-cyan-400 cursor-pointer"
            >
              <div className="text-[10px] text-cyan-400">SEC-03</div>
              <div className="font-bold text-white">Aerospace & JWST</div>
            </button>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                toggleTour();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-lg border border-cyan-400/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold cursor-pointer text-center"
            >
              {isTourActive ? 'EXIT TOUR' : 'START TOUR'}
            </button>
            <button
              type="button"
              onClick={() => {
                if (onExploreClick) onExploreClick();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold uppercase tracking-wider cursor-pointer text-center shadow-md"
            >
              EXPLORE 3D
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
