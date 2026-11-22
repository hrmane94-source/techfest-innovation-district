import { useMemo } from 'react';
import { useGraphicsQuality } from '../../context';
import {
  titaniumStructuralMaterial,
  metalExoskeletonMaterial,
  pearlWhiteMaterial,
  softSilverMaterial,
  lightTitaniumMaterial,
  reflectiveGlassMaterial,
  structuralGlassMaterial,
  windowGridMaterial,
  solarPanelMaterial,
  cyanGlowMaterial,
  blueGlowMaterial,
  orangeGlowMaterial,
  whiteGlowMaterial,
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
 * TowerGenerator — Adaptive procedural architectural towers
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

  const ribCount = Math.max(1, Math.floor(width / 2.6));
  const ribSpacing = width / (ribCount + 1);
  const midFloorY = height * 0.55;
  const isHighQuality = settings.tier === 'high';
  const shouldCastShadow = settings.shadowCasting === 'all';
  const simplified = settings.simplifiedDistantGeometry;

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── 1. GROUND PODIUM & ENTRANCE LOBBY ── */}
      <mesh
        position={[0, 1.8, 0]}
        material={softSilverMaterial}
        receiveShadow={settings.shadows}
        castShadow={shouldCastShadow}
      >
        <boxGeometry args={[width + 0.8, 3.6, depth + 0.8]} />
      </mesh>

      {/* Glazed Entrance Lobby */}
      <mesh position={[0, 1.6, depth / 2 + 0.42]} material={structuralGlassMaterial}>
        <boxGeometry args={[width * 0.65, 2.6, 0.1]} />
      </mesh>
      <mesh position={[0, 1.6, depth / 2 + 0.38]} material={whiteGlowMaterial}>
        <boxGeometry args={[width * 0.55, 1.8, 0.05]} />
      </mesh>

      {/* Projecting Entrance Canopy */}
      <mesh position={[0, 3.1, depth / 2 + 0.9]} material={pearlWhiteMaterial} castShadow={shouldCastShadow}>
        <boxGeometry args={[width * 0.75, 0.2, 1.2]} />
      </mesh>
      <mesh position={[0, 3.0, depth / 2 + 0.9]} material={accentMaterial}>
        <boxGeometry args={[width * 0.7, 0.04, 1.1]} />
      </mesh>

      {/* ── 2. LOWER TOWER SECTION ── */}
      <mesh
        position={[0, (midFloorY + 3.6) / 2, 0]}
        material={pearlWhiteMaterial}
        castShadow={settings.shadowCasting !== 'none'}
        receiveShadow={settings.shadows}
      >
        <boxGeometry args={[width, midFloorY - 3.6, depth]} />
      </mesh>

      {/* Lower Window Facades */}
      <mesh position={[0, (midFloorY + 3.6) / 2, depth / 2 + 0.04]} material={windowGridMaterial}>
        <boxGeometry args={[width - 0.8, midFloorY - 4.4, 0.08]} />
      </mesh>
      <mesh position={[0, (midFloorY + 3.6) / 2, -depth / 2 - 0.04]} material={windowGridMaterial}>
        <boxGeometry args={[width - 0.8, midFloorY - 4.4, 0.08]} />
      </mesh>

      {/* ── 3. MID-LEVEL ARCHITECTURAL BALCONY ── */}
      <group position={[0, midFloorY, 0]}>
        <mesh material={softSilverMaterial}>
          <boxGeometry args={[width * 0.75, 2.2, depth * 0.75]} />
        </mesh>
        <mesh position={[0, -1.0, 0]} material={pearlWhiteMaterial}>
          <boxGeometry args={[width + 0.4, 0.35, depth + 0.4]} />
        </mesh>
        <mesh position={[0, 1.0, 0]} material={pearlWhiteMaterial}>
          <boxGeometry args={[width + 0.4, 0.35, depth + 0.4]} />
        </mesh>
        <mesh position={[0, -0.9, 0]} material={accentMaterial}>
          <boxGeometry args={[width + 0.45, 0.08, depth + 0.45]} />
        </mesh>
        <mesh position={[0, 0.9, 0]} material={accentMaterial}>
          <boxGeometry args={[width + 0.45, 0.08, depth + 0.45]} />
        </mesh>
      </group>

      {/* ── 4. UPPER TOWER SECTION ── */}
      <mesh
        position={[0, (height + midFloorY + 2.2) / 2, 0]}
        material={lightTitaniumMaterial}
        castShadow={settings.shadowCasting !== 'none'}
        receiveShadow={settings.shadows}
      >
        <boxGeometry args={[width * 0.9, height - midFloorY - 2.2, depth * 0.9]} />
      </mesh>

      {/* Upper Window Facades */}
      <mesh position={[0, (height + midFloorY + 2.2) / 2, (depth * 0.9) / 2 + 0.04]} material={windowGridMaterial}>
        <boxGeometry args={[width * 0.9 - 0.6, height - midFloorY - 3.2, 0.06]} />
      </mesh>
      <mesh position={[0, (height + midFloorY + 2.2) / 2, -(depth * 0.9) / 2 - 0.04]} material={windowGridMaterial}>
        <boxGeometry args={[width * 0.9 - 0.6, height - midFloorY - 3.2, 0.06]} />
      </mesh>

      {/* ── 5. CORNER COLUMNS & ACCENT RIBS ── */}
      {[-width / 2, width / 2].map((x, xIdx) =>
        [-depth / 2, depth / 2].map((z, zIdx) => (
          <mesh
            key={`gen-corner-${xIdx}-${zIdx}`}
            position={[x, height / 2, z]}
            material={pearlWhiteMaterial}
            castShadow={shouldCastShadow}
          >
            <boxGeometry args={[0.55, height, 0.55]} />
          </mesh>
        ))
      )}

      {/* Vertical Facade Illumination Ribs (rendered when not in simplified mobile mode) */}
      {!simplified &&
        Array.from({ length: ribCount }).map((_, idx) => {
          const xPos = -width / 2 + ribSpacing * (idx + 1);
          return (
            <mesh
              key={`gen-rib-${idx}`}
              position={[xPos, height / 2, depth / 2 + 0.08]}
              material={accentMaterial}
            >
              <boxGeometry args={[0.1, height - 2.4, 0.05]} />
            </mesh>
          );
        })}

      {/* ── 6. ROOFTOP PENTHOUSE & CROWN ── */}
      {hasCrown && (
        <group position={[0, height, 0]}>
          <mesh position={[0, 0.7, 0]} material={reflectiveGlassMaterial}>
            <boxGeometry args={[width * 0.82, 1.4, depth * 0.82]} />
          </mesh>
          <mesh position={[0, 1.42, 0]} material={accentMaterial}>
            <boxGeometry args={[width * 0.84, 0.1, depth * 0.84]} />
          </mesh>

          {/* Rooftop Solar Array */}
          <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} material={solarPanelMaterial}>
            <planeGeometry args={[width * 0.75, depth * 0.75]} />
          </mesh>

          {/* Rooftop HVAC & Telemetry (Rendered when details enabled) */}
          {isHighQuality && (
            <mesh position={[-width * 0.22, 0.7, -depth * 0.22]} material={metalExoskeletonMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[1.6, 1.1, 1.6]} />
            </mesh>
          )}

          <mesh position={[width * 0.2, 2.6, width * 0.2]} material={titaniumStructuralMaterial}>
            <cylinderGeometry args={[0.08, 0.24, 3.4, 6]} />
          </mesh>
          <mesh position={[width * 0.2, 4.4, width * 0.2]} material={accentMaterial}>
            <sphereGeometry args={[0.24, 6, 6]} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default TowerGenerator;
