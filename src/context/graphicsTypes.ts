export type QualityTier = 'high' | 'balanced' | 'performance';
export type QualityMode = 'auto' | 'high' | 'balanced' | 'performance';

export interface GraphicsSettings {
  tier: QualityTier;
  mode: QualityMode;
  dpr: [number, number];
  shadows: boolean;
  shadowMapSize: [number, number];
  shadowCasting: 'all' | 'key' | 'none';
  particleCount: number;
  trafficCount: number;
  enablePointLights: boolean;
  pointLightCount: 'all' | 'essential' | 'minimal';
  simplifiedDistantGeometry: boolean;
  enableSecondaryAnimations: boolean;
  enableStreetlightDetails: boolean;
}

export interface DetectedHardware {
  cores: number;
  memoryGb?: number;
  renderer?: string;
  isMobile: boolean;
  initialTier: QualityTier;
}

export interface GraphicsQualityContextValue {
  mode: QualityMode;
  tier: QualityTier;
  settings: GraphicsSettings;
  setMode: (mode: QualityMode) => void;
  detectedHardware: DetectedHardware;
  currentFps: number;
  isAutoDegraded: boolean;
}

export const TIER_SETTINGS: Record<QualityTier, Omit<GraphicsSettings, 'tier' | 'mode'>> = {
  high: {
    dpr: [1.25, 1.75],
    shadows: true,
    shadowMapSize: [2048, 2048],
    shadowCasting: 'all',
    particleCount: 250,
    trafficCount: 48,
    enablePointLights: true,
    pointLightCount: 'all',
    simplifiedDistantGeometry: false,
    enableSecondaryAnimations: true,
    enableStreetlightDetails: true,
  },
  balanced: {
    dpr: [1.0, 1.5],
    shadows: true,
    shadowMapSize: [1536, 1536],
    shadowCasting: 'key',
    particleCount: 120,
    trafficCount: 28,
    enablePointLights: true,
    pointLightCount: 'essential',
    simplifiedDistantGeometry: false,
    enableSecondaryAnimations: true,
    enableStreetlightDetails: true,
  },
  performance: {
    dpr: [1.0, 1.25],
    shadows: true,
    shadowMapSize: [1024, 1024],
    shadowCasting: 'key',
    particleCount: 40,
    trafficCount: 16,
    enablePointLights: false,
    pointLightCount: 'minimal',
    simplifiedDistantGeometry: true,
    enableSecondaryAnimations: false,
    enableStreetlightDetails: false,
  },
};
