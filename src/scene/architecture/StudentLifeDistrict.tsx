import { useMemo } from 'react';
import {
  pearlWhiteConcreteMaterial,
  titaniumStructuralMaterial,
  darkTitaniumMaterial,
  satinTitaniumMaterial,
  metalExoskeletonMaterial,
  brushedAlloyMaterial,
  glassCurtainMaterial,
  clearGlassMaterial,
  clearLobbyGlassMaterial,
  orangeGlowMaterial,
  warmGlowMaterial,
  whiteGlowMaterial,
  softSilverMaterial,
  solarPanelMaterial,
  campusLawnMaterial,
  campusWoodBenchMaterial,
} from '../materials';
import { useDistrict, useGraphicsQuality } from '../../context';

export interface StudentLifeDistrictProps {
  position?: [number, number, number];
  rotation?: number;
}

/**
 * StudentLifeDistrict — District D: Student Life & Residential District
 *
 * Architecture:
 * 1. North & South Student Residential Towers (Hostels with modular balconies and sky-lounges)
 * 2. Campus Dining Commons & Food Court (2-story glazed pavilion with outdoor dining canopy)
 * 3. Techfest Student Activity Centre & Club Headquarters
 * 4. Recreation Courtyard with lawn lounge, ping-pong / game tables, and social benches
 */
