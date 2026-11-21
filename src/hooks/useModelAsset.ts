import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import type { Object3D } from 'three';

export interface UseModelAssetOptions {
  /** Clone scene hierarchy for independent transforms. Defaults to true. */
  clone?: boolean;
}

/**
 * useModelAsset — Programmatic hook for loading and inspecting GLTF/GLB models
 * Returns cloned scene, individual named nodes, materials, and animations.
 */
export function useModelAsset(url: string, options: UseModelAssetOptions = {}) {
  const { clone = true } = options;
  const gltf = useGLTF(url);

  const scene = useMemo(() => {
    if (!gltf.scene) return null;
    return clone ? (SkeletonUtils.clone(gltf.scene) as Object3D) : gltf.scene;
  }, [gltf.scene, clone]);

  return {
    scene,
    nodes: gltf.nodes,
    materials: gltf.materials,
    animations: gltf.animations,
    gltf,
  };
}

export default useModelAsset;
