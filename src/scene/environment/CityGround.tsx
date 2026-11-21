import { useMemo } from 'react';
import * as THREE from 'three';
import {
  groundBaseMaterial,
  districtPlatformMaterial,
  platformBorderMaterial,
  metalExoskeletonMaterial,
  brushedAlloyMaterial,
  cyanGlowMaterial,
  futuristicPlanterMaterial,
  bioluminescentFloraMaterial,
  warmGlowMaterial,
  structuralGlassMaterial,
} from '../materials';
import { useDistrict } from '../../context';

/**
 * CityGround — Multi-tiered architectural city foundation & civic courtyards (Milestone 3.0 Interactive)
 *
 * Enhancements:
 * - Master foundation slab with subtle architectural expansion joints
 * - Raised district podium slabs with dynamic selection highlight responses
 * - Pedestrian connecting walkways bridging platforms to arterial avenues
 * - Stylized futuristic bio-canopies (solar trees) with integrated civic seating benches
 */
export function CityGround() {
  const { selectedDistrict, hoveredDistrict } = useDistrict();

  // District platform layouts: [x, z, width, depth, height]
  const districtPlatforms = useMemo(
    () => [
      { id: 'ai-platform', districtId: 'ai', pos: [-24, 0.45, -20] as const, size: [36, 0.9, 32] as const, color: '#246BFD' },
      { id: 'robotics-platform', districtId: 'robotics', pos: [24, 0.45, -20] as const, size: [34, 0.9, 34] as const, color: '#FF9B54' },
      { id: 'aerospace-platform', districtId: 'aerospace', pos: [-24, 0.45, 22] as const, size: [36, 0.9, 34] as const, color: '#39DDF4' },
      { id: 'cybersecurity-platform', districtId: 'cyber', pos: [24, 0.45, 22] as const, size: [34, 0.9, 32] as const, color: '#246BFD' },
    ],
    []
  );

  // Civic courtyard planter locations with bio-canopy trees
  const planterPositions = useMemo(
    () => [
      [-11, 0.9, -8],
      [11, 0.9, -8],
      [-11, 0.9, 8],
      [11, 0.9, 8],
      [-36, 0.9, 0],
      [36, 0.9, 0],
      [0, 0.9, -36],
      [0, 0.9, 36],
      [-24, 0.9, -38],
      [24, 0.9, -38],
      [-24, 0.9, 40],
      [24, 0.9, 40],
    ] as const,
    []
  );

  // Pedestrian walkways connecting platforms to arterial roads
  const pedestrianWalkways = useMemo(
    () => [
      // AI to Central Avenue
      { pos: [-10, 0.45, -20] as const, size: [8, 0.88, 5] as const },
      // Robotics to Central Avenue
      { pos: [10, 0.45, -20] as const, size: [8, 0.88, 5] as const },
      // Aerospace to Central Avenue
      { pos: [-10, 0.45, 22] as const, size: [8, 0.88, 5] as const },
      // Cybersecurity to Central Avenue
      { pos: [10, 0.45, 22] as const, size: [8, 0.88, 5] as const },
    ],
    []
  );

  return (
    <group name="city-ground">
      {/* 1. Master City Bedrock Foundation Slab */}
      <mesh position={[0, -0.5, 0]} material={groundBaseMaterial} receiveShadow>
        <boxGeometry args={[190, 1.0, 190]} />
      </mesh>

      {/* 2. Architectural Sub-Floor Grid Matrix */}
      <gridHelper
        args={[190, 48, '#18355e', '#091527']}
        position={[0, 0.02, 0]}
      />

      {/* 3. Raised District Platform Podiums */}
      {districtPlatforms.map((plat) => {
        const isActive = selectedDistrict === plat.districtId;
        const isHovered = hoveredDistrict === plat.districtId;

        return (
          <group key={plat.id} position={[plat.pos[0], plat.pos[1], plat.pos[2]]}>
            {/* Main platform slab */}
            <mesh material={districtPlatformMaterial} receiveShadow castShadow>
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

            {/* Perimeter glowing edge line with dynamic highlight response */}
            <lineSegments position={[0, plat.size[1] / 2 + 0.06, 0]}>
              <edgesGeometry
                args={[new THREE.BoxGeometry(plat.size[0] + 0.15, 0.04, plat.size[2] + 0.15)]}
              />
              <lineBasicMaterial
                color={isActive ? plat.color : '#39DDF4'}
                transparent
                opacity={isActive ? 0.95 : isHovered ? 0.75 : 0.4}
              />
            </lineSegments>
          </group>
        );
      })}

      {/* 4. Pedestrian Access Ramps / Walkways */}
      {pedestrianWalkways.map((walkway, idx) => (
        <group key={`walkway-${idx}`} position={[walkway.pos[0], walkway.pos[1], walkway.pos[2]]}>
          <mesh material={districtPlatformMaterial} receiveShadow>
            <boxGeometry args={[walkway.size[0], walkway.size[1], walkway.size[2]]} />
          </mesh>
          {/* Cyan Inset Guide Ribbon */}
          <mesh position={[0, walkway.size[1] / 2 + 0.02, 0]} material={cyanGlowMaterial}>
            <boxGeometry args={[walkway.size[0] - 0.5, 0.02, 0.12]} />
          </mesh>
        </group>
      ))}

      {/* 5. Minimalist Futuristic Landscaped Bio-Canopies (Solar Trees) */}
      <group name="landscaped-green-spaces">
        {planterPositions.map((pos, idx) => (
          <group key={`landscaped-planter-${idx}`} position={[pos[0], pos[1], pos[2]]}>
            {/* Hexagonal geometric planter base */}
            <mesh material={futuristicPlanterMaterial} position={[0, 0.35, 0]} receiveShadow castShadow>
              <cylinderGeometry args={[2.2, 2.6, 0.7, 6]} />
            </mesh>
            {/* Planter cyan rim ring */}
            <mesh material={cyanGlowMaterial} position={[0, 0.71, 0]}>
              <ringGeometry args={[1.9, 2.15, 6]} />
            </mesh>
            {/* Civic Seating Bench surrounding the planter */}
            <mesh material={brushedAlloyMaterial} position={[0, 0.3, 0]}>
              <ringGeometry args={[2.7, 3.2, 6]} />
            </mesh>

            {/* Futuristic Bio-Tree Trunk & Canopy */}
            <mesh position={[0, 1.2, 0]} material={brushedAlloyMaterial} castShadow>
              <cylinderGeometry args={[0.2, 0.35, 1.8, 6]} />
            </mesh>
            {/* Stylized Geometric Translucent Foliage Canopy */}
            <mesh material={bioluminescentFloraMaterial} position={[0, 2.4, 0]} castShadow>
              <dodecahedronGeometry args={[1.35, 0]} />
            </mesh>
            <mesh material={structuralGlassMaterial} position={[0, 2.4, 0]}>
              <dodecahedronGeometry args={[1.42, 0]} />
            </mesh>

            {/* Glowing Flora Core Node */}
            <mesh material={cyanGlowMaterial} position={[0, 2.4, 0]}>
              <octahedronGeometry args={[0.4, 0]} />
            </mesh>
            {/* Warm Seating Accent Downlight */}
            <mesh material={warmGlowMaterial} position={[0, 0.72, 0]}>
              <ringGeometry args={[2.2, 2.25, 6]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
