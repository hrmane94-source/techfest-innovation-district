import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
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

/**
 * CentralLandmark — The Monumental Techfest Innovation Tower
 *
 * Visually dominant centerpiece featuring:
 * - Sophisticated tiered base podium & angular buttress pylons
 * - Multi-tiered tapered tower body with metallic & glass facades
 * - Continuous vertical cyan architectural illumination ribs
 * - Cantilevered mid-tower sky-lobby & observation terrace
 * - Quad-shaft upper spire structure flanking a hollow central light atrium
 * - Iconic geometric illuminated crown with floating beacon and telemetry needle
 */
export function CentralLandmark() {
  const crownBeaconRef = useRef<THREE.Mesh>(null);
  const crownRingRef = useRef<THREE.Group>(null);

  // Subtle breathing pulse on the tower's apex crown beacon
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (crownBeaconRef.current) {
      const scale = 1.0 + Math.sin(t * 2.2) * 0.08;
      crownBeaconRef.current.scale.set(scale, scale, scale);
    }
    if (crownRingRef.current) {
      crownRingRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group name="techfest-innovation-tower" position={[0, 0, 0]}>
      {/* ─────────────────────────────────────────────────────────────
          LEVEL 1: BASE PODIUM & STRUCTURAL BUTTRESSES (Y: 1 to 7)
      ────────────────────────────────────────────────────────────── */}
      <group name="podium-level">
        {/* Main Octagonal Base Block */}
        <mesh position={[0, 3.5, 0]} material={darkTitaniumMaterial}>
          <cylinderGeometry args={[8.5, 10.5, 5, 8]} />
        </mesh>

        {/* Podium Base Perimeter Trim */}
        <mesh position={[0, 6.2, 0]} material={titaniumStructuralMaterial}>
          <cylinderGeometry args={[8.8, 8.8, 0.4, 8]} />
        </mesh>

        {/* Four Grand Buttress Pylons angled into the corners */}
        {[Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].map(
          (angle, idx) => (
            <group key={`buttress-${idx}`} rotation={[0, angle, 0]}>
              <mesh position={[8.5, 3.2, 0]} rotation={[0, 0, -Math.PI / 8]} material={blueSteelMaterial}>
                <boxGeometry args={[1.6, 6.5, 2.0]} />
              </mesh>
              {/* Buttress illuminated edge strip */}
              <mesh position={[9.1, 3.2, 0]} rotation={[0, 0, -Math.PI / 8]} material={cyanGlowMaterial}>
                <boxGeometry args={[0.08, 6.4, 0.2]} />
              </mesh>
            </group>
          )
        )}

        {/* Four Recessed Ground Entrance Porticos with glowing cyan portals */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
          <group key={`entrance-${idx}`} rotation={[0, angle, 0]}>
            <mesh position={[0, 2.8, 8.6]} material={glassCurtainMaterial}>
              <boxGeometry args={[3.2, 3.5, 0.6]} />
            </mesh>
            {/* Entrance Cyan Frame */}
            <mesh position={[0, 4.6, 8.7]} material={cyanGlowMaterial}>
              <boxGeometry args={[3.4, 0.15, 0.2]} />
            </mesh>
            <mesh position={[-1.65, 2.8, 8.7]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.15, 3.6, 0.2]} />
            </mesh>
            <mesh position={[1.65, 2.8, 8.7]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.15, 3.6, 0.2]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ─────────────────────────────────────────────────────────────
          LEVEL 2: LOWER TOWER CORE & VERTICAL RIBS (Y: 6.5 to 25)
      ────────────────────────────────────────────────────────────── */}
      <group name="lower-tower-core">
        {/* Core Tower Shaft */}
        <mesh position={[0, 15.5, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[7.2, 18, 7.2]} />
        </mesh>

        {/* Glass Facade Insets (N, S, E, W faces) */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
          <group key={`lower-facade-${idx}`} rotation={[0, angle, 0]}>
            <mesh position={[0, 15.5, 3.65]} material={reflectiveGlassMaterial}>
              <boxGeometry args={[4.6, 17.5, 0.1]} />
            </mesh>
            {/* Vertical Cyan Ribs traversing up the facade */}
            <mesh position={[-1.6, 15.5, 3.75]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.12, 17.5, 0.1]} />
            </mesh>
            <mesh position={[1.6, 15.5, 3.75]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.12, 17.5, 0.1]} />
            </mesh>
            {/* Center Blue Accent Spine */}
            <mesh position={[0, 15.5, 3.75]} material={blueGlowMaterial}>
              <boxGeometry args={[0.08, 17.5, 0.1]} />
            </mesh>
          </group>
        ))}

        {/* Four Massive Corner Pylons / Vertical Structural Fins */}
        {[
          [-3.7, 3.7],
          [3.7, 3.7],
          [3.7, -3.7],
          [-3.7, -3.7],
        ].map(([cx, cz], idx) => (
          <group key={`corner-fin-${idx}`} position={[cx, 15.5, cz]}>
            <mesh material={titaniumStructuralMaterial}>
              <boxGeometry args={[1.4, 18.5, 1.4]} />
            </mesh>
            {/* Corner glowing chamfer strip */}
            <mesh position={[0, 0, 0]} material={cyanGlowMaterial}>
              <boxGeometry args={[1.45, 18.2, 0.1]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ─────────────────────────────────────────────────────────────
          LEVEL 3: CANTILEVERED SKY-DECK & TRANSITION (Y: 24.5 to 28)
      ────────────────────────────────────────────────────────────── */}
      <group name="mid-tower-sky-deck" position={[0, 25.5, 0]}>
        {/* Cantilevered Octagonal Observation Platform */}
        <mesh material={darkTitaniumMaterial}>
          <cylinderGeometry args={[5.8, 4.8, 1.8, 8]} />
        </mesh>
        {/* Illuminated Platform Edge Ribbon */}
        <mesh position={[0, 0, 0]} material={cyanGlowMaterial}>
          <cylinderGeometry args={[5.85, 4.85, 0.25, 8]} />
        </mesh>
        {/* Underside Structural Gantry Brackets */}
        {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4].map(
          (angle, idx) => (
            <mesh
              key={`deck-bracket-${idx}`}
              position={[Math.cos(angle) * 4.2, -1.2, Math.sin(angle) * 4.2]}
              rotation={[0, -angle, 0.4]}
              material={titaniumStructuralMaterial}
            >
              <boxGeometry args={[0.6, 1.5, 0.6]} />
            </mesh>
          )
        )}
      </group>

      {/* ─────────────────────────────────────────────────────────────
          LEVEL 4: UPPER TOWER QUAD-SHAFT CLUSTER (Y: 27.5 to 52)
      ────────────────────────────────────────────────────────────── */}
      <group name="upper-tower-quad-shafts">
        {/* Quad Spire Shafts flanking central negative space */}
        {[
          { x: -1.8, z: -1.8, name: 'NW' },
          { x: 1.8, z: -1.8, name: 'NE' },
          { x: 1.8, z: 1.8, name: 'SE' },
          { x: -1.8, z: 1.8, name: 'SW' },
        ].map((shaft, idx) => (
          <group key={`upper-shaft-${idx}`} position={[shaft.x, 39, shaft.z]}>
            {/* Tapering vertical shaft body */}
            <mesh material={titaniumStructuralMaterial}>
              <boxGeometry args={[2.2, 23, 2.2]} />
            </mesh>
            {/* Outer Glass Facade */}
            <mesh
              position={[shaft.x > 0 ? 0.95 : -0.95, 0, shaft.z > 0 ? 0.95 : -0.95]}
              material={reflectiveGlassMaterial}
            >
              <boxGeometry args={[0.8, 22.8, 0.8]} />
            </mesh>
            {/* Ascending Cyan Illumination Rib */}
            <mesh
              position={[shaft.x > 0 ? 1.15 : -1.15, 0, shaft.z > 0 ? 1.15 : -1.15]}
              material={cyanGlowMaterial}
            >
              <boxGeometry args={[0.15, 23, 0.15]} />
            </mesh>
          </group>
        ))}

        {/* Central Luminous Core inside the hollow canyon */}
        <mesh position={[0, 39, 0]} material={blueGlowMaterial}>
          <boxGeometry args={[1.2, 22.5, 1.2]} />
        </mesh>

        {/* Horizontal Structural Sky-Rings binding the four shafts */}
        {[34, 42, 48].map((yPos, idx) => (
          <group key={`sky-ring-${idx}`} position={[0, yPos, 0]}>
            <mesh material={darkTitaniumMaterial}>
              <cylinderGeometry args={[3.2, 3.2, 0.7, 8]} />
            </mesh>
            <mesh position={[0, 0, 0]} material={cyanGlowMaterial}>
              <cylinderGeometry args={[3.25, 3.25, 0.15, 8]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ─────────────────────────────────────────────────────────────
          LEVEL 5: MONUMENTAL CROWN, BEACON & TELEMETRY SPIRE (Y: 51 to 68)
      ────────────────────────────────────────────────────────────── */}
      <group name="tower-crown" position={[0, 52, 0]}>
        {/* Crown Podium Platform */}
        <mesh position={[0, 0.6, 0]} material={darkTitaniumMaterial}>
          <cylinderGeometry args={[2.8, 3.4, 1.2, 8]} />
        </mesh>

        {/* Rotating / Faceted Architectural Crown Halo */}
        <group ref={crownRingRef} position={[0, 3.2, 0]}>
          <mesh material={titaniumStructuralMaterial}>
            <torusGeometry args={[3.2, 0.35, 8, 8]} />
          </mesh>
          {/* Cyan crown accent tabs */}
          {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4].map(
            (ang, idx) => (
              <mesh
                key={`crown-tab-${idx}`}
                position={[Math.cos(ang) * 3.2, 0.3, Math.sin(ang) * 3.2]}
                material={cyanGlowMaterial}
              >
                <boxGeometry args={[0.2, 0.8, 0.4]} />
              </mesh>
            )
          )}
        </group>

        {/* Floating Pulsing Energy Beacon Core */}
        <mesh ref={crownBeaconRef} position={[0, 3.2, 0]} material={cyanGlowMaterial}>
          <octahedronGeometry args={[1.3, 0]} />
        </mesh>

        {/* Inner Blue Halo */}
        <mesh position={[0, 3.2, 0]} material={blueGlowMaterial}>
          <icosahedronGeometry args={[0.8, 0]} />
        </mesh>

        {/* Soaring High-Altitude Telemetry Spire Needle */}
        <group name="telemetry-needle" position={[0, 5.0, 0]}>
          {/* Base needle column */}
          <mesh position={[0, 3.5, 0]} material={titaniumStructuralMaterial}>
            <cylinderGeometry args={[0.3, 0.7, 7, 8]} />
          </mesh>
          {/* Spire mid-station collar */}
          <mesh position={[0, 7.2, 0]} material={cyanGlowMaterial}>
            <cylinderGeometry args={[0.55, 0.55, 0.3, 8]} />
          </mesh>
          {/* Upper thin antenna mast */}
          <mesh position={[0, 10.5, 0]} material={titaniumStructuralMaterial}>
            <cylinderGeometry args={[0.08, 0.25, 6.5, 8]} />
          </mesh>
          {/* Amber Apex Warning Beacon Light */}
          <mesh position={[0, 14.0, 0]} material={orangeGlowMaterial}>
            <sphereGeometry args={[0.35, 12, 12]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
