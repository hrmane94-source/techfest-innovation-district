import { useMemo } from 'react';
import * as THREE from 'three';
import {
  groundBaseMaterial,
  districtPlatformMaterial,
  platformBorderMaterial,
  cyanGlowMaterial,
  futuristicPlanterMaterial,
  bioluminescentFloraMaterial,
} from '../materials';

/**
 * CityGround — Multi-tiered architectural city foundation
 * - Primary bedrock foundation slab
 * - Raised district podium slabs
 * - Subtle perimeter cyan edge lighting
 * - Minimal futuristic geometric planters & vegetation courtyards
 */
export function CityGround() {
  // District platform layouts: [x, z, width, depth, height]
  const districtPlatforms = useMemo(
    () => [
      { id: 'ai-platform', pos: [-24, 0.4, -20] as const, size: [36, 0.8, 32] as const },
      { id: 'robotics-platform', pos: [24, 0.4, -20] as const, size: [34, 0.8, 34] as const },
      { id: 'aerospace-platform', pos: [-24, 0.4, 22] as const, size: [36, 0.8, 34] as const },
      { id: 'cybersecurity-platform', pos: [24, 0.4, 22] as const, size: [34, 0.8, 32] as const },
    ],
    []
  );

  // Geometric planter positions for minimalist landscaped spaces
  const planterPositions = useMemo(
    () => [
      [-10, 0.8, -8],
      [10, 0.8, -8],
      [-10, 0.8, 8],
      [10, 0.8, 8],
      [-32, 0.8, 0],
      [32, 0.8, 0],
      [0, 0.8, -32],
      [0, 0.8, 32],
    ] as const,
    []
  );

  return (
    <group name="city-ground">
      {/* 1. Master City Bedrock Slab */}
      <mesh position={[0, -0.5, 0]} material={groundBaseMaterial} receiveShadow>
        <boxGeometry args={[180, 1.0, 180]} />
      </mesh>

      {/* 2. Architectural Sub-Floor Grid Trim */}
      <gridHelper
        args={[180, 45, '#162b4c', '#091527']}
        position={[0, 0.02, 0]}
      />

      {/* 3. Raised District Platform Podiums */}
      {districtPlatforms.map((plat) => (
        <group key={plat.id} position={[plat.pos[0], plat.pos[1], plat.pos[2]]}>
          {/* Main platform slab */}
          <mesh material={districtPlatformMaterial} receiveShadow>
            <boxGeometry args={[plat.size[0], plat.size[1], plat.size[2]]} />
          </mesh>

          {/* Platform beveled metallic perimeter trim */}
          <mesh position={[0, plat.size[1] / 2 + 0.02, 0]} material={platformBorderMaterial}>
            <boxGeometry args={[plat.size[0] + 0.3, 0.08, plat.size[2] + 0.3]} />
          </mesh>

          {/* Subtle perimeter glowing edge line */}
          <lineSegments position={[0, plat.size[1] / 2 + 0.06, 0]}>
            <edgesGeometry
              args={[new THREE.BoxGeometry(plat.size[0] + 0.1, 0.04, plat.size[2] + 0.1)]}
            />
            <lineBasicMaterial color="#39DDF4" transparent opacity={0.35} />
          </lineSegments>
        </group>
      ))}

      {/* 4. Minimalist Futuristic Landscaped Planters */}
      <group name="landscaped-green-spaces">
        {planterPositions.map((pos, idx) => (
          <group key={`planter-${idx}`} position={[pos[0], pos[1], pos[2]]}>
            {/* Hexagonal / octagonal geometric planter box */}
            <mesh material={futuristicPlanterMaterial} position={[0, 0.3, 0]}>
              <cylinderGeometry args={[2.2, 2.5, 0.6, 6]} />
            </mesh>
            {/* Planter cyan rim ring */}
            <mesh material={cyanGlowMaterial} position={[0, 0.61, 0]}>
              <ringGeometry args={[1.9, 2.1, 6]} />
            </mesh>
            {/* Minimalist stylized geometric foliage */}
            <mesh material={bioluminescentFloraMaterial} position={[0, 1.1, 0]}>
              <dodecahedronGeometry args={[1.2, 0]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
