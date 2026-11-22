import { useMemo } from 'react';
import * as THREE from 'three';
import {
  groundBaseMaterial,
  districtPlatformMaterial,
  platformBorderMaterial,
  metalExoskeletonMaterial,
  brushedAlloyMaterial,
  softSilverMaterial,
  cyanGlowMaterial,
  futuristicPlanterMaterial,
  bioluminescentFloraMaterial,
  warmGlowMaterial,
  structuralGlassMaterial,
  campusLawnMaterial,
  campusWoodBenchMaterial,
} from '../materials';
import { useDistrict, useGraphicsQuality } from '../../context';
import type { DistrictId } from '../../types/district';

/**
 * CityGround — Interconnected Futuristic University Campus Grounds (Milestone 5: Living Innovation City)
 *
 * Master-Planned Campus Expansion:
 * 1. Expansive 280m x 280m Master Campus Foundation Bed with subtle architectural grid
 * 2. Eight interconnected District & Departmental Podiums with live active-state highlighting
 * 3. Continuous Paved Pedestrian Concourses linking all 6 districts to Central Plaza
 * 4. Landscaped Campus Green Belts, Manicured Lawns, and Courtyards across the extended perimeter
 * 5. Tree-Lined Walkways with Shaded Campus Study Benches
 */
export function CityGround() {
  const { selectedDistrict, hoveredDistrict } = useDistrict();
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';

  // Master campus district platforms: [x, z, width, depth, height, districtId, color]
  const districtPlatforms = useMemo(
    () => [
      // ── DISTRICT C (Advanced Research Institutes) ──
      { id: 'ai-platform', districtId: 'ai' as DistrictId, pos: [-24, 0.45, -20] as const, size: [36, 0.9, 32] as const, color: '#246BFD' },
      { id: 'robotics-platform', districtId: 'robotics' as DistrictId, pos: [24, 0.45, -20] as const, size: [34, 0.9, 34] as const, color: '#FF9B54' },
      { id: 'aerospace-platform', districtId: 'aerospace' as DistrictId, pos: [-24, 0.45, 22] as const, size: [36, 0.9, 34] as const, color: '#39DDF4' },
      { id: 'cybersecurity-platform', districtId: 'cyber' as DistrictId, pos: [24, 0.45, 22] as const, size: [34, 0.9, 32] as const, color: '#246BFD' },

      // ── DISTRICT B (Academic District & Auditorium) ──
      { id: 'academic-platform', districtId: 'academic' as DistrictId, pos: [28, 0.45, -55] as const, size: [52, 0.9, 44] as const, color: '#38BDF8' },

      // ── DISTRICT D (Student Life & Residential District) ──
      { id: 'student-life-platform', districtId: 'student-life' as DistrictId, pos: [55, 0.45, 20] as const, size: [48, 0.9, 46] as const, color: '#F59E0B' },

      // ── DISTRICT E (Knowledge & Incubation District) ──
      { id: 'knowledge-platform', districtId: 'knowledge' as DistrictId, pos: [-55, 0.45, 18] as const, size: [46, 0.9, 44] as const, color: '#38BDF8' },

      // ── DISTRICT F (Recreation & Campus Lake District) ──
      { id: 'recreation-platform', districtId: 'recreation' as DistrictId, pos: [10, 0.45, 65] as const, size: [72, 0.9, 44] as const, color: '#10B981' },
    ],
    []
  );

  // Continuous Diagonal & Axial Pedestrian Concourse Spines connecting all districts to Central Plaza
  const campusConcourses = useMemo(
    () => [
      // Diagonal Concourse: AI Department to Central Plaza
      { pos: [-14.5, 0.46, -12.5] as const, size: [7.5, 0.9, 9] as const, rot: 0.65 },
      // Diagonal Concourse: Robotics Department to Central Plaza
      { pos: [14.5, 0.46, -12.5] as const, size: [7.5, 0.9, 9] as const, rot: -0.65 },
      // Diagonal Concourse: Aerospace Department to Central Plaza
      { pos: [-14.5, 0.46, 13.5] as const, size: [7.5, 0.9, 9] as const, rot: -0.65 },
      // Diagonal Concourse: Cybersecurity Department to Central Plaza
      { pos: [14.5, 0.46, 13.5] as const, size: [7.5, 0.9, 9] as const, rot: 0.65 },

      // Axial Connectors to Grand Plaza Steps
      { pos: [-9.5, 0.45, -20] as const, size: [9.0, 0.88, 5.5] as const, rot: 0 },
      { pos: [9.5, 0.45, -20] as const, size: [9.0, 0.88, 5.5] as const, rot: 0 },
      { pos: [-9.5, 0.45, 22] as const, size: [9.0, 0.88, 5.5] as const, rot: 0 },
      { pos: [9.5, 0.45, 22] as const, size: [9.0, 0.88, 5.5] as const, rot: 0 },

      // Concourse: Central Core to District B (Academic)
      { pos: [18, 0.46, -42] as const, size: [7.0, 0.9, 18] as const, rot: -0.4 },
      // Concourse: Central Core to District D (Student Life)
      { pos: [38, 0.46, 16] as const, size: [16, 0.9, 6.5] as const, rot: 0 },
      // Concourse: Central Core to District E (Knowledge & Incubation)
      { pos: [-38, 0.46, 16] as const, size: [16, 0.9, 6.5] as const, rot: 0 },
      // Concourse: Central Core to District F (Recreation & Lake)
      { pos: [8, 0.46, 42] as const, size: [6.5, 0.9, 16] as const, rot: 0 },
    ],
    []
  );

  // Campus Landscaped Green Lawns & Courtyard Pads
  const campusGreenLawns = useMemo(
    () => [
      // Central West Lawn
      { pos: [-17, 0.48, 1] as const, size: [8, 0.12, 16] as const },
      // Central East Lawn
      { pos: [17, 0.48, 1] as const, size: [8, 0.12, 16] as const },
      // North Campus Green Spine
      { pos: [0, 0.48, -24] as const, size: [14, 0.12, 7] as const },
      // South Campus Green Spine
      { pos: [0, 0.48, 26] as const, size: [14, 0.12, 7] as const },

      // Inter-Departmental Green Belts
      { pos: [-24, 0.48, 1] as const, size: [10, 0.12, 6] as const },
      { pos: [24, 0.48, 1] as const, size: [10, 0.12, 6] as const },

      // Outer Campus Buffer Lawns
      { pos: [36, 0.48, -32] as const, size: [16, 0.12, 8] as const },
      { pos: [45, 0.48, -4] as const, size: [8, 0.12, 18] as const },
      { pos: [-45, 0.48, -4] as const, size: [8, 0.12, 18] as const },
      { pos: [-12, 0.48, 48] as const, size: [20, 0.12, 8] as const },
      { pos: [30, 0.48, 48] as const, size: [20, 0.12, 8] as const },
    ],
    []
  );

  // Campus Tree-Lined Locations with Benches
  const campusTreesWithBenches = useMemo(
    () => [
      // West Lawn Trees
      [-17, 0.55, -4] as const,
      [-17, 0.55, 6] as const,
      // East Lawn Trees
      [17, 0.55, -4] as const,
      [17, 0.55, 6] as const,
      // North Lawn Trees
      [-4.5, 0.55, -24] as const,
      [4.5, 0.55, -24] as const,
      // South Lawn Trees
      [-4.5, 0.55, 26] as const,
      [4.5, 0.55, 26] as const,
      // Departmental Courtyards
      [-36, 0.9, -1] as const,
      [36, 0.9, -1] as const,
      [-11, 0.9, -7.5] as const,
      [11, 0.9, -7.5] as const,
      [-11, 0.9, 7.5] as const,
      [11, 0.9, 7.5] as const,

      // Expanded Campus Trees (Districts B, D, E, F perimeter)
      [18, 0.55, -34] as const,
      [38, 0.55, -34] as const,
      [45, 0.55, -2] as const,
      [45, 0.55, 12] as const,
      [-45, 0.55, -2] as const,
      [-45, 0.55, 12] as const,
      [-8, 0.55, 48] as const,
      [24, 0.55, 48] as const,
    ],
    []
  );

  return (
    <group name="city-ground">
      {/* ── 1. MASTER CAMPUS FOUNDATION BED (280m x 280m) ── */}
      <mesh position={[0, -0.6, 0]} material={groundBaseMaterial} receiveShadow>
        <boxGeometry args={[280, 1.2, 280]} />
      </mesh>

      {/* ── 2. ARCHITECTURAL CAMPUS SUB-FLOOR MATRIX ── */}
      <gridHelper
        args={[280, 56, '#18355e', '#091527']}
        position={[0, 0.02, 0]}
      />

      {/* ── 3. EIGHT DISTRICT & RESEARCH PODIUMS ── */}
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

      {/* ── 4. CONTINUOUS CAMPUS PEDESTRIAN CONCOURSES ── */}
      {campusConcourses.map((concourse, idx) => (
        <group
          key={`campus-concourse-${idx}`}
          position={[concourse.pos[0], concourse.pos[1], concourse.pos[2]]}
          rotation={[0, concourse.rot, 0]}
        >
          <mesh material={districtPlatformMaterial} receiveShadow>
            <boxGeometry args={[concourse.size[0], concourse.size[1], concourse.size[2]]} />
          </mesh>
          {/* Cyan Inset Pedestrian Navigation Ribbon */}
          <mesh position={[0, concourse.size[1] / 2 + 0.02, 0]} material={cyanGlowMaterial}>
            <boxGeometry args={[concourse.size[0] - 0.6, 0.02, 0.14]} />
          </mesh>
          {/* Subtle Outer Curb */}
          <mesh position={[0, concourse.size[1] / 2 + 0.03, 0]} material={softSilverMaterial}>
            <boxGeometry args={[concourse.size[0] + 0.1, 0.02, concourse.size[2] + 0.1]} />
          </mesh>
        </group>
      ))}

      {/* ── 5. CAMPUS GREEN LAWNS & COURTYARDS ── */}
      <group name="campus-green-lawns">
        {campusGreenLawns.map((lawn, idx) => (
          <group key={`campus-lawn-${idx}`} position={[lawn.pos[0], lawn.pos[1], lawn.pos[2]]}>
            <mesh material={campusLawnMaterial} receiveShadow={settings.shadows}>
              <boxGeometry args={[lawn.size[0], lawn.size[1], lawn.size[2]]} />
            </mesh>
            {/* Lawn Low Concrete / Alloy Border Curb */}
            <mesh position={[0, 0.07, 0]} material={softSilverMaterial}>
              <boxGeometry args={[lawn.size[0] + 0.3, 0.06, lawn.size[2] + 0.3]} />
            </mesh>
            {/* Soft Green Turf Boundary Accent */}
            <mesh position={[0, 0.08, 0]} material={cyanGlowMaterial}>
              <boxGeometry args={[lawn.size[0] + 0.32, 0.01, 0.06]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── 6. CAMPUS TREES, PLANTERS & STUDENT STUDY BENCHES ── */}
      <group name="campus-trees-and-commons">
        {campusTreesWithBenches.map((pos, idx) => (
          <group key={`campus-tree-node-${idx}`} position={[pos[0], pos[1], pos[2]]}>
            {/* Geometric Planter Base */}
            <mesh material={futuristicPlanterMaterial} position={[0, 0.35, 0]} receiveShadow castShadow={shouldCastShadow}>
              <cylinderGeometry args={[1.8, 2.2, 0.7, 6]} />
            </mesh>
            <mesh material={cyanGlowMaterial} position={[0, 0.71, 0]}>
              <ringGeometry args={[1.6, 1.8, 6]} />
            </mesh>

            {/* Campus Wood Study Bench encircling the planter */}
            <mesh material={campusWoodBenchMaterial} position={[0, 0.3, 0]} castShadow={shouldCastShadow}>
              <ringGeometry args={[2.3, 2.9, 6]} />
            </mesh>

            {/* Futuristic Bio-Tree Trunk */}
            <mesh position={[0, 1.3, 0]} material={brushedAlloyMaterial} castShadow={shouldCastShadow}>
              <cylinderGeometry args={[0.18, 0.32, 2.0, 6]} />
            </mesh>
            {/* Geometric Foliage Canopy */}
            <mesh material={bioluminescentFloraMaterial} position={[0, 2.6, 0]} castShadow={shouldCastShadow}>
              <dodecahedronGeometry args={[1.4, 0]} />
            </mesh>
            <mesh material={structuralGlassMaterial} position={[0, 2.6, 0]}>
              <dodecahedronGeometry args={[1.46, 0]} />
            </mesh>

            {/* Glowing Flora Core Node */}
            <mesh material={cyanGlowMaterial} position={[0, 2.6, 0]}>
              <octahedronGeometry args={[0.38, 0]} />
            </mesh>
            {/* Warm Seating Accent Downlight */}
            <mesh material={warmGlowMaterial} position={[0, 0.72, 0]}>
              <ringGeometry args={[1.85, 1.9, 6]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

export default CityGround;
