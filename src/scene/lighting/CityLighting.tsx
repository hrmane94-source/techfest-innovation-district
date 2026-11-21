import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CITY_COLORS } from '../materials';

/**
 * CityLighting — Professional architectural lighting
 * - Ambient fill: deep cool navy
 * - Key light: sharp, high-angle directional light revealing structural facets
 * - Cyan rim light: contrasting back-rim lighting for building silhouettes
 * - Accent point lights: pulsing crown beacon and plaza ground glow
 */
export function CityLighting() {
  const beaconLightRef = useRef<THREE.PointLight>(null);
  const plazaLightRef = useRef<THREE.PointLight>(null);

  // Subtle breathing pulse for tower beacon and central plaza
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (beaconLightRef.current) {
      beaconLightRef.current.intensity = 2.2 + Math.sin(time * 2.0) * 0.7;
    }
    if (plazaLightRef.current) {
      plazaLightRef.current.intensity = 1.3 + Math.sin(time * 1.2) * 0.3;
    }
  });

  return (
    <group name="city-lighting">
      {/* Deep Navy Ambient Illumination */}
      <ambientLight color="#0c1b33" intensity={0.65} />

      {/* Primary Key Directional Light (Moon/Orbital Sun) */}
      <directionalLight
        position={[65, 85, 55]}
        intensity={1.7}
        color="#e2ecfc"
      />

      {/* Contrasting Cyan Rim / Fill Light */}
      <directionalLight
        position={[-60, 45, -55]}
        intensity={0.8}
        color={CITY_COLORS.electricCyan}
      />

      {/* Tower Crown Beacon Accent Light */}
      <pointLight
        ref={beaconLightRef}
        position={[0, 60, 0]}
        color={CITY_COLORS.electricCyan}
        distance={75}
        decay={2}
        intensity={2.2}
      />

      {/* Central Plaza Ground Light */}
      <pointLight
        ref={plazaLightRef}
        position={[0, 3, 0]}
        color={CITY_COLORS.primaryBlue}
        distance={45}
        decay={2}
        intensity={1.3}
      />

      {/* Soft Aerospace & Robotics District Accents */}
      <pointLight
        position={[24, 8, -20]}
        color={CITY_COLORS.accentOrange}
        distance={35}
        decay={2}
        intensity={0.8}
      />
      <pointLight
        position={[-24, 8, -20]}
        color={CITY_COLORS.electricCyan}
        distance={35}
        decay={2}
        intensity={0.9}
      />
    </group>
  );
}
