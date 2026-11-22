import {
  creamStoneMaterial,
  tealAccentMaterial,
  blondeWoodMaterial,
  precastConcreteMaterial,
  softSilverMaterial,
  darkTitaniumMaterial,
  clearLobbyGlassMaterial,
  structuralGlassMaterial,
  ribbonWindowMaterial,
  louverAlloyMaterial,
  solarPanelMaterial,
  warmGlowMaterial,
} from '../materials';
import { useGraphicsQuality } from '../../context';

export interface UniversityLibraryProps {
  position?: [number, number, number];
  rotation?: number;
}

/**
 * UniversityLibrary — Central University Library & Knowledge Center
 *
 * Welcoming Architectural Language:
 * - Transparent double-height ground floor reading atrium with warm interior study illumination
 * - Upper-level cantilevered quiet study terrace with glass balustrade and campus wood benches
 * - Expressed precast concrete structural portal frames and vertical architectural shading louvers
 * - Shaded entrance canopy with accessible entry steps connecting to campus pedestrian walkways
 * - Rooftop photovoltaic solar canopy and mechanical service enclosure
 */
export function UniversityLibrary({
  position = [-27, 0.9, 1],
  rotation = 0,
}: UniversityLibraryProps) {
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';
  const castGeneralShadow = settings.shadowCasting !== 'none';

  const width = 14;
  const depth = 9;
  const height = 12;

  return (
    <group name="university-central-library" position={position} rotation={[0, rotation, 0]}>
      {/* ── 1. GROUND FLOOR: TRANSPARENT READING ATRIUM & STUDY COMMONS ── */}
      <group name="library-ground-atrium">
        {/* Continuous Double-Height Glass Curtain Wall */}
        <mesh position={[0, 2.0, 0]} material={clearLobbyGlassMaterial}>
          <boxGeometry args={[width - 0.8, 4.0, depth - 0.8]} />
        </mesh>

        {/* Interior Warm Study Light Core & Visual Bookstack Representation */}
        <mesh position={[0, 1.8, 0]} material={warmGlowMaterial}>
          <boxGeometry args={[width * 0.65, 3.2, depth * 0.55]} />
        </mesh>

        {/* Interior Structural Columns */}
        {[-width * 0.3, 0, width * 0.3].map((cx, idx) => (
          <group key={`lib-col-${idx}`}>
            <mesh position={[cx, 2.0, depth * 0.3]} material={precastConcreteMaterial}>
              <cylinderGeometry args={[0.18, 0.22, 4.0, 8]} />
            </mesh>
            <mesh position={[cx, 2.0, -depth * 0.3]} material={precastConcreteMaterial}>
              <cylinderGeometry args={[0.18, 0.22, 4.0, 8]} />
            </mesh>
          </group>
        ))}

        {/* Generous Cantilevered Entrance Portal & Canopy in Cream Stone with Teal Accent */}
        <group position={[0, 4.0, depth / 2 + 1.0]}>
          <mesh material={creamStoneMaterial} castShadow={shouldCastShadow}>
            <boxGeometry args={[width * 0.55, 0.3, 2.2]} />
          </mesh>
          {/* Teal Soffit Reveal */}
          <mesh position={[0, -0.16, 0]} material={tealAccentMaterial}>
            <boxGeometry args={[width * 0.5, 0.04, 2.0]} />
          </mesh>
          {/* Canopy Structural Support Columns */}
          {[-width * 0.24, width * 0.24].map((px, idx) => (
            <mesh key={`canopy-col-${idx}`} position={[px, -2.0, 0.9]} material={softSilverMaterial}>
              <cylinderGeometry args={[0.08, 0.12, 4.0, 8]} />
            </mesh>
          ))}
        </group>

        {/* Ground-Level Outdoor Blonde Wood Study Benches along Facade */}
        {[-width * 0.35, width * 0.35].map((bx, idx) => (
          <group key={`lib-bench-${idx}`} position={[bx, 0, depth / 2 + 0.6]}>
            <mesh position={[0, 0.42, 0]} material={blondeWoodMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[2.4, 0.08, 0.5]} />
            </mesh>
            <mesh position={[0, 0.2, 0]} material={darkTitaniumMaterial}>
              <boxGeometry args={[2.0, 0.38, 0.35]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── 2. UPPER LEVEL: ADVANCED KNOWLEDGE ARCHIVE & READING TERRACE ── */}
      <group name="library-upper-wings" position={[0, 4.0, 0]}>
        {/* Level 2 Express Floor Slab with Overhang in Cream Stone */}
        <mesh position={[0, 0.15, 0]} material={creamStoneMaterial} castShadow={shouldCastShadow} receiveShadow={settings.shadows}>
          <boxGeometry args={[width + 0.6, 0.35, depth + 0.6]} />
        </mesh>
        <mesh position={[0, -0.05, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[width + 0.5, 0.06, depth + 0.5]} />
        </mesh>

        {/* Core Upper Academic Mass in Cream Stone */}
        <mesh position={[0, 3.8, 0]} material={creamStoneMaterial} castShadow={castGeneralShadow} receiveShadow={settings.shadows}>
          <boxGeometry args={[width - 0.4, 7.0, depth - 0.4]} />
        </mesh>

        {/* Recessed Ribbon Glazing (Front & Rear) */}
        <mesh position={[0, 3.8, depth / 2 - 0.16]} material={ribbonWindowMaterial}>
          <boxGeometry args={[width - 1.4, 6.2, 0.1]} />
        </mesh>
        <mesh position={[0, 3.8, -depth / 2 + 0.16]} material={ribbonWindowMaterial}>
          <boxGeometry args={[width - 1.4, 6.2, 0.1]} />
        </mesh>

        {/* Side Ribbon Windows */}
        <mesh position={[width / 2 - 0.16, 3.8, 0]} rotation={[0, Math.PI / 2, 0]} material={ribbonWindowMaterial}>
          <boxGeometry args={[depth - 1.4, 6.2, 0.1]} />
        </mesh>
        <mesh position={[-width / 2 + 0.16, 3.8, 0]} rotation={[0, Math.PI / 2, 0]} material={ribbonWindowMaterial}>
          <boxGeometry args={[depth - 1.4, 6.2, 0.1]} />
        </mesh>

        {/* Vertical Architectural Shading Louvers on Facades in Teal */}
        {Array.from({ length: 6 }).map((_, i) => {
          const lx = -width / 2 + 1.2 + (i * (width - 2.4)) / 5;
          return (
            <mesh key={`lib-louver-${i}`} position={[lx, 3.8, depth / 2 + 0.12]} material={tealAccentMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[0.08, 6.2, 0.4]} />
            </mesh>
          );
        })}

        {/* Cantilevered Outdoor Quiet Reading Terrace (East End) */}
        <group position={[width / 2 + 0.6, 0.15, 0]}>
          <mesh material={creamStoneMaterial} castShadow={shouldCastShadow}>
            <boxGeometry args={[1.6, 0.35, depth - 1.2]} />
          </mesh>
          {/* Glass Safety Balustrade */}
          <mesh position={[0.7, 0.6, 0]} material={structuralGlassMaterial}>
            <boxGeometry args={[0.08, 0.9, depth - 1.2]} />
          </mesh>
          <mesh position={[0.7, 1.05, 0]} material={softSilverMaterial}>
            <boxGeometry args={[0.1, 0.05, depth - 1.2]} />
          </mesh>
        </group>
      </group>

      {/* ── 3. ROOFTOP ARCHITECTURE: SOLAR ROOF, MEP & SKYLIGHT ── */}
      <group name="library-roof" position={[0, height, 0]}>
        {/* Parapet Wall */}
        <mesh position={[0, 0.4, 0]} material={precastConcreteMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[width + 0.2, 0.8, depth + 0.2]} />
        </mesh>
        <mesh position={[0, 0.82, 0]} material={softSilverMaterial}>
          <boxGeometry args={[width + 0.35, 0.08, depth + 0.35]} />
        </mesh>

        {/* Central Skylight Atrium Dome */}
        <mesh position={[0, 0.6, 0]} material={clearLobbyGlassMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[width * 0.45, 1.0, depth * 0.45]} />
        </mesh>
        <mesh position={[0, 0.5, 0]} material={warmGlowMaterial}>
          <boxGeometry args={[width * 0.38, 0.6, depth * 0.38]} />
        </mesh>

        {/* Photovoltaic Solar Canopy Wing */}
        <mesh position={[-width * 0.22, 0.9, 0]} rotation={[-0.15, 0, 0]} material={solarPanelMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[width * 0.35, 0.08, depth * 0.55]} />
        </mesh>

        {/* HVAC / Acoustic Louver Screening Penthouse */}
        <mesh position={[width * 0.24, 0.9, 0]} material={louverAlloyMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[width * 0.32, 1.5, depth * 0.45]} />
        </mesh>
      </group>
    </group>
  );
}

export default UniversityLibrary;
