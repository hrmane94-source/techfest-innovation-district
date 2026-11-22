import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGraphicsQuality } from '../../context';
import {
  titaniumStructuralMaterial,
  darkTitaniumMaterial,
  metalExoskeletonMaterial,
  brushedAlloyMaterial,
  cyanGlowMaterial,
  whiteGlowMaterial,
  clearGlassMaterial,
} from '../materials';

// District entrance monuments: position [x, z], rotation, label color
const DISTRICT_MONUMENTS: Array<{ pos: [number, number]; rotY: number; color: string; label: string }> = [
  { pos: [0, -18], rotY: 0, color: '#00E5FF', label: 'DIST-A • CENTRAL INNOVATION' },
  { pos: [18, -36], rotY: -0.6, color: '#38BDF8', label: 'DIST-B • ACADEMIC DISTRICT' },
  { pos: [-18, -12], rotY: 0.7, color: '#00E5FF', label: 'DIST-C • ADVANCED RESEARCH' },
  { pos: [34, 12], rotY: 0.5, color: '#F59E0B', label: 'DIST-D • STUDENT LIFE' },
  { pos: [-36, 12], rotY: -0.5, color: '#38BDF8', label: 'DIST-E • KNOWLEDGE HUB' },
  { pos: [6, 42], rotY: 0, color: '#10B981', label: 'DIST-F • RECREATION & LAKE' },
];

// Bicycle parking station locations
const BICYCLE_STATIONS: Array<{ pos: [number, number]; count: number; rotY: number }> = [
  { pos: [-24, 6], count: 6, rotY: 0 }, // Central Library
  { pos: [40, 8], count: 6, rotY: Math.PI / 2 }, // Dining Commons
  { pos: [52, 28], count: 6, rotY: 0 }, // Student Res B
  { pos: [22, -40], count: 6, rotY: -0.6 }, // Academic Quad
];

// Autonomous electric shuttle vehicles configuration
const SHUTTLE_COUNT = 4;
const SHUTTLE_RADIUS = 72; // Operates on outer ring road
const SHUTTLE_SPEED = 0.08; // Radians per second

/**
 * CampusAmenitiesInstanced — Living Campus Environmental Infrastructure:
 * 1. Autonomous Electric Campus Shuttles (4 animated pods cruising the outer ring road)
 * 2. District Identity Monuments & Wayfinding Totems (6 entrance markers)
 * 3. Student Bicycle Parking Stations with parked bikes
 * 4. EV Charging Pods & Campus Wayfinding Totems
 */
