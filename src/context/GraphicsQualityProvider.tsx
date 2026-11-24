import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  type ReactNode,
} from 'react';
import { GraphicsQualityContext } from './graphicsContextInstance';
import {
  TIER_SETTINGS,
  type QualityTier,
  type QualityMode,
  type GraphicsSettings,
  type DetectedHardware,
  type GraphicsQualityContextValue,
} from './graphicsTypes';
import { performanceProfiler } from '../utils/performanceProfiler';

function detectInitialTier(): DetectedHardware {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) {
    return {
      initialTier: 'balanced',
      cores: 4,
      isMobile: false,
    };
  }

  const cores = navigator.hardwareConcurrency || 4;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memoryGb = (navigator as any).deviceMemory as number | undefined;
  const isMobile =
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth <= 768 ||
    /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);

  let renderer = '';
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    if (gl) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ext = (gl as any).getExtension('WEBGL_debug_renderer_info');
      if (ext) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderer = (gl as any).getParameter(ext.UNMASKED_RENDERER_WEBGL) || '';
      }
    }
  } catch {
    // Context inspection probe unavailable
  }

  const isLowEndGpu =
    /Intel.*(HD|UHD)\s?(Graphics)?\s?(4|5|6[0-2]|400|500|600|620)/i.test(renderer) ||
    /Adreno\s?(3|4|5|61[0-2])/i.test(renderer) ||
    /Mali-?(G3|G5[12]|T)/i.test(renderer) ||
    /SwiftShader|Software/i.test(renderer);

  const isHighEndGpu =
    /RTX|GeForce\s?(GTX\s?16|GTX\s?10[78]|20|30|40)|Radeon\s?(RX\s?5[789]|RX\s?6|RX\s?7|Vega)|Apple\s?M[1234]/i.test(
      renderer
    );

  let initialTier: QualityTier;

  if (isMobile) {
    if ((memoryGb && memoryGb <= 4) || cores <= 4) {
      initialTier = 'performance';
    } else {
      initialTier = 'balanced';
    }
  } else {
    if (isLowEndGpu || (memoryGb && memoryGb <= 4) || cores <= 4) {
      initialTier = 'balanced';
    } else if (isHighEndGpu || (cores >= 8 && (!memoryGb || memoryGb >= 8))) {
      initialTier = 'high';
    } else {
      initialTier = 'balanced';
    }
  }

  return {
    initialTier,
    cores,
    memoryGb,
    renderer,
    isMobile,
  };
}

