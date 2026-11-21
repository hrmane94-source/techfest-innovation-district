/**
 * 3D Scene configuration and architecture types
 */

export interface CameraPreset {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface LightingConfig {
  ambientIntensity: number;
  directionalColor: string;
  directionalIntensity: number;
  cyanRimColor: string;
  cyanRimIntensity: number;
  orangeAccentColor: string;
}

export interface EnvironmentConfig {
  fogColor: string;
  fogNear: number;
  fogFar: number;
  gridEnabled: boolean;
}

export interface SceneArchitectureLayer {
  id: string;
  label: string;
  visible: boolean;
  opacity: number;
}
