import { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { CityEnvironment } from './environment/CityEnvironment';
import { CityLighting } from './lighting/CityLighting';
import { CityCamera } from './camera/CityCamera';
import { CityGround } from './environment/CityGround';
import { CityRoads } from './environment/CityRoads';
import { DistrictPlaza } from './landmarks/DistrictPlaza';
import { CentralLandmark } from './architecture/CentralLandmark';
import { InnovationDistrict } from './landmarks/InnovationDistrict';

export interface CitySceneProps {
  className?: string;
}

/**
 * CityScene — Master React Three Fiber 3D Canvas (Milestone 2.3)
 *
 * Configured with:
 * - Wide-angle aerial/isometric framing ([58, 92, 110] targeting [0, 20, 0], fov: 50)
 * - Complete visibility of the monumental Techfest Tower from ground podium to apex at Y=68
 * - Unobstructed view of all 4 innovation districts across the matrix
 * - Soft PCF shadow mapping and ACES Filmic tone mapping for photorealistic architectural visualization
 */
export function CityScene({ className }: CitySceneProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className ?? ''}`}>
      <Canvas
        shadows
        camera={{
          position: [58, 92, 110],
          fov: 50,
          near: 0.5,
          far: 600,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        dpr={[1, 1.75]} // High visual fidelity on retina displays without GPU exhaustion
        className="w-full h-full"
      >
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
