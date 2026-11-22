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
    dpr: [1, 1.5],
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
    dpr: [1, 1.25],
    shadows: true,
    shadowMapSize: [1024, 1024],
    shadowCasting: 'key',
    particleCount: 90,
    trafficCount: 24,
    enablePointLights: true,
    pointLightCount: 'essential',
    simplifiedDistantGeometry: true,
    enableSecondaryAnimations: true,
    enableStreetlightDetails: false,
  },
  performance: {
    dpr: [0.85, 1.0],
    shadows: false,
    shadowMapSize: [512, 512],
    shadowCasting: 'none',
    particleCount: 30,
    trafficCount: 12,
    enablePointLights: false,
    pointLightCount: 'minimal',
    simplifiedDistantGeometry: true,
    enableSecondaryAnimations: false,
    enableStreetlightDetails: false,
  },
};