export function StudentLifeDistrict({
  position = [55, 0, 20],
  rotation = 0,
}: StudentLifeDistrictProps) {
  const { selectedDistrict, hoveredDistrict, selectDistrict, setHoveredDistrict } = useDistrict();
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';
  const isSelected = selectedDistrict === 'student-life';
  const isHovered = hoveredDistrict === 'student-life';

  // Modular student balcony floors for Residential Towers
  const balconyFloors = useMemo(() => [4, 7.5, 11, 14.5, 18], []);

  // Outdoor dining tables
  const outdoorDiningTables = useMemo(
    () => [
      [-3.5, -2.5],
      [-3.5, 0.5],
      [-3.5, 3.5],
      [-0.5, -2.5],
      [-0.5, 0.5],
      [-0.5, 3.5],
    ],
    []
  );

  return (
    <group
      name="district-d-student-life"
      position={position}
      rotation={[0, rotation, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredDistrict('student-life');
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHoveredDistrict(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectDistrict('student-life');
      }}
    >
      {/* ── SELECTION HOLOGRAPHIC RING ── */}
      {(isSelected || isHovered) && (
        <group position={[0, 0.98, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[26.5, 27.5, 48]} />
            <meshBasicMaterial
              color="#F59E0B"
              transparent
              opacity={isSelected ? 0.85 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[27.8, 28.2, 48]} />
            <meshBasicMaterial
              color="#FFB370"
              transparent
              opacity={isSelected ? 0.5 : 0.25}
            />
          </mesh>
        </group>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1. STUDENT RESIDENTIAL TOWER A (NORTH DORM, 7 Stories)
          Location: [8, 0.9, -12]
      ══════════════════════════════════════════════════════════════ */}
      <group position={[8, 0.9, -12]}>
        {/* Foundation Plinth */}
        <mesh position={[0, 0.35, 0]} material={darkTitaniumMaterial} receiveShadow castShadow>
          <boxGeometry args={[14, 0.7, 16]} />
        </mesh>

        {/* Main Residential Massing */}
        <mesh position={[0, 11, 0]} material={pearlWhiteConcreteMaterial} receiveShadow castShadow>
          <boxGeometry args={[12.5, 20.5, 14.5]} />
        </mesh>

        {/* Modular Recessed Balconies (West Facade) */}
        {balconyFloors.map((bY, idx) => (
          <group key={`res-a-balcony-${idx}`} position={[-6.3, bY, 0]}>
            {/* Balcony Slab */}
            <mesh material={darkTitaniumMaterial}>
              <boxGeometry args={[1.6, 0.25, 12]} />
            </mesh>
            {/* Glass Guard Railing */}
            <mesh position={[-0.7, 0.45, 0]} material={clearGlassMaterial}>
              <boxGeometry args={[0.08, 0.65, 11.8]} />
            </mesh>
            {/* Warm Student Room Window Interior */}
            <mesh position={[0.75, 0.8, 0]} material={warmGlowMaterial}>
              <boxGeometry args={[0.1, 1.3, 11.2]} />
            </mesh>
          </group>
        ))}

        {/* Glazed Corner Stairwell & Elevator Shaft */}
        <mesh position={[5.8, 11.5, 5.8]} material={glassCurtainMaterial}>
          <boxGeometry args={[3.2, 22.5, 3.2]} />
        </mesh>
        <mesh position={[5.8, 11.5, 5.8]} material={orangeGlowMaterial}>
          <boxGeometry args={[0.2, 21.5, 0.2]} />
        </mesh>

        {/* Rooftop Solar Pergola & Sky-Garden */}
        <mesh position={[0, 21.8, 0]} material={satinTitaniumMaterial}>
          <boxGeometry args={[13, 0.5, 15]} />
        </mesh>
        <mesh position={[0, 22.4, 0]} rotation={[-0.1, 0, 0]} material={solarPanelMaterial}>
          <boxGeometry args={[10, 0.1, 11]} />
        </mesh>
        <mesh position={[0, 22.1, 7.3]} material={orangeGlowMaterial}>
          <boxGeometry args={[12.6, 0.08, 0.2]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          2. STUDENT RESIDENTIAL TOWER B (SOUTH DORM, 5 Stories)
          Location: [12, 0.9, 10]
      ══════════════════════════════════════════════════════════════ */}
      <group position={[12, 0.9, 10]}>
        {/* Foundation Plinth */}
        <mesh position={[0, 0.35, 0]} material={darkTitaniumMaterial} receiveShadow castShadow>
          <boxGeometry args={[12, 0.7, 14]} />
        </mesh>

        {/* Main Residential Massing */}
        <mesh position={[0, 8.5, 0]} material={pearlWhiteConcreteMaterial} receiveShadow castShadow>
          <boxGeometry args={[10.5, 15.5, 12.5]} />
        </mesh>

        {/* Modular Balconies (West Facade) */}
        {[4, 7.5, 11, 14].map((bY, idx) => (
          <group key={`res-b-balcony-${idx}`} position={[-5.3, bY, 0]}>
            <mesh material={darkTitaniumMaterial}>
              <boxGeometry args={[1.4, 0.25, 10]} />
            </mesh>
            <mesh position={[-0.6, 0.45, 0]} material={clearGlassMaterial}>
              <boxGeometry args={[0.08, 0.65, 9.8]} />
            </mesh>
            <mesh position={[0.65, 0.8, 0]} material={warmGlowMaterial}>
              <boxGeometry args={[0.1, 1.3, 9.4]} />
            </mesh>
          </group>
        ))}

        {/* Rooftop Parapet */}
        <mesh position={[0, 16.5, 0]} material={satinTitaniumMaterial}>
          <boxGeometry args={[11, 0.5, 13]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          3. CAMPUS DINING COMMONS & MULTI-CUISINE FOOD COURT
          Location: [-10, 0.9, -6]
      ══════════════════════════════════════════════════════════════ */}
      <group position={[-10, 0.9, -6]}>
        {/* Dining Hall Foundation */}
        <mesh position={[0, 0.35, 0]} material={darkTitaniumMaterial} receiveShadow castShadow>
          <boxGeometry args={[18, 0.7, 16]} />
        </mesh>

        {/* Main Glazed Dining Pavilion (Double-Height) */}
        <mesh position={[0, 4.8, 0]} material={clearLobbyGlassMaterial}>
          <boxGeometry args={[16.5, 8.2, 14.5]} />
        </mesh>

        {/* Warm Luminous Dining Core */}
        <mesh position={[0, 4.2, 0]} material={warmGlowMaterial}>
          <boxGeometry args={[12, 6.5, 10]} />
        </mesh>

        {/* Structural Roof Slab */}
        <mesh position={[0, 9.2, 0]} material={titaniumStructuralMaterial} castShadow>
          <boxGeometry args={[18, 0.8, 16]} />
        </mesh>
        <mesh position={[0, 9.4, 0]} material={orangeGlowMaterial}>
          <boxGeometry args={[17.6, 0.1, 0.2]} />
        </mesh>

        {/* Outdoor Covered Dining Terrace (East Side facing courtyard) */}
        <group position={[6.5, 0.4, 0]}>
          {/* Timber Deck Platform */}
          <mesh material={campusWoodBenchMaterial} receiveShadow>
            <boxGeometry args={[7, 0.2, 13]} />
          </mesh>

          {/* Tensile Fabric Canopy / Louver Roof */}
          <mesh position={[0, 3.4, 0]} material={softSilverMaterial}>
            <boxGeometry args={[6.8, 0.15, 12.8]} />
          </mesh>
          {[-3, 3].map((cx, cIdx) => (
            <mesh
              key={`terrace-col-${cIdx}`}
              position={[cx, 1.7, 5.8]}
              material={brushedAlloyMaterial}
            >
              <cylinderGeometry args={[0.08, 0.1, 3.4, 8]} />
            </mesh>
          ))}

          {/* Outdoor Cafe Dining Tables */}
          {outdoorDiningTables.map(([tx, tz], tIdx) => (
            <group key={`cafe-table-${tIdx}`} position={[tx, 0.2, tz]}>
              {/* Table Top */}
              <mesh position={[0, 0.65, 0]} material={softSilverMaterial}>
                <cylinderGeometry args={[0.55, 0.55, 0.05, 12]} />
              </mesh>
              <mesh position={[0, 0.32, 0]} material={darkTitaniumMaterial}>
                <cylinderGeometry args={[0.06, 0.08, 0.65, 6]} />
              </mesh>
              {/* 2 Chairs */}
              <mesh position={[0, 0.35, 0.65]} material={campusWoodBenchMaterial}>
                <boxGeometry args={[0.4, 0.05, 0.4]} />
              </mesh>
              <mesh position={[0, 0.35, -0.65]} material={campusWoodBenchMaterial}>
                <boxGeometry args={[0.4, 0.05, 0.4]} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          4. TECHFEST STUDENT ACTIVITY CENTRE & CLUB HEADQUARTERS
          Location: [-8, 0.9, 12]
      ══════════════════════════════════════════════════════════════ */}
      <group position={[-8, 0.9, 12]}>
        {/* Dynamic Angled Volume (3 Stories) */}
        <mesh position={[0, 6.5, 0]} material={pearlWhiteConcreteMaterial} receiveShadow castShadow>
          <boxGeometry args={[14, 11.5, 12]} />
        </mesh>
        <mesh position={[0, 6.5, 6.05]} material={glassCurtainMaterial}>
          <boxGeometry args={[12, 9.5, 0.15]} />
        </mesh>

        {/* Angled Architectural Feature Fin */}
        <mesh position={[6.5, 6.5, 0]} rotation={[0, 0, -0.08]} material={metalExoskeletonMaterial} castShadow>
          <boxGeometry args={[0.5, 13, 12.5]} />
        </mesh>
        <mesh position={[6.6, 6.5, 0]} material={orangeGlowMaterial}>
          <boxGeometry args={[0.08, 12.8, 0.2]} />
        </mesh>

        {/* Digital Marquee / Event Screen Banner */}
        <mesh position={[0, 11.2, 6.2]} material={darkTitaniumMaterial}>
          <boxGeometry args={[8.5, 1.2, 0.3]} />
        </mesh>
        <mesh position={[0, 11.2, 6.38]} material={whiteGlowMaterial}>
          <boxGeometry args={[8.0, 0.8, 0.05]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          5. STUDENT SOCIAL COURTYARD & RECREATION LAWN
          Location: [0, 0.5, 0]
      ══════════════════════════════════════════════════════════════ */}
      <group position={[0, 0.5, 0]}>
        {/* Courtyard Green Turf */}
        <mesh material={campusLawnMaterial} receiveShadow>
          <boxGeometry args={[16, 0.12, 14]} />
        </mesh>
        <mesh position={[0, 0.08, 0]} material={softSilverMaterial}>
          <boxGeometry args={[16.4, 0.05, 14.4]} />
        </mesh>

        {/* Central Outdoor Ping-Pong / Table Tennis Table */}
        <group position={[0, 0.15, 0]}>
          {/* Table Top Surface (Navy Athletic Blue) */}
          <mesh position={[0, 0.72, 0]} material={darkTitaniumMaterial}>
            <boxGeometry args={[2.7, 0.08, 1.5]} />
          </mesh>
          {/* Net */}
          <mesh position={[0, 0.85, 0]} material={softSilverMaterial}>
            <boxGeometry args={[0.04, 0.18, 1.6]} />
          </mesh>
          {/* Legs */}
          <mesh position={[-1.1, 0.35, 0]} material={metalExoskeletonMaterial}>
            <boxGeometry args={[0.08, 0.7, 1.3]} />
          </mesh>
          <mesh position={[1.1, 0.35, 0]} material={metalExoskeletonMaterial}>
            <boxGeometry args={[0.08, 0.7, 1.3]} />
          </mesh>
        </group>

        {/* Courtyard Social Teak Benches */}
        {[-5.5, 5.5].map((bx, idx) => (
          <group key={`social-bench-${idx}`} position={[bx, 0.25, 0]}>
            <mesh position={[0, 0, -3.5]} material={campusWoodBenchMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[2.4, 0.35, 0.6]} />
            </mesh>
            <mesh position={[0, 0, 3.5]} material={campusWoodBenchMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[2.4, 0.35, 0.6]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

export default StudentLifeDistrict;
