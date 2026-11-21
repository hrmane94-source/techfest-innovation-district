export * from './CityLighting';

import type { LightingConfig } from '../../types/scene';

export const DEFAULT_LIGHTING_CONFIG: LightingConfig = {
  ambientIntensity: 0.65,
  directionalColor: '#e2ecfc',
  directionalIntensity: 1.7,
  cyanRimColor: '#39DDF4',
  cyanRimIntensity: 0.8,
  orangeAccentColor: '#FF9B54',
};
