import { useState } from 'react';
import { useGraphicsQuality, type QualityMode } from '../../context';
import { Settings2, Cpu, Zap, Activity } from 'lucide-react';

export function GraphicsQualityPill() {
  const { mode, tier, settings, setMode, currentFps, isAutoDegraded, detectedHardware } =
    useGraphicsQuality();
  const [isOpen, setIsOpen] = useState(false);

  const getTierColor = (t: string) => {
    switch (t) {
      case 'high':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'balanced':
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
      case 'performance':
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      default:
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
    }
  };

  const getFpsColor = (fps: number) => {
    if (fps >= 55) return 'text-emerald-400 bg-emerald-400';
    if (fps >= 35) return 'text-amber-400 bg-amber-400';
    return 'text-rose-400 bg-rose-400';
  };

  const modes: Array<{
    id: QualityMode;
    label: string;
    sublabel: string;
    icon: typeof Activity;
  }> = [
    {
      id: 'auto',
      label: 'Auto (Adaptive)',
      sublabel: `Auto-tunes to hardware (${tier.toUpperCase()})`,
      icon: Activity,
    },
    {
      id: 'high',
      label: 'High Quality',
      sublabel: 'Full shadows, max DPR, all details',
      icon: Zap,
    },
    {
      id: 'balanced',
      label: 'Balanced',
      sublabel: 'Optimized shadows, smooth 60fps',
      icon: Cpu,
    },
    {
      id: 'performance',
      label: 'Performance',
      sublabel: 'Lightweight, minimal shadows, fast',
      icon: Settings2,
    },
  ];

  return (
    <div className="relative font-sans text-xs">
      {/* ── COLLAPSED PILL BUTTON ── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-white/15 bg-[#050A14]/80 px-2.5 py-1.5 backdrop-blur-md shadow-sm transition-all hover:border-cyan-400/40 hover:bg-[#071328]/90 cursor-pointer font-mono"
        aria-label="Graphics Quality Settings"
        title={`Graphics Tier: ${tier.toUpperCase()} (${mode.toUpperCase()})`}
      >
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${getFpsColor(currentFps)} animate-pulse`} />
          <span className="font-semibold text-slate-200">{Math.round(currentFps)} FPS</span>
        </span>

        <span className="text-white/20">|</span>

        <span
          className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold border ${getTierColor(
            tier
          )}`}
        >
          {mode === 'auto' ? `AUTO:${tier.slice(0, 3)}` : tier}
        </span>

        {isAutoDegraded && (
          <span
            className="hidden sm:inline text-[9px] text-amber-400 uppercase tracking-tight"
            title="Automatically stepped down to preserve framerate"
          >
            [ADAPTED]
          </span>
        )}
      </button>

      {/* ── EXPANDED GRAPHICS CONTROL MODAL/POPOVER ── */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-xl border border-white/20 bg-[#060D1E]/95 p-3.5 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2.5">
              <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Settings2 className="h-3.5 w-3.5 text-cyan-400" />
                Adaptive Rendering
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                {detectedHardware.cores} Cores {detectedHardware.isMobile ? '• Mobile' : '• Desktop'}
              </span>
            </div>

            {/* Quality Tier Options */}
            <div className="space-y-1.5">
              {modes.map((item) => {
                const Icon = item.icon;
                const isSelected = mode === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setMode(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-start gap-2.5 rounded-lg p-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border border-cyan-400/50 bg-cyan-500/15 text-white'
                        : 'border border-transparent hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <Icon className={`h-4 w-4 mt-0.5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs text-white">{item.label}</span>
                        {isSelected && (
                          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                        {item.sublabel}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Metrics Footnote */}
            <div className="mt-3 pt-2 border-t border-white/10 font-mono text-[10px] text-slate-400 flex items-center justify-between">
              <span>DPR: {settings.dpr[1]}x</span>
              <span>Shadows: {settings.shadows ? settings.shadowMapSize[0] + 'px' : 'Off'}</span>
              <span>Particles: {settings.particleCount}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
