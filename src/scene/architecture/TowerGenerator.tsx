import { useMemo } from 'react';
import { useGraphicsQuality } from '../../context';
import {
  titaniumStructuralMaterial,
  pearlWhiteMaterial,
  precastConcreteMaterial,
  softSilverMaterial,
  darkTitaniumMaterial,
  clearLobbyGlassMaterial,
  ribbonWindowMaterial,
  solarPanelMaterial,
  louverAlloyMaterial,
  cyanGlowMaterial,
  blueGlowMaterial,
  orangeGlowMaterial,
  warmGlowMaterial,
} from '../materials';

export interface ProceduralTowerConfig {
  position: [number, number, number];
  width: number;
  depth: number;
  height: number;
  rotation?: number;
  accentColor?: 'cyan' | 'blue' | 'orange';
  hasCrown?: boolean;
}

/**
 * TowerGenerator — Contemporary University Academic Wing & Research Pavilion
 *
 * Architectural Realism Enhancements:
 * 1. Double-height transparent ground-floor lobby with visible structural colonnade
 * 2. Expressed horizontal concrete floor slabs casting natural shadows
 * 3. Deeply recessed ribbon glazing with vertical architectural sun-shading fins (brise-soleil)
 * 4. Articulated multi-facade window rhythm (front, back, and flanking sides)
 * 5. Functional rooftop parapet with acoustic louver mechanical penthouse & solar arrays
 */
