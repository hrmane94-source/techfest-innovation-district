import { useDistrict } from '../../context';
import type { DistrictId } from '../../types/district';

export interface DistrictSelectorDockProps {
  visible?: boolean;
}

export function DistrictSelectorDock({ visible = true }: DistrictSelectorDockProps) {
  const { selectedDistrict, selectDistrict, resetToOverview } = useDistrict();

  if (!visible) return null;

  const districtButtons: Array<{ id: DistrictId; code: string; label: string; accent: string }> = [
    { id: 'core', code: 'CORE', label: 'Central Innovation Tower', accent: '#00E5FF' },
    { id: 'plaza', code: 'PLAZA', label: 'Central Academic Plaza', accent: '#39DDF4' },
    { id: 'library', code: 'LIB-01', label: 'Central Library & Commons', accent: '#38BDF8' },
    { id: 'ai', code: 'SEC-01', label: 'AI & Computation', accent: '#246BFD' },
    { id: 'robotics', code: 'SEC-02', label: 'Robotics & Automation', accent: '#FF7A00' },
    { id: 'aerospace', code: 'SEC-03', label: 'Aerospace & Space', accent: '#00E5FF' },
    { id: 'cyber', code: 'SEC-04', label: 'Cybersecurity', accent: '#246BFD' },
  ];

  const nasaButtons: Array<{ id: DistrictId; code: string; label: string; accent: string }> = [
    { id: 'nasa-rover', code: 'NASA-01', label: 'Perseverance Rover Arena', accent: '#FF7A00' },
    { id: 'nasa-dish', code: 'NASA-02', label: '70M DSN Dish Station', accent: '#00E5FF' },
    { id: 'nasa-jwst', code: 'NASA-03', label: 'James Webb Pavilion', accent: '#FFB370' },
  ];

  return (
    <div
      aria-label="District Switcher Dock"
      className="pointer-events-auto absolute top-20 sm:top-24 left-4 sm:left-8 z-30 flex flex-col gap-2 max-w-[260px] sm:max-w-xs font-sans animate-in fade-in slide-in-from-left-4 duration-300"
    >
      <div className="rounded-2xl border border-white/15 bg-[#050A14]/90 backdrop-blur-2xl p-3 shadow-2xl space-y-1.5 max-h-[calc(100vh-140px)] overflow-y-auto">
        <div className="flex items-center justify-between px-1 pb-1.5 border-b border-white/10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            CAMPUS RESEARCH CENTRES
          </span>
          {selectedDistrict !== 'overview' && (
            <button
              type="button"
              onClick={resetToOverview}
              className="font-mono text-[9px] text-cyan-400 hover:text-white transition-colors cursor-pointer"
            >
              Overview
            </button>
          )}
        </div>

        {districtButtons.map((btn) => {
          const isActive = selectedDistrict === btn.id;
          return (
            <button
              key={`dock-btn-${btn.id}`}
              type="button"
              onClick={() => selectDistrict(btn.id)}
              className={`w-full flex items-center justify-between p-2 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                isActive
                  ? 'bg-white/10 border shadow-lg'
                  : 'bg-white/5 border border-transparent hover:bg-white/10 text-[#94A3B8]'
              }`}
              style={{
                borderColor: isActive ? btn.accent : 'transparent',
                boxShadow: isActive ? `0 0 16px ${btn.accent}30` : 'none',
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: btn.accent,
                    boxShadow: isActive ? `0 0 8px ${btn.accent}` : 'none',
                  }}
                />
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                    {btn.code}
                  </span>
                  <span className={`block text-xs font-semibold ${isActive ? 'text-white' : 'text-[#E2E8F0]'}`}>
                    {btn.label}
                  </span>
                </div>
              </div>

              {isActive && (
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">
                  ACTIVE
                </span>
              )}
            </button>
          );
        })}

        {/* NASA Mission Assets Subgroup */}
        <div className="pt-2 border-t border-white/10">
          <span className="block px-1 pb-1 font-mono text-[9px] uppercase tracking-wider text-cyan-400/80 font-bold">
            NASA MISSION ASSETS
          </span>
          <div className="space-y-1">
            {nasaButtons.map((btn) => {
              const isActive = selectedDistrict === btn.id;
              return (
                <button
                  key={`dock-btn-${btn.id}`}
                  type="button"
                  onClick={() => selectDistrict(btn.id)}
                  className={`w-full flex items-center justify-between p-1.5 rounded-lg transition-all duration-200 cursor-pointer text-left ${
                    isActive
                      ? 'bg-white/10 border shadow-md'
                      : 'bg-white/5 border border-transparent hover:bg-white/10 text-[#94A3B8]'
                  }`}
                  style={{
                    borderColor: isActive ? btn.accent : 'transparent',
                    boxShadow: isActive ? `0 0 12px ${btn.accent}25` : 'none',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: btn.accent,
                        boxShadow: isActive ? `0 0 6px ${btn.accent}` : 'none',
                      }}
                    />
                    <div>
                      <span className="block font-mono text-[8px] uppercase tracking-wider text-slate-400">
                        {btn.code}
                      </span>
                      <span className={`block text-[11px] font-medium ${isActive ? 'text-white' : 'text-[#E2E8F0]'}`}>
                        {btn.label}
                      </span>
                    </div>
                  </div>

                  {isActive && (
                    <span className="font-mono text-[8px] px-1 py-0.5 rounded bg-white/10 text-cyan-300 font-bold">
                      FOCUSED
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
