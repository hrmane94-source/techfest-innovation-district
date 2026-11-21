import {
  SteppedTower,
  IndustrialComplex,
  AerospaceComplex,
  CybersecurityComplex,
} from '../architecture/DistrictBuildings';
import { TowerGenerator } from '../architecture/TowerGenerator';
import {
  titaniumStructuralMaterial,
  cyanGlowMaterial,
  orangeGlowMaterial,
} from '../materials';

/**
 * InnovationDistrict — Complete 4-Quadrant Innovation Ecosystem (Refined Milestone 1.1)
 *
 * DISTRICT 01: Artificial Intelligence (North-West)
 * DISTRICT 02: Robotics and Automation (North-East)
 * DISTRICT 03: Aerospace Research Complex (South-West)
 * DISTRICT 04: Cybersecurity Fortified Matrix (South-East)
 */
export function InnovationDistrict() {
  return (
    <group name="innovation-districts-ecosystem">
      {/* ─────────────────────────────────────────────────────────────
          DISTRICT 01 — ARTIFICIAL INTELLIGENCE (North-West)
          Location centered around [-24, 0, -20]
      ────────────────────────────────────────────────────────────── */}
      <group name="district-01-ai">
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

        {/* High-level Skybridge connecting AI Tower 1 & 2 */}
        <group position={[-22, 23, -18.5]} rotation={[0, 0.6, 0]}>
          <mesh material={titaniumStructuralMaterial}>
            <boxGeometry args={[1.8, 1.5, 11]} />
          </mesh>
          <mesh position={[0, 0, 0]} material={cyanGlowMaterial}>
            <boxGeometry args={[1.88, 0.16, 11]} />
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
      <group name="district-02-robotics">
        {/* Main Industrial Innovation Complex (Fabrication Core, Assembly Hall, Gantry) */}
        <IndustrialComplex position={[24, 0.9, -20]} rotation={-0.2} />

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
          <mesh material={titaniumStructuralMaterial}>
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
      <group name="district-03-aerospace">
        {/* Main Aerospace Complex (Aerodynamic Hangar, Observation Spire & Radar Dish) */}
        <AerospaceComplex position={[-24, 0.9, 22]} rotation={0.25} />

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
      <group name="district-04-cybersecurity">
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
