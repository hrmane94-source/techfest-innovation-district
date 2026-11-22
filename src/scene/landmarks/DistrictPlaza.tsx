import { useMemo } from 'react';
import { useGraphicsQuality } from '../../context';
import {
  plazaMaterial,
  plazaAccentMaterial,
  titaniumStructuralMaterial,
  metalExoskeletonMaterial,
  brushedAlloyMaterial,
  pearlWhiteMaterial,
  softSilverMaterial,
  cyanGlowMaterial,
  blueGlowMaterial,
  orangeGlowMaterial,
  warmGlowMaterial,
  reflectiveGlassMaterial,
  structuralGlassMaterial,
  campusLawnMaterial,
  campusWoodBenchMaterial,
  bioluminescentFloraMaterial,
  futuristicPlanterMaterial,
} from '../materials';

/**
 * DistrictPlaza — Central Academic Gathering Plaza & Student Commons
 *
 * Futuristic University Campus Elements:
 * 1. Base Stepped Octagonal Academic Podium Deck with Reflecting Pool
 * 2. Outdoor Student Amphitheater with Stepped Crescent Seating Tiers & Presentation Dais
 * 3. Student Commons Gathering Pavilion with Shaded Solar Pergola & Study Benches
 * 4. Techfest IIT Bombay Monument & Insignia Installation
 * 5. Campus Lawns, Landscaped Greenery, and Tree-Lined Walkways
 * 6. Telemetry Pylons & Axial Ceremonial Steps connecting to Academic Departments
 */
