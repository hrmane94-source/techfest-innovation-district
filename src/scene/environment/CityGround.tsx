import { useMemo } from 'react';
import * as THREE from 'three';
import {
  groundBaseMaterial,
  districtPlatformMaterial,
  platformBorderMaterial,
  softSilverMaterial,
  pearlWhiteMaterial,
  campusLawnMaterial,
  campusWoodBenchMaterial,
  soilBedMaterial,
  treeBarkMaterial,
  naturalFoliagePrimaryMaterial,
  naturalFoliageSecondaryMaterial,
  naturalFoliageAccentMaterial,
  warmGlowMaterial,
  sandstoneMaterial,
  warmBeigeMaterial,
  creamStoneMaterial,
  warmStoneMaterial,
  teakTimberMaterial,
  floweringLavenderMaterial,
  floweringMagentaMaterial,
  floweringGoldMaterial,
  warmPlazaPavingMaterial,
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

  // Master campus district platforms: [x, z, width, depth, height, districtId, color, mat, borderMat]
  const districtPlatforms = useMemo(
    () => [
      // ── DISTRICT C (Advanced Research Institutes) ──
      { id: 'ai-platform', districtId: 'ai' as DistrictId, pos: [-24, 0.45, -20] as const, size: [36, 0.9, 32] as const, color: '#246BFD', mat: districtPlatformMaterial, borderMat: platformBorderMaterial },
      { id: 'robotics-platform', districtId: 'robotics' as DistrictId, pos: [24, 0.45, -20] as const, size: [34, 0.9, 34] as const, color: '#FF9B54', mat: districtPlatformMaterial, borderMat: platformBorderMaterial },
      { id: 'aerospace-platform', districtId: 'aerospace' as DistrictId, pos: [-24, 0.45, 22] as const, size: [36, 0.9, 34] as const, color: '#39DDF4', mat: districtPlatformMaterial, borderMat: platformBorderMaterial },
      { id: 'cybersecurity-platform', districtId: 'cyber' as DistrictId, pos: [24, 0.45, 22] as const, size: [34, 0.9, 32] as const, color: '#246BFD', mat: districtPlatformMaterial, borderMat: platformBorderMaterial },

      // ── DISTRICT B (Academic District & Auditorium - Warm Sandstone) ──
      { id: 'academic-platform', districtId: 'academic' as DistrictId, pos: [28, 0.45, -55] as const, size: [52, 0.9, 44] as const, color: '#C8644A', mat: sandstoneMaterial, borderMat: warmPlazaPavingMaterial },

      // ── DISTRICT D (Student Life & Residential District - Warm Beige & Timber) ──
      { id: 'student-life-platform', districtId: 'student-life' as DistrictId, pos: [55, 0.45, 20] as const, size: [48, 0.9, 46] as const, color: '#F59E0B', mat: warmBeigeMaterial, borderMat: teakTimberMaterial },

      // ── DISTRICT E (Knowledge & Incubation District - Cream Stone & Teal) ──
      { id: 'knowledge-platform', districtId: 'knowledge' as DistrictId, pos: [-55, 0.45, 18] as const, size: [46, 0.9, 44] as const, color: '#0D9488', mat: creamStoneMaterial, borderMat: warmPlazaPavingMaterial },

      // ── DISTRICT F (Recreation & Campus Lake District - Warm Stone & Green) ──
      { id: 'recreation-platform', districtId: 'recreation' as DistrictId, pos: [10, 0.45, 65] as const, size: [72, 0.9, 44] as const, color: '#10B981', mat: warmStoneMaterial, borderMat: warmPlazaPavingMaterial },
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

  // Natural Park & Lakeside Tree Groves (Free-standing in turf)
  const naturalParkTrees = useMemo(
    () => [
      // Lakeside grove along District F
      [-26, 0.52, 58] as const,
      [-20, 0.52, 68] as const,
      [-4, 0.52, 74] as const,
      [18, 0.52, 72] as const,
      [36, 0.52, 64] as const,
      // North academic quad trees along District B
      [14, 0.52, -68] as const,
      [38, 0.52, -68] as const,
      [42, 0.52, -45] as const,
      // Knowledge district reading grove along District E
      [-64, 0.52, 12] as const,
      [-64, 0.52, 26] as const,
      [-48, 0.52, 32] as const,
      // Student life social lawn grove along District D
      [68, 0.52, 12] as const,
      [68, 0.52, 28] as const,
      [58, 0.52, 36] as const,
    ],
    []
  );

  // Colorful Botanical Flower Beds (Lavender ribbons, golden marigolds, magenta azaleas)
  const campusFlowerBeds = useMemo(
    () => [
      // Central plaza entrance flower beds
      { pos: [-12, 0.52, -2] as const, size: [2.4, 0.18, 8] as const, mat: floweringLavenderMaterial },
      { pos: [12, 0.52, -2] as const, size: [2.4, 0.18, 8] as const, mat: floweringLavenderMaterial },
      { pos: [-12, 0.52, 8] as const, size: [2.4, 0.18, 6] as const, mat: floweringGoldMaterial },
      { pos: [12, 0.52, 8] as const, size: [2.4, 0.18, 6] as const, mat: floweringGoldMaterial },
      // Academic quad flower beds (terracotta & magenta)
      { pos: [20, 0.52, -62] as const, size: [12, 0.18, 2.5] as const, mat: floweringMagentaMaterial },
      { pos: [36, 0.52, -62] as const, size: [12, 0.18, 2.5] as const, mat: floweringGoldMaterial },
      // Student life social garden (lavender & gold)
      { pos: [48, 0.52, 34] as const, size: [8, 0.18, 3.2] as const, mat: floweringLavenderMaterial },
      { pos: [62, 0.52, 34] as const, size: [8, 0.18, 3.2] as const, mat: floweringMagentaMaterial },
      // Knowledge district reading gardens (lavender & magenta)
      { pos: [-58, 0.52, 28] as const, size: [10, 0.18, 2.8] as const, mat: floweringLavenderMaterial },
      { pos: [-46, 0.52, 28] as const, size: [6, 0.18, 2.8] as const, mat: floweringGoldMaterial },
      // Lakeside promenade botanical border
      { pos: [-8, 0.52, 54] as const, size: [18, 0.18, 2.2] as const, mat: floweringMagentaMaterial },
      { pos: [22, 0.52, 54] as const, size: [16, 0.18, 2.2] as const, mat: floweringLavenderMaterial },
    ],
    []
  );

  return (
    <group name="city-ground">
      {/* ── 1. MASTER CAMPUS FOUNDATION BED (280m x 280m Natural Green Park Terrain) ── */}
      <mesh position={[0, -0.6, 0]} material={groundBaseMaterial} receiveShadow>
        <boxGeometry args={[280, 1.2, 280]} />
      </mesh>

      {/* ── 2. EIGHT DISTRICT & RESEARCH PODIUMS WITH DISTRICT MATERIALS ── */}
      {districtPlatforms.map((plat) => {
        const isActive = selectedDistrict === plat.districtId;
        const isHovered = hoveredDistrict === plat.districtId;

        return (
          <group key={plat.id} position={[plat.pos[0], plat.pos[1], plat.pos[2]]}>
            {/* Main platform slab with district material */}
            <mesh material={plat.mat} receiveShadow castShadow>
              <boxGeometry args={[plat.size[0], plat.size[1], plat.size[2]]} />
            </mesh>

            {/* Platform perimeter coping trim */}
            <mesh
              position={[0, plat.size[1] / 2 + 0.02, 0]}
              material={plat.borderMat}
            >
              <boxGeometry args={[plat.size[0] + 0.35, 0.08, plat.size[2] + 0.35]} />
            </mesh>
            <mesh
              position={[0, -plat.size[1] / 2 + 0.04, 0]}
              material={softSilverMaterial}
            >
              <boxGeometry args={[plat.size[0] + 0.2, 0.08, plat.size[2] + 0.2]} />
            </mesh>

            {/* Perimeter edge highlight with refined dynamic response */}
            <lineSegments position={[0, plat.size[1] / 2 + 0.06, 0]}>
              <edgesGeometry
                args={[new THREE.BoxGeometry(plat.size[0] + 0.15, 0.04, plat.size[2] + 0.15)]}
              />
              <lineBasicMaterial
                color={isActive ? plat.color : '#60A5FA'}
                transparent
                opacity={isActive ? 0.95 : isHovered ? 0.75 : 0.25}
              />
            </lineSegments>
          </group>
        );
      })}

      {/* ── 3. CONTINUOUS WARM PEDESTRIAN CONCOURSES ── */}
      {campusConcourses.map((concourse, idx) => (
        <group
          key={`campus-concourse-${idx}`}
          position={[concourse.pos[0], concourse.pos[1], concourse.pos[2]]}
          rotation={[0, concourse.rot, 0]}
        >
          <mesh material={warmPlazaPavingMaterial} receiveShadow>
            <boxGeometry args={[concourse.size[0], concourse.size[1], concourse.size[2]]} />
          </mesh>
          {/* Honed Architectural Stone Center Runner */}
          <mesh position={[0, concourse.size[1] / 2 + 0.02, 0]} material={sandstoneMaterial}>
            <boxGeometry args={[concourse.size[0] - 0.6, 0.02, 0.22]} />
          </mesh>
          {/* Subtle Outer Curb */}
          <mesh position={[0, concourse.size[1] / 2 + 0.03, 0]} material={softSilverMaterial}>
            <boxGeometry args={[concourse.size[0] + 0.1, 0.02, concourse.size[2] + 0.1]} />
          </mesh>
        </group>
      ))}

      {/* ── 4. COLORFUL BOTANICAL FLOWER BEDS ── */}
      <group name="campus-flower-beds">
        {campusFlowerBeds.map((bed, idx) => (
          <group key={`flower-bed-${idx}`} position={[bed.pos[0], bed.pos[1], bed.pos[2]]}>
            <mesh material={bed.mat} receiveShadow castShadow={shouldCastShadow}>
              <boxGeometry args={[bed.size[0], bed.size[1], bed.size[2]]} />
            </mesh>
            {/* Low Stone Retaining Curb */}
            <mesh position={[0, 0.02, 0]} material={warmPlazaPavingMaterial}>
              <boxGeometry args={[bed.size[0] + 0.25, 0.14, bed.size[2] + 0.25]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── 5. CAMPUS GREEN LAWNS & COURTYARDS ── */}
      <group name="campus-green-lawns">
        {campusGreenLawns.map((lawn, idx) => (
          <group key={`campus-lawn-${idx}`} position={[lawn.pos[0], lawn.pos[1], lawn.pos[2]]}>
            <mesh material={campusLawnMaterial} receiveShadow={settings.shadows}>
              <boxGeometry args={[lawn.size[0], lawn.size[1], lawn.size[2]]} />
            </mesh>
            {/* Lawn Precast Concrete Border Curb */}
            <mesh position={[0, 0.07, 0]} material={softSilverMaterial}>
              <boxGeometry args={[lawn.size[0] + 0.3, 0.06, lawn.size[2] + 0.3]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── 6. ARCHITECTURAL PLAZA TREES, PLANTERS & BENCHES ── */}
      <group name="campus-trees-and-commons">
        {campusTreesWithBenches.map((pos, idx) => {
          const treeScale = 0.9 + ((idx * 7) % 5) * 0.06;
          return (
            <group key={`campus-tree-node-${idx}`} position={[pos[0], pos[1], pos[2]]} scale={[treeScale, treeScale, treeScale]}>
              {/* Precast Concrete Circular Planter Base */}
              <mesh material={pearlWhiteMaterial} position={[0, 0.28, 0]} receiveShadow castShadow={shouldCastShadow}>
                <cylinderGeometry args={[1.7, 1.9, 0.55, 16]} />
              </mesh>
              {/* Rich Potting Soil Bed */}
              <mesh material={soilBedMaterial} position={[0, 0.54, 0]}>
                <cylinderGeometry args={[1.55, 1.55, 0.08, 16]} />
              </mesh>

              {/* Natural Teak Wood Study Bench encircling the planter */}
              <mesh material={campusWoodBenchMaterial} position={[0, 0.32, 0]} castShadow={shouldCastShadow}>
                <ringGeometry args={[2.0, 2.6, 16]} />
              </mesh>
              {/* Bench Under-frame Brackets */}
              <mesh material={softSilverMaterial} position={[0, 0.16, 0]}>
                <cylinderGeometry args={[2.02, 2.02, 0.28, 16, 1, true]} />
              </mesh>

              {/* Natural Tree Trunk with Bark Texture */}
              <mesh position={[0, 1.5, 0]} material={treeBarkMaterial} castShadow={shouldCastShadow}>
                <cylinderGeometry args={[0.14, 0.24, 2.6, 8]} />
              </mesh>

              {/* Multi-Lobed Natural Botanical Canopy */}
              <group position={[0, 3.2, 0]}>
                {/* Center Core Lobe */}
                <mesh material={naturalFoliagePrimaryMaterial} castShadow={shouldCastShadow}>
                  <sphereGeometry args={[1.35, 8, 8]} />
                </mesh>
                {/* Secondary Offset Lobes */}
                <mesh position={[0.55, -0.35, 0.45]} material={naturalFoliageSecondaryMaterial} castShadow={shouldCastShadow}>
                  <sphereGeometry args={[1.05, 7, 7]} />
                </mesh>
                <mesh position={[-0.5, -0.25, -0.45]} material={naturalFoliageAccentMaterial} castShadow={shouldCastShadow}>
                  <sphereGeometry args={[0.95, 7, 7]} />
                </mesh>
                <mesh position={[-0.45, 0.45, 0.35]} material={naturalFoliageSecondaryMaterial} castShadow={shouldCastShadow}>
                  <sphereGeometry args={[0.85, 6, 6]} />
                </mesh>
                {/* Upper Crown Tip */}
                <mesh position={[0.15, 0.95, -0.1]} material={naturalFoliageAccentMaterial} castShadow={shouldCastShadow}>
                  <sphereGeometry args={[0.75, 6, 6]} />
                </mesh>
              </group>

              {/* Low Evergreen Shrub Ring in Soil Bed */}
              {[-0.9, 0, 0.9].map((sx, sIdx) => (
                <mesh key={`shrub-${sIdx}`} position={[sx * 0.9, 0.62, ((sIdx % 2) - 0.5) * 0.9]} material={naturalFoliageSecondaryMaterial}>
                  <sphereGeometry args={[0.28, 6, 6]} />
                </mesh>
              ))}

              {/* Warm Subtle Under-Bench Ground Wash */}
              <mesh material={warmGlowMaterial} position={[0, 0.08, 0]}>
                <ringGeometry args={[1.7, 1.8, 12]} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* ── 7. NATURAL PARK & LAKESIDE FREE-STANDING TREE GROVES ── */}
      <group name="natural-campus-park-trees">
        {naturalParkTrees.map((pos, idx) => {
          const pScale = 0.95 + ((idx * 3) % 4) * 0.12;
          return (
            <group key={`park-tree-${idx}`} position={[pos[0], pos[1], pos[2]]} scale={[pScale, pScale, pScale]}>
              {/* Root Mound in Turf */}
              <mesh position={[0, 0.1, 0]} material={soilBedMaterial}>
                <cylinderGeometry args={[0.8, 1.2, 0.2, 8]} />
              </mesh>
              {/* Natural Organic Trunk */}
              <mesh position={[0, 1.6, 0]} material={treeBarkMaterial} castShadow={shouldCastShadow}>
                <cylinderGeometry args={[0.15, 0.28, 2.8, 8]} />
              </mesh>
              {/* Lush Multi-Tiered Foliage Canopy */}
              <group position={[0, 3.4, 0]}>
                <mesh material={naturalFoliagePrimaryMaterial} castShadow={shouldCastShadow}>
                  <sphereGeometry args={[1.5, 8, 8]} />
                </mesh>
                <mesh position={[0.7, -0.4, 0.4]} material={naturalFoliageSecondaryMaterial} castShadow={shouldCastShadow}>
                  <sphereGeometry args={[1.15, 7, 7]} />
                </mesh>
                <mesh position={[-0.6, -0.3, -0.5]} material={naturalFoliageAccentMaterial} castShadow={shouldCastShadow}>
                  <sphereGeometry args={[1.05, 7, 7]} />
                </mesh>
                <mesh position={[0.2, 0.85, 0.2]} material={naturalFoliageAccentMaterial} castShadow={shouldCastShadow}>
                  <sphereGeometry args={[0.85, 6, 6]} />
                </mesh>
              </group>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export default CityGround;
