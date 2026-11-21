import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export interface CityCameraProps {
  target?: [number, number, number];
}

/**
 * CityCamera — Cinematic Three-Quarter Camera with smooth OrbitControls and mouse parallax
 */
export function CityCamera({
  target = [0, 16, 0],
}: CityCameraProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const baseTarget = useRef(new THREE.Vector3(...target));

  // Subtle mouse parallax effect to give architectural depth
  useFrame(({ pointer }) => {
    if (!controlsRef.current) return;

    // Dampen target offset slightly based on cursor position (-1 to 1)
    const targetX = baseTarget.current.x + pointer.x * 2.5;
    const targetY = baseTarget.current.y + pointer.y * 1.5;

    controlsRef.current.target.x = THREE.MathUtils.lerp(
      controlsRef.current.target.x,
      targetX,
      0.03
    );
    controlsRef.current.target.y = THREE.MathUtils.lerp(
      controlsRef.current.target.y,
      targetY,
      0.03
    );

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      camera={camera}
      target={target}
      enableDamping
      dampingFactor={0.06}
      minDistance={35}
      maxDistance={190}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={Math.PI / 2.05} // Prevent dipping below ground
      enablePan={false}
      rotateSpeed={0.65}
      zoomSpeed={0.8}
    />
  );
}
