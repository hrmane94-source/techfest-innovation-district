import { useMemo } from 'react';
import {
  darkTitaniumMaterial,
  titaniumStructuralMaterial,
  metalExoskeletonMaterial,
  reflectiveGlassMaterial,
  windowGridMaterial,
  cyanGlowMaterial,
  blueGlowMaterial,
  orangeGlowMaterial,
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
 * TowerGenerator — Generates procedural architectural towers with realistic window grids,
 * structural corner columns, recessed facades, and rooftop equipment.
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
  const accentMaterial = useMemo(() => {
    if (accentColor === 'blue') return blueGlowMaterial;
    if (accentColor === 'orange') return orangeGlowMaterial;
    return cyanGlowMaterial;
  }, [accentColor]);

  const ribCount = Math.max(1, Math.floor(width / 2.6));
  const ribSpacing = width / (ribCount + 1);

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* 1. Tower Core Structure */}
      <mesh position={[0, height / 2, 0]} material={darkTitaniumMaterial}>
        <boxGeometry args={[width, height, depth]} />
      </mesh>

      {/* 2. Realistic Window Grid Curtain Facades (Front & Back) */}
      <mesh position={[0, height / 2, depth / 2 + 0.04]} material={windowGridMaterial}>
        <boxGeometry args={[width - 0.7, height - 1.2, 0.08]} />
      </mesh>
      <mesh position={[0, height / 2, -depth / 2 - 0.04]} material={windowGridMaterial}>
        <boxGeometry args={[width - 0.7, height - 1.2, 0.08]} />
      </mesh>

      {/* 3. Outer Titanium Structural Frame Corners */}
      {[-width / 2, width / 2].map((x, xIdx) =>
        [-depth / 2, depth / 2].map((z, zIdx) => (
          <mesh
            key={`gen-corner-${xIdx}-${zIdx}`}
            position={[x, height / 2, z]}
            material={titaniumStructuralMaterial}
          >
            <boxGeometry args={[0.55, height + 0.15, 0.55]} />
          </mesh>
        ))
      )}

      {/* 4. Vertical Illuminated Facade Ribs */}
      {Array.from({ length: ribCount }).map((_, idx) => {
        const xPos = -width / 2 + ribSpacing * (idx + 1);
        return (
          <mesh
            key={`gen-rib-${idx}`}
            position={[xPos, height / 2, depth / 2 + 0.1]}
            material={accentMaterial}
          >
            <boxGeometry args={[0.12, height - 1.8, 0.06]} />
          </mesh>
        );
      })}

      {/* 5. Mid-level Structural Belt with Accent Strip */}
      <mesh position={[0, height * 0.58, 0]} material={metalExoskeletonMaterial}>
        <boxGeometry args={[width + 0.25, 0.7, depth + 0.25]} />
      </mesh>
      <mesh position={[0, height * 0.58, 0]} material={accentMaterial}>
        <boxGeometry args={[width + 0.3, 0.16, depth + 0.3]} />
      </mesh>

      {/* 6. Rooftop Penthouse & Equipment */}
      {hasCrown && (
        <group position={[0, height, 0]}>
          {/* Glass & Titanium Parapet */}
          <mesh position={[0, 0.7, 0]} material={reflectiveGlassMaterial}>
            <boxGeometry args={[width * 0.82, 1.4, depth * 0.82]} />
          </mesh>
          <mesh position={[0, 1.42, 0]} material={accentMaterial}>
            <boxGeometry args={[width * 0.84, 0.1, depth * 0.84]} />
          </mesh>
          {/* Rooftop HVAC Plant */}
          <mesh position={[-width * 0.2, 0.6, -depth * 0.2]} material={metalExoskeletonMaterial}>
            <boxGeometry args={[1.6, 1.0, 1.6]} />
          </mesh>
          {/* Telemetry Mast */}
          <mesh position={[width * 0.15, 2.6, width * 0.15]} material={titaniumStructuralMaterial}>
            <cylinderGeometry args={[0.08, 0.22, 3.4, 6]} />
          </mesh>
          <mesh position={[width * 0.15, 4.4, width * 0.15]} material={accentMaterial}>
            <sphereGeometry args={[0.22, 6, 6]} />
          </mesh>
        </group>
      )}
    </group>
  );
}
