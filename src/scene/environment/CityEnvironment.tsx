import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CITY_COLORS } from '../materials';
import { useGraphicsQuality } from '../../context';

// Pre-generate deterministic particle data outside component render
function createParticleData(maxCount = 250) {
  const pos = new Float32Array(maxCount * 3);
  const col = new Float32Array(maxCount * 3);
  const cyan = new THREE.Color(CITY_COLORS.electricCyan);
  const blue = new THREE.Color(CITY_COLORS.primaryBlue);

  let seed = 12345;
  const prng = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < maxCount; i++) {
    pos[i * 3] = (prng() - 0.5) * 140;
    pos[i * 3 + 1] = 2 + prng() * 55;
    pos[i * 3 + 2] = (prng() - 0.5) * 140;

    const chosenColor = prng() > 0.4 ? cyan : prng() > 0.2 ? blue : new THREE.Color('#FFFFFF');
    col[i * 3] = chosenColor.r;
    col[i * 3 + 1] = chosenColor.g;
    col[i * 3 + 2] = chosenColor.b;
  }

  return { positions: pos, colors: col };
}

const STATIC_PARTICLE_DATA = createParticleData(250);

/**
 * CityEnvironment — Atmospheric fog, background color, and optimized floating energy dust
 */
export function CityEnvironment() {
  const pointsRef = useRef<THREE.Points>(null);
  const { settings } = useGraphicsQuality();

  const particleData = useMemo(() => {
    const count = Math.min(250, settings.particleCount);
    if (count <= 0) return null;
    return {
      positions: STATIC_PARTICLE_DATA.positions.subarray(0, count * 3),
      colors: STATIC_PARTICLE_DATA.colors.subarray(0, count * 3),
    };
  }, [settings.particleCount]);

  // Zero-CPU-allocation particle motion (rotates object matrix, no GPU buffer re-upload)
  useFrame((_, delta) => {
    if (!pointsRef.current || !settings.enableSecondaryAnimations) return;
    pointsRef.current.rotation.y += delta * 0.015;
  });

  return (
    <>
      <color attach="background" args={[CITY_COLORS.bgPrimary]} />
      {/* Broad calibrated fog range (110 to 420) ensures crystal-clear architecture while gently blending deep horizon */}
      <fog attach="fog" args={[CITY_COLORS.bgPrimary, 110, 420]} />

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
            size={0.55}
            vertexColors
            transparent
            opacity={0.45}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}
    </>
  );
}