export function DistrictPlaza() {
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';

  // Symmetrically placed telemetry pylons surrounding the plaza perimeter
  const pylonPositions = useMemo(() => {
    const pylons = [];
    const count = 8;
    const radius = 19.5;
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
      {/* ── 1. BASE STEPPED OCTAGONAL PODIUM DECK ── */}
      <mesh position={[0, 0.4, 0]} material={plazaMaterial} receiveShadow={settings.shadows}>
        <cylinderGeometry args={[23.5, 25.0, 0.8, 8]} />
      </mesh>
      {/* Outer Podium Coping Trim */}
      <mesh position={[0, 0.82, 0]} material={metalExoskeletonMaterial}>
        <cylinderGeometry args={[23.6, 23.6, 0.08, 8]} />
      </mesh>

      {/* ── 2. SECONDARY ELEVATED PAVED TERRACE ── */}
      <mesh position={[0, 1.0, 0]} material={plazaAccentMaterial} receiveShadow={settings.shadows}>
        <cylinderGeometry args={[17.2, 18.2, 0.5, 8]} />
      </mesh>

      {/* ── 3. CIRCULAR REFLECTING POOL / WATER FEATURE ── */}
      <mesh
        position={[0, 1.28, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={reflectiveGlassMaterial}
      >
        <ringGeometry args={[11.2, 15.6, 48]} />
      </mesh>

      {/* Concentric Glowing Boundary Rings */}
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
        <ringGeometry args={[11.0, 11.2, 48]} />
      </mesh>

      {/* ── 4. OUTDOOR STUDENT AMPHITHEATER (South-East Quadrant) ── */}
      <group name="student-amphitheater" position={[11.5, 1.0, 11.5]} rotation={[0, -Math.PI / 4, 0]}>
        {/* Presentation Dais / Open-air Speaker Stage */}
        <mesh position={[0, 0.15, -4.5]} material={pearlWhiteMaterial} castShadow={shouldCastShadow} receiveShadow={settings.shadows}>
          <boxGeometry args={[4.2, 0.3, 2.4]} />
        </mesh>
        <mesh position={[0, 0.31, -4.5]} material={cyanGlowMaterial}>
          <boxGeometry args={[4.0, 0.02, 2.2]} />
        </mesh>
        {/* Stage Presentation Backdrop Screen / Lectern */}
        <mesh position={[0, 0.9, -5.6]} material={structuralGlassMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[3.2, 1.2, 0.1]} />
        </mesh>
        <mesh position={[0, 0.9, -5.58]} material={cyanGlowMaterial}>
          <boxGeometry args={[2.8, 0.8, 0.02]} />
        </mesh>

        {/* Crescent Tiered Student Seating (3 Stepped Tiers) */}
        {[
          { radius: 4.8, depth: 0.9, height: 0.25, y: 0.15 },
          { radius: 6.2, depth: 0.9, height: 0.5, y: 0.28 },
          { radius: 7.6, depth: 0.9, height: 0.75, y: 0.41 },
        ].map((tier, tIdx) => (
          <group key={`amphitheater-tier-${tIdx}`}>
            {/* Concrete / Alloy Riser Base */}
            <mesh position={[0, tier.y, 0]} rotation={[-Math.PI / 2, 0, 0]} material={plazaAccentMaterial} receiveShadow={settings.shadows}>
              <ringGeometry args={[tier.radius - tier.depth / 2, tier.radius + tier.depth / 2, 32, 1, 0, Math.PI]} />
            </mesh>
            {/* Warm Wood Composite Seating Surface */}
            <mesh position={[0, tier.y + 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} material={campusWoodBenchMaterial}>
              <ringGeometry args={[tier.radius - tier.depth * 0.4, tier.radius + tier.depth * 0.4, 32, 1, 0.05, Math.PI - 0.1]} />
            </mesh>
            {/* Soft Cyan Under-Seat Illumination Strip */}
            <mesh position={[0, tier.y + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} material={cyanGlowMaterial}>
              <ringGeometry args={[tier.radius - tier.depth / 2, tier.radius - tier.depth / 2 + 0.08, 32, 1, 0, Math.PI]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── 5. STUDENT COMMONS GATHERING PAVILION (South-West Quadrant) ── */}
      <group name="student-commons-pavilion" position={[-11.5, 1.0, 11.5]} rotation={[0, Math.PI / 4, 0]}>
        {/* Shaded Pergola Canopy Roof */}
        <mesh position={[0, 3.6, 0]} material={structuralGlassMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[7.2, 0.15, 5.2]} />
        </mesh>
        <mesh position={[0, 3.68, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[7.0, 0.02, 5.0]} />
        </mesh>
        {/* Canopy Architectural Support Columns */}
        {[
          [-3.2, -2.2],
          [3.2, -2.2],
          [-3.2, 2.2],
          [3.2, 2.2],
        ].map(([cx, cz], cIdx) => (
          <group key={`commons-col-${cIdx}`} position={[cx, 1.8, cz]}>
            <mesh material={softSilverMaterial} castShadow={shouldCastShadow}>
              <cylinderGeometry args={[0.1, 0.14, 3.6, 8]} />
            </mesh>
            <mesh position={[0, -1.75, 0]} material={metalExoskeletonMaterial}>
              <boxGeometry args={[0.35, 0.1, 0.35]} />
            </mesh>
          </group>
        ))}
        {/* Shaded Study Desks & Campus Benches */}
        {[-1.6, 1.6].map((tx, idx) => (
          <group key={`commons-desk-${idx}`} position={[tx, 0, 0]}>
            {/* Modern Collaborative Work Table */}
            <mesh position={[0, 0.75, 0]} material={brushedAlloyMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[1.1, 0.08, 2.8]} />
            </mesh>
            <mesh position={[0, 0.38, 0]} material={metalExoskeletonMaterial}>
              <boxGeometry args={[0.08, 0.72, 2.2]} />
            </mesh>
            {/* Flanking Campus Wood Benches */}
            <mesh position={[-0.8, 0.42, 0]} material={campusWoodBenchMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[0.4, 0.06, 2.6]} />
            </mesh>
            <mesh position={[0.8, 0.42, 0]} material={campusWoodBenchMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[0.4, 0.06, 2.6]} />
            </mesh>
            {/* Soft Warm Task Downlight */}
            <mesh position={[0, 3.52, 0]} material={warmGlowMaterial}>
              <boxGeometry args={[0.6, 0.04, 2.0]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── 6. CAMPUS GREEN GARDEN COURTYARD (North-East Quadrant) ── */}
      <group name="campus-garden-courtyard" position={[11.5, 1.0, -11.5]} rotation={[0, -Math.PI / 4, 0]}>
        {/* Manicured Lawn Grass Pad */}
        <mesh position={[0, 0.08, 0]} material={campusLawnMaterial} receiveShadow={settings.shadows}>
          <boxGeometry args={[6.8, 0.15, 6.8]} />
        </mesh>
        {/* Polished Stone Border Curb */}
        <mesh position={[0, 0.12, 0]} material={softSilverMaterial}>
          <boxGeometry args={[7.1, 0.1, 7.1]} />
        </mesh>

        {/* Circular Flower Planter & Bio Tree in Center */}
        <group position={[0, 0.15, 0]}>
          <mesh position={[0, 0.3, 0]} material={futuristicPlanterMaterial} receiveShadow castShadow={shouldCastShadow}>
            <cylinderGeometry args={[1.5, 1.8, 0.6, 16]} />
          </mesh>
          <mesh position={[0, 0.61, 0]} material={cyanGlowMaterial}>
            <ringGeometry args={[1.4, 1.55, 16]} />
          </mesh>
          {/* Central Campus Tree */}
          <mesh position={[0, 1.6, 0]} material={softSilverMaterial} castShadow={shouldCastShadow}>
            <cylinderGeometry args={[0.15, 0.25, 2.2, 8]} />
          </mesh>
          <mesh position={[0, 2.8, 0]} material={bioluminescentFloraMaterial} castShadow={shouldCastShadow}>
            <dodecahedronGeometry args={[1.4, 0]} />
          </mesh>
        </group>

        {/* Corner Relaxing Benches */}
        {[
          [-2.4, 0, 0],
          [2.4, 0, 0],
        ].map(([bx, by, bz], idx) => (
          <group key={`garden-bench-${idx}`} position={[bx, by, bz]}>
            <mesh position={[0, 0.45, 0]} material={campusWoodBenchMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[0.5, 0.08, 2.2]} />
            </mesh>
            <mesh position={[0, 0.22, 0]} material={metalExoskeletonMaterial}>
              <boxGeometry args={[0.4, 0.4, 1.8]} />
            </mesh>
            <mesh position={[0, 0.18, 0]} material={warmGlowMaterial}>
              <boxGeometry args={[0.3, 0.02, 1.9]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── 7. TECHFEST IIT BOMBAY MONUMENT & IDENTITY INSTALLATION (North-West Quadrant) ── */}
      <group name="techfest-monument" position={[-11.5, 1.0, -11.5]} rotation={[0, Math.PI / 4, 0]}>
        {/* Monument Pedestal Base */}
        <mesh position={[0, 0.35, 0]} material={pearlWhiteMaterial} receiveShadow={settings.shadows} castShadow={shouldCastShadow}>
          <boxGeometry args={[4.2, 0.7, 4.2]} />
        </mesh>
        <mesh position={[0, 0.72, 0]} material={brushedAlloyMaterial}>
          <boxGeometry args={[3.8, 0.06, 3.8]} />
        </mesh>
        <mesh position={[0, 0.76, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[3.6, 0.02, 3.6]} />
        </mesh>

        {/* Sculptural Interlocking Techfest Monolith Pillars */}
        <mesh position={[-0.8, 2.4, 0]} rotation={[0, 0, -0.1]} material={pearlWhiteMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[0.4, 3.2, 1.2]} />
        </mesh>
        <mesh position={[0.8, 2.4, 0]} rotation={[0, 0, 0.1]} material={softSilverMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[0.4, 3.2, 1.2]} />
        </mesh>

        {/* Central Luminous Techfest Prism Core */}
        <mesh position={[0, 2.6, 0]} material={cyanGlowMaterial}>
          <octahedronGeometry args={[0.7, 0]} />
        </mesh>
        <mesh position={[0, 2.6, 0]} material={structuralGlassMaterial}>
          <octahedronGeometry args={[0.85, 0]} />
        </mesh>

        {/* Vertical Holographic Insignia Spire */}
        <mesh position={[0, 4.4, 0]} material={titaniumStructuralMaterial}>
          <cylinderGeometry args={[0.04, 0.08, 1.8, 8]} />
        </mesh>
        <mesh position={[0, 5.35, 0]} material={blueGlowMaterial}>
          <sphereGeometry args={[0.15, 8, 8]} />
        </mesh>

        {/* Commemorative Inscription Plinth */}
        <mesh position={[0, 0.5, 2.2]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[2.2, 0.5, 0.3]} />
        </mesh>
        <mesh position={[0, 0.76, 2.2]} material={cyanGlowMaterial}>
          <boxGeometry args={[2.0, 0.04, 0.2]} />
        </mesh>
      </group>

      {/* ── 8. CIVIC SEATING BENCHES AROUND THE REFLECTING BASIN ── */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4].map(
        (ang, idx) => (
          <group key={`plaza-bench-${idx}`} rotation={[0, ang + Math.PI / 8, 0]}>
            <mesh position={[0, 1.45, 16.4]} material={campusWoodBenchMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[3.2, 0.35, 0.8]} />
            </mesh>
            <mesh position={[0, 1.28, 16.4]} material={cyanGlowMaterial}>
              <boxGeometry args={[3.0, 0.04, 0.82]} />
            </mesh>
          </group>
        )
      )}

      {/* ── 9. IN-GROUND RADIAL ACCENT LIGHT STRIPS ── */}
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

      {/* ── 10. EIGHT TELEMETRY / ARCHITECTURAL ENERGY PYLONS AROUND THE PLAZA ── */}
      {pylonPositions.map((pylon, idx) => (
        <group
          key={`plaza-pylon-${idx}`}
          position={[pylon.x, 1.0, pylon.z]}
          rotation={[0, -pylon.angle + Math.PI / 2, 0]}
        >
          {/* Tapered architectural pylon */}
          <mesh position={[0, 2.6, 0]} material={titaniumStructuralMaterial} castShadow={shouldCastShadow}>
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

      {/* ── 11. FOUR AXIAL GRAND CEREMONIAL APPROACH STEPS ── */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
        <group key={`approach-steps-${idx}`} rotation={[0, angle, 0]}>
          <mesh position={[0, 0.4, 21.5]} material={titaniumStructuralMaterial} receiveShadow={settings.shadows} castShadow={shouldCastShadow}>
            <boxGeometry args={[6.4, 0.4, 4.5]} />
          </mesh>
          {/* Step Glowing Side Balustrades */}
          <mesh position={[-3.1, 0.85, 21.5]} material={structuralGlassMaterial}>
            <boxGeometry args={[0.15, 0.5, 4.5]} />
          </mesh>
          <mesh position={[-3.1, 1.12, 21.5]} material={cyanGlowMaterial}>
            <boxGeometry args={[0.1, 0.06, 4.4]} />
          </mesh>
          <mesh position={[3.1, 0.85, 21.5]} material={structuralGlassMaterial}>
            <boxGeometry args={[0.15, 0.5, 4.5]} />
          </mesh>
          <mesh position={[3.1, 1.12, 21.5]} material={cyanGlowMaterial}>
            <boxGeometry args={[0.1, 0.06, 4.4]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
