import { useMemo } from 'react';
import {
  plazaMaterial,
  plazaAccentMaterial,
  titaniumStructuralMaterial,
  metalExoskeletonMaterial,
  cyanGlowMaterial,
  blueGlowMaterial,
  orangeGlowMaterial,
  reflectiveGlassMaterial,
} from '../materials';

/**
 * DistrictPlaza — Monumental central plaza supporting the Techfest Innovation Tower (Refined Milestone 1.1)
 *
 * - Tiered octagonal grand podium with contrasting radial paving
 * - Reflecting pool & concentric illuminated energy rings
 * - 8 High-tech telemetry pylons with optical status indicators
 * - 4 Axial grand approach ceremonial staircases with illuminated railings
 */
export function DistrictPlaza() {
  // Symmetrically placed telemetry pylons surrounding the plaza perimeter
  const pylonPositions = useMemo(() => {
    const pylons = [];
    const count = 8;
    const radius = 18.8;
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count;
      pylons.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        angle,
      });
    }
    return pylons;
  }, []);

  return (
    <group name="central-district-plaza" position={[0, 0, 0]}>
      {/* 1. Base Stepped Octagonal Podium Deck */}
      <mesh position={[0, 0.4, 0]} material={plazaMaterial} receiveShadow>
        <cylinderGeometry args={[22.5, 24.0, 0.8, 8]} />
      </mesh>
      {/* Outer Podium Coping Trim */}
      <mesh position={[0, 0.82, 0]} material={metalExoskeletonMaterial}>
        <cylinderGeometry args={[22.6, 22.6, 0.08, 8]} />
      </mesh>

      {/* 2. Secondary Elevated Paved Terrace */}
      <mesh position={[0, 1.0, 0]} material={plazaAccentMaterial}>
        <cylinderGeometry args={[16.8, 17.8, 0.5, 8]} />
      </mesh>

      {/* 3. Circular Reflecting Pool / Energy Basin */}
      <mesh
        position={[0, 1.28, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={reflectiveGlassMaterial}
      >
        <ringGeometry args={[11.5, 15.6, 48]} />
      </mesh>

      {/* 4. Concentric Glowing Boundary Rings */}
      <mesh
        position={[0, 1.3, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={cyanGlowMaterial}
      >
        <ringGeometry args={[15.4, 15.7, 48]} />
      </mesh>
      <mesh
        position={[0, 1.3, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={blueGlowMaterial}
      >
        <ringGeometry args={[11.3, 11.5, 48]} />
      </mesh>

      {/* 5. In-Ground Radial Accent Light Strips */}
      {Array.from({ length: 8 }).map((_, idx) => {
        const ang = (idx * Math.PI * 2) / 8 + Math.PI / 8;
        return (
          <group key={`plaza-radial-strip-${idx}`} rotation={[0, ang, 0]}>
            <mesh position={[0, 1.28, 18.5]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.16, 0.02, 5.5]} />
            </mesh>
          </group>
        );
      })}

      {/* 6. Eight Telemetry / Architectural Energy Pylons around the Plaza */}
      {pylonPositions.map((pylon, idx) => (
        <group
          key={`plaza-pylon-${idx}`}
          position={[pylon.x, 1.0, pylon.z]}
          rotation={[0, -pylon.angle + Math.PI / 2, 0]}
        >
          {/* Tapered architectural pylon */}
          <mesh position={[0, 2.6, 0]} material={titaniumStructuralMaterial}>
            <boxGeometry args={[0.9, 5.2, 0.9]} />
          </mesh>
          {/* Vertical glowing cyan optical slit */}
          <mesh position={[0, 2.6, 0.48]} material={cyanGlowMaterial}>
            <boxGeometry args={[0.18, 4.6, 0.05]} />
          </mesh>
          {/* Pylon Padded Base */}
          <mesh position={[0, 0.3, 0]} material={metalExoskeletonMaterial}>
            <boxGeometry args={[1.2, 0.6, 1.2]} />
          </mesh>
          {/* Apex Status Beacon */}
          <mesh position={[0, 5.4, 0]} material={orangeGlowMaterial}>
            <boxGeometry args={[0.35, 0.45, 0.35]} />
          </mesh>
        </group>
      ))}

      {/* 7. Four Axial Grand Approach Ceremonial Steps */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
        <group key={`approach-steps-${idx}`} rotation={[0, angle, 0]}>
          <mesh position={[0, 0.4, 20.5]} material={titaniumStructuralMaterial}>
            <boxGeometry args={[5.8, 0.4, 4.5]} />
          </mesh>
          {/* Step Glowing Side Balustrades */}
          <mesh position={[-2.8, 0.85, 20.5]} material={metalExoskeletonMaterial}>
            <boxGeometry args={[0.2, 0.5, 4.5]} />
          </mesh>
          <mesh position={[-2.8, 1.12, 20.5]} material={cyanGlowMaterial}>
            <boxGeometry args={[0.1, 0.06, 4.4]} />
          </mesh>
          <mesh position={[2.8, 0.85, 20.5]} material={metalExoskeletonMaterial}>
            <boxGeometry args={[0.2, 0.5, 4.5]} />
          </mesh>
          <mesh position={[2.8, 1.12, 20.5]} material={cyanGlowMaterial}>
            <boxGeometry args={[0.1, 0.06, 4.4]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
