import { useMemo } from 'react';
import {
  darkTitaniumMaterial,
  titaniumStructuralMaterial,
  glassCurtainMaterial,
  reflectiveGlassMaterial,
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
 * TowerGenerator — Generates procedural architectural towers with layered facades,
 * recessed glass curtains, and vertical illumination accents.
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

  // Facade vertical ribs
  const ribCount = Math.max(1, Math.floor(width / 2.5));
  const ribSpacing = width / (ribCount + 1);

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* 1. Tower Core Structure */}
      <mesh position={[0, height / 2, 0]} material={darkTitaniumMaterial}>
        <boxGeometry args={[width, height, depth]} />
      </mesh>

      {/* 2. Recessed Glass Facades (Front & Back) */}
      <mesh position={[0, height / 2, depth / 2 + 0.04]} material={glassCurtainMaterial}>
        <boxGeometry args={[width - 0.8, height - 1.2, 0.08]} />
      </mesh>
      <mesh position={[0, height / 2, -depth / 2 - 0.04]} material={glassCurtainMaterial}>
        <boxGeometry args={[width - 0.8, height - 1.2, 0.08]} />
      </mesh>

      {/* 3. Outer Titanium Structural Frame Corners */}
      {[-width / 2, width / 2].map((x, xIdx) =>
        [-depth / 2, depth / 2].map((z, zIdx) => (
          <mesh
            key={`corner-${xIdx}-${zIdx}`}
            position={[x, height / 2, z]}
            material={titaniumStructuralMaterial}
          >
            <boxGeometry args={[0.5, height + 0.1, 0.5]} />
          </mesh>
        ))
      )}

      {/* 4. Vertical Illuminated Facade Ribs */}
      {Array.from({ length: ribCount }).map((_, idx) => {
        const xPos = -width / 2 + ribSpacing * (idx + 1);
        return (
          <mesh
            key={`rib-${idx}`}
            position={[xPos, height / 2, depth / 2 + 0.1]}
            material={accentMaterial}
          >
            <boxGeometry args={[0.1, height - 2, 0.06]} />
          </mesh>
        );
      })}

      {/* 5. Mid-level Structural Belt */}
      <mesh position={[0, height * 0.6, 0]} material={titaniumStructuralMaterial}>
        <boxGeometry args={[width + 0.2, 0.6, depth + 0.2]} />
      </mesh>
      <mesh position={[0, height * 0.6, 0]} material={accentMaterial}>
        <boxGeometry args={[width + 0.25, 0.15, depth + 0.25]} />
      </mesh>

      {/* 6. Rooftop Crown & Antenna Structure */}
      {hasCrown && (
        <group position={[0, height, 0]}>
          {/* Crown parapet */}
          <mesh position={[0, 0.6, 0]} material={reflectiveGlassMaterial}>
            <boxGeometry args={[width * 0.8, 1.2, depth * 0.8]} />
          </mesh>
          <mesh position={[0, 1.25, 0]} material={accentMaterial}>
            <boxGeometry args={[width * 0.82, 0.1, depth * 0.82]} />
          </mesh>
          {/* Rooftop telemetry mast */}
          <mesh position={[0, 2.5, 0]} material={titaniumStructuralMaterial}>
            <cylinderGeometry args={[0.1, 0.25, 3.2, 6]} />
          </mesh>
          <mesh position={[0, 4.2, 0]} material={accentMaterial}>
            <sphereGeometry args={[0.2, 6, 6]} />
          </mesh>
        </group>
      )}
    </group>
  );
}
