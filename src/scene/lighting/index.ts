export * from './CityLighting';

import type { LightingConfig } from '../../types/scene';

export const DEFAULT_LIGHTING_CONFIG: LightingConfig = {
  ambientIntensity: 0.85,
  directionalColor: '#edf4ff',
  directionalIntensity: 1.85,
  cyanRimColor: '#39DDF4',
  cyanRimIntensity: 0.9,
  orangeAccentColor: '#FF9B54',
};