export function GraphicsQualityProvider({ children }: { children: ReactNode }) {
  const hardware = useMemo(() => detectInitialTier(), []);

  const [mode, setModeState] = useState<QualityMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techfest_graphics_mode');
      if (saved === 'auto' || saved === 'high' || saved === 'balanced' || saved === 'performance') {
        return saved;
      }
    }
    return 'auto';
  });

  const [activeTier, setActiveTier] = useState<QualityTier>(() => {
    return mode === 'auto' ? hardware.initialTier : mode;
  });

  const [currentFps, setCurrentFps] = useState<number>(60);
  const [isAutoDegraded, setIsAutoDegraded] = useState(false);

  // Runtime monitoring refs (pure initialization)
  const mountTimeRef = useRef(0);
  const lowFpsDurationRef = useRef(0);
  const highFpsDurationRef = useRef(0);
  const lastTierChangeTimeRef = useRef(0);
  const activeTierRef = useRef(activeTier);

  // Initialize timestamps on mount in effect to keep render pure
  useEffect(() => {
    mountTimeRef.current = performance.now();
    lastTierChangeTimeRef.current = performance.now();
  }, []);

  // Sync ref in effect to keep render pure
  useEffect(() => {
    activeTierRef.current = activeTier;
  }, [activeTier]);

  const setMode = useCallback((newMode: QualityMode) => {
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('techfest_graphics_mode', newMode);
    }
    const now = performance.now();
    if (newMode !== 'auto') {
      setActiveTier(newMode);
      setIsAutoDegraded(false);
      lastTierChangeTimeRef.current = now;
    } else {
      setActiveTier(hardware.initialTier);
      lowFpsDurationRef.current = 0;
      highFpsDurationRef.current = 0;
      lastTierChangeTimeRef.current = now;
    }
  }, [hardware.initialTier]);

  // Periodic FPS sampling & dynamic tier stepping (Hysteresis & Cooldown)
  useEffect(() => {
    if (mode !== 'auto') return;

    const interval = setInterval(() => {
      const snap = performanceProfiler.getSnapshot();
      setCurrentFps(snap.fps);

      const now = performance.now();
      const timeSinceMount = (now - mountTimeRef.current) / 1000;
      // Allow initial 8s grace period for shader compilation & asset loading
      if (timeSinceMount < 8.0) return;

      const timeSinceLastSwitch = (now - lastTierChangeTimeRef.current) / 1000;

      // Low FPS Condition (genuinely struggling: sustained < 24 FPS for 6.0s with 8s cooldown)
      if (snap.fps < 24) {
        lowFpsDurationRef.current += 0.5;
        highFpsDurationRef.current = 0;

        if (lowFpsDurationRef.current >= 6.0 && timeSinceLastSwitch >= 8.0) {
          if (activeTierRef.current === 'high') {
            console.log('[GraphicsManager] Stepping down: high -> balanced (sustained low FPS)');
            setActiveTier('balanced');
            setIsAutoDegraded(true);
            lastTierChangeTimeRef.current = now;
            lowFpsDurationRef.current = 0;
          } else if (activeTierRef.current === 'balanced') {
            console.log('[GraphicsManager] Stepping down: balanced -> performance (sustained low FPS)');
            setActiveTier('performance');
            setIsAutoDegraded(true);
            lastTierChangeTimeRef.current = now;
            lowFpsDurationRef.current = 0;
          }
        }
      } else if (snap.fps >= 52) {
        // High FPS Condition (healthy recovery: sustained >= 52 FPS for 6s with 10s cooldown)
        highFpsDurationRef.current += 0.5;
        lowFpsDurationRef.current = 0;

        if (highFpsDurationRef.current >= 6.0 && timeSinceLastSwitch >= 10.0) {
          if (activeTierRef.current === 'performance' && hardware.initialTier !== 'performance') {
            console.log('[GraphicsManager] Stepping up: performance -> balanced (healthy FPS recovery)');
            setActiveTier('balanced');
            lastTierChangeTimeRef.current = now;
            highFpsDurationRef.current = 0;
          } else if (activeTierRef.current === 'balanced' && hardware.initialTier === 'high') {
            console.log('[GraphicsManager] Stepping up: balanced -> high (healthy FPS recovery)');
            setActiveTier('high');
            setIsAutoDegraded(false);
            lastTierChangeTimeRef.current = now;
            highFpsDurationRef.current = 0;
          }
        }
      } else {
        lowFpsDurationRef.current = Math.max(0, lowFpsDurationRef.current - 0.25);
        highFpsDurationRef.current = Math.max(0, highFpsDurationRef.current - 0.25);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [mode, hardware.initialTier]);

  const settings: GraphicsSettings = useMemo(() => {
    return {
      tier: activeTier,
      mode,
      ...TIER_SETTINGS[activeTier],
    };
  }, [activeTier, mode]);

  const value: GraphicsQualityContextValue = useMemo(() => {
    return {
      mode,
      tier: activeTier,
      settings,
      setMode,
      detectedHardware: hardware,
      currentFps,
      isAutoDegraded,
    };
  }, [mode, activeTier, settings, setMode, hardware, currentFps, isAutoDegraded]);

  return (
    <GraphicsQualityContext.Provider value={value}>
      {children}
    </GraphicsQualityContext.Provider>
  );
}
