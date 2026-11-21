import {
  darkTitaniumMaterial,
  titaniumStructuralMaterial,
  blueSteelMaterial,
  metalExoskeletonMaterial,
  reflectiveGlassMaterial,
  windowGridMaterial,
  cyanGlowMaterial,
  blueGlowMaterial,
  orangeGlowMaterial,
  bioluminescentFloraMaterial,
} from '../materials';

/* =========================================================================
   1. AI DISTRICT: INTELLIGENT STEPPED COMPUTATIONAL RESEARCH TOWER
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
  const h1 = height * 0.44;
  const h2 = height * 0.34;
  const h3 = height * 0.22;

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── TIER 1: BASE RESEARCH PLATFORM & CURTAIN WALL ── */}
      <group position={[0, 0, 0]}>
        {/* Core Mass */}
        <mesh position={[0, h1 / 2, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[w, h1, d]} />
        </mesh>
        {/* Window Grid Inset Facades (Front & Back) */}
        <mesh position={[0, h1 / 2, d / 2 + 0.05]} material={windowGridMaterial}>
          <boxGeometry args={[w - 1.2, h1 - 1.2, 0.1]} />
        </mesh>
        <mesh position={[0, h1 / 2, -d / 2 - 0.05]} material={windowGridMaterial}>
          <boxGeometry args={[w - 1.2, h1 - 1.2, 0.1]} />
        </mesh>

        {/* Vertical Optical Cooling Fins extending past the tier */}
        {[-w / 2, w / 2].map((xPos, idx) => (
          <group key={`t1-fin-${idx}`} position={[xPos, (h1 + 1.2) / 2, d / 2]}>
            <mesh material={metalExoskeletonMaterial}>
              <boxGeometry args={[0.25, h1 + 1.2, 0.4]} />
            </mesh>
            <mesh position={[0, 0, 0.22]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.08, h1 + 1.2, 0.05]} />
            </mesh>
          </group>
        ))}

        {/* Tier 1 Setback Roof Terrace with Glass Balustrades & Planters */}
        <mesh position={[0, h1 + 0.1, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[w + 0.3, 0.2, d + 0.3]} />
        </mesh>
        <mesh position={[0, h1 + 0.12, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[w + 0.35, 0.04, d + 0.35]} />
        </mesh>
        {/* Rooftop Terrace Mini-Planter */}
        <mesh position={[w / 3, h1 + 0.45, d / 3]} material={bioluminescentFloraMaterial}>
          <boxGeometry args={[0.8, 0.5, 0.8]} />
        </mesh>
      </group>

      {/* ── TIER 2: COMPUTATIONAL CORE & CANTILEVERED LAB POD ── */}
      <group position={[0, h1, 0]}>
        {/* Mid-Tier Core */}
        <mesh position={[0, h2 / 2, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[w * 0.76, h2, d * 0.76]} />
        </mesh>
        {/* Window Grid Insets */}
        <mesh position={[0, h2 / 2, (d * 0.76) / 2 + 0.05]} material={windowGridMaterial}>
          <boxGeometry args={[w * 0.76 - 0.8, h2 - 0.8, 0.08]} />
        </mesh>
        <mesh position={[0, h2 / 2, -(d * 0.76) / 2 - 0.05]} material={windowGridMaterial}>
          <boxGeometry args={[w * 0.76 - 0.8, h2 - 0.8, 0.08]} />
        </mesh>

        {/* Projecting Cantilevered Observation/Lab Pod */}
        <mesh
          position={[w * 0.42, h2 * 0.55, 0]}
          material={reflectiveGlassMaterial}
        >
          <boxGeometry args={[1.6, 2.4, 2.8]} />
        </mesh>
        <mesh position={[w * 0.42, h2 * 0.55 - 1.25, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[1.65, 0.1, 2.85]} />
        </mesh>

        {/* Tier 2 Terrace Roof Trim */}
        <mesh position={[0, h2 + 0.1, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[w * 0.78 + 0.2, 0.2, d * 0.78 + 0.2]} />
        </mesh>
      </group>

      {/* ── TIER 3: QUANTUM PROCESSOR PENTHOUSE & ROOF ARRAYS ── */}
      <group position={[0, h1 + h2, 0]}>
        <mesh position={[0, h3 / 2, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[w * 0.52, h3, d * 0.52]} />
        </mesh>
        {/* Vertical Data Ribbon */}
        <mesh position={[0, h3 / 2, (d * 0.52) / 2 + 0.06]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.15, h3, 0.04]} />
        </mesh>

        {/* Rooftop Quantum Server Radiator & Microwave Uplink Dish */}
        <group position={[0, h3, 0]}>
          <mesh position={[-0.8, 0.6, -0.6]} material={metalExoskeletonMaterial}>
            <cylinderGeometry args={[0.7, 0.8, 1.2, 8]} />
          </mesh>
          <mesh position={[-0.8, 1.25, -0.6]} material={cyanGlowMaterial}>
            <cylinderGeometry args={[0.65, 0.65, 0.1, 8]} />
          </mesh>
          {/* Parabolic Satellite Dish */}
          <group position={[0.8, 0.8, 0.6]} rotation={[0.4, 0.3, 0]}>
            <mesh material={titaniumStructuralMaterial}>
              <cylinderGeometry args={[0.7, 0.1, 0.4, 12, 1, true]} />
            </mesh>
            <mesh position={[0, 0.4, 0]} material={blueGlowMaterial}>
              <cylinderGeometry args={[0.04, 0.04, 0.6, 6]} />
            </mesh>
          </group>
          {/* Telemetry Mast */}
          <mesh position={[0, 2.2, 0]} material={titaniumStructuralMaterial}>
            <cylinderGeometry args={[0.08, 0.2, 3.0, 6]} />
          </mesh>
          <mesh position={[0, 3.8, 0]} material={cyanGlowMaterial}>
            <sphereGeometry args={[0.22, 8, 8]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* =========================================================================
   2. ROBOTICS DISTRICT: HEAVY FABRICATION COMPLEX & GANTRY RUNWAY
   ========================================================================= */
export interface IndustrialComplexProps {
  position: [number, number, number];
  rotation?: number;
}

export function IndustrialComplex({ position, rotation = 0 }: IndustrialComplexProps) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── 1. ADVANCED ROBOTIC FABRICATION CORE (CYLINDER + EXOSKELETON) ── */}
      <group position={[-5.5, 0, -2.5]}>
        {/* Core Cylinder Body */}
        <mesh position={[0, 9.5, 0]} material={darkTitaniumMaterial}>
          <cylinderGeometry args={[5.4, 6.0, 19, 12]} />
        </mesh>
        {/* Structural External Exoskeleton Bands */}
        {[3.5, 8.5, 13.5, 18.0].map((y, idx) => (
          <group key={`fab-band-${idx}`} position={[0, y, 0]}>
            <mesh material={metalExoskeletonMaterial}>
              <cylinderGeometry args={[5.7, 5.7, 0.75, 12]} />
            </mesh>
            {/* Embedded Orange Status Illumination Ring */}
            <mesh position={[0, 0, 0]} material={orangeGlowMaterial}>
              <cylinderGeometry args={[5.75, 5.75, 0.15, 12]} />
            </mesh>
          </group>
        ))}
        {/* Vertical Structural Steel Stanchions around the Cylinder */}
        {Array.from({ length: 6 }).map((_, idx) => {
          const ang = (idx * Math.PI * 2) / 6;
          return (
            <mesh
              key={`fab-stanchion-${idx}`}
              position={[Math.cos(ang) * 5.7, 9.5, Math.sin(ang) * 5.7]}
              material={titaniumStructuralMaterial}
            >
              <boxGeometry args={[0.4, 19.5, 0.4]} />
            </mesh>
          );
        })}
        {/* Rooftop Industrial Ventilation Fan Bank */}
        <mesh position={[0, 19.5, 0]} material={blueSteelMaterial}>
          <cylinderGeometry args={[3.2, 4.0, 1.4, 8]} />
        </mesh>
        <mesh position={[0, 20.3, 0]} material={orangeGlowMaterial}>
          <cylinderGeometry args={[2.8, 2.8, 0.2, 8]} />
        </mesh>
      </group>

      {/* ── 2. HIGH-BAY ROBOTIC ASSEMBLY & TESTING HALL ── */}
      <group position={[5.5, 0, 3.5]}>
        {/* Main Hall Volume */}
        <mesh position={[0, 7.5, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[12, 15, 14]} />
        </mesh>
        {/* Side Facade Structural X-Bracing */}
        {[-6.05, 6.05].map((xPos, idx) => (
          <group key={`hall-x-brace-${idx}`} position={[xPos, 7.5, 0]}>
            <mesh rotation={[0, 0, 0.6]} material={metalExoskeletonMaterial}>
              <boxGeometry args={[0.3, 14, 0.4]} />
            </mesh>
            <mesh rotation={[0, 0, -0.6]} material={metalExoskeletonMaterial}>
              <boxGeometry args={[0.3, 14, 0.4]} />
            </mesh>
          </group>
        ))}

        {/* Industrial Louver Ventilation Slots */}
        {[3.5, 6.5, 9.5, 12.5].map((y, idx) => (
          <mesh key={`assembly-louver-${idx}`} position={[0, y, 7.05]} material={blueSteelMaterial}>
            <boxGeometry args={[10.5, 0.45, 0.2]} />
          </mesh>
        ))}

        {/* High-Bay Heavy Cargo Roll-Up Doors with Hazard Lighting */}
        <mesh position={[0, 2.5, 7.1]} material={darkTitaniumMaterial}>
          <boxGeometry args={[5.2, 4.5, 0.15]} />
        </mesh>
        <mesh position={[0, 5.0, 7.2]} material={orangeGlowMaterial}>
          <boxGeometry args={[5.4, 0.2, 0.1]} />
        </mesh>
      </group>

      {/* ── 3. OVERHEAD GANTRY CRANE RUNWAY & HOIST TROLLEY ── */}
      <group position={[0, 14.5, 0]}>
        {/* Main Double Crane Rails */}
        <mesh position={[0, 0, -1.0]} material={blueSteelMaterial}>
          <boxGeometry args={[18, 0.8, 0.5]} />
        </mesh>
        <mesh position={[0, 0, 1.0]} material={blueSteelMaterial}>
          <boxGeometry args={[18, 0.8, 0.5]} />
        </mesh>
        {/* Orange Warning Safety Rail */}
        <mesh position={[0, 0.6, 0]} material={orangeGlowMaterial}>
          <boxGeometry args={[17.5, 0.12, 2.2]} />
        </mesh>
        {/* Mobile Hoist Trolley Unit */}
        <mesh position={[2.0, -0.5, 0]} material={metalExoskeletonMaterial}>
          <boxGeometry args={[2.4, 1.4, 2.4]} />
        </mesh>
        {/* Trolley Floodlights */}
        <mesh position={[2.0, -1.25, 0]} material={orangeGlowMaterial}>
          <boxGeometry args={[1.8, 0.1, 1.8]} />
        </mesh>
        {/* Heavy Gantry Structural A-Frame Pillar */}
        <mesh position={[8.5, -7.0, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[1.4, 14.5, 1.4]} />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================================
   3. AEROSPACE DISTRICT: AERODYNAMIC HANGAR, FLIGHT TOWER & RADAR DISH
   ========================================================================= */
export interface AerospaceComplexProps {
  position: [number, number, number];
  rotation?: number;
}

export function AerospaceComplex({ position, rotation = 0 }: AerospaceComplexProps) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── 1. AERODYNAMIC TESTING HANGAR WITH EXPOSED ARCH RIBS ── */}
      <group position={[0, 0, -4.5]}>
        {/* Main Hangar Fuselage Body */}
        <mesh position={[0, 5.5, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[24, 11, 11]} />
        </mesh>
        {/* Vaulted Chamfered Roof */}
        <mesh position={[0, 12, 0]} rotation={[0, 0, Math.PI / 4]} material={blueSteelMaterial}>
          <cylinderGeometry args={[7.8, 7.8, 23.8, 4]} />
        </mesh>
        {/* External Structural Aerodynamic Arch Ribs */}
        {[-8, -4, 0, 4, 8].map((xPos, idx) => (
          <mesh
            key={`hangar-arch-${idx}`}
            position={[xPos, 12, 0]}
            rotation={[0, 0, Math.PI / 4]}
            material={metalExoskeletonMaterial}
          >
            <cylinderGeometry args={[8.05, 8.05, 0.6, 4]} />
          </mesh>
        ))}

        {/* Continuous Horizontal Blue Glazing Ribbon */}
        <mesh position={[0, 6.5, 5.55]} material={reflectiveGlassMaterial}>
          <boxGeometry args={[20, 1.8, 0.1]} />
        </mesh>
        {/* Illuminated Runway Guidance Strip */}
        <mesh position={[0, 4.2, 5.6]} material={cyanGlowMaterial}>
          <boxGeometry args={[21, 0.15, 0.05]} />
        </mesh>

        {/* Giant Segmented Sliding Hangar Portal */}
        <mesh position={[11.9, 5.0, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[0.35, 8.5, 8.0]} />
        </mesh>
        <mesh position={[12.15, 9.4, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.1, 0.25, 7.8]} />
        </mesh>
      </group>

      {/* ── 2. FLIGHT OPERATIONS OBSERVATION TOWER (CANTED GLASS CAB) ── */}
      <group position={[9.0, 0, 7.5]}>
        {/* Tapered Slender Mast */}
        <mesh position={[0, 19, 0]} material={titaniumStructuralMaterial}>
          <cylinderGeometry args={[1.3, 2.6, 38, 8]} />
        </mesh>
        {/* Vertical Navigational Lighting Conduits */}
        <mesh position={[0, 19, 1.35]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.16, 37, 0.08]} />
        </mesh>

        {/* Flared 360-Degree Canted Glass Control Cab */}
        <mesh position={[0, 32.5, 0]} material={darkTitaniumMaterial}>
          <cylinderGeometry args={[4.6, 2.8, 3.2, 8]} />
        </mesh>
        <mesh position={[0, 32.5, 0]} material={reflectiveGlassMaterial}>
          <cylinderGeometry args={[4.65, 4.65, 1.2, 8]} />
        </mesh>
        <mesh position={[0, 34.2, 0]} material={cyanGlowMaterial}>
          <cylinderGeometry args={[4.7, 4.7, 0.18, 8]} />
        </mesh>

        {/* Spherical Weather Radar Radome */}
        <mesh position={[0, 36.8, 0]} material={metalExoskeletonMaterial}>
          <sphereGeometry args={[1.5, 12, 12]} />
        </mesh>
        <mesh position={[0, 38.6, 0]} material={cyanGlowMaterial}>
          <sphereGeometry args={[0.3, 8, 8]} />
        </mesh>
      </group>

      {/* ── 3. STEERABLE DEEP-SPACE RADAR DISH ── */}
      <group position={[-7.5, 0, 6.0]}>
        {/* Pedestal Pylon */}
        <mesh position={[0, 4.0, 0]} material={titaniumStructuralMaterial}>
          <cylinderGeometry args={[1.2, 1.8, 8, 8]} />
        </mesh>
        {/* Elevation Yoke & Large Parabolic Dish */}
        <group position={[0, 8.5, 0]} rotation={[0.5, -0.4, 0]}>
          <mesh material={metalExoskeletonMaterial}>
            <cylinderGeometry args={[3.2, 0.4, 1.0, 16, 1, true]} />
          </mesh>
          <mesh position={[0, 0.7, 0]} material={blueGlowMaterial}>
            <cylinderGeometry args={[0.1, 0.1, 1.6, 6]} />
          </mesh>
          <mesh position={[0, 1.5, 0]} material={cyanGlowMaterial}>
            <sphereGeometry args={[0.25, 8, 8]} />
          </mesh>
        </group>
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
      {/* ── 1. FORTIFIED CENTRAL MATRIX CORE (INTERLOCKING DEFENSIVE ARMOR) ── */}
      <group position={[-2.5, 0, 0]}>
        {/* Heavy Chamfered Base Bastion */}
        <mesh position={[0, 8.5, 0]} rotation={[0, Math.PI / 4, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[13, 17, 13]} />
        </mesh>
        {/* Layered Interlocking Defensive Overhang */}
        <mesh position={[0, 17.5, 0]} rotation={[0, Math.PI / 4, 0]} material={blueSteelMaterial}>
          <boxGeometry args={[14.6, 2.4, 14.6]} />
        </mesh>
        <mesh position={[0, 17.5, 0]} rotation={[0, Math.PI / 4, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[14.7, 0.15, 14.7]} />
        </mesh>

        {/* Stealth Defensive Upper Tower */}
        <mesh position={[0, 26, 0]} rotation={[0, Math.PI / 4, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[9.2, 15, 9.2]} />
        </mesh>

        {/* Shielded Optical Embrasures with Cryptographic Slit Illumination */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, idx) => (
          <group key={`cyber-embrasure-${idx}`} rotation={[0, ang + Math.PI / 4, 0]}>
            <mesh position={[0, 26, 4.7]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.22, 12, 0.12]} />
            </mesh>
            <mesh position={[-2.0, 26, 4.7]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.12, 8, 0.12]} />
            </mesh>
            <mesh position={[2.0, 26, 4.7]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.12, 8, 0.12]} />
            </mesh>
          </group>
        ))}

        {/* Angular Stealth Penthouse Cap */}
        <mesh position={[0, 34.5, 0]} rotation={[0, Math.PI / 4, 0]} material={metalExoskeletonMaterial}>
          <cylinderGeometry args={[2.5, 6.0, 2.5, 4]} />
        </mesh>
      </group>

      {/* ── 2. CRYPTOGRAPHY SPIRE (WEDGE-SHAPED DEFENSIVE MONOLITH) ── */}
      <group position={[8.0, 0, -4.5]}>
        <mesh position={[0, 15, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[5.4, 30, 6.4]} />
        </mesh>
        {/* Angular Slanted Defensive Roof */}
        <mesh position={[0, 30.5, 0]} rotation={[0.42, 0, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[5.6, 2.4, 6.6]} />
        </mesh>
        {/* Vertical Encrypted Datastream Conduit Channel */}
        <mesh position={[2.75, 15, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.12, 28, 0.9]} />
        </mesh>
        {/* Optical Sensor Aperture */}
        <mesh position={[0, 2.8, 3.25]} material={orangeGlowMaterial}>
          <boxGeometry args={[2.2, 3.2, 0.1]} />
        </mesh>
      </group>

      {/* ── 3. PERIMETER SECURITY PYLON & LASER LINK ── */}
      <group position={[7.5, 0, 6.5]}>
        <mesh position={[0, 6.0, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[1.6, 12, 1.6]} />
        </mesh>
        <mesh position={[0, 12.3, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
        </mesh>
        {/* Directional Optical Security Conduit Beam */}
        <mesh position={[-4.5, 12.3, -3.0]} rotation={[0, -0.6, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.08, 0.08, 10]} />
        </mesh>
      </group>
    </group>
  );
}
