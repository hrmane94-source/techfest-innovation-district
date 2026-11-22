import {
  darkTitaniumMaterial,
  titaniumStructuralMaterial,
  blueSteelMaterial,
  metalExoskeletonMaterial,
  brushedAlloyMaterial,
  precastConcreteMaterial,
  clearLobbyGlassMaterial,
  industrialWindowMaterial,
  louverAlloyMaterial,
  hazardStripeMaterial,
  solarPanelMaterial,
  cyanGlowMaterial,
  blueGlowMaterial,
  orangeGlowMaterial,
  warmGlowMaterial,
  bioluminescentFloraMaterial,
  coolWhiteMaterial,
  deepBlueGlassMaterial,
  architecturalCyanMaterial,
} from '../materials';
import { ModelLoader } from '../models';
import { useDistrict, useGraphicsQuality } from '../../context';

/* =========================================================================
   1. AI DISTRICT: AI & COMPUTATIONAL SCIENCES CENTRE (CONTEMPORARY RESEARCH ACADEMY)
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
  height = 18,
  rotation = 0,
}: SteppedTowerProps) {
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';
  const castGeneralShadow = settings.shadowCasting !== 'none';
  const [w, d] = baseSize;
  const h1 = height * 0.44;
  const h2 = height * 0.34;
  const h3 = height * 0.22;

  // Number of architectural sun-shading fins
  const finCount = Math.max(3, Math.floor(w / 1.5));

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── TIER 1: GROUND ATRIUM & COMPUTATIONAL RESEARCH WING ── */}
      <group position={[0, 0, 0]}>
        {/* Core Structural Mass with Cool White Architectural Cladding */}
        <mesh position={[0, h1 / 2, 0]} material={coolWhiteMaterial} castShadow={castGeneralShadow} receiveShadow={settings.shadows}>
          <boxGeometry args={[w, h1, d]} />
        </mesh>

        {/* Double-Height Transparent Entrance Atrium / Glazed Lobby */}
        <mesh position={[0, 1.8, d / 2 + 0.08]} material={clearLobbyGlassMaterial}>
          <boxGeometry args={[w * 0.68, 3.2, 0.15]} />
        </mesh>
        {/* Interior Lobby Structural Columns visible through glass */}
        {[-w * 0.22, w * 0.22].map((cx, idx) => (
          <mesh key={`atrium-col-${idx}`} position={[cx, 1.8, d / 2 - 0.2]} material={precastConcreteMaterial}>
            <cylinderGeometry args={[0.15, 0.18, 3.2, 8]} />
          </mesh>
        ))}
        {/* Soft Warm Interior Lobby Light Core */}
        <mesh position={[0, 1.8, d / 2 + 0.05]} material={warmGlowMaterial}>
          <boxGeometry args={[w * 0.55, 2.2, 0.05]} />
        </mesh>

        {/* Cantilevered Entrance Canopy with Slate Fascia & Architectural Cyan Accent */}
        <mesh position={[0, 3.4, d / 2 + 0.75]} material={darkTitaniumMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[w * 0.78, 0.22, 1.4]} />
        </mesh>
        <mesh position={[0, 3.28, d / 2 + 0.75]} material={architecturalCyanMaterial}>
          <boxGeometry args={[w * 0.72, 0.02, 1.3]} />
        </mesh>

        {/* Horizontal Titanium Floor Slab with Shadow Reveal */}
        <mesh position={[0, 3.5, 0]} material={titaniumStructuralMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[w + 0.25, 0.28, d + 0.25]} />
        </mesh>

        {/* Recessed Academic Deep Blue Glazing (Front & Back) */}
        <mesh position={[0, (h1 + 3.8) / 2, d / 2 + 0.04]} material={deepBlueGlassMaterial}>
          <boxGeometry args={[w - 1.2, h1 - 4.0, 0.08]} />
        </mesh>
        <mesh position={[0, h1 / 2, -d / 2 - 0.04]} material={deepBlueGlassMaterial}>
          <boxGeometry args={[w - 1.2, h1 - 1.0, 0.08]} />
        </mesh>

        {/* Vertical Architectural Sun-Shading Brise-Soleil Fins */}
        {Array.from({ length: finCount }).map((_, idx) => {
          const fx = -w / 2 + 0.8 + (idx * (w - 1.6)) / Math.max(1, finCount - 1);
          return (
            <mesh
              key={`t1-fin-${idx}`}
              position={[fx, (h1 + 3.8) / 2, d / 2 + 0.16]}
              material={louverAlloyMaterial}
              castShadow={shouldCastShadow}
            >
              <boxGeometry args={[0.08, h1 - 4.0, 0.35]} />
            </mesh>
          );
        })}

        {/* Tier 1 Setback Roof Terrace with Solar Panels & Student Study Greenery */}
        <mesh position={[0, h1 + 0.1, 0]} material={coolWhiteMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[w + 0.35, 0.22, d + 0.35]} />
        </mesh>
        {/* Photovoltaic Terrace Strip */}
        <mesh position={[0, h1 + 0.22, -d * 0.32]} rotation={[-Math.PI / 2, 0, 0]} material={solarPanelMaterial}>
          <planeGeometry args={[w * 0.75, d * 0.22]} />
        </mesh>
        {/* Rooftop Terrace Student Study Planter */}
        <mesh position={[w / 3, h1 + 0.45, d / 3]} material={bioluminescentFloraMaterial}>
          <boxGeometry args={[0.9, 0.45, 0.9]} />
        </mesh>
      </group>

      {/* ── TIER 2: ADVANCED NEURAL LABS & CANTILEVERED RESEARCH POD ── */}
      <group position={[0, h1, 0]}>
        {/* Mid-Tier Core */}
        <mesh position={[0, h2 / 2, 0]} material={coolWhiteMaterial} castShadow={castGeneralShadow} receiveShadow={settings.shadows}>
          <boxGeometry args={[w * 0.78, h2, d * 0.78]} />
        </mesh>
        {/* Recessed Deep Blue Window Insets */}
        <mesh position={[0, h2 / 2, (d * 0.78) / 2 + 0.04]} material={deepBlueGlassMaterial}>
          <boxGeometry args={[w * 0.78 - 0.8, h2 - 0.8, 0.08]} />
        </mesh>
        <mesh position={[0, h2 / 2, -(d * 0.78) / 2 - 0.04]} material={deepBlueGlassMaterial}>
          <boxGeometry args={[w * 0.78 - 0.8, h2 - 0.8, 0.08]} />
        </mesh>

        {/* Projecting Cantilevered Observation / Deep-Learning Pod */}
        <mesh
          position={[w * 0.42, h2 * 0.52, 0]}
          material={deepBlueGlassMaterial}
          castShadow={shouldCastShadow}
        >
          <boxGeometry args={[1.6, 2.4, 2.8]} />
        </mesh>
        <mesh position={[w * 0.42, h2 * 0.52, 0]} material={architecturalCyanMaterial}>
          <boxGeometry args={[1.2, 1.6, 2.2]} />
        </mesh>
        {/* Cantilever Structural Steel Support Brackets */}
        <mesh position={[w * 0.42, h2 * 0.52 - 1.25, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[1.65, 0.15, 2.85]} />
        </mesh>

        {/* Tier 2 Terrace Roof Trim & Parapet */}
        <mesh position={[0, h2 + 0.1, 0]} material={titaniumStructuralMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[w * 0.8 + 0.2, 0.2, d * 0.8 + 0.2]} />
        </mesh>
      </group>

      {/* ── TIER 3: COMPUTATIONAL CLUSTER & ROOFTOP TELEMETRY ── */}
      <group position={[0, h1 + h2, 0]}>
        <mesh position={[0, h3 / 2, 0]} material={coolWhiteMaterial} castShadow={castGeneralShadow}>
          <boxGeometry args={[w * 0.54, h3, d * 0.54]} />
        </mesh>
        {/* Vertical Data Ribbon in Architectural Cyan */}
        <mesh position={[0, h3 / 2, (d * 0.54) / 2 + 0.06]} material={architecturalCyanMaterial}>
          <boxGeometry args={[0.15, h3, 0.04]} />
        </mesh>

        {/* Rooftop Computational Cooling Radiator & Uplink Terminal */}
        <group position={[0, h3, 0]}>
          <mesh position={[-0.8, 0.5, -0.6]} material={louverAlloyMaterial} castShadow={shouldCastShadow}>
            <cylinderGeometry args={[0.65, 0.75, 1.0, 8]} />
          </mesh>
          <mesh position={[-0.8, 1.05, -0.6]} material={cyanGlowMaterial}>
            <cylinderGeometry args={[0.6, 0.6, 0.1, 8]} />
          </mesh>
          {/* Parabolic Telecommunications Dish */}
          <group position={[0.8, 0.7, 0.6]} rotation={[0.4, 0.3, 0]}>
            <mesh material={titaniumStructuralMaterial}>
              <cylinderGeometry args={[0.65, 0.1, 0.35, 12, 1, true]} />
            </mesh>
            <mesh position={[0, 0.35, 0]} material={blueGlowMaterial}>
              <cylinderGeometry args={[0.04, 0.04, 0.5, 6]} />
            </mesh>
          </group>
          {/* Telemetry Mast */}
          <mesh position={[0, 1.8, 0]} material={titaniumStructuralMaterial}>
            <cylinderGeometry args={[0.06, 0.15, 2.4, 6]} />
          </mesh>
          <mesh position={[0, 3.1, 0]} material={cyanGlowMaterial}>
            <sphereGeometry args={[0.18, 8, 8]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* =========================================================================
   2. ROBOTICS DISTRICT: HIGH-BAY ROBOTICS ENGINEERING & WORKSHOP COMPLEX
   ========================================================================= */
export interface IndustrialComplexProps {
  position: [number, number, number];
  rotation?: number;
}

export function IndustrialComplex({ position, rotation = 0 }: IndustrialComplexProps) {
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';
  const castGeneralShadow = settings.shadowCasting !== 'none';

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── 1. ROBOTIC PROTOTYPING & MECHATRONICS CORE (CYLINDRICAL TANK WITH EXOSKELETON) ── */}
      <group position={[-5.5, 0, -2.5]}>
        {/* Core Cylinder Body in Cool White Architectural Cladding */}
        <mesh position={[0, 7.0, 0]} material={coolWhiteMaterial} castShadow={castGeneralShadow} receiveShadow={settings.shadows}>
          <cylinderGeometry args={[4.8, 5.2, 14, 16]} />
        </mesh>
        {/* Structural External Exoskeleton Bands */}
        {[2.5, 6.5, 10.5, 13.5].map((y, idx) => (
          <group key={`fab-band-${idx}`} position={[0, y, 0]}>
            <mesh material={titaniumStructuralMaterial}>
              <cylinderGeometry args={[5.0, 5.0, 0.6, 16]} />
            </mesh>
            {/* Embedded Orange Status Illumination Ring */}
            <mesh position={[0, 0, 0]} material={orangeGlowMaterial}>
              <cylinderGeometry args={[5.05, 5.05, 0.12, 16]} />
            </mesh>
          </group>
        ))}
        {/* Vertical Structural Steel Stanchions around the Cylinder */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const ang = (idx * Math.PI * 2) / 8;
          return (
            <mesh
              key={`fab-stanchion-${idx}`}
              position={[Math.cos(ang) * 5.05, 7.0, Math.sin(ang) * 5.05]}
              material={titaniumStructuralMaterial}
              castShadow={shouldCastShadow}
            >
              <boxGeometry args={[0.35, 14.2, 0.35]} />
            </mesh>
          );
        })}
        {/* Rooftop Industrial Ventilation Penthouse */}
        <mesh position={[0, 14.5, 0]} material={louverAlloyMaterial} castShadow={shouldCastShadow}>
          <cylinderGeometry args={[2.8, 3.4, 1.2, 8]} />
        </mesh>
        <mesh position={[0, 15.2, 0]} material={orangeGlowMaterial}>
          <cylinderGeometry args={[2.4, 2.4, 0.15, 8]} />
        </mesh>
      </group>

      {/* ── 2. HIGH-BAY ROBOTIC ASSEMBLY & MECHATRONICS TESTING HALL ── */}
      <group position={[5.5, 0, 3.5]}>
        {/* Main Hall Volume in Cool White */}
        <mesh position={[0, 6.5, 0]} material={coolWhiteMaterial} castShadow={castGeneralShadow} receiveShadow={settings.shadows}>
          <boxGeometry args={[12, 13, 14]} />
        </mesh>

        {/* Industrial High-Bay Clerestory Glazing in Deep Blue Glass */}
        <mesh position={[0, 10.5, 7.05]} material={deepBlueGlassMaterial}>
          <boxGeometry args={[11.2, 3.2, 0.1]} />
        </mesh>
        <mesh position={[0, 10.5, -7.05]} material={deepBlueGlassMaterial}>
          <boxGeometry args={[11.2, 3.2, 0.1]} />
        </mesh>

        {/* Side Facade Structural Portal Frames / Columns */}
        {[-4.0, 0, 4.0].map((zPos, idx) => (
          <group key={`portal-col-${idx}`}>
            <mesh position={[-6.1, 6.5, zPos]} material={titaniumStructuralMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[0.35, 13.2, 0.6]} />
            </mesh>
            <mesh position={[6.1, 6.5, zPos]} material={titaniumStructuralMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[0.35, 13.2, 0.6]} />
            </mesh>
          </group>
        ))}

        {/* High-Bay Heavy Cargo Roll-Up Doors with Hazard Striping */}
        <mesh position={[0, 2.5, 7.1]} material={darkTitaniumMaterial}>
          <boxGeometry args={[5.2, 4.5, 0.15]} />
        </mesh>
        {/* Weather Canopy over High-Bay Delivery Portal */}
        <mesh position={[0, 5.0, 7.8]} material={precastConcreteMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[5.8, 0.25, 1.4]} />
        </mesh>
        {/* Authentic Industrial Hazard Striping Border */}
        <mesh position={[0, 4.85, 7.2]} material={hazardStripeMaterial}>
          <boxGeometry args={[5.4, 0.35, 0.1]} />
        </mesh>
        <mesh position={[-2.6, 2.5, 7.2]} material={hazardStripeMaterial}>
          <boxGeometry args={[0.35, 4.5, 0.1]} />
        </mesh>
        <mesh position={[2.6, 2.5, 7.2]} material={hazardStripeMaterial}>
          <boxGeometry args={[0.35, 4.5, 0.1]} />
        </mesh>

        {/* Mezzanine Observation Windows above Bay Door */}
        <mesh position={[0, 7.2, 7.08]} material={clearLobbyGlassMaterial}>
          <boxGeometry args={[7.2, 1.8, 0.1]} />
        </mesh>
        <mesh position={[0, 7.2, 7.05]} material={warmGlowMaterial}>
          <boxGeometry args={[6.8, 1.4, 0.05]} />
        </mesh>

        {/* Sawtooth Roof Monitor Skylights */}
        {[-3.0, 3.0].map((sx, idx) => (
          <group key={`sawtooth-${idx}`} position={[sx, 13.4, 0]}>
            <mesh rotation={[0, 0, 0.4]} material={precastConcreteMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[3.2, 0.2, 13.2]} />
            </mesh>
            <mesh position={[-0.8, 0.4, 0]} material={industrialWindowMaterial}>
              <boxGeometry args={[0.1, 0.9, 13.0]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── 3. OVERHEAD GANTRY CRANE RUNWAY & HOIST TROLLEY ── */}
      <group position={[0, 12.0, 0]}>
        {/* Main Double Crane Rails */}
        <mesh position={[0, 0, -1.0]} material={blueSteelMaterial} castShadow>
          <boxGeometry args={[18, 0.7, 0.4]} />
        </mesh>
        <mesh position={[0, 0, 1.0]} material={blueSteelMaterial} castShadow>
          <boxGeometry args={[18, 0.7, 0.4]} />
        </mesh>
        {/* Orange Warning Safety Rail */}
        <mesh position={[0, 0.5, 0]} material={orangeGlowMaterial}>
          <boxGeometry args={[17.5, 0.1, 2.1]} />
        </mesh>
        {/* Mobile Hoist Trolley Unit */}
        <mesh position={[2.0, -0.4, 0]} material={metalExoskeletonMaterial} castShadow>
          <boxGeometry args={[2.2, 1.2, 2.2]} />
        </mesh>
        {/* Trolley Task Floodlights */}
        <mesh position={[2.0, -1.05, 0]} material={orangeGlowMaterial}>
          <boxGeometry args={[1.6, 0.08, 1.6]} />
        </mesh>
        {/* Heavy Gantry Structural A-Frame Pillar */}
        <mesh position={[8.5, -5.8, 0]} material={titaniumStructuralMaterial} castShadow>
          <boxGeometry args={[1.2, 12.0, 1.2]} />
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
  const castGeneralShadow = settings.shadowCasting !== 'none';

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── 1. AERODYNAMIC TESTING HANGAR WITH EXPOSED ARCH RIBS ── */}
      <group position={[0, 0, -4.5]}>
        {/* Main Hangar Fuselage Body in Cool White */}
        <mesh position={[0, 5.5, 0]} material={coolWhiteMaterial} castShadow={castGeneralShadow} receiveShadow={settings.shadows}>
          <boxGeometry args={[24, 11, 12]} />
        </mesh>
        {/* Vaulted Chamfered Roof */}
        <mesh position={[0, 12, 0]} rotation={[0, 0, Math.PI / 4]} material={titaniumStructuralMaterial} castShadow={shouldCastShadow}>
          <cylinderGeometry args={[7.8, 7.8, 23.8, 4]} />
        </mesh>
        {/* External Structural Aerodynamic Arch Ribs */}
        {[-8, -4, 0, 4, 8].map((xPos, idx) => (
          <mesh
            key={`hangar-arch-${idx}`}
            position={[xPos, 12, 0]}
            rotation={[0, 0, Math.PI / 4]}
            material={titaniumStructuralMaterial}
            castShadow={shouldCastShadow}
          >
            <cylinderGeometry args={[8.05, 8.05, 0.6, 4]} />
          </mesh>
        ))}

        {/* Continuous Horizontal Deep Blue Glazing Ribbon */}
        <mesh position={[0, 6.5, 6.05]} material={deepBlueGlassMaterial}>
          <boxGeometry args={[20, 2.0, 0.1]} />
        </mesh>
        {/* Cleanroom Observation Gallery (Rear Facade) in Deep Blue Glass */}
        <mesh position={[0, 6.5, -6.05]} material={deepBlueGlassMaterial}>
          <boxGeometry args={[20, 2.0, 0.1]} />
        </mesh>
        {/* Architectural Cyan Guidance Strip */}
        <mesh position={[0, 4.2, 6.1]} material={architecturalCyanMaterial}>
          <boxGeometry args={[21, 0.12, 0.05]} />
        </mesh>

        {/* Giant Segmented Sliding Hangar Portal */}
        <mesh position={[11.9, 5.0, 0]} material={coolWhiteMaterial} castShadow>
          <boxGeometry args={[0.35, 8.5, 8.0]} />
        </mesh>
        <mesh position={[12.15, 9.4, 0]} material={architecturalCyanMaterial}>
          <boxGeometry args={[0.1, 0.25, 7.8]} />
        </mesh>
      </group>

      {/* ── 2. FLIGHT OPERATIONS OBSERVATION TOWER (CANTED GLASS CAB - ACADEMIC 24M) ── */}
      <group position={[9.0, 0, 7.5]}>
        {/* Tapered Slender Mast in Cool White */}
        <mesh position={[0, 11.5, 0]} material={coolWhiteMaterial} castShadow>
          <cylinderGeometry args={[1.1, 2.2, 23, 12]} />
        </mesh>
        {/* Vertical Navigational Lighting Conduits */}
        <mesh position={[0, 11.5, 1.15]} material={architecturalCyanMaterial}>
          <boxGeometry args={[0.14, 22.5, 0.08]} />
        </mesh>

        {/* Flared 360-Degree Canted Glass Control Cab */}
        <mesh position={[0, 20.5, 0]} material={titaniumStructuralMaterial}>
          <cylinderGeometry args={[4.0, 2.4, 2.8, 12]} />
        </mesh>
        <mesh position={[0, 20.5, 0]} material={deepBlueGlassMaterial}>
          <cylinderGeometry args={[4.05, 4.05, 1.0, 12]} />
        </mesh>
        <mesh position={[0, 20.5, 0]} material={architecturalCyanMaterial}>
          <cylinderGeometry args={[2.8, 2.8, 0.6, 12]} />
        </mesh>
        <mesh position={[0, 22.0, 0]} material={architecturalCyanMaterial}>
          <cylinderGeometry args={[4.1, 4.1, 0.16, 12]} />
        </mesh>

        {/* Spherical Weather Radar Radome */}
        <mesh position={[0, 23.8, 0]} material={titaniumStructuralMaterial}>
          <sphereGeometry args={[1.3, 16, 16]} />
        </mesh>
        <mesh position={[0, 25.4, 0]} material={architecturalCyanMaterial}>
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
        <mesh position={[0, 2.0, 0]} material={precastConcreteMaterial} castShadow receiveShadow>
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
  const castGeneralShadow = settings.shadowCasting !== 'none';

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* ── 1. DIGITAL INFRASTRUCTURE RESEARCH PAVILION (3-STORY ACADEMIC WING) ── */}
      <group position={[-2.5, 0, 0]}>
        {/* Level 1-2 Base Academic Block with Architectural Cool White */}
        <mesh position={[0, 4.25, 0]} rotation={[0, Math.PI / 4, 0]} material={coolWhiteMaterial} castShadow={castGeneralShadow} receiveShadow={settings.shadows}>
          <boxGeometry args={[12, 8.5, 12]} />
        </mesh>
        {/* Mid-Level Shaded Architectural Overhang Floor */}
        <mesh position={[0, 8.5, 0]} rotation={[0, Math.PI / 4, 0]} material={titaniumStructuralMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[13.6, 1.0, 13.6]} />
        </mesh>
        <mesh position={[0, 8.5, 0]} rotation={[0, Math.PI / 4, 0]} material={architecturalCyanMaterial}>
          <boxGeometry args={[13.7, 0.12, 13.7]} />
        </mesh>

        {/* Level 3 Cryptographic Research Upper Floor */}
        <mesh position={[0, 12.5, 0]} rotation={[0, Math.PI / 4, 0]} material={coolWhiteMaterial} castShadow>
          <boxGeometry args={[9.0, 7.0, 9.0]} />
        </mesh>

        {/* Shielded Cryptographic Slit Illumination Facades */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, idx) => (
          <group key={`cyber-embrasure-${idx}`} rotation={[0, ang + Math.PI / 4, 0]}>
            <mesh position={[0, 12.5, 4.6]} material={architecturalCyanMaterial}>
              <boxGeometry args={[0.18, 5.5, 0.1]} />
            </mesh>
            <mesh position={[-1.8, 12.5, 4.6]} material={architecturalCyanMaterial}>
              <boxGeometry args={[0.1, 4.0, 0.1]} />
            </mesh>
            <mesh position={[1.8, 12.5, 4.6]} material={architecturalCyanMaterial}>
              <boxGeometry args={[0.1, 4.0, 0.1]} />
            </mesh>
          </group>
        ))}

        {/* Angular Geometric Penthouse Cap */}
        <mesh position={[0, 16.5, 0]} rotation={[0, Math.PI / 4, 0]} material={darkTitaniumMaterial} castShadow>
          <cylinderGeometry args={[2.0, 5.0, 1.8, 4]} />
        </mesh>
      </group>

      {/* ── 2. DATA SCIENCE & NETWORKS WING ── */}
      <group position={[7.5, 0, -4.0]}>
        <mesh position={[0, 7.0, 0]} material={coolWhiteMaterial} castShadow receiveShadow>
          <boxGeometry args={[5.2, 14, 6.0]} />
        </mesh>
        {/* Recessed Deep Blue Window Inset */}
        <mesh position={[0, 7.0, 3.04]} material={deepBlueGlassMaterial}>
          <boxGeometry args={[4.4, 12.0, 0.08]} />
        </mesh>
        {/* Angular Solar Slanted Roof */}
        <mesh position={[0, 14.5, 0]} rotation={[0.35, 0, 0]} material={darkTitaniumMaterial} castShadow>
          <boxGeometry args={[5.4, 1.6, 6.2]} />
        </mesh>
        {/* Vertical High-Speed Optical Bus Channel */}
        <mesh position={[2.65, 7.0, 0]} material={architecturalCyanMaterial}>
          <boxGeometry args={[0.1, 13.5, 0.8]} />
        </mesh>
        {/* Student Study / Sensor Aperture */}
        <mesh position={[0, 2.5, 3.08]} material={orangeGlowMaterial}>
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
