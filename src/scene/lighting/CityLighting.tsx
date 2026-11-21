import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CITY_COLORS } from '../materials';
import { useDistrict } from '../../context';

/**
 * CityLighting — Dynamic architectural lighting with soft shadows & district focal response (Milestone 3.0)
 *
 * Capabilities:
 * - Natural Sky/Ground Hemisphere Ambient eliminating pitch-black architectural surfaces
 * - Key high-angle directional light with configured soft shadow maps for depth & relief
 * - Dynamic spotlight response boosting the illumination of the selected/hovered district
 * - Breathing pulse on tower crown and plaza reflecting pool
 */
export function CityLighting() {
  const beaconLightRef = useRef<THREE.PointLight>(null);
  const plazaLightRef = useRef<THREE.PointLight>(null);
  const aiLightRef = useRef<THREE.PointLight>(null);
  const roboticsLightRef = useRef<THREE.PointLight>(null);
  const aerospaceLightRef = useRef<THREE.PointLight>(null);
  const cyberLightRef = useRef<THREE.PointLight>(null);

  const { selectedDistrict, hoveredDistrict } = useDistrict();

  // Dynamic light response and breathing animations
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Central Tower beacon & plaza
    const isCoreActive = selectedDistrict === 'core' || hoveredDistrict === 'core';
    const baseBeacon = isCoreActive ? 4.2 : 2.6;
    const basePlaza = isCoreActive ? 2.5 : 1.4;

    if (beaconLightRef.current) {
      const pulse = Math.sin(time * 2.0) * 0.4;
      beaconLightRef.current.intensity = THREE.MathUtils.lerp(
        beaconLightRef.current.intensity,
        baseBeacon + pulse,
        0.05
      );
    }
    if (plazaLightRef.current) {
      const pulse = Math.sin(time * 1.2) * 0.25;
      plazaLightRef.current.intensity = THREE.MathUtils.lerp(
        plazaLightRef.current.intensity,
        basePlaza + pulse,
        0.05
      );
    }

    // AI District focal light
    const isAiActive = selectedDistrict === 'ai' || hoveredDistrict === 'ai';
    const aiTarget = isAiActive ? 2.8 : 1.2;
    if (aiLightRef.current) {
      aiLightRef.current.intensity = THREE.MathUtils.lerp(aiLightRef.current.intensity, aiTarget, 0.08);
    }

    // Robotics District focal light
    const isRoboticsActive = selectedDistrict === 'robotics' || hoveredDistrict === 'robotics';
    const roboticsTarget = isRoboticsActive ? 3.0 : 1.25;
    if (roboticsLightRef.current) {
      roboticsLightRef.current.intensity = THREE.MathUtils.lerp(
        roboticsLightRef.current.intensity,
        roboticsTarget,
        0.08
      );
    }

    // Aerospace District focal light
    const isAerospaceActive = selectedDistrict === 'aerospace' || hoveredDistrict === 'aerospace';
    const aerospaceTarget = isAerospaceActive ? 2.8 : 1.1;
    if (aerospaceLightRef.current) {
      aerospaceLightRef.current.intensity = THREE.MathUtils.lerp(
        aerospaceLightRef.current.intensity,
        aerospaceTarget,
        0.08
      );
    }

    // Cybersecurity District focal light
    const isCyberActive = selectedDistrict === 'cyber' || hoveredDistrict === 'cyber';
    const cyberTarget = isCyberActive ? 2.8 : 1.1;
    if (cyberLightRef.current) {
      cyberLightRef.current.intensity = THREE.MathUtils.lerp(
        cyberLightRef.current.intensity,
        cyberTarget,
        0.08
      );
    }
  });

  return (
    <group name="city-lighting">
      {/* 1. Natural Sky/Ground Hemisphere Ambient (Bright Futurism Lift) */}
      <hemisphereLight
        args={['#589bf8', '#0b162a', 1.35]}
      />

      {/* 2. Soft Omnidirectional Shadow Fill */}
      <ambientLight color="#132847" intensity={0.75} />

      {/* 3. Primary Key Directional Light with Soft Shadows */}
      <directionalLight
        position={[70, 105, 65]}
        intensity={2.6}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={15}
        shadow-camera-far={260}
        shadow-camera-left={-90}
        shadow-camera-right={90}
        shadow-camera-top={90}
        shadow-camera-bottom={-90}
        shadow-bias={-0.0002}
        shadow-normalBias={0.03}
      />

      {/* 4. Contrasting Cyan Rim / Silhouette Fill Light */}
      <directionalLight
        position={[-70, 55, -60]}
        intensity={1.4}
        color={CITY_COLORS.electricCyan}
      />

      {/* 5. Tower Crown Beacon Accent Light */}
      <pointLight
        ref={beaconLightRef}
        position={[0, 62, 0]}
        color={CITY_COLORS.electricCyan}
        distance={100}
        decay={2}
        intensity={2.6}
      />

      {/* 6. Central Plaza Ground Light */}
      <pointLight
        ref={plazaLightRef}
        position={[0, 3.5, 0]}
        color={CITY_COLORS.primaryBlue}
        distance={60}
        decay={2}
        intensity={1.4}
      />

      {/* 7. Interactive District Focal Accent Lights */}
      {/* Robotics (Warm Industrial Amber) */}
      <pointLight
        ref={roboticsLightRef}
        position={[24, 12, -20]}
        color={CITY_COLORS.accentOrange}
        distance={55}
        decay={2}
        intensity={1.25}
      />
      {/* AI (Electric Cyan Computational Glow) */}
      <pointLight
        ref={aiLightRef}
        position={[-24, 12, -20]}
        color={CITY_COLORS.electricCyan}
        distance={55}
        decay={2}
        intensity={1.2}
      />
      {/* Aerospace (Primary Blue / Cyan Deep Space) */}
      <pointLight
        ref={aerospaceLightRef}
        position={[-24, 12, 22]}
        color={CITY_COLORS.primaryBlue}
        distance={55}
        decay={2}
        intensity={1.1}
      />
      {/* Cybersecurity (Cryptographic Cyan Firewall) */}
      <pointLight
        ref={cyberLightRef}
        position={[24, 12, 22]}
        color={CITY_COLORS.electricCyan}
        distance={55}
        decay={2}
        intensity={1.1}
      />
    </group>
  );
}