export function CampusAmenitiesInstanced() {
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';
  const shuttlesRef = useRef<THREE.Group>(null);

  // Shuttle movement along perimeter ring road
  useFrame(({ clock }) => {
    if (!shuttlesRef.current || !settings.enableSecondaryAnimations) return;
    const time = clock.getElapsedTime();

    shuttlesRef.current.children.forEach((child, i) => {
      const angle = time * SHUTTLE_SPEED + (i * Math.PI * 2) / SHUTTLE_COUNT;
      const x = Math.cos(angle) * SHUTTLE_RADIUS;
      const z = Math.sin(angle) * SHUTTLE_RADIUS;
      const tangentAngle = angle + Math.PI / 2;

      child.position.set(x, 0.55, z);
      child.rotation.set(0, -tangentAngle + Math.PI / 2, 0);
    });
  });

  return (
    <group name="campus-amenities-infrastructure">
      {/* ══════════════════════════════════════════════════════════════
          1. AUTONOMOUS ELECTRIC CAMPUS SHUTTLES (4 Pods)
      ══════════════════════════════════════════════════════════════ */}
      <group ref={shuttlesRef} name="autonomous-campus-shuttles">
        {Array.from({ length: SHUTTLE_COUNT }).map((_, idx) => (
          <group key={`shuttle-pod-${idx}`}>
            {/* Aerodynamic Pod Chassis */}
            <mesh position={[0, 0.45, 0]} material={pearlWhiteMaterialFallback} castShadow={shouldCastShadow}>
              <boxGeometry args={[1.8, 0.9, 3.6]} />
            </mesh>
            {/* Panoramic Wrap-Around Glass Cockpit */}
            <mesh position={[0, 0.65, 0]} material={clearGlassMaterial}>
              <boxGeometry args={[1.75, 0.6, 3.2]} />
            </mesh>
            {/* Lower Chassis / Battery Tray */}
            <mesh position={[0, 0.12, 0]} material={darkTitaniumMaterial}>
              <boxGeometry args={[1.85, 0.25, 3.7]} />
            </mesh>
            {/* Cyan Luminous Autonomous Sensor Stripe */}
            <mesh position={[0, 0.5, 1.82]} material={cyanGlowMaterial}>
              <boxGeometry args={[1.4, 0.08, 0.05]} />
            </mesh>
            <mesh position={[0, 0.5, -1.82]} material={cyanGlowMaterial}>
              <boxGeometry args={[1.4, 0.08, 0.05]} />
            </mesh>
            {/* Rooftop Autonomous LiDAR Puck */}
            <mesh position={[0, 1.05, 0.8]} material={darkTitaniumMaterial}>
              <cylinderGeometry args={[0.15, 0.15, 0.18, 12]} />
            </mesh>
            <mesh position={[0, 1.15, 0.8]} material={cyanGlowMaterial}>
              <cylinderGeometry args={[0.16, 0.16, 0.04, 12]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ══════════════════════════════════════════════════════════════
          2. DISTRICT IDENTITY MONUMENTS & TOTEMS (6 Markers)
      ══════════════════════════════════════════════════════════════ */}
      <group name="district-identity-monuments">
        {DISTRICT_MONUMENTS.map((mon, idx) => (
          <group
            key={`district-monument-${idx}`}
            position={[mon.pos[0], 0.5, mon.pos[1]]}
            rotation={[0, mon.rotY, 0]}
          >
            {/* Heavy Base Plinth */}
            <mesh position={[0, 0.25, 0]} material={darkTitaniumMaterial} receiveShadow>
              <boxGeometry args={[1.4, 0.5, 0.8]} />
            </mesh>
            {/* Obelisk Body */}
            <mesh position={[0, 1.6, 0]} material={titaniumStructuralMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[0.9, 2.2, 0.35]} />
            </mesh>
            {/* Illuminated District Color Edge Strip */}
            <mesh position={[0, 1.6, 0.19]}>
              <boxGeometry args={[0.8, 1.9, 0.02]} />
              <meshBasicMaterial color={mon.color} />
            </mesh>
            {/* Status Beacon Top */}
            <mesh position={[0, 2.8, 0]} material={whiteGlowMaterial}>
              <boxGeometry args={[0.92, 0.08, 0.38]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ══════════════════════════════════════════════════════════════
          3. BICYCLE PARKING STATIONS WITH PARKED BIKES
      ══════════════════════════════════════════════════════════════ */}
      <group name="bicycle-parking-stations">
        {BICYCLE_STATIONS.map((station, sIdx) => (
          <group
            key={`bike-station-${sIdx}`}
            position={[station.pos[0], 0.5, station.pos[1]]}
            rotation={[0, station.rotY, 0]}
          >
            {/* Station Concrete Pad */}
            <mesh position={[0, 0.05, 0]} material={darkTitaniumMaterial} receiveShadow>
              <boxGeometry args={[station.count * 0.9 + 0.8, 0.1, 2.2]} />
            </mesh>
            <mesh position={[0, 0.11, 0]} material={cyanGlowMaterial}>
              <boxGeometry args={[station.count * 0.9 + 0.6, 0.01, 0.06]} />
            </mesh>

            {/* Inverted-U Bicycle Racks & Bikes */}
            {Array.from({ length: station.count }).map((_, bIdx) => {
              const rx = (bIdx - (station.count - 1) / 2) * 0.9;
              return (
                <group key={`bike-rack-${sIdx}-${bIdx}`} position={[rx, 0.1, 0]}>
                  {/* Metal Rack Arch */}
                  <mesh position={[0, 0.45, 0]} material={brushedAlloyMaterial}>
                    <boxGeometry args={[0.06, 0.8, 0.9]} />
                  </mesh>
                  {/* Stylized Parked Bicycle (Frame + Wheels) */}
                  <mesh position={[0.12, 0.35, 0]} material={metalExoskeletonMaterial}>
                    <boxGeometry args={[0.04, 0.45, 1.4]} />
                  </mesh>
                  <mesh position={[0.12, 0.22, -0.55]} material={darkTitaniumMaterial}>
                    <cylinderGeometry args={[0.22, 0.22, 0.04, 12]} />
                  </mesh>
                  <mesh position={[0.12, 0.22, 0.55]} material={darkTitaniumMaterial}>
                    <cylinderGeometry args={[0.22, 0.22, 0.04, 12]} />
                  </mesh>
                </group>
              );
            })}
          </group>
        ))}
      </group>
    </group>
  );
}

// Fallback pearl material for self-contained shuttle chassis
const pearlWhiteMaterialFallback = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#F8FAFC'),
  roughness: 0.28,
  metalness: 0.25,
});

export default CampusAmenitiesInstanced;
