import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CITY_COLORS } from '../materials';
import { useDistrict, useGraphicsQuality } from '../../context';

/**
 * CityLighting — Dynamic architectural lighting with adaptive tier optimization
 */
export function CityLighting() {
  const beaconLightRef = useRef<THREE.PointLight>(null);
  const plazaLightRef = useRef<THREE.PointLight>(null);
  const aiLightRef = useRef<THREE.PointLight>(null);
  const roboticsLightRef = useRef<THREE.PointLight>(null);
  const aerospaceLightRef = useRef<THREE.PointLight>(null);
  const cyberLightRef = useRef<THREE.PointLight>(null);

  const { selectedDistrict, hoveredDistrict } = useDistrict();
  const { settings } = useGraphicsQuality();

  // Dynamic light response and breathing animations (Optimized per tier)
  useFrame(({ clock }) => {
    if (!settings.enablePointLights || !settings.enableSecondaryAnimations) return;

    const time = clock.getElapsedTime();

    // Central Tower beacon & plaza
    const isCoreActive = selectedDistrict === 'core' || hoveredDistrict === 'core';
    const baseBeacon = isCoreActive ? 5.2 : 3.6;
    const basePlaza = isCoreActive ? 3.2 : 1.9;

    if (beaconLightRef.current) {
      const pulse = Math.sin(time * 2.0) * 0.4;
      beaconLightRef.current.intensity = THREE.MathUtils.lerp(
        beaconLightRef.current.intensity,
        baseBeacon + pulse,
        0.05
      );
    }
    if (plazaLightRef.current && settings.pointLightCount === 'all') {
      const pulse = Math.sin(time * 1.2) * 0.25;
      plazaLightRef.current.intensity = THREE.MathUtils.lerp(
        plazaLightRef.current.intensity,
        basePlaza + pulse,
        0.05
      );
    }

    if (settings.pointLightCount === 'all') {
      // AI District focal light
      const isAiActive = selectedDistrict === 'ai' || hoveredDistrict === 'ai';
      const aiTarget = isAiActive ? 3.6 : 1.8;
      if (aiLightRef.current) {
        aiLightRef.current.intensity = THREE.MathUtils.lerp(aiLightRef.current.intensity, aiTarget, 0.08);
      }

      // Robotics District focal light
      const isRoboticsActive = selectedDistrict === 'robotics' || hoveredDistrict === 'robotics';
      const roboticsTarget = isRoboticsActive ? 3.8 : 1.9;
      if (roboticsLightRef.current) {
        roboticsLightRef.current.intensity = THREE.MathUtils.lerp(
          roboticsLightRef.current.intensity,
          roboticsTarget,
          0.08
        );
      }

      // Aerospace District focal light
      const isAerospaceActive = selectedDistrict === 'aerospace' || hoveredDistrict === 'aerospace';
      const aerospaceTarget = isAerospaceActive ? 3.6 : 1.8;
      if (aerospaceLightRef.current) {
        aerospaceLightRef.current.intensity = THREE.MathUtils.lerp(
          aerospaceLightRef.current.intensity,
          aerospaceTarget,
          0.08
        );
      }

      // Cybersecurity District focal light
      const isCyberActive = selectedDistrict === 'cyber' || hoveredDistrict === 'cyber';
      const cyberTarget = isCyberActive ? 3.6 : 1.8;
      if (cyberLightRef.current) {
        cyberLightRef.current.intensity = THREE.MathUtils.lerp(
          cyberLightRef.current.intensity,
          cyberTarget,
          0.08
        );
      }
    }
  });

  return (
    <group name="city-lighting">
      {/* 1. Natural Sky/Ground Hemisphere Ambient (Bright Sunny Daylight & Green Turf Bounce) */}
      <hemisphereLight
        args={['#e0f2fe', '#86a88e', 2.2]}
      />

      {/* 2. Soft Ambient Architectural Daylight Fill */}
      <ambientLight color="#e2ecf5" intensity={1.15} />

      {/* 3. Primary Key Directional Sunlight (Warm 5500K Sun with Crisp Shadows) */}
      <directionalLight
        position={[75, 120, 65]}
        intensity={3.5}
        color="#fffbf0"
        castShadow={settings.shadows}
        shadow-mapSize={settings.shadowMapSize}
        shadow-camera-near={15}
        shadow-camera-far={360}
        shadow-camera-left={-140}
        shadow-camera-right={140}
        shadow-camera-top={140}
        shadow-camera-bottom={-140}
        shadow-bias={-0.00015}
        shadow-normalBias={0.035}
      />

      {/* 4. Opposing Cool Sky Dome Fill Light (Natural Skylight Ambient) */}
      <directionalLight
        position={[-75, 65, -65]}
        intensity={1.6}
        color="#bae6fd"
      />

      {/* 5. Subtle Low-Angle Warm Architectural Edge Fill */}
      <directionalLight
        position={[60, 25, -60]}
        intensity={0.95}
        color="#fde68a"
      />

      {/* 6. Adaptive Accent Lights */}
      {settings.enablePointLights && (
        <>
          {/* Tower Crown Beacon Accent Light */}
          <pointLight
            ref={beaconLightRef}
            position={[0, 62, 0]}
            color={CITY_COLORS.electricCyan}
            distance={settings.tier === 'high' ? 110 : 70}
            decay={2}
            intensity={3.6}
          />

          {settings.pointLightCount === 'all' && (
            <>
              {/* Central Plaza Ground Light */}
              <pointLight
                ref={plazaLightRef}
                position={[0, 3.5, 0]}
                color={CITY_COLORS.primaryBlue}
                distance={70}
                decay={2}
                intensity={1.9}
              />

              {/* District Focal Accent Lights */}
              <pointLight
                ref={roboticsLightRef}
                position={[24, 14, -20]}
                color={CITY_COLORS.accentOrange}
                distance={60}
                decay={2}
                intensity={1.9}
              />
              <pointLight
                ref={aiLightRef}
                position={[-24, 14, -20]}
                color={CITY_COLORS.electricCyan}
                distance={60}
                decay={2}
                intensity={1.8}
              />
              <pointLight
                ref={aerospaceLightRef}
                position={[-24, 14, 22]}
                color={CITY_COLORS.primaryBlue}
                distance={60}
                decay={2}
                intensity={1.8}
              />
              <pointLight
                ref={cyberLightRef}
                position={[24, 14, 22]}
                color={CITY_COLORS.electricCyan}
                distance={60}
                decay={2}
                intensity={1.8}
              />
            </>
          )}
        </>
      )}
    </group>
  );
}
