import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  roadMaterial,
  titaniumStructuralMaterial,
  metalExoskeletonMaterial,
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
 * CityRoads — Primary arterial roads, transit rings, elevated skybridges, and moving transit lights (Refined Milestone 1.1)
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
        const laneOffset = dir > 0 ? 1.5 : -1.5;
        z = -65 + pulse.progress * 130 * dir;
        if (dir < 0) z = 65 - pulse.progress * 130;
        x = laneOffset;
        rotY = dir > 0 ? 0 : Math.PI;
      } else if (pulse.routeType === 1) {
        // East-West Arterial
        const dir = pulse.index % 2 === 0 ? 1 : -1;
        const laneOffset = dir > 0 ? 1.5 : -1.5;
        x = -65 + pulse.progress * 130 * dir;
        if (dir < 0) x = 65 - pulse.progress * 130;
        z = laneOffset;
        rotY = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
      } else if (pulse.routeType === 2) {
        // Circular Plaza Ring
        const angle = pulse.progress * Math.PI * 2 + pulse.index * 0.2;
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
        y = 6.3;
        rotY = angle;
      }

      dummy.position.set(x, y, z);
      dummy.rotation.set(0, rotY, 0);
      dummy.scale.set(0.65, 0.22, 1.9);
      dummy.updateMatrix();

      trafficMeshRef.current!.setMatrixAt(pulse.index, dummy.matrix);
    });

    trafficMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group name="city-roads-infrastructure">
      {/* 1. Main North-South Arterial Road */}
      <mesh position={[0, 0.04, 0]} material={roadMaterial} receiveShadow>
        <boxGeometry args={[6.6, 0.04, 150]} />
      </mesh>
      {/* N-S Center Illuminated Marking Ribbon */}
      <mesh position={[0, 0.08, 0]} material={cyanGlowMaterial}>
        <boxGeometry args={[0.22, 0.02, 146]} />
      </mesh>
      {/* N-S Outer Lane Boundary Markers */}
      <mesh position={[-3.1, 0.07, 0]} material={blueGlowMaterial}>
        <boxGeometry args={[0.08, 0.02, 146]} />
      </mesh>
      <mesh position={[3.1, 0.07, 0]} material={blueGlowMaterial}>
        <boxGeometry args={[0.08, 0.02, 146]} />
      </mesh>

      {/* 2. Main East-West Arterial Road */}
      <mesh position={[0, 0.04, 0]} material={roadMaterial} receiveShadow>
        <boxGeometry args={[150, 0.04, 6.6]} />
      </mesh>
      {/* E-W Center Illuminated Marking Ribbon */}
      <mesh position={[0, 0.08, 0]} material={cyanGlowMaterial}>
        <boxGeometry args={[146, 0.02, 0.22]} />
      </mesh>
      {/* E-W Outer Lane Boundary Markers */}
      <mesh position={[0, 0.07, -3.1]} material={blueGlowMaterial}>
        <boxGeometry args={[146, 0.02, 0.08]} />
      </mesh>
      <mesh position={[0, 0.07, 3.1]} material={blueGlowMaterial}>
        <boxGeometry args={[146, 0.02, 0.08]} />
      </mesh>

      {/* 3. Circular Ring Road around Central Plaza */}
      <mesh
        position={[0, 0.06, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={roadMaterial}
      >
        <ringGeometry args={[23.5, 27.5, 48]} />
      </mesh>
      {/* Inner & Outer Ring Light Ribbons */}
      <mesh
        position={[0, 0.09, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={blueGlowMaterial}
      >
        <ringGeometry args={[23.55, 23.85, 48]} />
      </mesh>
      <mesh
        position={[0, 0.09, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={cyanGlowMaterial}
      >
        <ringGeometry args={[27.15, 27.45, 48]} />
      </mesh>

      {/* 4. Elevated Skybridges with Structural Under-Trusses */}
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
            <mesh material={titaniumStructuralMaterial}>
              <boxGeometry args={[3.4, 0.65, skybridge.length]} />
            </mesh>
            {/* Under-Deck Longitudinal Truss Spine */}
            <mesh position={[0, -0.6, 0]} material={metalExoskeletonMaterial}>
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
                <mesh material={titaniumStructuralMaterial}>
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