export function TowerGenerator({
  position,
  width,
  depth,
  height,
  rotation = 0,
  accentColor = 'cyan',
  hasCrown = true,
}: ProceduralTowerConfig) {
  const { settings } = useGraphicsQuality();

  const accentMaterial = useMemo(() => {
    if (accentColor === 'blue') return blueGlowMaterial;
    if (accentColor === 'orange') return orangeGlowMaterial;
    return cyanGlowMaterial;
  }, [accentColor]);

  const shouldCastShadow = settings.shadowCasting === 'all';
  const castGeneralShadow = settings.shadowCasting !== 'none';

  // Floor plate calculations (typical university floor height: ~3.5m)
  const floorCount = Math.max(2, Math.floor(height / 3.6));
  const floorHeight = height / floorCount;
  const lobbyHeight = Math.min(3.8, floorHeight * 1.1);

  // Number of vertical facade fins along width and depth
  const xFins = Math.max(2, Math.floor(width / 2.2));
  const zFins = Math.max(2, Math.floor(depth / 2.2));

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── 1. GROUND FLOOR: TRANSPARENT LOBBY & SHADED ENTRANCE COLONNADE ── */}
      <group name="ground-lobby-and-colonnade">
        {/* Recessed Ground Floor Glass Core */}
        <mesh position={[0, lobbyHeight / 2, 0]} material={clearLobbyGlassMaterial}>
          <boxGeometry args={[width - 0.6, lobbyHeight, depth - 0.6]} />
        </mesh>
        {/* Soft Warm Interior Lobby Light Core */}
        <mesh position={[0, lobbyHeight / 2, 0]} material={warmGlowMaterial}>
          <boxGeometry args={[width * 0.5, lobbyHeight * 0.7, depth * 0.5]} />
        </mesh>

        {/* Perimeter Concrete Columns forming shaded ground colonnade */}
        {[-width / 2 + 0.35, width / 2 - 0.35].map((cx, xIdx) =>
          [-depth / 2 + 0.35, depth / 2 - 0.35].map((cz, zIdx) => (
            <mesh
              key={`lobby-col-${xIdx}-${zIdx}`}
              position={[cx, lobbyHeight / 2, cz]}
              material={precastConcreteMaterial}
              castShadow={castGeneralShadow}
              receiveShadow={settings.shadows}
            >
              <boxGeometry args={[0.6, lobbyHeight, 0.6]} />
            </mesh>
          ))
        )}

        {/* Double-Height Cantilevered Entrance Canopy */}
        <group position={[0, lobbyHeight, depth / 2 + 0.8]}>
          <mesh material={pearlWhiteMaterial} castShadow={shouldCastShadow}>
            <boxGeometry args={[width * 0.75, 0.25, 1.8]} />
          </mesh>
          {/* Canopy Glowing Soffit Reveal */}
          <mesh position={[0, -0.13, 0]} material={accentMaterial}>
            <boxGeometry args={[width * 0.7, 0.04, 1.6]} />
          </mesh>
          {/* Entrance Architectural Signage Stanchion */}
          <mesh position={[-width * 0.32, -lobbyHeight / 2, 0.7]} material={darkTitaniumMaterial}>
            <boxGeometry args={[0.08, lobbyHeight, 0.08]} />
          </mesh>
        </group>
      </group>

      {/* ── 2. UPPER FLOORS: EXPRESSED CONCRETE SLABS & RECESSED FACADES ── */}
      <group name="upper-academic-floors" position={[0, lobbyHeight, 0]}>
        {/* Central Core Mass */}
        <mesh
          position={[0, (height - lobbyHeight) / 2, 0]}
          material={pearlWhiteMaterial}
          castShadow={castGeneralShadow}
          receiveShadow={settings.shadows}
        >
          <boxGeometry args={[width - 0.6, height - lobbyHeight, depth - 0.6]} />
        </mesh>

        {/* Horizontal Express Floor Slabs casting structural shadow reveals */}
        {Array.from({ length: floorCount }).map((_, fIdx) => {
          const slabY = fIdx * floorHeight;
          if (slabY <= 0 || slabY >= height - lobbyHeight) return null;

          return (
            <group key={`floor-slab-${fIdx}`} position={[0, slabY, 0]}>
              {/* Overhanging Concrete Floor Slab Edge */}
              <mesh material={pearlWhiteMaterial} castShadow={shouldCastShadow} receiveShadow={settings.shadows}>
                <boxGeometry args={[width + 0.4, 0.32, depth + 0.4]} />
              </mesh>
              {/* Subtle Slab Underside Shadow Reveal */}
              <mesh position={[0, -0.17, 0]} material={darkTitaniumMaterial}>
                <boxGeometry args={[width + 0.35, 0.04, depth + 0.35]} />
              </mesh>
            </group>
          );
        })}

        {/* Recessed Ribbon Windows with Physical Glazing Reveals (Front & Back) */}
        <mesh position={[0, (height - lobbyHeight) / 2, depth / 2 - 0.22]} material={ribbonWindowMaterial}>
          <boxGeometry args={[width - 1.0, height - lobbyHeight - 0.5, 0.1]} />
        </mesh>
        <mesh position={[0, (height - lobbyHeight) / 2, -depth / 2 + 0.22]} material={ribbonWindowMaterial}>
          <boxGeometry args={[width - 1.0, height - lobbyHeight - 0.5, 0.1]} />
        </mesh>

        {/* Recessed Side Glazing Facades (Left & Right) */}
        <mesh
          position={[width / 2 - 0.22, (height - lobbyHeight) / 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          material={ribbonWindowMaterial}
        >
          <boxGeometry args={[depth - 1.0, height - lobbyHeight - 0.5, 0.1]} />
        </mesh>
        <mesh
          position={[-width / 2 + 0.22, (height - lobbyHeight) / 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          material={ribbonWindowMaterial}
        >
          <boxGeometry args={[depth - 1.0, height - lobbyHeight - 0.5, 0.1]} />
        </mesh>

        {/* Vertical Architectural Sun-Shading Fins (Brise-Soleil) on Front Facade */}
        {Array.from({ length: xFins }).map((_, i) => {
          const fx = -width / 2 + 0.8 + (i * (width - 1.6)) / Math.max(1, xFins - 1);
          return (
            <mesh
              key={`front-fin-${i}`}
              position={[fx, (height - lobbyHeight) / 2, depth / 2 + 0.1]}
              material={louverAlloyMaterial}
              castShadow={shouldCastShadow}
            >
              <boxGeometry args={[0.08, height - lobbyHeight, 0.45]} />
            </mesh>
          );
        })}

        {/* Vertical Architectural Sun-Shading Fins on Flanking Side */}
        {Array.from({ length: zFins }).map((_, i) => {
          const fz = -depth / 2 + 0.8 + (i * (depth - 1.6)) / Math.max(1, zFins - 1);
          return (
            <mesh
              key={`side-fin-${i}`}
              position={[width / 2 + 0.1, (height - lobbyHeight) / 2, fz]}
              material={louverAlloyMaterial}
              castShadow={shouldCastShadow}
            >
              <boxGeometry args={[0.45, height - lobbyHeight, 0.08]} />
            </mesh>
          );
        })}
      </group>

      {/* ── 3. ROOFTOP ARCHITECTURE: PARAPET, MEP PENTHOUSE & SOLAR PANELS ── */}
      <group name="rooftop-architecture" position={[0, height, 0]}>
        {/* Parapet Wall Perimeter */}
        <mesh position={[0, 0.4, 0]} material={precastConcreteMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[width + 0.2, 0.8, depth + 0.2]} />
        </mesh>
        {/* Interior Roof Deck Floor */}
        <mesh position={[0, 0.05, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[width - 0.4, 0.1, depth - 0.4]} />
        </mesh>
        {/* Parapet Metallic Coping Cap */}
        <mesh position={[0, 0.82, 0]} material={softSilverMaterial}>
          <boxGeometry args={[width + 0.35, 0.08, depth + 0.35]} />
        </mesh>

        {/* Mechanical Equipment / HVAC Screening Penthouse */}
        <group position={[-width * 0.15, 0.9, -depth * 0.15]}>
          <mesh material={louverAlloyMaterial} castShadow={shouldCastShadow}>
            <boxGeometry args={[width * 0.55, 1.6, depth * 0.55]} />
          </mesh>
          {/* Elevator Overrun Penthouse Core */}
          <mesh position={[0, 0.9, 0]} material={precastConcreteMaterial}>
            <boxGeometry args={[width * 0.35, 0.6, depth * 0.35]} />
          </mesh>
        </group>

        {/* Photovoltaic Solar Array Canopy on Roof Deck */}
        <mesh
          position={[width * 0.2, 0.6, depth * 0.2]}
          rotation={[-0.2, 0, 0]}
          material={solarPanelMaterial}
          castShadow={shouldCastShadow}
        >
          <boxGeometry args={[width * 0.45, 0.06, depth * 0.45]} />
        </mesh>

        {/* Slender Rooftop Telemetry Mast (Only if hasCrown is active) */}
        {hasCrown && (
          <group position={[0, 1.2, 0]}>
            <mesh material={titaniumStructuralMaterial}>
              <cylinderGeometry args={[0.04, 0.08, 2.4, 8]} />
            </mesh>
            <mesh position={[0, 1.25, 0]} material={accentMaterial}>
              <sphereGeometry args={[0.12, 8, 8]} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}

export default TowerGenerator;
