import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
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
} from '../materials';

/**
 * CentralLandmark — The Monumental Techfest Innovation Tower (Refined Milestone 1.1)
 *
 * Primary visual centerpiece of the Innovation District:
 * - Layered octagonal podium with grand colonnade & entrance canopies
 * - Articulated lower tower core with realistic window grid facades & vertical cyan ribs
 * - Mid-level cantilevered observation sky-deck with structural under-trussing
 * - Quad-shaft upper spire formation flanking a luminous central light chasm
 * - Segmented architectural crown, dual rotating halos, and soaring telemetry spire to Y=68
 */
export function CentralLandmark() {
  const crownBeaconRef = useRef<THREE.Mesh>(null);
  const crownRingRef = useRef<THREE.Group>(null);
  const secondaryRingRef = useRef<THREE.Group>(null);

  // Subtle breathing pulse and counter-rotating crown halo
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (crownBeaconRef.current) {
      const scale = 1.0 + Math.sin(t * 2.2) * 0.08;
      crownBeaconRef.current.scale.set(scale, scale, scale);
    }
    if (crownRingRef.current) {
      crownRingRef.current.rotation.y = t * 0.05;
    }
    if (secondaryRingRef.current) {
      secondaryRingRef.current.rotation.y = -t * 0.035;
    }
  });

  return (
    <group name="techfest-innovation-tower" position={[0, 0, 0]}>
      {/* ─────────────────────────────────────────────────────────────
          LEVEL 1: GRAND PODIUM, COLONNADE & BUTTRESSES (Y: 0.8 to 7.0)
      ────────────────────────────────────────────────────────────── */}
      <group name="podium-foundation">
        {/* Tiered Octagonal Base Slabs */}
        <mesh position={[0, 1.8, 0]} material={darkTitaniumMaterial}>
          <cylinderGeometry args={[9.2, 11.2, 2.0, 8]} />
        </mesh>
        <mesh position={[0, 3.8, 0]} material={titaniumStructuralMaterial}>
          <cylinderGeometry args={[8.5, 9.2, 2.0, 8]} />
        </mesh>
        <mesh position={[0, 5.0, 0]} material={metalExoskeletonMaterial}>
          <cylinderGeometry args={[8.6, 8.6, 0.4, 8]} />
        </mesh>

        {/* 16 Monumental Perimeter Colonnade Pillars */}
        {Array.from({ length: 16 }).map((_, idx) => {
          const angle = (idx * Math.PI * 2) / 16;
          const radius = 9.8;
          return (
            <group
              key={`podium-col-${idx}`}
              position={[Math.cos(angle) * radius, 2.5, Math.sin(angle) * radius]}
              rotation={[0, -angle, 0]}
            >
              <mesh material={titaniumStructuralMaterial}>
                <boxGeometry args={[0.5, 3.4, 0.5]} />
              </mesh>
              {/* Pillar Base & Capital Trim */}
              <mesh position={[0, -1.6, 0]} material={darkTitaniumMaterial}>
                <boxGeometry args={[0.7, 0.2, 0.7]} />
              </mesh>
              <mesh position={[0, 1.6, 0]} material={darkTitaniumMaterial}>
                <boxGeometry args={[0.7, 0.2, 0.7]} />
              </mesh>
              {/* Recessed Cyan Uplight */}
              <mesh position={[0, -1.45, 0.26]} material={cyanGlowMaterial}>
                <boxGeometry args={[0.2, 0.1, 0.04]} />
              </mesh>
            </group>
          );
        })}

        {/* Four Massive Angled Corner Buttress Pylons */}
        {[Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].map(
          (angle, idx) => (
            <group key={`buttress-pylon-${idx}`} rotation={[0, angle, 0]}>
              <mesh
                position={[8.8, 3.5, 0]}
                rotation={[0, 0, -Math.PI / 8]}
                material={blueSteelMaterial}
              >
                <boxGeometry args={[1.8, 7.2, 2.2]} />
              </mesh>
              {/* Illuminated Edge Ridge */}
              <mesh
                position={[9.45, 3.5, 0]}
                rotation={[0, 0, -Math.PI / 8]}
                material={cyanGlowMaterial}
              >
                <boxGeometry args={[0.08, 7.1, 0.25]} />
              </mesh>
            </group>
          )
        )}

        {/* Four Grand Axial Entrance Portals & Canopies */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
          <group key={`entrance-portal-${idx}`} rotation={[0, angle, 0]}>
            {/* Recessed Entrance Glass Screen */}
            <mesh position={[0, 3.2, 8.5]} material={reflectiveGlassMaterial}>
              <boxGeometry args={[4.2, 4.0, 0.4]} />
            </mesh>
            {/* Projecting High-Tech Canopy */}
            <mesh position={[0, 5.2, 9.6]} material={titaniumStructuralMaterial}>
              <boxGeometry args={[4.8, 0.35, 2.2]} />
            </mesh>
            {/* Canopy Glowing Cyan Soffit Trim */}
            <mesh position={[0, 5.0, 9.6]} material={cyanGlowMaterial}>
              <boxGeometry args={[4.6, 0.05, 2.0]} />
            </mesh>
            {/* Entrance Portal Cyan Frame */}
            <mesh position={[-2.1, 3.2, 8.7]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.15, 3.8, 0.2]} />
            </mesh>
            <mesh position={[2.1, 3.2, 8.7]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.15, 3.8, 0.2]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ─────────────────────────────────────────────────────────────
          LEVEL 2: LOWER TOWER CORE & FACADE ARTICULATION (Y: 6.5 to 25.5)
      ────────────────────────────────────────────────────────────── */}
      <group name="lower-tower-core">
        {/* Core Structural Mass */}
        <mesh position={[0, 16.0, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[7.4, 19.0, 7.4]} />
        </mesh>

        {/* Realistic Window Grid Curtain Facades (All 4 faces) */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
          <group key={`lower-facade-grid-${idx}`} rotation={[0, angle, 0]}>
            {/* Window Grid Inset Screen */}
            <mesh position={[0, 16.0, 3.72]} material={windowGridMaterial}>
              <boxGeometry args={[5.2, 18.0, 0.06]} />
            </mesh>

            {/* Continuous Vertical Cyan Illumination Ribs */}
            <mesh position={[-1.8, 16.0, 3.82]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.14, 18.5, 0.12]} />
            </mesh>
            <mesh position={[1.8, 16.0, 3.82]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.14, 18.5, 0.12]} />
            </mesh>
            {/* Central Blue Structural Spine */}
            <mesh position={[0, 16.0, 3.82]} material={blueGlowMaterial}>
              <boxGeometry args={[0.08, 18.5, 0.12]} />
            </mesh>

            {/* Horizontal Mechanical Service Belts with Louvers */}
            <mesh position={[0, 12.0, 3.8]} material={titaniumStructuralMaterial}>
              <boxGeometry args={[5.4, 0.7, 0.2]} />
            </mesh>
            <mesh position={[0, 12.0, 3.88]} material={cyanGlowMaterial}>
              <boxGeometry args={[5.0, 0.1, 0.06]} />
            </mesh>

            <mesh position={[0, 20.0, 3.8]} material={titaniumStructuralMaterial}>
              <boxGeometry args={[5.4, 0.7, 0.2]} />
            </mesh>
            <mesh position={[0, 20.0, 3.88]} material={cyanGlowMaterial}>
              <boxGeometry args={[5.0, 0.1, 0.06]} />
            </mesh>
          </group>
        ))}

        {/* Four Massive Structural Titanium Corner Pylons */}
        {[
          [-3.8, 3.8],
          [3.8, 3.8],
          [3.8, -3.8],
          [-3.8, -3.8],
        ].map(([cx, cz], idx) => (
          <group key={`tower-corner-pylon-${idx}`} position={[cx, 16.0, cz]}>
            <mesh material={titaniumStructuralMaterial}>
              <boxGeometry args={[1.6, 19.4, 1.6]} />
            </mesh>
            {/* Corner Chamfer Lighting Slot */}
            <mesh position={[0, 0, 0]} material={cyanGlowMaterial}>
              <boxGeometry args={[1.66, 19.0, 0.12]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ─────────────────────────────────────────────────────────────
          LEVEL 3: CANTILEVERED SKY-DECK & OBSERVATION GALLERY (Y: 25.5 to 29.5)
      ────────────────────────────────────────────────────────────── */}
      <group name="mid-tower-sky-deck" position={[0, 26.5, 0]}>
        {/* Cantilevered Octagonal Deck Body */}
        <mesh material={darkTitaniumMaterial}>
          <cylinderGeometry args={[6.4, 5.0, 2.2, 8]} />
        </mesh>
        {/* 360-Degree Panoramic Glass Observation Gallery */}
        <mesh position={[0, 0.2, 0]} material={reflectiveGlassMaterial}>
          <cylinderGeometry args={[6.45, 5.8, 1.2, 8]} />
        </mesh>
        {/* Perimeter Glowing Cyan Ribbon */}
        <mesh position={[0, -0.6, 0]} material={cyanGlowMaterial}>
          <cylinderGeometry args={[6.48, 6.48, 0.25, 8]} />
        </mesh>
        <mesh position={[0, 0.9, 0]} material={blueGlowMaterial}>
          <cylinderGeometry args={[6.1, 6.1, 0.15, 8]} />
        </mesh>

        {/* Under-Deck Structural Diagrid Struts */}
        {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4].map(
          (angle, idx) => (
            <mesh
              key={`diagrid-strut-${idx}`}
              position={[Math.cos(angle) * 4.6, -1.6, Math.sin(angle) * 4.6]}
              rotation={[0, -angle, 0.45]}
              material={metalExoskeletonMaterial}
            >
              <boxGeometry args={[0.7, 1.8, 0.7]} />
            </mesh>
          )
        )}
      </group>

      {/* ─────────────────────────────────────────────────────────────
          LEVEL 4: UPPER TOWER QUAD-SHAFT SPACING & ATRIUM (Y: 28.5 to 53.0)
      ────────────────────────────────────────────────────────────── */}
      <group name="upper-tower-quad-shafts">
        {/* Quad Spire Shafts with window grid texturing */}
        {[
          { x: -1.9, z: -1.9 },
          { x: 1.9, z: -1.9 },
          { x: 1.9, z: 1.9 },
          { x: -1.9, z: 1.9 },
        ].map((shaft, idx) => (
          <group key={`upper-quad-shaft-${idx}`} position={[shaft.x, 40.5, shaft.z]}>
            {/* Tapered Titanium Shaft Body */}
            <mesh material={titaniumStructuralMaterial}>
              <boxGeometry args={[2.4, 25.0, 2.4]} />
            </mesh>
            {/* Outer Facade Window Grid */}
            <mesh
              position={[shaft.x > 0 ? 1.05 : -1.05, 0, shaft.z > 0 ? 1.05 : -1.05]}
              material={windowGridMaterial}
            >
              <boxGeometry args={[0.9, 24.5, 0.9]} />
            </mesh>
            {/* Ascending Illuminated Cyan Corner Rib */}
            <mesh
              position={[shaft.x > 0 ? 1.25 : -1.25, 0, shaft.z > 0 ? 1.25 : -1.25]}
              material={cyanGlowMaterial}
            >
              <boxGeometry args={[0.18, 25.0, 0.18]} />
            </mesh>
          </group>
        ))}

        {/* Central Luminous Energy Core inside the light canyon */}
        <mesh position={[0, 40.5, 0]} material={blueGlowMaterial}>
          <boxGeometry args={[1.4, 24.5, 1.4]} />
        </mesh>

        {/* Structural Cross-Bracing Sky-Rings binding the four shafts */}
        {[34, 41, 48].map((yPos, idx) => (
          <group key={`quad-sky-ring-${idx}`} position={[0, yPos, 0]}>
            <mesh material={darkTitaniumMaterial}>
              <cylinderGeometry args={[3.4, 3.4, 0.8, 8]} />
            </mesh>
            <mesh position={[0, 0, 0]} material={cyanGlowMaterial}>
              <cylinderGeometry args={[3.45, 3.45, 0.18, 8]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ─────────────────────────────────────────────────────────────
          LEVEL 5: ARCHITECTURAL CROWN, ROTATING HALOS & SPIRE (Y: 53.0 to 68.0)
      ────────────────────────────────────────────────────────────── */}
      <group name="monumental-crown" position={[0, 53.5, 0]}>
        {/* Crown Podium Platform with mechanical louvers */}
        <mesh position={[0, 0.8, 0]} material={darkTitaniumMaterial}>
          <cylinderGeometry args={[3.0, 3.6, 1.6, 8]} />
        </mesh>
        <mesh position={[0, 0.8, 0]} material={titaniumStructuralMaterial}>
          <cylinderGeometry args={[3.05, 3.05, 0.4, 8]} />
        </mesh>

        {/* Primary Segmented Architectural Crown Halo (Rotating) */}
        <group ref={crownRingRef} position={[0, 3.6, 0]}>
          <mesh material={metalExoskeletonMaterial}>
            <torusGeometry args={[3.4, 0.38, 8, 8]} />
          </mesh>
          {/* Eight Cyan Crown Emitter Fins */}
          {Array.from({ length: 8 }).map((_, idx) => {
            const ang = (idx * Math.PI * 2) / 8;
            return (
              <mesh
                key={`crown-fin-${idx}`}
                position={[Math.cos(ang) * 3.4, 0.35, Math.sin(ang) * 3.4]}
                rotation={[0, -ang, 0]}
                material={cyanGlowMaterial}
              >
                <boxGeometry args={[0.2, 0.9, 0.45]} />
              </mesh>
            );
          })}
        </group>

        {/* Secondary Inner Counter-Rotating Halo */}
        <group ref={secondaryRingRef} position={[0, 3.6, 0]}>
          <mesh material={titaniumStructuralMaterial}>
            <torusGeometry args={[2.2, 0.22, 6, 8]} />
          </mesh>
          <mesh material={blueGlowMaterial}>
            <torusGeometry args={[2.22, 0.08, 6, 8]} />
          </mesh>
        </group>

        {/* Floating Pulsing Quantum Energy Beacon Core */}
        <mesh ref={crownBeaconRef} position={[0, 3.6, 0]} material={cyanGlowMaterial}>
          <octahedronGeometry args={[1.4, 0]} />
        </mesh>

        {/* Inner Luminous Core */}
        <mesh position={[0, 3.6, 0]} material={blueGlowMaterial}>
          <icosahedronGeometry args={[0.85, 0]} />
        </mesh>

        {/* Soaring High-Altitude Telemetry Spire Needle */}
        <group name="telemetry-needle" position={[0, 5.5, 0]}>
          {/* Lower Mast Column with structural collar */}
          <mesh position={[0, 3.5, 0]} material={titaniumStructuralMaterial}>
            <cylinderGeometry args={[0.35, 0.75, 7.0, 8]} />
          </mesh>
          {/* Microwave Communication Drums */}
          <mesh position={[0, 5.5, 0]} material={metalExoskeletonMaterial}>
            <cylinderGeometry args={[0.8, 0.8, 0.6, 8]} />
          </mesh>
          <mesh position={[0, 5.5, 0]} material={cyanGlowMaterial}>
            <cylinderGeometry args={[0.82, 0.82, 0.1, 8]} />
          </mesh>

          {/* Spire Mid-Station Emitter Collar */}
          <mesh position={[0, 7.5, 0]} material={cyanGlowMaterial}>
            <cylinderGeometry args={[0.6, 0.6, 0.35, 8]} />
          </mesh>

          {/* Upper Slender Antenna Mast */}
          <mesh position={[0, 11.0, 0]} material={titaniumStructuralMaterial}>
            <cylinderGeometry args={[0.08, 0.28, 7.0, 8]} />
          </mesh>

          {/* Amber Apex Air Navigation Strobe Beacon Light */}
          <mesh position={[0, 14.6, 0]} material={orangeGlowMaterial}>
            <sphereGeometry args={[0.38, 12, 12]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
