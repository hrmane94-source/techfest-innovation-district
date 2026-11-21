import { Suspense } from 'react';
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
 * CityScene — Master React Three Fiber 3D Canvas
 * Renders the complete procedural architectural city for TECHFEST — The Innovation District
 */
export function CityScene({ className }: CitySceneProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className ?? ''}`}>
      <Canvas
        camera={{
          position: [68, 50, 75],
          fov: 42,
          near: 0.5,
          far: 500,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.75]} // High visual fidelity on retina displays without GPU exhaustion
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Atmospheric Environment & Fog */}
          <CityEnvironment />

          {/* Architectural Key, Rim & Accent Lighting */}
          <CityLighting />

          {/* Cinematic Three-Quarter Camera Rig */}
          <CityCamera target={[0, 16, 0]} />

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
