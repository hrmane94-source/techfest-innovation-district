import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CITY_COLORS } from '../materials';

/**
 * CityLighting — Balanced cinematic lighting for Milestone 1.2
 *
 * Improvements:
 * - HemisphereLight provides natural sky/ground ambient gradients, eliminating pitch-black surfaces
 * - Key high-angle directional light sculpts structural facets, roof equipment and setbacks
 * - Contrasting electric cyan rim light emphasizes building silhouettes and back-facades
 * - Dynamic accent lights on central tower crown and plaza
 */
export function CityLighting() {
  const beaconLightRef = useRef<THREE.PointLight>(null);
  const plazaLightRef = useRef<THREE.PointLight>(null);

  // Subtle breathing pulse on the central landmark crown and plaza
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (beaconLightRef.current) {
      beaconLightRef.current.intensity = 2.4 + Math.sin(time * 2.0) * 0.5;
    }
    if (plazaLightRef.current) {
      plazaLightRef.current.intensity = 1.3 + Math.sin(time * 1.2) * 0.25;
    }
  });

  return (
    <group name="city-lighting">
      {/* 1. Natural Sky/Ground Hemisphere Ambient (eliminates pitch-black surfaces) */}
      <hemisphereLight
        args={['#24426e', '#0b1626', 0.85]}
      />

      {/* 2. Soft Omnidirectional Shadow Fill */}
      <ambientLight color="#0c1d36" intensity={0.5} />

      {/* 3. Primary High-Angle Key Directional Light */}
      <directionalLight
        position={[65, 90, 55]}
        intensity={1.85}
        color="#edf4ff"
      />

      {/* 4. Contrasting Cyan Rim / Fill Light */}
      <directionalLight
        position={[-65, 52, -58]}
        intensity={0.9}
        color={CITY_COLORS.electricCyan}
      />

      {/* 5. Tower Crown Beacon Accent Light */}
      <pointLight
        ref={beaconLightRef}
        position={[0, 62, 0]}
        color={CITY_COLORS.electricCyan}
        distance={90}
        decay={2}
        intensity={2.4}
      />

      {/* 6. Central Plaza Ground Light */}
      <pointLight
        ref={plazaLightRef}
        position={[0, 3.5, 0]}
        color={CITY_COLORS.primaryBlue}
        distance={55}
        decay={2}
        intensity={1.3}
      />

      {/* 7. District Focal Ambient Accents */}
      <pointLight
        position={[24, 10, -20]}
        color={CITY_COLORS.accentOrange}
        distance={40}
        decay={2}
        intensity={0.85}
      />
      <pointLight
        position={[-24, 10, -20]}
        color={CITY_COLORS.electricCyan}
        distance={40}
        decay={2}
        intensity={0.95}
      />
      <pointLight
        position={[-24, 10, 22]}
        color={CITY_COLORS.primaryBlue}
        distance={40}
        decay={2}
        intensity={0.8}
      />
      <pointLight
        position={[24, 10, 22]}
        color={CITY_COLORS.electricCyan}
        distance={40}
        decay={2}
        intensity={0.8}
      />
    </group>
  );
}
