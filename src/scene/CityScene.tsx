import { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGraphicsQuality } from '../context';
import { CityEnvironment } from './environment/CityEnvironment';
import { CityLighting } from './lighting/CityLighting';
import { CityCamera } from './camera/CityCamera';
import { CityGround } from './environment/CityGround';
import { CityRoads } from './environment/CityRoads';
import { DistrictPlaza } from './landmarks/DistrictPlaza';
import { CentralLandmark } from './architecture/CentralLandmark';
import { InnovationDistrict } from './landmarks/InnovationDistrict';
import { performanceProfiler } from '../utils/performanceProfiler';

function ProfilerFrameHook() {
  useFrame(({ gl }) => {
    performanceProfiler.recordFrame(gl);
  });
  return null;
}

export interface CitySceneProps {
  className?: string;
}

/**
 * CityScene — Master React Three Fiber 3D Canvas with Adaptive Graphics Tiers
 */
export function CityScene({ className }: CitySceneProps) {
  const { settings } = useGraphicsQuality();

  return (
    <div className={`relative w-full h-full overflow-hidden ${className ?? ''}`}>
      <Canvas
        shadows={settings.shadows}
        camera={{
          position: [58, 92, 110],
          fov: 50,
          near: 0.5,
          far: 600,
        }}
        gl={{
          antialias: settings.tier !== 'performance',
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.32,
        }}
        dpr={settings.dpr}
        className="w-full h-full"
      >
        <ProfilerFrameHook />
        <Suspense fallback={null}>
          {/* Atmospheric Environment & Fog */}
          <CityEnvironment />

          {/* Architectural Key, Hemisphere Ambient, Rim & Accent Lighting */}
          <CityLighting />

          {/* Wide-Angle Aerial/Isometric Camera Rig */}
          <CityCamera target={[0, 20, 0]} />

          {/* City Foundations & Ground Podiums */}
          <CityGround />

          {/* Arterial Roads, Skyways & Transit Pulses */}
          <CityRoads />

          {/* Central Public Plaza & Telemetry Pylons */}
          <DistrictPlaza />

          {/* Visually Dominant Monumental Techfest Tower */}
          <CentralLandmark />

          {/* 4 Innovation Districts (AI, Robotics, Aerospace, Cybersecurity) */}
          <InnovationDistrict />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default CityScene;
