import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGraphicsQuality } from '../../context';

// University student apparel color palette
const STUDENT_PALETTE = [
  new THREE.Color('#2563eb'), // Royal Techfest Blue
  new THREE.Color('#38bdf8'), // Electric Cyan
  new THREE.Color('#1e293b'), // Dark Slate / Charcoal
  new THREE.Color('#64748b'), // Heather Grey
  new THREE.Color('#f8fafc'), // Off-white / Cream Hoodie
  new THREE.Color('#d97706'), // Warm Amber
  new THREE.Color('#059669'), // Emerald Green
  new THREE.Color('#b91c1c'), // Crimson
  new THREE.Color('#475569'), // Muted Denim
  new THREE.Color('#7c3aed'), // Violet / Indigo
];

interface PedestrianDef {
  x: number;
  y: number;
  z: number;
  rotY: number;
  type: 'walking' | 'standing' | 'seated';
  speed?: number;
  pathLength?: number;
  pathAxis?: 'x' | 'z' | 'diag';
  colorIdx: number;
}

function generateCampusPedestrians(): PedestrianDef[] {
  const list: PedestrianDef[] = [];
  let colorCounter = 0;
  const nextColor = () => {
    colorCounter = (colorCounter + 1) % STUDENT_PALETTE.length;
    return colorCounter;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. WALKING STUDENTS ALONG CONCOURSES & AVENUES (52 figures)
  // ─────────────────────────────────────────────────────────────────────────
  // Main Central Plaza Axial Walkways
  for (let z = -28; z <= 28; z += 5) {
    if (Math.abs(z) > 4) {
      list.push({
        x: -2.2 + ((z * 13) % 1.2),
        y: 0.9,
        z,
        rotY: z > 0 ? Math.PI : 0,
        type: 'walking',
        speed: 1.8 + (Math.abs(z) % 3) * 0.4,
        pathLength: 8,
        pathAxis: 'z',
        colorIdx: nextColor(),
      });
      list.push({
        x: 2.2 - ((z * 17) % 1.2),
        y: 0.9,
        z,
        rotY: z > 0 ? 0 : Math.PI,
        type: 'walking',
        speed: 1.7 + (Math.abs(z) % 2) * 0.5,
        pathLength: 8,
        pathAxis: 'z',
        colorIdx: nextColor(),
      });
    }
  }

  // East-West Arterial Walkways
  for (let x = -36; x <= 36; x += 6) {
    if (Math.abs(x) > 6) {
      list.push({
        x,
        y: 0.9,
        z: -2.2 + ((x * 7) % 1.2),
        rotY: x > 0 ? -Math.PI / 2 : Math.PI / 2,
        type: 'walking',
        speed: 1.9 + (Math.abs(x) % 3) * 0.3,
        pathLength: 9,
        pathAxis: 'x',
        colorIdx: nextColor(),
      });
      list.push({
        x,
        y: 0.9,
        z: 2.2 - ((x * 11) % 1.2),
        rotY: x > 0 ? Math.PI / 2 : -Math.PI / 2,
        type: 'walking',
        speed: 1.6 + (Math.abs(x) % 2) * 0.4,
        pathLength: 9,
        pathAxis: 'x',
        colorIdx: nextColor(),
      });
    }
  }

  // Academic District Concourse (North-East)
  for (let step = 0; step < 6; step++) {
    list.push({
      x: 18 + step * 3.5,
      y: 0.9,
      z: -38 - step * 3.0,
      rotY: -0.8,
      type: 'walking',
      speed: 1.6,
      pathLength: 7,
      pathAxis: 'diag',
      colorIdx: nextColor(),
    });
  }

  // Student Life Concourse (East)
  for (let step = 0; step < 6; step++) {
    list.push({
      x: 32 + step * 3.8,
      y: 0.9,
      z: 14 + (step % 2) * 2.5,
      rotY: Math.PI / 2,
      type: 'walking',
      speed: 1.7,
      pathLength: 8,
      pathAxis: 'x',
      colorIdx: nextColor(),
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. CONVERSATION GROUPS & STANDING STUDENTS (38 figures)
  // ─────────────────────────────────────────────────────────────────────────
  // Central Plaza Conversation Hubs
  const plazaHubs = [
    [-8, 1.0, -8],
    [8, 1.0, -8],
    [-7, 1.0, 8],
    [0, 1.0, -18],
    [0, 1.0, 18],
    [-18, 0.9, 0],
    [18, 0.9, 0],
  ];

  plazaHubs.forEach(([hx, hy, hz], hIdx) => {
    const groupSize = 2 + (hIdx % 3);
    for (let g = 0; g < groupSize; g++) {
      const ang = (g * Math.PI * 2) / groupSize;
      list.push({
        x: hx + Math.cos(ang) * 0.85,
        y: hy,
        z: hz + Math.sin(ang) * 0.85,
        rotY: ang + Math.PI,
        type: 'standing',
        colorIdx: nextColor(),
      });
    }
  });

  // Academic Quadrangle Conversation Clusters
  [
    [26, 0.9, -46],
    [32, 0.9, -48],
  ].forEach(([qx, qy, qz]) => {
    for (let g = 0; g < 3; g++) {
      const ang = (g * Math.PI * 2) / 3;
      list.push({
        x: qx + Math.cos(ang) * 0.8,
        y: qy,
        z: qz + Math.sin(ang) * 0.8,
        rotY: ang + Math.PI,
        type: 'standing',
        colorIdx: nextColor(),
      });
    }
  });

  // Student Life Dining Patio Clusters
  [
    [48, 0.9, 14],
    [52, 0.9, 22],
  ].forEach(([sx, sy, sz]) => {
    for (let g = 0; g < 3; g++) {
      const ang = (g * Math.PI * 2) / 3;
      list.push({
        x: sx + Math.cos(ang) * 0.75,
        y: sy,
        z: sz + Math.sin(ang) * 0.75,
        rotY: ang + Math.PI,
        type: 'standing',
        colorIdx: nextColor(),
      });
    }
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SEATED STUDENTS (STUDYING & RELAXING) (42 figures)
  // ─────────────────────────────────────────────────────────────────────────
  // Reflecting Pool Perimeter Benches
  for (let b = 0; b < 8; b++) {
    const ang = (b * Math.PI * 2) / 8 + Math.PI / 8;
    const rad = 16.4;
    list.push({
      x: Math.cos(ang) * rad,
      y: 1.45,
      z: Math.sin(ang) * rad,
      rotY: ang + Math.PI,
      type: 'seated',
      colorIdx: nextColor(),
    });
  }

  // Student Amphitheater Tiers
  for (let tier = 0; tier < 3; tier++) {
    const radius = 5.2 + tier * 1.4;
    const count = 4 + tier * 2;
    for (let a = 0; a < count; a++) {
      const angle = (a / (count - 1)) * (Math.PI * 0.7) - Math.PI * 0.35;
      // Transform into amphitheater local coordinates at [11.5, 1.0, 11.5]
      const lx = Math.cos(angle) * radius;
      const lz = Math.sin(angle) * radius;
      // Amphitheater rotation is -Math.PI / 4
      const rx = lx * Math.cos(-Math.PI / 4) - lz * Math.sin(-Math.PI / 4);
      const rz = lx * Math.sin(-Math.PI / 4) + lz * Math.cos(-Math.PI / 4);

      list.push({
        x: 11.5 + rx,
        y: 1.15 + tier * 0.28,
        z: 11.5 + rz,
        rotY: angle + Math.PI / 4,
        type: 'seated',
        colorIdx: nextColor(),
      });
    }
  }

  // Central Library Reading Terrace Loungers & Pergola Pods
  [
    [-24, 0.9, 4],
    [-24, 0.9, -2],
    [-30, 0.9, 6],
    [-46, 0.9, 18],
    [-48, 0.9, 20],
  ].forEach(([lx, ly, lz], idx) => {
    list.push({
      x: lx,
      y: ly,
      z: lz,
      rotY: idx % 2 === 0 ? 0.3 : -0.3,
      type: 'seated',
      colorIdx: nextColor(),
    });
  });

  // Lakeside Promenade Benches & Pier
  [
    [-18, 0.5, 62],
    [-10, 0.5, 62],
    [-2, 0.5, 62],
    [6, 0.5, 62],
    [-6, 0.5, 72],
  ].forEach(([kx, ky, kz]) => {
    list.push({
      x: kx,
      y: ky + 0.1,
      z: kz,
      rotY: 0,
      type: 'seated',
      colorIdx: nextColor(),
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 4. RESEARCHERS & EXHIBIT VISITORS (30 figures)
  // ─────────────────────────────────────────────────────────────────────────
  // NASA Mars 2020 Rover Viewing Area
  [
    [21, 0.9, -13],
    [27, 0.9, -13],
    [24, 0.9, -5],
    [28, 0.9, -8],
  ].forEach(([rx, ry, rz], rIdx) => {
    list.push({
      x: rx,
      y: ry,
      z: rz,
      rotY: -0.4 + rIdx * 0.3,
      type: 'standing',
      colorIdx: nextColor(),
    });
  });

  // NASA James Webb Space Telescope Viewing Pavilion
  [
    [-18, 0.9, 11],
    [-24, 0.9, 11],
    [-21, 0.9, 17],
    [-25, 0.9, 15],
  ].forEach(([jx, jy, jz], jIdx) => {
    list.push({
      x: jx,
      y: jy,
      z: jz,
      rotY: 0.5 + jIdx * 0.3,
      type: 'standing',
      colorIdx: nextColor(),
    });
  });

  // NASA 70M Deep Space Network Telemetry Station
  [
    [-28, 0.9, 24],
    [-32, 0.9, 22],
    [-25, 0.9, 28],
  ].forEach(([dx, dy, dz], dIdx) => {
    list.push({
      x: dx,
      y: dy,
      z: dz,
      rotY: -0.6 + dIdx * 0.4,
      type: 'standing',
      colorIdx: nextColor(),
    });
  });

  // AI & Computational Sciences Lab Entrance
  [
    [-22, 0.9, -18],
    [-20, 0.9, -16],
    [-26, 0.9, -16],
  ].forEach(([ax, ay, az]) => {
    list.push({
      x: ax,
      y: ay,
      z: az,
      rotY: 0.8,
      type: 'standing',
      colorIdx: nextColor(),
    });
  });

  // Cybersecurity Defense Matrix Entrance
  [
    [22, 0.9, 20],
    [26, 0.9, 20],
    [24, 0.9, 26],
  ].forEach(([cx, cy, cz]) => {
    list.push({
      x: cx,
      y: cy,
      z: cz,
      rotY: -0.7,
      type: 'standing',
      colorIdx: nextColor(),
    });
  });

  // Innovation Exhibition Pavilion Demo Walkers
  [
    [-4, 0.9, -29],
    [-1, 0.9, -29],
    [2, 0.9, -29],
    [5, 0.9, -29],
  ].forEach(([ex, ey, ez], eIdx) => {
    list.push({
      x: ex,
      y: ey,
      z: ez,
      rotY: eIdx % 2 === 0 ? 0.2 : -0.2,
      type: 'standing',
      colorIdx: nextColor(),
    });
  });

  return list;
}

const CAMPUS_PEDESTRIANS = generateCampusPedestrians();

/**
 * CampusPedestriansInstanced — Ultra-High-Performance Living University Population
 * Batched via 2 InstancedMeshes (Body + Head/Backpack) for 160+ people in 2 draw calls.
 */
export function CampusPedestriansInstanced() {
  const { settings } = useGraphicsQuality();
  const bodyRef = useRef<THREE.InstancedMesh>(null);
  const headRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Shared geometry instances
  const bodyGeo = useMemo(() => new THREE.BoxGeometry(0.32, 1.15, 0.22), []);
  const headGeo = useMemo(() => new THREE.SphereGeometry(0.14, 8, 8), []);

  // Base materials
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 0.72,
        metalness: 0.12,
      }),
    []
  );

  const headMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#CBD5E1'),
        roughness: 0.45,
        metalness: 0.45,
      }),
    []
  );

  // Initialize instances, positions, and per-person colors
  useEffect(() => {
    if (!bodyRef.current || !headRef.current) return;

    CAMPUS_PEDESTRIANS.forEach((person, i) => {
      // Body setup
      const bodyY = person.type === 'seated' ? person.y + 0.45 : person.y + 0.65;
      const bodyScaleY = person.type === 'seated' ? 0.78 : 1.0;

      dummy.position.set(person.x, bodyY, person.z);
      dummy.rotation.set(0, person.rotY, 0);
      dummy.scale.set(1.0, bodyScaleY, 1.0);
      dummy.updateMatrix();
      bodyRef.current!.setMatrixAt(i, dummy.matrix);

      const color = STUDENT_PALETTE[person.colorIdx];
      bodyRef.current!.setColorAt(i, color);

      // Head setup
      const headY = person.type === 'seated' ? person.y + 0.95 : person.y + 1.32;
      dummy.position.set(person.x, headY, person.z);
      dummy.rotation.set(0, person.rotY, 0);
      dummy.scale.set(1.0, 1.0, 1.0);
      dummy.updateMatrix();
      headRef.current!.setMatrixAt(i, dummy.matrix);
    });

    bodyRef.current.instanceMatrix.needsUpdate = true;
    if (bodyRef.current.instanceColor) bodyRef.current.instanceColor.needsUpdate = true;
    headRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  // Subtle cyclic walking animation along paths (Zero GPU buffer reallocation)
  useFrame(({ clock }) => {
    if (!bodyRef.current || !headRef.current || !settings.enableSecondaryAnimations) return;
    const time = clock.getElapsedTime();

    let needsUpdate = false;

    for (let i = 0; i < CAMPUS_PEDESTRIANS.length; i++) {
      const person = CAMPUS_PEDESTRIANS[i];
      if (person.type !== 'walking' || !person.speed || !person.pathLength) continue;

      needsUpdate = true;
      const cycle = Math.sin(time * person.speed + i * 0.7);
      const deltaPos = cycle * (person.pathLength * 0.4);

      let curX = person.x;
      let curZ = person.z;

      if (person.pathAxis === 'x') {
        curX = person.x + deltaPos;
      } else if (person.pathAxis === 'z') {
        curZ = person.z + deltaPos;
      } else {
        curX = person.x + deltaPos * 0.7;
        curZ = person.z + deltaPos * 0.7;
      }

      // Vertical bobbing for natural gait
      const gaitBob = Math.abs(Math.sin(time * person.speed * 2 + i * 0.7)) * 0.04;

      // Update Body
      dummy.position.set(curX, person.y + 0.65 + gaitBob, curZ);
      dummy.rotation.set(0, person.rotY, 0);
      dummy.scale.set(1.0, 1.0, 1.0);
      dummy.updateMatrix();
      bodyRef.current.setMatrixAt(i, dummy.matrix);

      // Update Head
      dummy.position.set(curX, person.y + 1.32 + gaitBob, curZ);
      dummy.rotation.set(0, person.rotY, 0);
      dummy.scale.set(1.0, 1.0, 1.0);
      dummy.updateMatrix();
      headRef.current.setMatrixAt(i, dummy.matrix);
    }

    if (needsUpdate) {
      bodyRef.current.instanceMatrix.needsUpdate = true;
      headRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group name="campus-pedestrians-population">
      <instancedMesh
        ref={bodyRef}
        args={[bodyGeo, bodyMaterial, CAMPUS_PEDESTRIANS.length]}
        castShadow={settings.shadowCasting === 'all'}
      />
      <instancedMesh
        ref={headRef}
        args={[headGeo, headMaterial, CAMPUS_PEDESTRIANS.length]}
      />
    </group>
  );
}

export default CampusPedestriansInstanced;
