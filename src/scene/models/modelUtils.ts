import { useGLTF } from '@react-three/drei';

/**
 * Preload a 3D model asset into the browser/Drei cache ahead of time
 */
export function preloadModel(url: string): void {
  useGLTF.preload(url);
}

/**
 * Remove a 3D model asset from the cache
 */
export function clearModelCache(url: string): void {
  useGLTF.clear(url);
}
