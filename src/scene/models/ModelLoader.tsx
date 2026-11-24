import { Suspense, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useGraphicsQuality } from '../../context';
import { ModelErrorBoundary } from './ModelErrorBoundary';
import type { ModelProps } from '../../types/models';

/**
 * Inner component that hooks into React Three Fiber's Suspense cache via useGLTF
 */
function ModelContent({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  visible = true,
  castShadow = false,
  receiveShadow = false,
  clone = false, // Optimized: avoid wasteful deep cloning for single-instance models
  onLoad,
}: ModelProps) {
  const gltf = useGLTF(url);
  const { settings } = useGraphicsQuality();

  const effectiveCastShadow = castShadow && settings.shadowCasting === 'all';
  const effectiveReceiveShadow = receiveShadow && settings.shadows;

  // Clone only when explicitly requested
  const sceneObject = useMemo(() => {
    if (!gltf.scene) return null;
    return clone ? (SkeletonUtils.clone(gltf.scene) as THREE.Object3D) : gltf.scene;
  }, [gltf.scene, clone]);

  // Configure shadows and notify parent on load
  useEffect(() => {
    if (!sceneObject) return;

    sceneObject.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        node.castShadow = effectiveCastShadow;
        node.receiveShadow = effectiveReceiveShadow;

        // Texture clarity & anisotropic filtering enhancement (Milestone 7.3)
        const mesh = node as THREE.Mesh;
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            const std = mat as THREE.MeshStandardMaterial;
            if (std.map) {
              std.map.anisotropy = 8;
              std.map.generateMipmaps = true;
              std.map.minFilter = THREE.LinearMipmapLinearFilter;
              std.map.magFilter = THREE.LinearFilter;
              std.map.needsUpdate = true;
            }
            if (std.normalMap) {
              std.normalMap.anisotropy = 8;
              std.normalMap.generateMipmaps = true;
              std.normalMap.minFilter = THREE.LinearMipmapLinearFilter;
              std.normalMap.magFilter = THREE.LinearFilter;
              std.normalMap.needsUpdate = true;
            }
            if (std.roughnessMap) {
              std.roughnessMap.anisotropy = 8;
              std.roughnessMap.generateMipmaps = true;
              std.roughnessMap.minFilter = THREE.LinearMipmapLinearFilter;
              std.roughnessMap.magFilter = THREE.LinearFilter;
              std.roughnessMap.needsUpdate = true;
            }
          });
        }
      }
    });

    onLoad?.(sceneObject);
  }, [sceneObject, effectiveCastShadow, effectiveReceiveShadow, onLoad]);

  if (!sceneObject) return null;

  return (
    <primitive
      object={sceneObject}
      position={position}
      rotation={rotation}
      scale={scale}
      visible={visible}
    />
  );
}

/**
 * ModelLoader — Reusable, high-performance GLTF/GLB 3D asset loader component.
 */
export function ModelLoader({
  url,
  position,
  rotation,
  scale,
  visible,
  castShadow,
  receiveShadow,
  clone = false,
  fallback = null,
  onLoad,
  onError,
}: ModelProps) {
  return (
    <ModelErrorBoundary fallback={fallback} onError={onError}>
      <Suspense fallback={fallback}>
        <ModelContent
          url={url}
          position={position}
          rotation={rotation}
          scale={scale}
          visible={visible}
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          clone={clone}
          onLoad={onLoad}
        />
      </Suspense>
    </ModelErrorBoundary>
  );
}

export default ModelLoader;
