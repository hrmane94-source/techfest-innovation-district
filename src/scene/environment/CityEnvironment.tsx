import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CITY_COLORS } from '../materials';
import { useGraphicsQuality } from '../../context';

// Pre-generate deterministic natural atmospheric dust motes
function createParticleData(maxCount = 200) {
  const pos = new Float32Array(maxCount * 3);
  const col = new Float32Array(maxCount * 3);
  const softWhite = new THREE.Color('#f8fafc');
  const softSky = new THREE.Color('#93c5fd');

  let seed = 12345;
  const prng = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < maxCount; i++) {
    pos[i * 3] = (prng() - 0.5) * 160;
    pos[i * 3 + 1] = 2 + prng() * 45;
    pos[i * 3 + 2] = (prng() - 0.5) * 160;

    const chosenColor = prng() > 0.4 ? softWhite : softSky;
    col[i * 3] = chosenColor.r;
    col[i * 3 + 1] = chosenColor.g;
    col[i * 3 + 2] = chosenColor.b;
  }

  return { positions: pos, colors: col };
}

const STATIC_PARTICLE_DATA = createParticleData(200);

/**
 * CityEnvironment — Atmospheric fog, background color, and subtle floating daylight motes
 */
export function CityEnvironment() {
  const pointsRef = useRef<THREE.Points>(null);
  const { settings } = useGraphicsQuality();

  const particleData = useMemo(() => {
    const count = Math.min(200, settings.particleCount);
    if (count <= 0) return null;
    return {
      positions: STATIC_PARTICLE_DATA.positions.subarray(0, count * 3),
      colors: STATIC_PARTICLE_DATA.colors.subarray(0, count * 3),
    };
  }, [settings.particleCount]);

  // Zero-CPU-allocation particle motion (rotates object matrix, no GPU buffer re-upload)
  useFrame((_, delta) => {
    if (!pointsRef.current || !settings.enableSecondaryAnimations) return;
    pointsRef.current.rotation.y += delta * 0.010;
  });

  return (
    <>
      <color attach="background" args={[CITY_COLORS.bgPrimary]} />
      {/* Calibrated architectural fog range (220m to 680m): keeps all 6 districts crystal-clear while smoothly blending the vast 680m landscape apron into the sunny daylight sky */}
      <fog attach="fog" args={[CITY_COLORS.bgPrimary, 220, 680]} />

      {particleData && (
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particleData.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[particleData.colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.35}
            vertexColors
            transparent
            opacity={0.22}
            sizeAttenuation
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </points>
      )}
    </>
  );
}
