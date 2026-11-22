import { useMemo } from 'react';
import {
  glassCurtainMaterial,
  clearGlassMaterial,
  clearLobbyGlassMaterial,
  warmGlowMaterial,
  whiteGlowMaterial,
  solarPanelMaterial,
  campusLawnMaterial,
  campusWoodBenchMaterial,
  sandstoneMaterial,
  warmIvoryMaterial,
  terracottaMaterial,
  terracottaAccentMaterial,
  warmPlazaPavingMaterial,
  floweringLavenderMaterial,
  floweringGoldMaterial,
} from '../materials';
import { useDistrict, useGraphicsQuality } from '../../context';

export interface AcademicDistrictProps {
  position?: [number, number, number];
  rotation?: number;
}

/**
 * AcademicDistrict — District B: Academic District & Grand Auditorium
 *
 * Architecture:
 * 1. Grand Academic Auditorium (1200 capacity) with sweeping acoustic envelope and glazed portico
 * 2. Main Lecture Hall Complex (stepped tiered lecture theatres with louvered sunshades)
 * 3. Faculty Departmental Blocks A & B with connecting high-level skybridge
 * 4. Seminar & Tutorial Pavilions with colonnaded courtyards
 * 5. Manicured central academic quadrangle with student seating benches
 */
export function AcademicDistrict({
  position = [28, 0, -55],
  rotation = 0,
}: AcademicDistrictProps) {
  const { selectedDistrict, hoveredDistrict, selectDistrict, setHoveredDistrict } = useDistrict();
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';
  const isSelected = selectedDistrict === 'academic';
  const isHovered = hoveredDistrict === 'academic';

  // Fluted portico columns for Grand Auditorium
  const porticoColumns = useMemo(
    () => [-6.5, -3.9, -1.3, 1.3, 3.9, 6.5],
    []
  );

  // Exterior vertical louvers for Lecture Hall Complex
  const louverOffsets = useMemo(
    () => [-5.5, -4.0, -2.5, -1.0, 0.5, 2.0, 3.5, 5.0],
    []
  );

  return (
    <group
      name="district-b-academic"
      position={position}
      rotation={[0, rotation, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredDistrict('academic');
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHoveredDistrict(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectDistrict('academic');
      }}
    >
      {/* ── SELECTION HOLOGRAPHIC RING ── */}
      {(isSelected || isHovered) && (
        <group position={[0, 0.98, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[26.5, 27.5, 48]} />
            <meshBasicMaterial
              color="#38BDF8"
              transparent
              opacity={isSelected ? 0.85 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[27.8, 28.2, 48]} />
            <meshBasicMaterial
              color="#39DDF4"
              transparent
              opacity={isSelected ? 0.5 : 0.25}
            />
          </mesh>
        </group>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1. GRAND ACADEMIC AUDITORIUM & SYMPHONIC HALL (1200 Capacity)
          Location: [6, 0.9, -7]
          Identity: Sandstone shell, terracotta acoustic baffles, warm ivory colonnade
      ══════════════════════════════════════════════════════════════ */}
      <group position={[6, 0.9, -7]}>
        {/* Foundation Plinth (Honed Sandstone) */}
        <mesh position={[0, 0.35, 0]} material={sandstoneMaterial} receiveShadow castShadow>
          <boxGeometry args={[22, 0.7, 26]} />
        </mesh>
        <mesh position={[0, 0.75, 0]} material={warmIvoryMaterial}>
          <boxGeometry args={[22.3, 0.1, 26.3]} />
        </mesh>

        {/* Sculptural Main Auditorium Body (Warm Sandstone Acoustic Envelope) */}
        <mesh position={[0, 7.5, -2]} material={sandstoneMaterial} receiveShadow castShadow>
          <boxGeometry args={[18, 13.5, 18]} />
        </mesh>

        {/* Sloped Roof Envelope with Muted Terracotta Acoustic Baffles */}
        <mesh position={[0, 14.8, -2]} rotation={[-0.08, 0, 0]} material={terracottaMaterial} castShadow>
          <boxGeometry args={[18.6, 1.2, 18.8]} />
        </mesh>
        <mesh position={[0, 15.5, -2]} material={terracottaAccentMaterial}>
          <boxGeometry args={[18.2, 0.1, 0.3]} />
        </mesh>

        {/* Flytower / Stage Loft Volume (Terracotta & Sandstone Rear) */}
        <mesh position={[0, 9.5, -9.5]} material={terracottaMaterial} receiveShadow castShadow>
          <boxGeometry args={[12, 17.5, 6.5]} />
        </mesh>
        <mesh position={[0, 18.3, -9.5]} material={warmIvoryMaterial}>
          <boxGeometry args={[12.3, 0.3, 6.8]} />
        </mesh>

        {/* Grand Glazed Entrance Portico & Foyer (Front facing south) */}
        <mesh position={[0, 4.5, 8]} material={clearLobbyGlassMaterial}>
          <boxGeometry args={[16, 7.6, 3.8]} />
        </mesh>

        {/* Interior Warm Foyer Lighting Core */}
        <mesh position={[0, 4.0, 7.8]} material={warmGlowMaterial}>
          <boxGeometry args={[12, 5.0, 0.1]} />
        </mesh>

        {/* Monumental Cantilever Entrance Canopy (Terracotta with Warm Ivory Soffit) */}
        <mesh position={[0, 8.4, 9.2]} material={terracottaMaterial} castShadow>
          <boxGeometry args={[17.5, 0.6, 6.5]} />
        </mesh>
        <mesh position={[0, 8.1, 9.2]} material={warmIvoryMaterial}>
          <boxGeometry args={[17.2, 0.08, 6.2]} />
        </mesh>

        {/* Fluted Portico Columns (Warm Ivory) */}
        {porticoColumns.map((colX, idx) => (
          <mesh
            key={`auditorium-col-${idx}`}
            position={[colX, 4.2, 11.5]}
            material={warmIvoryMaterial}
            castShadow={shouldCastShadow}
          >
            <cylinderGeometry args={[0.24, 0.30, 7.8, 12]} />
          </mesh>
        ))}

        {/* Grand Entrance Steps (Warm Travertine Stone) */}
        <mesh position={[0, 0.35, 12.8]} material={warmPlazaPavingMaterial} receiveShadow>
          <boxGeometry args={[16, 0.45, 2.5]} />
        </mesh>
        <mesh position={[0, 0.15, 14.3]} material={sandstoneMaterial} receiveShadow>
          <boxGeometry args={[18, 0.25, 1.8]} />
        </mesh>

        {/* Auditorium Signage Banner (Terracotta & Ivory) */}
        <mesh position={[0, 8.9, 12.4]} material={terracottaMaterial}>
          <boxGeometry args={[9.5, 0.8, 0.2]} />
        </mesh>
        <mesh position={[0, 8.9, 12.52]} material={whiteGlowMaterial}>
          <boxGeometry args={[8.8, 0.4, 0.05]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          2. MAIN ENGINEERING LECTURE COMPLEX (Tiered Lecture Halls)
          Location: [-14, 0.9, 5]
          Identity: Warm Ivory body, Terracotta Brise-Soleil Sunshades
      ══════════════════════════════════════════════════════════════ */}
      <group position={[-14, 0.9, 5]}>
        {/* Base Podium (Sandstone) */}
        <mesh position={[0, 0.35, 0]} material={sandstoneMaterial} receiveShadow castShadow>
          <boxGeometry args={[16, 0.7, 18]} />
        </mesh>

        {/* Primary Lecture Block (3 Stories - Warm Ivory) */}
        <mesh position={[0, 6.5, 0]} material={warmIvoryMaterial} receiveShadow castShadow>
          <boxGeometry args={[14.5, 11.5, 16.5]} />
        </mesh>

        {/* Tiered Glazed Ribbon Windows with Terracotta Louver Sunshades */}
        {[3.5, 6.8, 10.2].map((yLvl, idx) => (
          <group key={`lecture-ribbon-${idx}`} position={[0, yLvl, 0]}>
            {/* South Glazed Ribbon */}
            <mesh position={[0, 0, 8.3]} material={glassCurtainMaterial}>
              <boxGeometry args={[13.5, 1.5, 0.15]} />
            </mesh>
            {/* North Glazed Ribbon */}
            <mesh position={[0, 0, -8.3]} material={glassCurtainMaterial}>
              <boxGeometry args={[13.5, 1.5, 0.15]} />
            </mesh>
            {/* Terracotta Louver Sunshades on South Ribbon */}
            {louverOffsets.map((lvX, lIdx) => (
              <mesh
                key={`lv-south-${idx}-${lIdx}`}
                position={[lvX, 0, 8.5]}
                material={terracottaAccentMaterial}
              >
                <boxGeometry args={[0.10, 1.6, 0.40]} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Central Skylight Atrium Spire */}
        <mesh position={[0, 12.6, 0]} material={clearGlassMaterial}>
          <boxGeometry args={[6.5, 1.2, 14.5]} />
        </mesh>
        <mesh position={[0, 13.3, 0]} material={terracottaMaterial}>
          <boxGeometry args={[6.8, 0.2, 14.8]} />
        </mesh>

        {/* Rooftop Solar Pergola */}
        <mesh position={[4.2, 12.8, 4]} rotation={[-0.1, 0, 0]} material={solarPanelMaterial}>
          <boxGeometry args={[4.2, 0.1, 6]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          3. FACULTY DEPARTMENTAL BLOCKS A & B (Twin Academic Wings)
          Location: [18, 0.9, 12]
          Identity: Warm Ivory facades, Terracotta framing, connecting Skybridge
      ══════════════════════════════════════════════════════════════ */}
      <group position={[18, 0.9, 12]}>
        {/* Department Block A (East Wing - Warm Ivory with Terracotta cornice) */}
        <mesh position={[6, 8.5, 0]} material={warmIvoryMaterial} receiveShadow castShadow>
          <boxGeometry args={[8.5, 16, 12]} />
        </mesh>
        <mesh position={[6, 8.5, 6.05]} material={glassCurtainMaterial}>
          <boxGeometry args={[7.2, 14, 0.15]} />
        </mesh>
        <mesh position={[6, 16.7, 0]} material={terracottaMaterial}>
          <boxGeometry args={[8.8, 0.4, 12.4]} />
        </mesh>

        {/* Department Block B (West Wing - Warm Ivory with Terracotta cornice) */}
        <mesh position={[-6, 8.5, 0]} material={warmIvoryMaterial} receiveShadow castShadow>
          <boxGeometry args={[8.5, 16, 12]} />
        </mesh>
        <mesh position={[-6, 8.5, 6.05]} material={glassCurtainMaterial}>
          <boxGeometry args={[7.2, 14, 0.15]} />
        </mesh>
        <mesh position={[-6, 16.7, 0]} material={terracottaMaterial}>
          <boxGeometry args={[8.8, 0.4, 12.4]} />
        </mesh>

        {/* High-Level Glazed Academic Skybridge (Terracotta Structural Truss) */}
        <group position={[0, 11.5, 0]}>
          <mesh material={terracottaMaterial} castShadow>
            <boxGeometry args={[5, 3.2, 3.2]} />
          </mesh>
          <mesh position={[0, 0, 1.62]} material={clearGlassMaterial}>
            <boxGeometry args={[4.8, 2.4, 0.1]} />
          </mesh>
          <mesh position={[0, 0, -1.62]} material={clearGlassMaterial}>
            <boxGeometry args={[4.8, 2.4, 0.1]} />
          </mesh>
        </group>

        {/* Ground Floor Colonnaded Pass-Through (Sandstone) */}
        <mesh position={[0, 2.2, 0]} material={sandstoneMaterial}>
          <boxGeometry args={[4.8, 0.3, 10]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          4. CENTRAL ACADEMIC QUADRANGLE & STUDY COURTYARD
          Location: [2, 0.5, 8]
          Identity: Warm sandstone pathways, green lawn, lavender borders
      ══════════════════════════════════════════════════════════════ */}
      <group position={[2, 0.5, 8]}>
        {/* Quad Manicured Turf Lawn */}
        <mesh material={campusLawnMaterial} receiveShadow>
          <boxGeometry args={[14, 0.12, 12]} />
        </mesh>
        <mesh position={[0, 0.08, 0]} material={warmIvoryMaterial}>
          <boxGeometry args={[14.4, 0.05, 12.4]} />
        </mesh>

        {/* Crossway Pedestrian Walkways (Warm Travertine) */}
        <mesh position={[0, 0.09, 0]} material={warmPlazaPavingMaterial}>
          <boxGeometry args={[2.4, 0.04, 12]} />
        </mesh>
        <mesh position={[0, 0.09, 0]} material={warmPlazaPavingMaterial}>
          <boxGeometry args={[14, 0.04, 2.4]} />
        </mesh>

        {/* Quad Flowering Lavender & Marigold Planters */}
        <mesh position={[-4, 0.15, -4]} material={floweringLavenderMaterial}>
          <boxGeometry args={[3.2, 0.14, 1.6]} />
        </mesh>
        <mesh position={[4, 0.15, -4]} material={floweringGoldMaterial}>
          <boxGeometry args={[3.2, 0.14, 1.6]} />
        </mesh>

        {/* Quad Teak Wood Benches */}
        {[-3.5, 3.5].map((bx, idx) => (
          <group key={`quad-bench-set-${idx}`} position={[bx, 0.2, 0]}>
            <mesh position={[0, 0, -2.8]} material={campusWoodBenchMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[2.2, 0.35, 0.6]} />
            </mesh>
            <mesh position={[0, 0, 2.8]} material={campusWoodBenchMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[2.2, 0.35, 0.6]} />
            </mesh>
          </group>
        ))}

        {/* Central Academic Monument Totem (Terracotta & Sandstone) */}
        <mesh position={[0, 1.8, 0]} material={terracottaMaterial} castShadow>
          <cylinderGeometry args={[0.22, 0.32, 3.4, 8]} />
        </mesh>
        <mesh position={[0, 3.6, 0]} material={sandstoneMaterial}>
          <octahedronGeometry args={[0.45, 0]} />
        </mesh>
      </group>
    </group>
  );
}

export default AcademicDistrict;
