import { useMemo } from 'react';
import {
  plazaMaterial,
  titaniumStructuralMaterial,
  cyanGlowMaterial,
  blueGlowMaterial,
  orangeGlowMaterial,
  reflectiveGlassMaterial,
} from '../materials';

/**
 * DistrictPlaza — Monumental central plaza supporting the Techfest Innovation Tower
 * - Stepped octagonal grand podium
 * - Concentric illuminated plaza rings
 * - Holographic / energy telemetry pylons
 * - Axial approach walkways and plazas
 */
export function DistrictPlaza() {
  // Symmetrically placed telemetry pylons surrounding the plaza perimeter
  const pylonPositions = useMemo(() => {
    const pylons = [];
    const count = 8;
    const radius = 18.5;
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
        <cylinderGeometry args={[22, 23.5, 0.8, 8]} />
      </mesh>

      {/* 2. Secondary Elevated Terrace */}
      <mesh position={[0, 1.0, 0]} material={titaniumStructuralMaterial}>
        <cylinderGeometry args={[16.5, 17.5, 0.5, 8]} />
      </mesh>

      {/* 3. Circular Reflecting Pool / Energy Basin */}
      <mesh position={[0, 1.28, 0]} rotation={[-Math.PI / 2, 0, 0]} material={reflectiveGlassMaterial}>
        <ringGeometry args={[11.5, 15.5, 48]} />
      </mesh>

      {/* 4. Concentric Glowing Boundary Rings */}
      <mesh position={[0, 1.3, 0]} rotation={[-Math.PI / 2, 0, 0]} material={cyanGlowMaterial}>
        <ringGeometry args={[15.3, 15.6, 48]} />
      </mesh>
      <mesh position={[0, 1.3, 0]} rotation={[-Math.PI / 2, 0, 0]} material={blueGlowMaterial}>
        <ringGeometry args={[11.4, 11.6, 48]} />
      </mesh>

      {/* 5. Telemetry / Architectural Energy Pylons around the Plaza */}
      {pylonPositions.map((pylon, idx) => (
        <group
          key={`plaza-pylon-${idx}`}
          position={[pylon.x, 1.0, pylon.z]}
          rotation={[0, -pylon.angle + Math.PI / 2, 0]}
        >
          {/* Tapered architectural pylon */}
          <mesh position={[0, 2.5, 0]} material={titaniumStructuralMaterial}>
            <boxGeometry args={[0.8, 5.0, 0.8]} />
          </mesh>
          {/* Vertical glowing cyan slit */}
          <mesh position={[0, 2.5, 0.42]} material={cyanGlowMaterial}>
            <boxGeometry args={[0.15, 4.4, 0.05]} />
          </mesh>
          {/* Pylon apex beacon */}
          <mesh position={[0, 5.2, 0]} material={orangeGlowMaterial}>
            <boxGeometry args={[0.3, 0.4, 0.3]} />
          </mesh>
        </group>
      ))}

      {/* 6. Four Axial Grand Approach Steps */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
        <group key={`approach-steps-${idx}`} rotation={[0, angle, 0]}>
          <mesh position={[0, 0.4, 20]} material={titaniumStructuralMaterial}>
            <boxGeometry args={[5.2, 0.4, 4.0]} />
          </mesh>
          <mesh position={[-2.5, 0.8, 20]} material={cyanGlowMaterial}>
            <boxGeometry args={[0.1, 0.4, 4.0]} />
          </mesh>
          <mesh position={[2.5, 0.8, 20]} material={cyanGlowMaterial}>
            <boxGeometry args={[0.1, 0.4, 4.0]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
