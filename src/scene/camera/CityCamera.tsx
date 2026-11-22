import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import gsap from 'gsap';
import { useDistrict, useGraphicsQuality } from '../../context';

export interface CityCameraProps {
  initialTarget?: [number, number, number];
  target?: [number, number, number];
}

/**
 * CityCamera — Cinematic camera transitions with smooth OrbitControls and adaptive parallax
 */
export function CityCamera({
  initialTarget,
  target,
}: CityCameraProps) {
  const effectiveTarget = target ?? initialTarget ?? [0, 20, 0];
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const { selectedDetails, isTransitioning, setTransitioning } = useDistrict();
  const { settings } = useGraphicsQuality();
  const baseTarget = useRef(new THREE.Vector3(...effectiveTarget));
  const isAnimatingRef = useRef(false);

  // Trigger smooth GSAP camera transition when selected district changes
  useEffect(() => {
    if (!controlsRef.current) return;

    const [tx, ty, tz] = selectedDetails.cameraPosition;
    const [lx, ly, lz] = selectedDetails.cameraTarget;

    // Update base target for mouse parallax
    baseTarget.current.set(lx, ly, lz);

    // Cancel existing animations
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controlsRef.current.target);

    isAnimatingRef.current = true;
    setTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        setTransitioning(false);
      },
    });

    tl.to(
      camera.position,
      {
        x: tx,
        y: ty,
        z: tz,
        duration: 1.35,
        ease: 'power2.inOut',
      },
      0
    );

    tl.to(
      controlsRef.current.target,
      {
        x: lx,
        y: ly,
        z: lz,
        duration: 1.35,
        ease: 'power2.inOut',
        onUpdate: () => {
          controlsRef.current?.update();
        },
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [selectedDetails, camera, setTransitioning]);

  // Subtle mouse parallax effect during idle state (skipped if disabled or settled)
  useFrame(({ pointer }) => {
    if (
      !controlsRef.current ||
      isAnimatingRef.current ||
      isTransitioning ||
      !settings.enableSecondaryAnimations
    ) {
      return;
    }

    // Gentle target offset based on cursor position (-1 to 1)
    const targetX = baseTarget.current.x + pointer.x * 1.5;
    const targetY = baseTarget.current.y + pointer.y * 0.8;

    const diffX = targetX - controlsRef.current.target.x;
    const diffY = targetY - controlsRef.current.target.y;

    // Only update if not settled
    if (Math.abs(diffX) > 0.01 || Math.abs(diffY) > 0.01) {
      controlsRef.current.target.x += diffX * 0.025;
      controlsRef.current.target.y += diffY * 0.025;
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      camera={camera}
      target={effectiveTarget}
      enableDamping
      dampingFactor={0.06}
      minDistance={18}
      maxDistance={220}
      minPolarAngle={Math.PI / 12}
      maxPolarAngle={Math.PI / 2.05} // Prevent dipping below ground level
      enablePan={false}
      rotateSpeed={0.65}
      zoomSpeed={0.8}
      onStart={() => {
        gsap.killTweensOf(camera.position);
        if (controlsRef.current) {
          gsap.killTweensOf(controlsRef.current.target);
        }
        isAnimatingRef.current = false;
        setTransitioning(false);
      }}
    />
  );
}
