import {
  darkTitaniumMaterial,
  titaniumStructuralMaterial,
  blueSteelMaterial,
  metalExoskeletonMaterial,
  brushedAlloyMaterial,
  pearlWhiteMaterial,
  softSilverMaterial,
  reflectiveGlassMaterial,
  structuralGlassMaterial,
  windowGridMaterial,
  hazardStripeMaterial,
  solarPanelMaterial,
  cyanGlowMaterial,
  blueGlowMaterial,
  orangeGlowMaterial,
  warmGlowMaterial,
  bioluminescentFloraMaterial,
} from '../materials';
import { ModelLoader } from '../models';
import { useDistrict, useGraphicsQuality } from '../../context';

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
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';
  const [w, d] = baseSize;
  const h1 = height * 0.44;
  const h2 = height * 0.34;
  const h3 = height * 0.22;

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── TIER 1: BASE RESEARCH PLATFORM & LOBBY ── */}
      <group position={[0, 0, 0]}>
        {/* Core Mass */}
        <mesh position={[0, h1 / 2, 0]} material={pearlWhiteMaterial} castShadow={settings.shadowCasting !== 'none'} receiveShadow={settings.shadows}>
          <boxGeometry args={[w, h1, d]} />
        </mesh>

        {/* Double-Height Glazed Entrance Lobby */}
        <mesh position={[0, 2.0, d / 2 + 0.08]} material={structuralGlassMaterial}>
          <boxGeometry args={[w * 0.65, 3.2, 0.15]} />
        </mesh>
        <mesh position={[0, 1.8, d / 2 + 0.05]} material={warmGlowMaterial}>
          <boxGeometry args={[w * 0.55, 2.4, 0.05]} />
        </mesh>
        <mesh position={[0, 3.7, d / 2 + 0.65]} material={pearlWhiteMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[w * 0.75, 0.2, 1.2]} />
        </mesh>
        <mesh position={[0, 3.6, d / 2 + 0.65]} material={cyanGlowMaterial}>
          <boxGeometry args={[w * 0.7, 0.04, 1.1]} />
        </mesh>

        {/* Window Grid Inset Facades (Front & Back above lobby) */}
        <mesh position={[0, (h1 + 4) / 2, d / 2 + 0.05]} material={windowGridMaterial}>
          <boxGeometry args={[w - 1.2, h1 - 4.4, 0.1]} />
        </mesh>
        <mesh position={[0, h1 / 2, -d / 2 - 0.05]} material={windowGridMaterial}>
          <boxGeometry args={[w - 1.2, h1 - 1.2, 0.1]} />
        </mesh>

        {/* Vertical Optical Cooling Fins extending past the tier */}
        {[-w / 2, w / 2].map((xPos, idx) => (
          <group key={`t1-fin-${idx}`} position={[xPos, (h1 + 1.2) / 2, d / 2]}>
            <mesh material={pearlWhiteMaterial} castShadow>
              <boxGeometry args={[0.25, h1 + 1.2, 0.4]} />
            </mesh>
            <mesh position={[0, 0, 0.22]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.08, h1 + 1.2, 0.05]} />
            </mesh>
          </group>
        ))}

        {/* Tier 1 Setback Roof Terrace with Solar Panels & Planters */}
        <mesh position={[0, h1 + 0.1, 0]} material={softSilverMaterial}>
          <boxGeometry args={[w + 0.3, 0.2, d + 0.3]} />
        </mesh>
        <mesh position={[0, h1 + 0.12, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[w + 0.35, 0.04, d + 0.35]} />
        </mesh>
        {/* Photovoltaic Terrace Strip */}
        <mesh position={[0, h1 + 0.22, -d * 0.35]} rotation={[-Math.PI / 2, 0, 0]} material={solarPanelMaterial}>
          <planeGeometry args={[w * 0.75, d * 0.2]} />
        </mesh>
        {/* Rooftop Terrace Mini-Planter */}
        <mesh position={[w / 3, h1 + 0.45, d / 3]} material={bioluminescentFloraMaterial}>
          <boxGeometry args={[0.8, 0.5, 0.8]} />
        </mesh>
      </group>

      {/* ── TIER 2: COMPUTATIONAL CORE & CANTILEVERED LAB POD ── */}
      <group position={[0, h1, 0]}>
        {/* Mid-Tier Core */}
        <mesh position={[0, h2 / 2, 0]} material={softSilverMaterial} castShadow receiveShadow>
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
          castShadow
        >
          <boxGeometry args={[1.6, 2.6, 2.8]} />
        </mesh>
        <mesh position={[w * 0.42, h2 * 0.55, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[1.2, 1.8, 2.2]} />
        </mesh>
        <mesh position={[w * 0.42, h2 * 0.55 - 1.35, 0]} material={pearlWhiteMaterial}>
          <boxGeometry args={[1.65, 0.15, 2.85]} />
        </mesh>

        {/* Tier 2 Terrace Roof Trim */}
        <mesh position={[0, h2 + 0.1, 0]} material={pearlWhiteMaterial}>
          <boxGeometry args={[w * 0.78 + 0.2, 0.2, d * 0.78 + 0.2]} />
        </mesh>
      </group>

      {/* ── TIER 3: QUANTUM PROCESSOR PENTHOUSE & ROOF ARRAYS ── */}
      <group position={[0, h1 + h2, 0]}>
        <mesh position={[0, h3 / 2, 0]} material={pearlWhiteMaterial} castShadow>
          <boxGeometry args={[w * 0.52, h3, d * 0.52]} />
        </mesh>
        {/* Vertical Data Ribbon */}
        <mesh position={[0, h3 / 2, (d * 0.52) / 2 + 0.06]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.15, h3, 0.04]} />
        </mesh>

        {/* Rooftop Quantum Server Radiator & Microwave Uplink Dish */}
        <group position={[0, h3, 0]}>
          <mesh position={[-0.8, 0.6, -0.6]} material={metalExoskeletonMaterial} castShadow>
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
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── 1. ADVANCED ROBOTIC FABRICATION CORE (CYLINDER + EXOSKELETON) ── */}
      <group position={[-5.5, 0, -2.5]}>
        {/* Core Cylinder Body */}
        <mesh position={[0, 9.5, 0]} material={softSilverMaterial} castShadow={settings.shadowCasting !== 'none'} receiveShadow={settings.shadows}>
          <cylinderGeometry args={[5.4, 6.0, 19, 16]} />
        </mesh>
        {/* Structural External Exoskeleton Bands */}
        {[3.5, 8.5, 13.5, 18.0].map((y, idx) => (
          <group key={`fab-band-${idx}`} position={[0, y, 0]}>
            <mesh material={pearlWhiteMaterial}>
              <cylinderGeometry args={[5.7, 5.7, 0.75, 16]} />
            </mesh>
            {/* Embedded Orange Status Illumination Ring */}
            <mesh position={[0, 0, 0]} material={orangeGlowMaterial}>
              <cylinderGeometry args={[5.75, 5.75, 0.15, 16]} />
            </mesh>
          </group>
        ))}
        {/* Vertical Structural Steel Stanchions around the Cylinder */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const ang = (idx * Math.PI * 2) / 8;
          return (
            <mesh
              key={`fab-stanchion-${idx}`}
              position={[Math.cos(ang) * 5.75, 9.5, Math.sin(ang) * 5.75]}
              material={pearlWhiteMaterial}
              castShadow={shouldCastShadow}
            >
              <boxGeometry args={[0.4, 19.5, 0.4]} />
            </mesh>
          );
        })}
        {/* Rooftop Industrial Ventilation Fan Bank */}
        <mesh position={[0, 19.5, 0]} material={softSilverMaterial} castShadow={shouldCastShadow}>
          <cylinderGeometry args={[3.2, 4.0, 1.4, 8]} />
        </mesh>
        <mesh position={[0, 20.3, 0]} material={orangeGlowMaterial}>
          <cylinderGeometry args={[2.8, 2.8, 0.2, 8]} />
        </mesh>
      </group>

      {/* ── 2. HIGH-BAY ROBOTIC ASSEMBLY & TESTING HALL ── */}
      <group position={[5.5, 0, 3.5]}>
        {/* Main Hall Volume */}
        <mesh position={[0, 7.5, 0]} material={pearlWhiteMaterial} castShadow receiveShadow>
          <boxGeometry args={[12, 15, 14]} />
        </mesh>
        {/* Side Facade Structural X-Bracing */}
        {[-6.05, 6.05].map((xPos, idx) => (
          <group key={`hall-x-brace-${idx}`} position={[xPos, 7.5, 0]}>
            <mesh rotation={[0, 0, 0.6]} material={softSilverMaterial}>
              <boxGeometry args={[0.3, 14, 0.4]} />
            </mesh>
            <mesh rotation={[0, 0, -0.6]} material={softSilverMaterial}>
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

        {/* High-Bay Heavy Cargo Roll-Up Doors with Hazard Striping */}
        <mesh position={[0, 2.5, 7.1]} material={darkTitaniumMaterial}>
          <boxGeometry args={[5.2, 4.5, 0.15]} />
        </mesh>
        {/* Authentic Industrial Hazard Striping Border */}
        <mesh position={[0, 4.9, 7.2]} material={hazardStripeMaterial}>
          <boxGeometry args={[5.4, 0.45, 0.1]} />
        </mesh>
        <mesh position={[-2.6, 2.5, 7.2]} material={hazardStripeMaterial}>
          <boxGeometry args={[0.35, 4.5, 0.1]} />
        </mesh>
        <mesh position={[2.6, 2.5, 7.2]} material={hazardStripeMaterial}>
          <boxGeometry args={[0.35, 4.5, 0.1]} />
        </mesh>
      </group>

      {/* ── 3. OVERHEAD GANTRY CRANE RUNWAY & HOIST TROLLEY ── */}
      <group position={[0, 14.5, 0]}>
        {/* Main Double Crane Rails */}
        <mesh position={[0, 0, -1.0]} material={blueSteelMaterial} castShadow>
          <boxGeometry args={[18, 0.8, 0.5]} />
        </mesh>
        <mesh position={[0, 0, 1.0]} material={blueSteelMaterial} castShadow>
          <boxGeometry args={[18, 0.8, 0.5]} />
        </mesh>
        {/* Orange Warning Safety Rail */}
        <mesh position={[0, 0.6, 0]} material={orangeGlowMaterial}>
          <boxGeometry args={[17.5, 0.12, 2.2]} />
        </mesh>
        {/* Mobile Hoist Trolley Unit */}
        <mesh position={[2.0, -0.5, 0]} material={metalExoskeletonMaterial} castShadow>
          <boxGeometry args={[2.4, 1.4, 2.4]} />
        </mesh>
        {/* Trolley Floodlights */}
        <mesh position={[2.0, -1.25, 0]} material={orangeGlowMaterial}>
          <boxGeometry args={[1.8, 0.1, 1.8]} />
        </mesh>
        {/* Heavy Gantry Structural A-Frame Pillar */}
        <mesh position={[8.5, -7.0, 0]} material={titaniumStructuralMaterial} castShadow>
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
  const { selectDistrict } = useDistrict();
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── 1. AERODYNAMIC TESTING HANGAR WITH EXPOSED ARCH RIBS ── */}
      <group position={[0, 0, -4.5]}>
        {/* Main Hangar Fuselage Body */}
        <mesh position={[0, 5.5, 0]} material={pearlWhiteMaterial} castShadow={settings.shadowCasting !== 'none'} receiveShadow={settings.shadows}>
          <boxGeometry args={[24, 11, 11]} />
        </mesh>
        {/* Vaulted Chamfered Roof */}
        <mesh position={[0, 12, 0]} rotation={[0, 0, Math.PI / 4]} material={softSilverMaterial} castShadow={shouldCastShadow}>
          <cylinderGeometry args={[7.8, 7.8, 23.8, 4]} />
        </mesh>
        {/* External Structural Aerodynamic Arch Ribs */}
        {[-8, -4, 0, 4, 8].map((xPos, idx) => (
          <mesh
            key={`hangar-arch-${idx}`}
            position={[xPos, 12, 0]}
            rotation={[0, 0, Math.PI / 4]}
            material={pearlWhiteMaterial}
            castShadow={shouldCastShadow}
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
        <mesh position={[11.9, 5.0, 0]} material={pearlWhiteMaterial} castShadow>
          <boxGeometry args={[0.35, 8.5, 8.0]} />
        </mesh>
        <mesh position={[12.15, 9.4, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.1, 0.25, 7.8]} />
        </mesh>
      </group>

      {/* ── 2. FLIGHT OPERATIONS OBSERVATION TOWER (CANTED GLASS CAB) ── */}
      <group position={[9.0, 0, 7.5]}>
        {/* Tapered Slender Mast (Academic Scale 24M) */}
        <mesh position={[0, 11.5, 0]} material={pearlWhiteMaterial} castShadow>
          <cylinderGeometry args={[1.1, 2.2, 23, 12]} />
        </mesh>
        {/* Vertical Navigational Lighting Conduits */}
        <mesh position={[0, 11.5, 1.15]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.14, 22.5, 0.08]} />
        </mesh>

        {/* Flared 360-Degree Canted Glass Control Cab */}
        <mesh position={[0, 20.5, 0]} material={softSilverMaterial}>
          <cylinderGeometry args={[4.0, 2.4, 2.8, 12]} />
        </mesh>
        <mesh position={[0, 20.5, 0]} material={reflectiveGlassMaterial}>
          <cylinderGeometry args={[4.05, 4.05, 1.0, 12]} />
        </mesh>
        <mesh position={[0, 20.5, 0]} material={cyanGlowMaterial}>
          <cylinderGeometry args={[2.8, 2.8, 0.6, 12]} />
        </mesh>
        <mesh position={[0, 22.0, 0]} material={cyanGlowMaterial}>
          <cylinderGeometry args={[4.1, 4.1, 0.16, 12]} />
        </mesh>

        {/* Spherical Weather Radar Radome */}
        <mesh position={[0, 23.8, 0]} material={softSilverMaterial}>
          <sphereGeometry args={[1.3, 16, 16]} />
        </mesh>
        <mesh position={[0, 25.4, 0]} material={cyanGlowMaterial}>
          <sphereGeometry args={[0.25, 8, 8]} />
        </mesh>
      </group>

      {/* ── 3. STEERABLE DEEP-SPACE GROUND STATION (NASA 70-Meter DSN Dish) ── */}
      <group
        position={[-7.5, 0, 6.0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectDistrict('nasa-dish');
        }}
      >
        {/* Heavy Reinforced Architectural Pedestal Base */}
        <mesh position={[0, 2.0, 0]} material={softSilverMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[2.4, 3.0, 4.0, 12]} />
        </mesh>
        {/* Azimuth Rotation Turntable Ring */}
        <mesh position={[0, 4.15, 0]} material={brushedAlloyMaterial}>
          <cylinderGeometry args={[2.5, 2.5, 0.35, 16]} />
        </mesh>
        <mesh position={[0, 4.35, 0]} material={cyanGlowMaterial}>
          <cylinderGeometry args={[2.52, 2.52, 0.08, 16]} />
        </mesh>
        {/* Technician Access Catwalk with Illuminated Railing */}
        <mesh position={[0, 3.8, 0]} rotation={[-Math.PI / 2, 0, 0]} material={metalExoskeletonMaterial}>
          <ringGeometry args={[2.5, 3.2, 16]} />
        </mesh>

        {/* Authentic NASA 70-Meter Dish Model with fallback */}
        <ModelLoader
          url="/models/aerospace/70_meter_dish.glb"
          position={[0, 4.4, 0]}
          rotation={[-0.35, 0.5, 0]}
          scale={0.07}
          castShadow
          receiveShadow
          fallback={
            <group position={[0, 7.5, 0]} rotation={[0.5, -0.4, 0]}>
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
          }
        />
      </group>
    </group>
  );
}

/* =========================================================================
   4. CYBERSECURITY DISTRICT: DIGITAL INFRASTRUCTURE & CRYPTO INSTITUTE
   ========================================================================= */
export interface CybersecurityComplexProps {
  position: [number, number, number];
  rotation?: number;
}

export function CybersecurityComplex({
  position,
  rotation = 0,
}: CybersecurityComplexProps) {
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── 1. DIGITAL INFRASTRUCTURE RESEARCH PAVILION (3-STORY ACADEMIC WING) ── */}
      <group position={[-2.5, 0, 0]}>
        {/* Level 1-2 Base Academic Block */}
        <mesh position={[0, 4.25, 0]} rotation={[0, Math.PI / 4, 0]} material={softSilverMaterial} castShadow={settings.shadowCasting !== 'none'} receiveShadow={settings.shadows}>
          <boxGeometry args={[12, 8.5, 12]} />
        </mesh>
        {/* Mid-Level Shaded Architectural Overhang Floor */}
        <mesh position={[0, 8.5, 0]} rotation={[0, Math.PI / 4, 0]} material={pearlWhiteMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[13.6, 1.0, 13.6]} />
        </mesh>
        <mesh position={[0, 8.5, 0]} rotation={[0, Math.PI / 4, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[13.7, 0.12, 13.7]} />
        </mesh>

        {/* Level 3 Cryptographic Research Upper Floor */}
        <mesh position={[0, 12.5, 0]} rotation={[0, Math.PI / 4, 0]} material={pearlWhiteMaterial} castShadow>
          <boxGeometry args={[9.0, 7.0, 9.0]} />
        </mesh>

        {/* Shielded Cryptographic Slit Illumination Facades */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, idx) => (
          <group key={`cyber-embrasure-${idx}`} rotation={[0, ang + Math.PI / 4, 0]}>
            <mesh position={[0, 12.5, 4.6]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.18, 5.5, 0.1]} />
            </mesh>
            <mesh position={[-1.8, 12.5, 4.6]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.1, 4.0, 0.1]} />
            </mesh>
            <mesh position={[1.8, 12.5, 4.6]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.1, 4.0, 0.1]} />
            </mesh>
          </group>
        ))}

        {/* Angular Geometric Penthouse Cap */}
        <mesh position={[0, 16.5, 0]} rotation={[0, Math.PI / 4, 0]} material={softSilverMaterial} castShadow>
          <cylinderGeometry args={[2.0, 5.0, 1.8, 4]} />
        </mesh>
      </group>

      {/* ── 2. DATA SCIENCE & NETWORKS WING ── */}
      <group position={[7.5, 0, -4.0]}>
        <mesh position={[0, 7.0, 0]} material={pearlWhiteMaterial} castShadow receiveShadow>
          <boxGeometry args={[5.2, 14, 6.0]} />
        </mesh>
        {/* Angular Solar Slanted Roof */}
        <mesh position={[0, 14.5, 0]} rotation={[0.35, 0, 0]} material={darkTitaniumMaterial} castShadow>
          <boxGeometry args={[5.4, 1.6, 6.2]} />
        </mesh>
        {/* Vertical High-Speed Optical Bus Channel */}
        <mesh position={[2.65, 7.0, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.1, 13.5, 0.8]} />
        </mesh>
        {/* Student Study / Sensor Aperture */}
        <mesh position={[0, 2.5, 3.05]} material={orangeGlowMaterial}>
          <boxGeometry args={[2.0, 2.8, 0.1]} />
        </mesh>
      </group>

      {/* ── 3. CAMPUS OPTICAL COMMUNICATIONS NODE ── */}
      <group position={[7.0, 0, 6.0]}>
        <mesh position={[0, 3.8, 0]} material={titaniumStructuralMaterial} castShadow>
          <boxGeometry args={[1.4, 7.6, 1.4]} />
        </mesh>
        <mesh position={[0, 7.9, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
        </mesh>
        {/* Directional Optical Security Conduit Beam */}
        <mesh position={[-4.0, 7.9, -2.5]} rotation={[0, -0.6, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[0.08, 0.08, 8.5]} />
        </mesh>
      </group>
    </group>
  );
}
