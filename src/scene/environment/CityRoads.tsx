import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGraphicsQuality } from '../../context';
import {
  roadMaterial,
  roadMarkingWhiteMaterial,
  roadMarkingYellowMaterial,
  crosswalkMarkingMaterial,
  titaniumStructuralMaterial,
  metalExoskeletonMaterial,
  brushedAlloyMaterial,
  cyanGlowMaterial,
  blueGlowMaterial,
  orangeGlowMaterial,
  whiteGlowMaterial,
} from '../materials';

// Deterministic traffic pulse configuration across expanded campus network
function createTrafficPulses() {
  const count = 56;
  const items = [];

  for (let i = 0; i < count; i++) {
    const routeType = i % 5; // 0: N-S, 1: E-W, 2: Inner Ring, 3: Skyway, 4: Outer Perimeter Ring
    const speed = 6.0 + (i % 5) * 1.5;
    const progress = (i * 0.137) % 1; // Deterministic initial spread
    const color = i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'blue' : 'orange';

    items.push({ routeType, speed, progress, color, index: i });
  }
  return items;
}

const STATIC_TRAFFIC_PULSES = createTrafficPulses();

// Symmetrically placed architectural streetlights along extended arterial roads and rings
function createStreetlightPositions() {
  const positions: Array<{ pos: [number, number, number]; rotY: number }> = [];

  // Extended N-S Avenue Streetlights (out to 105m)
  [-100, -85, -70, -55, -40, -25, 25, 40, 55, 70, 85, 100].forEach((z) => {
    positions.push({ pos: [-4.2, 0, z], rotY: Math.PI / 2 });
    positions.push({ pos: [4.2, 0, z], rotY: -Math.PI / 2 });
  });

  // Extended E-W Avenue Streetlights (out to 105m)
  [-100, -85, -70, -55, -40, -25, 25, 40, 55, 70, 85, 100].forEach((x) => {
    positions.push({ pos: [x, 0, -4.2], rotY: 0 });
    positions.push({ pos: [x, 0, 4.2], rotY: Math.PI });
  });

  // Circular Inner Plaza Ring Road Streetlights (8 units)
  for (let i = 0; i < 8; i++) {
    const ang = (i * Math.PI * 2) / 8 + Math.PI / 8;
    const rad = 28.5;
    positions.push({
      pos: [Math.cos(ang) * rad, 0, Math.sin(ang) * rad],
      rotY: -ang + Math.PI / 2,
    });
  }

  // Outer Campus Perimeter Ring Road Streetlights (12 units)
  for (let i = 0; i < 12; i++) {
    const ang = (i * Math.PI * 2) / 12 + Math.PI / 12;
    const rad = 75.5;
    positions.push({
      pos: [Math.cos(ang) * rad, 0, Math.sin(ang) * rad],
      rotY: -ang + Math.PI / 2,
    });
  }

  return positions;
}

const STREETLIGHT_POSITIONS = createStreetlightPositions();

/**
 * High-performance batched streetlights using InstancedMesh (2 draw calls)
 */
function StreetlightsInstanced({ castShadow }: { castShadow: boolean }) {
  const mastRef = useRef<THREE.InstancedMesh>(null);
  const headRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!mastRef.current || !headRef.current) return;
    const dummy = new THREE.Object3D();

    STREETLIGHT_POSITIONS.forEach((light, i) => {
      // Mast
      dummy.position.set(light.pos[0], light.pos[1] + 1.8, light.pos[2]);
      dummy.rotation.set(0, light.rotY, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mastRef.current!.setMatrixAt(i, dummy.matrix);

      // Glowing Head
      const armOffset = 0.55;
      const headX = light.pos[0] + Math.sin(light.rotY) * armOffset;
      const headZ = light.pos[2] + Math.cos(light.rotY) * armOffset;
      dummy.position.set(headX, light.pos[1] + 3.65, headZ);
      dummy.rotation.set(0, light.rotY, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      headRef.current!.setMatrixAt(i, dummy.matrix);
    });

    mastRef.current.instanceMatrix.needsUpdate = true;
    headRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group name="instanced-streetlights-network">
      <instancedMesh
        ref={mastRef}
        args={[undefined, undefined, STREETLIGHT_POSITIONS.length]}
        material={brushedAlloyMaterial}
        castShadow={castShadow}
      >
        <cylinderGeometry args={[0.06, 0.1, 3.6, 6]} />
      </instancedMesh>
      <instancedMesh
        ref={headRef}
        args={[undefined, undefined, STREETLIGHT_POSITIONS.length]}
        material={whiteGlowMaterial}
      >
        <boxGeometry args={[0.35, 0.08, 0.16]} />
      </instancedMesh>
    </group>
  );
}

