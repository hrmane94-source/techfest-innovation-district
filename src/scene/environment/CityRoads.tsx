import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  roadMaterial,
  titaniumStructuralMaterial,
  cyanGlowMaterial,
  blueGlowMaterial,
  orangeGlowMaterial,
} from '../materials';

// Deterministic traffic pulse configuration
function createTrafficPulses() {
  const count = 48;
  const items = [];

  for (let i = 0; i < count; i++) {
    const routeType = i % 4; // 0: N-S, 1: E-W, 2: Ring, 3: Skyway
    const speed = 6.0 + (i % 5) * 1.5;
    const progress = (i * 0.137) % 1; // Deterministic initial spread
    const color = i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'blue' : 'orange';

    items.push({ routeType, speed, progress, color, index: i });
  }
  return items;
}

const STATIC_TRAFFIC_PULSES = createTrafficPulses();

/**
 * CityRoads — Primary arterial roads, transit rings, elevated skybridges, and moving transit lights
 */
export function CityRoads() {
  const trafficMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Update moving transit pulses along roads & skyways
  useFrame((_, delta) => {
    if (!trafficMeshRef.current) return;

    STATIC_TRAFFIC_PULSES.forEach((pulse) => {
      pulse.progress = (pulse.progress + delta * (pulse.speed / 100)) % 1;

      let x: number;
      let y = 0.3;
      let z: number;
      let rotY: number;

      if (pulse.routeType === 0) {
        // North-South Arterial
        const dir = pulse.index % 2 === 0 ? 1 : -1;
        const laneOffset = dir > 0 ? 1.4 : -1.4;
        z = -65 + pulse.progress * 130 * dir;
        if (dir < 0) z = 65 - pulse.progress * 130;
        x = laneOffset;
        rotY = dir > 0 ? 0 : Math.PI;
      } else if (pulse.routeType === 1) {
        // East-West Arterial
        const dir = pulse.index % 2 === 0 ? 1 : -1;
        const laneOffset = dir > 0 ? 1.4 : -1.4;
        x = -65 + pulse.progress * 130 * dir;
        if (dir < 0) x = 65 - pulse.progress * 130;
        z = laneOffset;
        rotY = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
      } else if (pulse.routeType === 2) {
        // Circular Plaza Ring
        const angle = pulse.progress * Math.PI * 2 + (pulse.index * 0.2);
        const radius = 25.5;
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
        rotY = angle + Math.PI / 2;
      } else {
        // Elevated Skyway
        const angle = ((pulse.index % 4) * Math.PI) / 2 + Math.PI / 4;
        const dist = 14 + pulse.progress * 24;
        x = Math.cos(angle) * dist;
        z = Math.sin(angle) * dist;
        y = 6.2;
        rotY = angle;
      }

      dummy.position.set(x, y, z);
      dummy.rotation.set(0, rotY, 0);
      dummy.scale.set(0.6, 0.2, 1.8);
      dummy.updateMatrix();

      trafficMeshRef.current!.setMatrixAt(pulse.index, dummy.matrix);
    });

    trafficMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group name="city-roads-infrastructure">
      {/* 1. Main North-South Arterial Road */}
      <mesh position={[0, 0.04, 0]} material={roadMaterial} receiveShadow>
        <boxGeometry args={[6.4, 0.04, 150]} />
      </mesh>
      {/* North-South Center Illuminated Marking Ribbon */}
      <mesh position={[0, 0.08, 0]} material={cyanGlowMaterial}>
        <boxGeometry args={[0.2, 0.02, 146]} />
      </mesh>

      {/* 2. Main East-West Arterial Road */}
      <mesh position={[0, 0.04, 0]} material={roadMaterial} receiveShadow>
        <boxGeometry args={[150, 0.04, 6.4]} />
      </mesh>
      {/* East-West Center Illuminated Marking Ribbon */}
      <mesh position={[0, 0.08, 0]} material={cyanGlowMaterial}>
        <boxGeometry args={[146, 0.02, 0.2]} />
      </mesh>

      {/* 3. Circular Ring Road around Central Plaza */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} material={roadMaterial}>
        <ringGeometry args={[23.5, 27.5, 48]} />
      </mesh>
      {/* Inner & Outer Ring Light Ribbons */}
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]} material={blueGlowMaterial}>
        <ringGeometry args={[23.6, 23.9, 48]} />
      </mesh>
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]} material={cyanGlowMaterial}>
        <ringGeometry args={[27.1, 27.4, 48]} />
      </mesh>

      {/* 4. Elevated Skybridges Connecting Central Plaza to Districts */}
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
            key={`skybridge-${idx}`}
            position={[posX, skybridge.height, posZ]}
            rotation={[0, -skybridge.angle + Math.PI / 2, 0]}
          >
            {/* Skybridge Floor Deck */}
            <mesh material={titaniumStructuralMaterial}>
              <boxGeometry args={[3.2, 0.6, skybridge.length]} />
            </mesh>

            {/* Glass / Metallic Balustrades */}
            <mesh position={[-1.5, 0.8, 0]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.08, 0.8, skybridge.length]} />
            </mesh>
            <mesh position={[1.5, 0.8, 0]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.08, 0.8, skybridge.length]} />
            </mesh>

            {/* Glowing Center Guide Ribbon */}
            <mesh position={[0, 0.35, 0]} material={orangeGlowMaterial}>
              <boxGeometry args={[0.2, 0.05, skybridge.length - 1]} />
            </mesh>

            {/* Structural Support Pylons */}
            <mesh position={[0, -skybridge.height / 2, -skybridge.length / 3]} material={titaniumStructuralMaterial}>
              <cylinderGeometry args={[0.5, 0.7, skybridge.height, 8]} />
            </mesh>
            <mesh position={[0, -skybridge.height / 2, skybridge.length / 3]} material={titaniumStructuralMaterial}>
              <cylinderGeometry args={[0.5, 0.7, skybridge.height, 8]} />
            </mesh>
          </group>
        );
      })}

      {/* 5. Instanced Moving Transit Pulses */}
      <instancedMesh
        ref={trafficMeshRef}
        args={[undefined, undefined, 48]}
        material={cyanGlowMaterial}
      >
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
    </group>
  );
}
