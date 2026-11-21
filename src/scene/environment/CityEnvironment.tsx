import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CITY_COLORS } from '../materials';

// Pre-generate deterministic particle data outside component render
function createParticleData() {
  const count = 250;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const cyan = new THREE.Color(CITY_COLORS.electricCyan);
  const blue = new THREE.Color(CITY_COLORS.primaryBlue);

  // Deterministic LCG pseudo-random generator
  let seed = 12345;
  const prng = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < count; i++) {
    pos[i * 3] = (prng() - 0.5) * 140;
    pos[i * 3 + 1] = 2 + prng() * 55;
    pos[i * 3 + 2] = (prng() - 0.5) * 140;

    const chosenColor = prng() > 0.3 ? cyan : blue;
    col[i * 3] = chosenColor.r;
    col[i * 3 + 1] = chosenColor.g;
    col[i * 3 + 2] = chosenColor.b;
  }

  return { positions: pos, colors: col };
}

const STATIC_PARTICLE_DATA = createParticleData();

/**
 * CityEnvironment — Atmospheric fog, background color, and subtle floating energy dust
 */
export function CityEnvironment() {
  const pointsRef = useRef<THREE.Points>(null);

  // Gentle particle drift
  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < array.length / 3; i++) {
      array[i * 3 + 1] -= delta * 0.8;
      if (array[i * 3 + 1] < 2) {
        array[i * 3 + 1] = 55;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <>
      <color attach="background" args={[CITY_COLORS.bgPrimary]} />
      <fog attach="fog" args={[CITY_COLORS.bgPrimary, 45, 230]} />

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[STATIC_PARTICLE_DATA.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[STATIC_PARTICLE_DATA.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.6}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
