import { useMemo } from 'react';
import * as THREE from 'three';
import {
  groundBaseMaterial,
  districtPlatformMaterial,
  platformBorderMaterial,
  metalExoskeletonMaterial,
  cyanGlowMaterial,
  futuristicPlanterMaterial,
  bioluminescentFloraMaterial,
} from '../materials';

/**
 * CityGround — Multi-tiered architectural city foundation (Refined Milestone 1.1)
 * - Primary bedrock foundation slab
 * - Raised district podium slabs with beveled perimeter coping
 * - Recessed glowing boundary ribbons
 * - Minimalist futuristic geometric planters with layered bioluminescent nodes
 */
export function CityGround() {
  // District platform layouts: [x, z, width, depth, height]
  const districtPlatforms = useMemo(
    () => [
      { id: 'ai-platform', pos: [-24, 0.45, -20] as const, size: [36, 0.9, 32] as const },
      { id: 'robotics-platform', pos: [24, 0.45, -20] as const, size: [34, 0.9, 34] as const },
      { id: 'aerospace-platform', pos: [-24, 0.45, 22] as const, size: [36, 0.9, 34] as const },
      { id: 'cybersecurity-platform', pos: [24, 0.45, 22] as const, size: [34, 0.9, 32] as const },
    ],
    []
  );

  // Geometric planter positions for minimalist landscaped courtyards
  const planterPositions = useMemo(
    () => [
      [-11, 0.9, -8],
      [11, 0.9, -8],
      [-11, 0.9, 8],
      [11, 0.9, 8],
      [-34, 0.9, 0],
      [34, 0.9, 0],
      [0, 0.9, -34],
      [0, 0.9, 34],
    ] as const,
    []
  );

  return (
    <group name="city-ground">
      {/* 1. Master City Bedrock Slab */}
      <mesh position={[0, -0.5, 0]} material={groundBaseMaterial} receiveShadow>
        <boxGeometry args={[180, 1.0, 180]} />
      </mesh>

      {/* 2. Architectural Sub-Floor Grid Matrix */}
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
          <mesh
            position={[0, plat.size[1] / 2 + 0.02, 0]}
            material={platformBorderMaterial}
          >
            <boxGeometry args={[plat.size[0] + 0.35, 0.08, plat.size[2] + 0.35]} />
          </mesh>
          <mesh
            position={[0, -plat.size[1] / 2 + 0.04, 0]}
            material={metalExoskeletonMaterial}
          >
            <boxGeometry args={[plat.size[0] + 0.2, 0.08, plat.size[2] + 0.2]} />
          </mesh>

          {/* Subtle perimeter glowing edge line */}
          <lineSegments position={[0, plat.size[1] / 2 + 0.06, 0]}>
            <edgesGeometry
              args={[new THREE.BoxGeometry(plat.size[0] + 0.12, 0.04, plat.size[2] + 0.12)]}
            />
            <lineBasicMaterial color="#39DDF4" transparent opacity={0.4} />
          </lineSegments>
        </group>
      ))}

      {/* 4. Minimalist Futuristic Landscaped Planters */}
      <group name="landscaped-green-spaces">
        {planterPositions.map((pos, idx) => (
          <group key={`landscaped-planter-${idx}`} position={[pos[0], pos[1], pos[2]]}>
            {/* Hexagonal geometric planter base */}
            <mesh material={futuristicPlanterMaterial} position={[0, 0.35, 0]}>
              <cylinderGeometry args={[2.2, 2.6, 0.7, 6]} />
            </mesh>
            {/* Planter cyan rim ring */}
            <mesh material={cyanGlowMaterial} position={[0, 0.71, 0]}>
              <ringGeometry args={[1.9, 2.15, 6]} />
            </mesh>
            {/* Minimalist stylized geometric foliage */}
            <mesh material={bioluminescentFloraMaterial} position={[0, 1.2, 0]}>
              <dodecahedronGeometry args={[1.25, 0]} />
            </mesh>
            {/* Accent micro-spire */}
            <mesh material={cyanGlowMaterial} position={[0, 2.1, 0]}>
              <octahedronGeometry args={[0.3, 0]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
