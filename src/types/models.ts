import type { ReactNode } from 'react';
import type { Object3D } from 'three';

/**
 * 3D Model Asset Types & Manifest Schema
 */

export type ModelAssetCategory = 'architecture' | 'robotics' | 'aerospace' | 'environment';

export interface ModelProps {
  /** Public path or URL to the .glb / .gltf model */
  url: string;
  /** Translation vector [x, y, z] */
  position?: [number, number, number];
  /** Euler rotation in radians [x, y, z] */
  rotation?: [number, number, number];
  /** Uniform scale number or [x, y, z] vector */
  scale?: number | [number, number, number];
  /** Visibility toggle */
  visible?: boolean;
  /** Enable shadow casting */
  castShadow?: boolean;
  /** Enable shadow receiving */
  receiveShadow?: boolean;
  /**
   * Clone mode: Clone the scene hierarchy.
   * Recommended when the same model asset is placed at multiple locations.
   * Defaults to true for safety.
   */
  clone?: boolean;
  /** Optional fallback 3D element rendered on error or during load */
  fallback?: ReactNode;
  /** Callback fired once model is parsed and ready */
  onLoad?: (scene: Object3D) => void;
  /** Callback fired if asset fails to load */
  onError?: (error: Error) => void;
}

export interface ModelAssetManifestItem {
  id: string;
  name: string;
  category: ModelAssetCategory;
  path: string;
  format: 'glb' | 'gltf';
  estimatedTriangles?: number;
  license?: string;
  author?: string;
  notes?: string;
}
