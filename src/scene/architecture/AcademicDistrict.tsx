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
        {/* Foundation Plinth (Honed Sandstone with Expressed Reveal) */}
        <mesh position={[0, 0.35, 0]} material={sandstoneMaterial} receiveShadow castShadow>
          <boxGeometry args={[22, 0.7, 26]} />
        </mesh>
        <mesh position={[0, 0.75, 0]} material={warmIvoryMaterial}>
          <boxGeometry args={[22.3, 0.1, 26.3]} />
        </mesh>

        {/* Sculptural Main Auditorium Body (Warm Sandstone Acoustic Envelope with Shadow Reveals) */}
        <mesh position={[0, 7.5, -2]} material={sandstoneMaterial} receiveShadow castShadow>
          <boxGeometry args={[18, 13.5, 18]} />
        </mesh>
        {/* Horizontal Shadow Reveal Band dividing auditorium levels */}
        <mesh position={[0, 7.0, -2]} material={terracottaAccentMaterial}>
          <boxGeometry args={[18.25, 0.15, 18.25]} />
        </mesh>

        {/* Lateral Structural Acoustic Buttress Pylons (East & West Flanks) */}
        {[-9.2, 9.2].map((bx, bIdx) => (
          <group key={`aud-buttress-flank-${bIdx}`} position={[bx, 7.5, -2]}>
            {[-6, -2, 2, 6].map((bz, zIdx) => (
              <mesh key={`buttress-pylon-${zIdx}`} position={[0, 0, bz]} material={sandstoneMaterial} castShadow={shouldCastShadow}>
                <boxGeometry args={[0.7, 13.0, 1.2]} />
              </mesh>
            ))}
          </group>
        ))}

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
        {/* Flytower Rooftop HVAC & Acoustic Louver Screening */}
        <mesh position={[0, 19.2, -9.5]} material={terracottaAccentMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[8.5, 1.5, 4.5]} />
        </mesh>

        {/* Grand Glazed Entrance Portico & Foyer (Front facing south) */}
        <mesh position={[0, 4.5, 8]} material={clearLobbyGlassMaterial}>
          <boxGeometry args={[16, 7.6, 3.8]} />
        </mesh>
        {/* Foyer Vertical Mullion Frames */}
        {[-6, -3, 0, 3, 6].map((mx, mIdx) => (
          <mesh key={`foyer-mullion-${mIdx}`} position={[mx, 4.5, 9.92]} material={warmIvoryMaterial}>
            <boxGeometry args={[0.12, 7.5, 0.1]} />
          </mesh>
        ))}

        {/* Interior Tiered Amphitheater Seating Profile (Visible through glazed foyer) */}
        <group position={[0, 3.2, 6.5]}>
          {[0, 1, 2, 3].map((tier) => (
            <mesh key={`interior-tier-${tier}`} position={[0, tier * 0.45, -tier * 0.9]} material={terracottaMaterial}>
              <boxGeometry args={[11, 0.35, 1.2]} />
            </mesh>
          ))}
        </group>
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

        {/* Accessible Pedestrian Entrance Ramp with Sandstone Balustrade */}
        <group position={[-9.8, 0, 13.2]}>
          <mesh position={[0, 0.25, 0]} rotation={[0.08, 0, 0]} material={warmPlazaPavingMaterial} receiveShadow>
            <boxGeometry args={[2.0, 0.25, 5.2]} />
          </mesh>
          <mesh position={[-1.05, 0.65, 0]} rotation={[0.08, 0, 0]} material={sandstoneMaterial}>
            <boxGeometry args={[0.15, 0.65, 5.2]} />
          </mesh>
        </group>

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

        {/* Expressed Horizontal Floor Slabs with Shadow Reveals on all 3 levels */}
        {[4.3, 7.6, 11.0].map((sY, sIdx) => (
          <mesh key={`slab-reveal-${sIdx}`} position={[0, sY, 0]} material={terracottaMaterial} castShadow={shouldCastShadow}>
            <boxGeometry args={[14.9, 0.22, 16.9]} />
          </mesh>
        ))}

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

        {/* Ground Floor Entrance Colonnade & Vestibule */}
        <group position={[0, 1.8, 8.6]}>
          <mesh position={[0, 1.8, 0]} material={terracottaMaterial} castShadow={shouldCastShadow}>
            <boxGeometry args={[6.5, 0.25, 1.8]} />
          </mesh>
          {[-2.8, 2.8].map((cx, idx) => (
            <mesh key={`lecture-col-${idx}`} position={[cx, 0.9, 0.6]} material={warmIvoryMaterial}>
              <cylinderGeometry args={[0.14, 0.16, 1.8, 8]} />
            </mesh>
          ))}
          {/* Bicycle Shelter Parking Rack */}
          <group position={[-5.5, -1.2, 0]}>
            <mesh position={[0, 1.2, 0]} material={sandstoneMaterial}>
              <boxGeometry args={[3.2, 0.1, 1.4]} />
            </mesh>
            {[-1.2, -0.4, 0.4, 1.2].map((rx, rIdx) => (
              <mesh key={`bike-rack-${rIdx}`} position={[rx, 0.35, 0]} material={terracottaAccentMaterial}>
                <cylinderGeometry args={[0.03, 0.03, 0.7, 6]} />
              </mesh>
            ))}
          </group>
        </group>

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
        {/* Rooftop Mechanical Penthouse Screen */}
        <mesh position={[-4.2, 13.0, -3]} material={sandstoneMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[4.5, 1.4, 5.5]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          3. FACULTY DEPARTMENTAL BLOCKS A & B (Twin Academic Wings)
          Location: [18, 0.9, 12]
          Identity: Warm Ivory facades, Terracotta framing, connecting Skybridge
      ══════════════════════════════════════════════════════════════ */}
      <group position={[18, 0.9, 12]}>
        {/* Department Block A (East Wing - Warm Ivory with Terracotta cornice & pilasters) */}
        <group position={[6, 8.5, 0]}>
          <mesh material={warmIvoryMaterial} receiveShadow castShadow>
            <boxGeometry args={[8.5, 16, 12]} />
          </mesh>
          <mesh position={[0, 0, 6.05]} material={glassCurtainMaterial}>
            <boxGeometry args={[7.2, 14, 0.15]} />
          </mesh>
          {/* Vertical Architectural Corner Pilasters */}
          {[-4.1, 4.1].map((px, pIdx) => (
            <mesh key={`pilaster-a-${pIdx}`} position={[px, 0, 6.08]} material={sandstoneMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[0.4, 16, 0.25]} />
            </mesh>
          ))}
          {/* Horizontal Terracotta Cornice & Parapet Upstand */}
          <mesh position={[0, 8.2, 0]} material={terracottaMaterial}>
            <boxGeometry args={[8.8, 0.4, 12.4]} />
          </mesh>
        </group>

        {/* Department Block B (West Wing - Warm Ivory with Terracotta cornice & pilasters) */}
        <group position={[-6, 8.5, 0]}>
          <mesh material={warmIvoryMaterial} receiveShadow castShadow>
            <boxGeometry args={[8.5, 16, 12]} />
          </mesh>
          <mesh position={[0, 0, 6.05]} material={glassCurtainMaterial}>
            <boxGeometry args={[7.2, 14, 0.15]} />
          </mesh>
          {/* Vertical Architectural Corner Pilasters */}
          {[-4.1, 4.1].map((px, pIdx) => (
            <mesh key={`pilaster-b-${pIdx}`} position={[px, 0, 6.08]} material={sandstoneMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[0.4, 16, 0.25]} />
            </mesh>
          ))}
          {/* Horizontal Terracotta Cornice & Parapet Upstand */}
          <mesh position={[0, 8.2, 0]} material={terracottaMaterial}>
            <boxGeometry args={[8.8, 0.4, 12.4]} />
          </mesh>
        </group>

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
          {/* Structural Diagonal Truss Cross-Braces */}
          <mesh rotation={[0, 0, 0.6]} material={terracottaAccentMaterial}>
            <boxGeometry args={[0.15, 3.8, 3.3]} />
          </mesh>
          <mesh rotation={[0, 0, -0.6]} material={terracottaAccentMaterial}>
            <boxGeometry args={[0.15, 3.8, 3.3]} />
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
