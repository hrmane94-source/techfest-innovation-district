import {
  SteppedTower,
  IndustrialComplex,
  AerospaceComplex,
  CybersecurityComplex,
} from '../architecture/DistrictBuildings';
import { TowerGenerator } from '../architecture/TowerGenerator';
import {
  darkTitaniumMaterial,
  titaniumStructuralMaterial,
  metalExoskeletonMaterial,
  brushedAlloyMaterial,
  reflectiveGlassMaterial,
  hazardStripeMaterial,
  cyanGlowMaterial,
  orangeGlowMaterial,
  whiteGlowMaterial,
  CITY_COLORS,
} from '../materials';
import { ModelLoader } from '../models';
import { useDistrict } from '../../context';

/**
 * InnovationDistrict — Complete 4-Quadrant Innovation Ecosystem (Milestone 3.0 Interactive)
 *
 * DISTRICT 01: Artificial Intelligence (North-West)
 * DISTRICT 02: Robotics and Automation (North-East) - Planetary Rover Testing Facility
 * DISTRICT 03: Aerospace Research Complex (South-West) - JWST Scientific Exhibition Pavilion
 * DISTRICT 04: Cybersecurity Fortified Matrix (South-East) - Data Bastions & Optical Conduits
 */
export function InnovationDistrict() {
  const { selectedDistrict, hoveredDistrict, selectDistrict, setHoveredDistrict } = useDistrict();

  return (
    <group name="innovation-districts-ecosystem">
      {/* ─────────────────────────────────────────────────────────────
          DISTRICT 01 — ARTIFICIAL INTELLIGENCE (North-West)
          Location centered around [-24, 0, -20]
      ────────────────────────────────────────────────────────────── */}
      <group
        name="district-01-ai"
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredDistrict('ai');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredDistrict(null);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectDistrict('ai');
        }}
      >
        {/* Interactive Holographic District Selection Ring */}
        {(selectedDistrict === 'ai' || hoveredDistrict === 'ai') && (
          <group position={[-24, 0.98, -20]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[16.5, 17.5, 48]} />
              <meshBasicMaterial
                color="#246BFD"
                transparent
                opacity={selectedDistrict === 'ai' ? 0.85 : 0.4}
              />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[17.8, 18.2, 48]} />
              <meshBasicMaterial
                color="#39DDF4"
                transparent
                opacity={selectedDistrict === 'ai' ? 0.5 : 0.25}
              />
            </mesh>
          </group>
        )}

        {/* Primary Stepped AI Research Tower */}
        <SteppedTower
          position={[-26, 0.9, -22]}
          baseSize={[8.8, 8.8]}
          height={46}
          rotation={0.1}
        />

        {/* Neural Computation Center */}
        <SteppedTower
          position={[-18, 0.9, -15]}
          baseSize={[7.2, 7.2]}
          height={36}
          rotation={-0.15}
        />

        {/* Algorithmic Ingest & Lab Tower */}
        <SteppedTower
          position={[-32, 0.9, -14]}
          baseSize={[6.6, 6.6]}
          height={28}
          rotation={0.2}
        />

        {/* High-level Enclosed Glass Skybridge connecting AI Tower 1 & 2 */}
        <group position={[-22, 23, -18.5]} rotation={[0, 0.6, 0]}>
          <mesh material={titaniumStructuralMaterial} castShadow>
            <boxGeometry args={[1.8, 1.6, 11]} />
          </mesh>
          <mesh position={[0, 0, 0]} material={reflectiveGlassMaterial}>
            <boxGeometry args={[1.85, 1.2, 10.5]} />
          </mesh>
          <mesh position={[0, -0.75, 0]} material={cyanGlowMaterial}>
            <boxGeometry args={[1.88, 0.1, 11]} />
          </mesh>
          <mesh position={[0, 0.75, 0]} material={cyanGlowMaterial}>
            <boxGeometry args={[1.88, 0.1, 11]} />
          </mesh>
        </group>

        {/* Secondary AI Data Ingestion Tower */}
        <TowerGenerator
          position={[-16, 0.9, -27]}
          width={5.6}
          depth={5.6}
          height={26}
          accentColor="cyan"
        />
      </group>

      {/* ─────────────────────────────────────────────────────────────
          DISTRICT 02 — ROBOTICS AND AUTOMATION (North-East)
          Location centered around [24, 0, -20]
      ────────────────────────────────────────────────────────────── */}
      <group
        name="district-02-robotics"
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredDistrict('robotics');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredDistrict(null);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectDistrict('robotics');
        }}
      >
        {/* Interactive Holographic District Selection Ring */}
        {(selectedDistrict === 'robotics' || hoveredDistrict === 'robotics') && (
          <group position={[24, 0.98, -20]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[16.5, 17.5, 48]} />
              <meshBasicMaterial
                color="#FF9B54"
                transparent
                opacity={selectedDistrict === 'robotics' ? 0.85 : 0.4}
              />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[17.8, 18.2, 48]} />
              <meshBasicMaterial
                color="#FFB370"
                transparent
                opacity={selectedDistrict === 'robotics' ? 0.5 : 0.25}
              />
            </mesh>
          </group>
        )}

        {/* Main Industrial Innovation Complex (Fabrication Core, Assembly Hall, Gantry) */}
        <IndustrialComplex position={[24, 0.9, -20]} rotation={-0.2} />

        {/* ── PLANETARY EXPLORATION & ROBOTICS TESTING BED (NASA Mars 2020 Rover) ── */}
        <group position={[24, 0.9, -9.5]} rotation={[0, -0.4, 0]}>
          {/* Multi-tiered Basalt / Martian Analog Simulation Plinth */}
          <mesh position={[0, 0.25, 0]} material={darkTitaniumMaterial} receiveShadow castShadow>
            <boxGeometry args={[8.8, 0.5, 8.8]} />
          </mesh>
          <mesh position={[0, 0.55, 0]} material={titaniumStructuralMaterial} receiveShadow>
            <boxGeometry args={[8.0, 0.15, 8.0]} />
          </mesh>

          {/* Industrial Hazard Warning Striping Perimeter */}
          <mesh position={[0, 0.64, 3.9]} material={hazardStripeMaterial}>
            <boxGeometry args={[7.8, 0.05, 0.4]} />
          </mesh>
          <mesh position={[0, 0.64, -3.9]} material={hazardStripeMaterial}>
            <boxGeometry args={[7.8, 0.05, 0.4]} />
          </mesh>
          <mesh position={[-3.9, 0.64, 0]} rotation={[0, Math.PI / 2, 0]} material={hazardStripeMaterial}>
            <boxGeometry args={[7.8, 0.05, 0.4]} />
          </mesh>
          <mesh position={[3.9, 0.64, 0]} rotation={[0, Math.PI / 2, 0]} material={hazardStripeMaterial}>
            <boxGeometry args={[7.8, 0.05, 0.4]} />
          </mesh>

          {/* Four Corner Calibration Floodlight Pylons */}
          {[
            [-3.8, -3.8],
            [3.8, -3.8],
            [3.8, 3.8],
            [-3.8, 3.8],
          ].map(([px, pz], pIdx) => (
            <group key={`rover-pylon-${pIdx}`} position={[px, 0.6, pz]}>
              <mesh position={[0, 0.8, 0]} material={metalExoskeletonMaterial}>
                <cylinderGeometry args={[0.08, 0.12, 1.6, 8]} />
              </mesh>
              <mesh position={[0, 1.65, 0]} material={orangeGlowMaterial}>
                <boxGeometry args={[0.22, 0.12, 0.22]} />
              </mesh>
            </group>
          ))}

          {/* Sample Return Depot & Target Calibration Stanchions */}
          <mesh position={[2.6, 0.8, 2.4]} material={metalExoskeletonMaterial} castShadow>
            <cylinderGeometry args={[0.35, 0.45, 0.5, 8]} />
          </mesh>
          <mesh position={[2.6, 1.1, 2.4]} material={orangeGlowMaterial}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 8]} />
          </mesh>

          {/* Dedicated Rover Spot Illumination */}
          <pointLight
            position={[0, 3.5, 0]}
            color={CITY_COLORS.accentOrange}
            distance={16}
            decay={2}
            intensity={1.2}
          />

          {/* NASA Mars 2020 Perseverance Autonomous Exploration Rover */}
          <ModelLoader
            url="/models/robotics/perseverance_rover.glb"
            position={[0, 0.65, 0]}
            rotation={[0, 0.2, 0]}
            scale={0.024}
            castShadow
            receiveShadow
          />
        </group>

        {/* Automated Prototyping Tower */}
        <TowerGenerator
          position={[32, 0.9, -14]}
          width={7.2}
          depth={7.2}
          height={32}
          rotation={0.3}
          accentColor="orange"
        />

        {/* Heavy Robotic Actuation Facility */}
        <TowerGenerator
          position={[16, 0.9, -26]}
          width={6.2}
          depth={6.2}
          height={24}
          rotation={-0.1}
          accentColor="orange"
        />

        {/* Mechanical Skyway connecting Prototyping Tower to Complex */}
        <group position={[28, 14.5, -17]} rotation={[0, -0.4, 0]}>
          <mesh material={titaniumStructuralMaterial} castShadow>
            <boxGeometry args={[1.9, 1.3, 9]} />
          </mesh>
          <mesh position={[0, 0.7, 0]} material={orangeGlowMaterial}>
            <boxGeometry args={[1.7, 0.1, 8.8]} />
          </mesh>
        </group>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          DISTRICT 03 — AEROSPACE (South-West)
          Location centered around [-24, 0, 22]
      ────────────────────────────────────────────────────────────── */}
      <group
        name="district-03-aerospace"
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredDistrict('aerospace');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredDistrict(null);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectDistrict('aerospace');
        }}
      >
        {/* Interactive Holographic District Selection Ring */}
        {(selectedDistrict === 'aerospace' || hoveredDistrict === 'aerospace') && (
          <group position={[-24, 0.98, 22]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[16.5, 17.5, 48]} />
              <meshBasicMaterial
                color="#39DDF4"
                transparent
                opacity={selectedDistrict === 'aerospace' ? 0.85 : 0.4}
              />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[17.8, 18.2, 48]} />
              <meshBasicMaterial
                color="#246BFD"
                transparent
                opacity={selectedDistrict === 'aerospace' ? 0.5 : 0.25}
              />
            </mesh>
          </group>
        )}

        {/* Main Aerospace Complex (Aerodynamic Hangar, Observation Spire & NASA 70m Dish) */}
        <AerospaceComplex position={[-24, 0.9, 22]} rotation={0.25} />

        {/* ── SCIENTIFIC EXHIBITION & QUANTUM CRADLE (NASA James Webb Space Telescope) ── */}
        <group position={[-21, 1.2, 13]}>
          <mesh position={[0, 0.4, 0]} material={darkTitaniumMaterial} receiveShadow castShadow>
            <cylinderGeometry args={[5.2, 6.0, 0.8, 8]} />
          </mesh>
          <mesh position={[0, 0.82, 0]} material={brushedAlloyMaterial}>
            <cylinderGeometry args={[5.25, 5.25, 0.08, 8]} />
          </mesh>
          <mesh position={[0, 0.88, 0]} rotation={[-Math.PI / 2, 0, 0]} material={cyanGlowMaterial}>
            <ringGeometry args={[4.4, 4.8, 32]} />
          </mesh>

          {/* 4 Quantum Levitation Emitter Pylons */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, idx) => (
            <group key={`jwst-emitter-${idx}`} rotation={[0, ang, 0]}>
              <mesh position={[3.8, 1.8, 0]} rotation={[0, 0, -0.25]} material={metalExoskeletonMaterial} castShadow>
                <boxGeometry args={[0.3, 2.2, 0.5]} />
              </mesh>
              <mesh position={[3.5, 2.8, 0]} material={cyanGlowMaterial}>
                <sphereGeometry args={[0.18, 8, 8]} />
              </mesh>
            </group>
          ))}

          {/* Informational Telemetry Pedestal */}
          <mesh position={[0, 1.2, 4.4]} material={titaniumStructuralMaterial}>
            <boxGeometry args={[1.2, 0.7, 0.4]} />
          </mesh>
          <mesh position={[0, 1.58, 4.4]} material={whiteGlowMaterial}>
            <boxGeometry args={[1.0, 0.05, 0.3]} />
          </mesh>

          {/* Dedicated Exhibition Spot Lighting */}
          <pointLight
            position={[0, 7.5, 0]}
            color={CITY_COLORS.electricCyan}
            distance={20}
            decay={2}
            intensity={1.4}
          />

          {/* NASA James Webb Space Telescope Model Floating in Levitation Field */}
          <group position={[0, 4.4, 0]} rotation={[0.2, -0.65, 0.1]}>
            <ModelLoader
              url="/models/aerospace/jwst.glb"
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={0.28}
              castShadow
              receiveShadow
            />
          </group>
        </group>

        {/* Propulsion Dynamics & Testing Facility */}
        <TowerGenerator
          position={[-33, 0.9, 16]}
          width={6.6}
          depth={8.6}
          height={26}
          rotation={-0.3}
          accentColor="blue"
        />

        {/* Orbital Guidance Pylon */}
        <TowerGenerator
          position={[-16, 0.9, 28]}
          width={5.2}
          depth={5.2}
          height={34}
          rotation={0.15}
          accentColor="cyan"
        />
      </group>

      {/* ─────────────────────────────────────────────────────────────
          DISTRICT 04 — CYBERSECURITY (South-East)
          Location centered around [24, 0, 22]
      ────────────────────────────────────────────────────────────── */}
      <group
        name="district-04-cybersecurity"
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredDistrict('cyber');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredDistrict(null);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectDistrict('cyber');
        }}
      >
        {/* Interactive Holographic District Selection Ring */}
        {(selectedDistrict === 'cyber' || hoveredDistrict === 'cyber') && (
          <group position={[24, 0.98, 22]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[16.5, 17.5, 48]} />
              <meshBasicMaterial
                color="#246BFD"
                transparent
                opacity={selectedDistrict === 'cyber' ? 0.85 : 0.4}
              />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[17.8, 18.2, 48]} />
              <meshBasicMaterial
                color="#39DDF4"
                transparent
                opacity={selectedDistrict === 'cyber' ? 0.5 : 0.25}
              />
            </mesh>
          </group>
        )}

        {/* Fortified Central Matrix Core, Cryptography Spire & Perimeter Node */}
        <CybersecurityComplex position={[24, 0.9, 22]} rotation={-0.3} />

        {/* Perimeter Sentry Bastion & Optical Firewall Node */}
        <TowerGenerator
          position={[33, 0.9, 18]}
          width={6.2}
          depth={6.2}
          height={24}
          rotation={0.4}
          accentColor="cyan"
        />

        {/* Encrypted Data Vault Spire */}
        <TowerGenerator
          position={[17, 0.9, 29]}
          width={6.6}
          depth={6.6}
          height={30}
          rotation={-0.2}
          accentColor="blue"
        />
      </group>
    </group>
  );
}
