import {
  darkTitaniumMaterial,
  titaniumStructuralMaterial,
  blueSteelMaterial,
  glassCurtainMaterial,
  reflectiveGlassMaterial,
  cyanGlowMaterial,
  blueGlowMaterial,
  orangeGlowMaterial,
} from '../materials';

/* =========================================================================
   1. AI DISTRICT: STEPPED COMPUTATIONAL RESEARCH TOWER
   ========================================================================= */
export interface SteppedTowerProps {
  position: [number, number, number];
  baseSize?: [number, number]; // width, depth
  height?: number;
  rotation?: number;
}

export function SteppedTower({
  position,
  baseSize = [7.5, 7.5],
  height = 36,
  rotation = 0,
}: SteppedTowerProps) {
  const [w, d] = baseSize;
  const h1 = height * 0.45;
  const h2 = height * 0.35;
  const h3 = height * 0.2;

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Tier 1 (Base volume) */}
      <mesh position={[0, h1 / 2, 0]} material={darkTitaniumMaterial}>
        <boxGeometry args={[w, h1, d]} />
      </mesh>
      {/* Tier 1 Glass facade panels */}
      <mesh position={[0, h1 / 2, d / 2 + 0.05]} material={reflectiveGlassMaterial}>
        <boxGeometry args={[w - 1.2, h1 - 1, 0.1]} />
      </mesh>
      <mesh position={[0, h1 / 2, -d / 2 - 0.05]} material={reflectiveGlassMaterial}>
        <boxGeometry args={[w - 1.2, h1 - 1, 0.1]} />
      </mesh>
      {/* Tier 1 Corner vertical cyan strips */}
      <mesh position={[-w / 2, h1 / 2, d / 2]} material={cyanGlowMaterial}>
        <boxGeometry args={[0.15, h1, 0.15]} />
      </mesh>
      <mesh position={[w / 2, h1 / 2, d / 2]} material={cyanGlowMaterial}>
        <boxGeometry args={[0.15, h1, 0.15]} />
      </mesh>

      {/* Tier 1 Terrace Edge Trim */}
      <mesh position={[0, h1 + 0.1, 0]} material={titaniumStructuralMaterial}>
        <boxGeometry args={[w + 0.2, 0.2, d + 0.2]} />
      </mesh>

      {/* Tier 2 (Setback volume) */}
      <group position={[0, h1, 0]}>
        <mesh position={[0, h2 / 2, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[w * 0.78, h2, d * 0.78]} />
        </mesh>
        <mesh position={[0, h2 / 2, (d * 0.78) / 2 + 0.05]} material={glassCurtainMaterial}>
          <boxGeometry args={[w * 0.78 - 1.0, h2 - 0.8, 0.1]} />
        </mesh>
        {/* Tier 2 Cyan rib */}
        <mesh position={[0, h2 / 2, (d * 0.78) / 2 + 0.1]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.12, h2, 0.05]} />
        </mesh>
      </group>

      {/* Tier 3 (Upper pinnacle volume) */}
      <group position={[0, h1 + h2, 0]}>
        <mesh position={[0, h3 / 2, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[w * 0.55, h3, d * 0.55]} />
        </mesh>
        {/* Rooftop sensory beacon array */}
        <mesh position={[0, h3 + 0.8, 0]} material={cyanGlowMaterial}>
          <cylinderGeometry args={[0.2, 0.4, 1.6, 6]} />
        </mesh>
        <mesh position={[0, h3 + 1.8, 0]} material={blueGlowMaterial}>
          <sphereGeometry args={[0.25, 8, 8]} />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================================
   2. ROBOTICS DISTRICT: INDUSTRIAL FABRICATION CORE & GANTRY FACILITY
   ========================================================================= */
export interface IndustrialComplexProps {
  position: [number, number, number];
  rotation?: number;
}

export function IndustrialComplex({ position, rotation = 0 }: IndustrialComplexProps) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* 1. Cylindrical Fabrication Core with heavy metallic external rings */}
      <group position={[-5, 0, -2]}>
        <mesh position={[0, 9, 0]} material={darkTitaniumMaterial}>
          <cylinderGeometry args={[5.2, 5.8, 18, 12]} />
        </mesh>
        {/* Industrial Exoskeleton Bands */}
        {[3.5, 9.0, 14.5].map((y, idx) => (
          <mesh key={`core-band-${idx}`} position={[0, y, 0]} material={blueSteelMaterial}>
            <cylinderGeometry args={[5.5, 5.5, 0.7, 12]} />
          </mesh>
        ))}
        {/* Orange Accent Status Ring */}
        <mesh position={[0, 17.5, 0]} material={orangeGlowMaterial}>
          <cylinderGeometry args={[5.25, 5.25, 0.3, 12]} />
        </mesh>
        {/* Rooftop vent turbine */}
        <mesh position={[0, 18.5, 0]} material={titaniumStructuralMaterial}>
          <cylinderGeometry args={[2.5, 3.2, 1.2, 8]} />
        </mesh>
      </group>

      {/* 2. Heavy Assembly Hall (Geometric industrial volume) */}
      <group position={[5, 0, 3]}>
        <mesh position={[0, 6.5, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[11, 13, 13]} />
        </mesh>
        {/* Ribbed Industrial Louvers on Facade */}
        {[3, 6, 9].map((y, idx) => (
          <mesh key={`hall-louver-${idx}`} position={[0, y, 6.6]} material={blueSteelMaterial}>
            <boxGeometry args={[9.5, 0.4, 0.3]} />
          </mesh>
        ))}
        {/* Low-Level Orange Loading Dock Apertures */}
        <mesh position={[0, 2.0, 6.65]} material={orangeGlowMaterial}>
          <boxGeometry args={[4.2, 2.5, 0.1]} />
        </mesh>
      </group>

      {/* 3. Elevated Overhead Mechanical Gantry Crane Rail */}
      <group position={[0, 13.5, 0]}>
        <mesh position={[0, 0, 0]} material={blueSteelMaterial}>
          <boxGeometry args={[16, 1.2, 1.8]} />
        </mesh>
        <mesh position={[0, 0.7, 0]} material={orangeGlowMaterial}>
          <boxGeometry args={[15, 0.15, 0.2]} />
        </mesh>
        {/* Gantry vertical support column */}
        <mesh position={[7.5, -6.5, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[1.2, 13, 1.2]} />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================================
   3. AEROSPACE DISTRICT: AERODYNAMIC HANGAR & OBSERVATION SPIRE
   ========================================================================= */
export interface AerospaceComplexProps {
  position: [number, number, number];
  rotation?: number;
}

export function AerospaceComplex({ position, rotation = 0 }: AerospaceComplexProps) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* 1. Long Aerodynamic Research & Testing Hangar (Sweeping vaulted roof profile) */}
      <group position={[0, 0, -4]}>
        {/* Base Hangar Structure */}
        <mesh position={[0, 5, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[22, 10, 10]} />
        </mesh>
        {/* Chamfered/Vaulted Aerodynamic Roof */}
        <mesh position={[0, 11, 0]} rotation={[0, 0, Math.PI / 4]} material={blueSteelMaterial}>
          <cylinderGeometry args={[7, 7, 21.8, 4]} />
        </mesh>
        {/* Long Ribbon Window running along the fuselage */}
        <mesh position={[0, 6.2, 5.05]} material={reflectiveGlassMaterial}>
          <boxGeometry args={[18, 1.6, 0.1]} />
        </mesh>
        {/* Horizontal Cyan Guide Strip */}
        <mesh position={[0, 4.0, 5.08]} material={cyanGlowMaterial}>
          <boxGeometry args={[19, 0.15, 0.05]} />
        </mesh>
        {/* Hangar Giant Sliding Portal */}
        <mesh position={[10.9, 4.5, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[0.3, 7.5, 7.0]} />
        </mesh>
        <mesh position={[11.1, 8.2, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.1, 0.2, 6.8]} />
        </mesh>
      </group>

      {/* 2. Slender Aerospace Observation & Telemetry Spire */}
      <group position={[8, 0, 7]}>
        {/* Tall tapered mast */}
        <mesh position={[0, 18, 0]} material={titaniumStructuralMaterial}>
          <cylinderGeometry args={[1.2, 2.4, 36, 8]} />
        </mesh>
        {/* Vertical cyan telemetry conduits */}
        <mesh position={[0, 18, 1.25]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.15, 35, 0.08]} />
        </mesh>
        {/* Cantilevered Observation Deck / Flight Control Halo */}
        <mesh position={[0, 31, 0]} material={darkTitaniumMaterial}>
          <cylinderGeometry args={[4.2, 2.6, 2.4, 8]} />
        </mesh>
        <mesh position={[0, 31, 0]} material={reflectiveGlassMaterial}>
          <cylinderGeometry args={[4.25, 4.25, 0.8, 8]} />
        </mesh>
        <mesh position={[0, 32.3, 0]} material={cyanGlowMaterial}>
          <cylinderGeometry args={[4.3, 4.3, 0.15, 8]} />
        </mesh>
        {/* Apex Radar Dish / Beacon */}
        <mesh position={[0, 37.5, 0]} material={cyanGlowMaterial}>
          <sphereGeometry args={[0.5, 8, 8]} />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================================
   4. CYBERSECURITY DISTRICT: FORTIFIED DEFENSIVE MATRIX & CRYPTO SPIRE
   ========================================================================= */
export interface CybersecurityComplexProps {
  position: [number, number, number];
  rotation?: number;
}

export function CybersecurityComplex({
  position,
  rotation = 0,
}: CybersecurityComplexProps) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* 1. Fortified Central Matrix Core (Angular 45-degree defensive facets) */}
      <group position={[-2, 0, 0]}>
        {/* Heavy defensive lower bastion */}
        <mesh position={[0, 8, 0]} rotation={[0, Math.PI / 4, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[12, 16, 12]} />
        </mesh>
        {/* Chamfered defensive overhang */}
        <mesh position={[0, 17, 0]} rotation={[0, Math.PI / 4, 0]} material={blueSteelMaterial}>
          <boxGeometry args={[13.5, 2.2, 13.5]} />
        </mesh>
        {/* Stealth defensive upper monolith */}
        <mesh position={[0, 25, 0]} rotation={[0, Math.PI / 4, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[8.5, 14, 8.5]} />
        </mesh>
        {/* Deep narrow optical slit windows with cyan datastream glow */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, idx) => (
          <group key={`cyber-slit-${idx}`} rotation={[0, ang + Math.PI / 4, 0]}>
            <mesh position={[0, 25, 4.35]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.2, 11, 0.1]} />
            </mesh>
            <mesh position={[-1.8, 25, 4.35]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.1, 7, 0.1]} />
            </mesh>
            <mesh position={[1.8, 25, 4.35]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.1, 7, 0.1]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 2. Cryptography Spire (Wedge-shaped defensive tower) */}
      <group position={[7, 0, -4]}>
        <mesh position={[0, 14, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[5, 28, 6]} />
        </mesh>
        {/* Angular roof slant */}
        <mesh position={[0, 28.5, 0]} rotation={[0.4, 0, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[5.2, 2.0, 6.2]} />
        </mesh>
        {/* Vertical encrypted datastream conduit */}
        <mesh position={[2.55, 14, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.1, 26, 0.8]} />
        </mesh>
        {/* Orange access status marker */}
        <mesh position={[0, 2.5, 3.05]} material={orangeGlowMaterial}>
          <boxGeometry args={[2.0, 3.0, 0.1]} />
        </mesh>
      </group>
    </group>
  );
}