/**
 * CityRoads — Primary arterial roads, transit rings, outer perimeter loop, batched streetlights, and transit pulses
 */
export function CityRoads() {
  const { settings } = useGraphicsQuality();
  const trafficMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const activeTrafficCount = Math.min(settings.trafficCount, STATIC_TRAFFIC_PULSES.length);

  // Update moving transit pulses along roads & skyways
  useFrame((_, delta) => {
    if (!trafficMeshRef.current || !settings.enableSecondaryAnimations) return;

    for (let i = 0; i < activeTrafficCount; i++) {
      const pulse = STATIC_TRAFFIC_PULSES[i];
      pulse.progress = (pulse.progress + delta * (pulse.speed / 100)) % 1;

      let x: number;
      let y = 0.3;
      let z: number;
      let rotY: number;

      if (pulse.routeType === 0) {
        // Extended North-South Arterial
        const dir = pulse.index % 2 === 0 ? 1 : -1;
        const laneOffset = dir > 0 ? 1.5 : -1.5;
        z = -105 + pulse.progress * 210 * dir;
        if (dir < 0) z = 105 - pulse.progress * 210;
        x = laneOffset;
        rotY = dir > 0 ? 0 : Math.PI;
      } else if (pulse.routeType === 1) {
        // Extended East-West Arterial
        const dir = pulse.index % 2 === 0 ? 1 : -1;
        const laneOffset = dir > 0 ? 1.5 : -1.5;
        x = -105 + pulse.progress * 210 * dir;
        if (dir < 0) x = 105 - pulse.progress * 210;
        z = laneOffset;
        rotY = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
      } else if (pulse.routeType === 2) {
        // Circular Inner Plaza Ring
        const angle = pulse.progress * Math.PI * 2 + pulse.index * 0.2;
        const radius = 25.5;
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
        rotY = angle + Math.PI / 2;
      } else if (pulse.routeType === 3) {
        // Elevated Skyway
        const angle = ((pulse.index % 4) * Math.PI) / 2 + Math.PI / 4;
        const dist = 14 + pulse.progress * 24;
        x = Math.cos(angle) * dist;
        z = Math.sin(angle) * dist;
        y = 6.3;
        rotY = angle;
      } else {
        // Outer Campus Perimeter Ring Road
        const angle = pulse.progress * Math.PI * 2 + pulse.index * 0.15;
        const radius = 72;
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
        rotY = angle + Math.PI / 2;
      }

      dummy.position.set(x, y, z);
      dummy.rotation.set(0, rotY, 0);
      dummy.scale.set(0.65, 0.22, 1.9);
      dummy.updateMatrix();

      trafficMeshRef.current!.setMatrixAt(pulse.index, dummy.matrix);
    }

    trafficMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  const shouldCastShadow = settings.shadowCasting === 'all';

  return (
    <group name="city-roads-infrastructure">
      {/* ── 1. MAIN NORTH-SOUTH ARTERIAL ROAD (240m) ── */}
      <mesh position={[0, 0.04, 0]} material={roadMaterial} receiveShadow={settings.shadows}>
        <boxGeometry args={[6.6, 0.04, 240]} />
      </mesh>
      {/* N-S Center Double Yellow Marking Ribbon */}
      <mesh position={[-0.08, 0.065, 0]} material={roadMarkingYellowMaterial}>
        <boxGeometry args={[0.07, 0.01, 236]} />
      </mesh>
      <mesh position={[0.08, 0.065, 0]} material={roadMarkingYellowMaterial}>
        <boxGeometry args={[0.07, 0.01, 236]} />
      </mesh>
      {/* N-S Outer Lane Boundary Paint Lines */}
      <mesh position={[-3.0, 0.065, 0]} material={roadMarkingWhiteMaterial}>
        <boxGeometry args={[0.08, 0.01, 236]} />
      </mesh>
      <mesh position={[3.0, 0.065, 0]} material={roadMarkingWhiteMaterial}>
        <boxGeometry args={[0.08, 0.01, 236]} />
      </mesh>

      {/* ── 2. MAIN EAST-WEST ARTERIAL ROAD (240m) ── */}
      <mesh position={[0, 0.04, 0]} material={roadMaterial} receiveShadow={settings.shadows}>
        <boxGeometry args={[240, 0.04, 6.6]} />
      </mesh>
      {/* E-W Center Double Yellow Marking Ribbon */}
      <mesh position={[0, 0.065, -0.08]} material={roadMarkingYellowMaterial}>
        <boxGeometry args={[236, 0.01, 0.07]} />
      </mesh>
      <mesh position={[0, 0.065, 0.08]} material={roadMarkingYellowMaterial}>
        <boxGeometry args={[236, 0.01, 0.07]} />
      </mesh>
      {/* E-W Outer Lane Boundary Paint Lines */}
      <mesh position={[0, 0.065, -3.0]} material={roadMarkingWhiteMaterial}>
        <boxGeometry args={[236, 0.01, 0.08]} />
      </mesh>
      <mesh position={[0, 0.065, 3.0]} material={roadMarkingWhiteMaterial}>
        <boxGeometry args={[236, 0.01, 0.08]} />
      </mesh>

      {/* ── 3. CIRCULAR TRANSIT RING ROAD AROUND CENTRAL PLAZA ── */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} material={roadMaterial} receiveShadow={settings.shadows}>
        <ringGeometry args={[23.5, 27.5, 48]} />
      </mesh>
      {/* Concentric Painted Lane Divider */}
      <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]} material={roadMarkingWhiteMaterial}>
        <ringGeometry args={[25.4, 25.56, 48]} />
      </mesh>

      {/* ── 4. OUTER CAMPUS PERIMETER RING ROAD (R = 72m, connects all 6 districts) ── */}
      <mesh position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]} material={roadMaterial} receiveShadow={settings.shadows}>
        <ringGeometry args={[69.0, 75.0, 64]} />
      </mesh>
      {/* Perimeter Ring Center Painted Divider */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} material={roadMarkingWhiteMaterial}>
        <ringGeometry args={[71.9, 72.1, 64]} />
      </mesh>
      {/* Perimeter Ring Outer Curb Trims */}
      <mesh position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]} material={roadMarkingWhiteMaterial}>
        <ringGeometry args={[69.1, 69.25, 64]} />
      </mesh>
      <mesh position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]} material={roadMarkingWhiteMaterial}>
        <ringGeometry args={[74.75, 74.9, 64]} />
      </mesh>

      {/* ── 5. PEDESTRIAN ZEBRA CROSSWALKS (High-Fidelity Thermoplastic Paint) ── */}
      {[-38, 38].map((crossZ, idx) => (
        <group key={`crosswalk-ns-${idx}`} position={[0, 0.07, crossZ]}>
          {[-2.2, -1.4, -0.6, 0.2, 1.0, 1.8].map((barX, bIdx) => (
            <mesh key={`cw-bar-ns-${bIdx}`} position={[barX, 0, 0]} material={crosswalkMarkingMaterial}>
              <boxGeometry args={[0.42, 0.01, 2.8]} />
            </mesh>
          ))}
        </group>
      ))}
      {[-38, 38].map((crossX, idx) => (
        <group key={`crosswalk-ew-${idx}`} position={[crossX, 0.07, 0]}>
          {[-2.2, -1.4, -0.6, 0.2, 1.0, 1.8].map((barZ, bIdx) => (
            <mesh key={`cw-bar-ew-${bIdx}`} position={[0, 0, barZ]} material={crosswalkMarkingMaterial}>
              <boxGeometry args={[2.8, 0.01, 0.42]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── 6. FOUR CEREMONIAL DISTRICT PORTAL GATEWAYS ── */}
      {[
        { pos: [-16, 0, -16] as const, rot: Math.PI / 4, color: cyanGlowMaterial },
        { pos: [16, 0, -16] as const, rot: -Math.PI / 4, color: orangeGlowMaterial },
        { pos: [-16, 0, 16] as const, rot: (3 * Math.PI) / 4, color: blueGlowMaterial },
        { pos: [16, 0, 16] as const, rot: -(3 * Math.PI) / 4, color: cyanGlowMaterial },
      ].map((gateway, idx) => (
        <group key={`district-gateway-${idx}`} position={[gateway.pos[0], 0, gateway.pos[1]]} rotation={[0, gateway.rot, 0]}>
          {/* Twin Architectural Portal Pylons */}
          <mesh position={[-2.8, 2.5, 0]} material={titaniumStructuralMaterial} castShadow={shouldCastShadow}>
            <boxGeometry args={[0.5, 5.0, 0.5]} />
          </mesh>
          <mesh position={[2.8, 2.5, 0]} material={titaniumStructuralMaterial} castShadow={shouldCastShadow}>
            <boxGeometry args={[0.5, 5.0, 0.5]} />
          </mesh>
          {/* Overhead Horizontal Beam */}
          <mesh position={[0, 4.8, 0]} material={brushedAlloyMaterial} castShadow={shouldCastShadow}>
            <boxGeometry args={[6.1, 0.4, 0.6]} />
          </mesh>
          {/* Inset Glowing Gateway Signage Line */}
          <mesh position={[0, 4.8, 0.32]} material={gateway.color}>
            <boxGeometry args={[5.2, 0.12, 0.04]} />
          </mesh>
        </group>
      ))}

      {/* ── 7. BATCHED INSTANCED STREETLIGHTS (2 draw calls total) ── */}
      <StreetlightsInstanced castShadow={shouldCastShadow} />

      {/* ── 8. ELEVATED SKYBRIDGES WITH STRUCTURAL UNDER-TRUSSES ── */}
      {[
        { angle: Math.PI / 4, length: 22, height: 6 }, // AI District
        { angle: (3 * Math.PI) / 4, length: 22, height: 6 }, // Aerospace District
        { angle: (5 * Math.PI) / 4, length: 22, height: 6 }, // Cybersecurity District
        { angle: (7 * Math.PI) / 4, length: 22, height: 6 }, // Robotics District
      ].map((skybridge, idx) => {
        const midDist = 14 + skybridge.length / 2;
        const posX = Math.cos(skybridge.angle) * midDist;
        const posZ = Math.sin(skybridge.angle) * midDist;

        return (
          <group
            key={`refined-skybridge-${idx}`}
            position={[posX, skybridge.height, posZ]}
            rotation={[0, -skybridge.angle + Math.PI / 2, 0]}
          >
            {/* Skybridge Floor Deck */}
            <mesh material={titaniumStructuralMaterial} castShadow={shouldCastShadow} receiveShadow={settings.shadows}>
              <boxGeometry args={[3.4, 0.65, skybridge.length]} />
            </mesh>
            {/* Under-Deck Longitudinal Truss Spine */}
            <mesh position={[0, -0.6, 0]} material={metalExoskeletonMaterial} castShadow={shouldCastShadow}>
              <boxGeometry args={[1.4, 0.6, skybridge.length]} />
            </mesh>

            {/* Balustrades with Inset Cyan Handrail Glow */}
            <mesh position={[-1.6, 0.85, 0]} material={metalExoskeletonMaterial}>
              <boxGeometry args={[0.1, 0.9, skybridge.length]} />
            </mesh>
            <mesh position={[-1.6, 1.32, 0]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.08, 0.06, skybridge.length]} />
            </mesh>
            <mesh position={[1.6, 0.85, 0]} material={metalExoskeletonMaterial}>
              <boxGeometry args={[0.1, 0.9, skybridge.length]} />
            </mesh>
            <mesh position={[1.6, 1.32, 0]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.08, 0.06, skybridge.length]} />
            </mesh>

            {/* Center Orange Navigation Ribbon */}
            <mesh position={[0, 0.38, 0]} material={orangeGlowMaterial}>
              <boxGeometry args={[0.22, 0.05, skybridge.length - 1]} />
            </mesh>

            {/* Heavy Structural Support Pylons with Foundation Collars */}
            {[-skybridge.length / 3, skybridge.length / 3].map((zPos, pIdx) => (
              <group key={`pylon-${pIdx}`} position={[0, -skybridge.height / 2, zPos]}>
                <mesh material={titaniumStructuralMaterial} castShadow={shouldCastShadow}>
                  <cylinderGeometry args={[0.55, 0.75, skybridge.height, 8]} />
                </mesh>
                {/* Pylon Illuminated Collar */}
                <mesh position={[0, 0.5, 0]} material={cyanGlowMaterial}>
                  <cylinderGeometry args={[0.8, 0.8, 0.15, 8]} />
                </mesh>
              </group>
            ))}
          </group>
        );
      })}

      {/* ── 9. INSTANCED MOVING TRANSIT PULSES ── */}
      <instancedMesh
        ref={trafficMeshRef}
        args={[undefined, undefined, activeTrafficCount]}
        material={cyanGlowMaterial}
      >
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
    </group>
  );
}

export default CityRoads;
