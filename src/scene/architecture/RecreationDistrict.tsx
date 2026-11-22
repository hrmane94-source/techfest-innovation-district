import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  darkTitaniumMaterial,
  satinTitaniumMaterial,
  glassCurtainMaterial,
  clearGlassMaterial,
  cyanGlowMaterial,
  whiteGlowMaterial,
  crosswalkMarkingMaterial,
  azureWaterMaterial,
  warmStoneMaterial,
  teakTimberMaterial,
  campusTurfMaterial,
  warmPlazaPavingMaterial,
  floweringMagentaMaterial,
  floweringGoldMaterial,
} from '../materials';
import { useDistrict, useGraphicsQuality } from '../../context';

export interface RecreationDistrictProps {
  position?: [number, number, number];
  rotation?: number;
}

/**
 * RecreationDistrict — District F: Recreation & Campus Lake District
 *
 * Architecture & Landscape:
 * 1. Campus Lake — Expansive reflective water basin with stone shoreline, timber boardwalk & illuminated fountain jets
 * 2. Terraced Lakeside Amphitheater for outdoor gatherings and evening performances
 * 3. Sports Complex & Multi-Sport Arena (sweeping aerodynamic vaulted roof)
 * 4. Outdoor Athletic Courts (basketball & tennis resilient blue/cyan surface with court markings)
 * 5. Botanical Green Belt & Perimeter Jogging Track
 */
export function RecreationDistrict({
  position = [10, 0, 65],
  rotation = 0,
}: RecreationDistrictProps) {
  const { selectedDistrict, hoveredDistrict, selectDistrict, setHoveredDistrict } = useDistrict();
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';
  const isSelected = selectedDistrict === 'recreation';
  const isHovered = hoveredDistrict === 'recreation';

  const fountainsRef = useRef<THREE.Group>(null);

  // Animated subtle pulse on fountain jets
  useFrame(({ clock }) => {
    if (!fountainsRef.current || !settings.enableSecondaryAnimations) return;
    const t = clock.getElapsedTime();
    fountainsRef.current.children.forEach((child, i) => {
      const scaleY = 1 + 0.25 * Math.sin(t * 3 + i * 1.5);
      child.scale.set(1, scaleY, 1);
    });
  });

  // Fountain jet positions along the lake centerline
  const fountainPositions = useMemo(
    () => [
      [-10, 0, 0],
      [-2, 0, 0],
      [6, 0, 0],
    ],
    []
  );

  return (
    <group
      name="district-f-recreation"
      position={position}
      rotation={[0, rotation, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredDistrict('recreation');
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHoveredDistrict(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectDistrict('recreation');
      }}
    >
      {/* ── SELECTION HOLOGRAPHIC RING ── */}
      {(isSelected || isHovered) && (
        <group position={[0, 0.98, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[32.5, 33.5, 48]} />
            <meshBasicMaterial
              color="#10B981"
              transparent
              opacity={isSelected ? 0.85 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[33.8, 34.2, 48]} />
            <meshBasicMaterial
              color="#34D399"
              transparent
              opacity={isSelected ? 0.5 : 0.25}
            />
          </mesh>
        </group>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1. CAMPUS LAKE WATER BASIN & PROMENADE
          Location: [-14, 0.4, 0]
          Azure water, warm stone shoreline, teak boardwalk & fountains
      ══════════════════════════════════════════════════════════════ */}
      <group position={[-14, 0.4, 0]}>
        {/* Sunken Lake Foundation Basin */}
        <mesh position={[0, -0.4, 0]} material={darkTitaniumMaterial}>
          <boxGeometry args={[38, 0.8, 22]} />
        </mesh>

        {/* Realistic PBR Azure Water Surface with Specular Sky Reflection */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} material={azureWaterMaterial}>
          <planeGeometry args={[36.5, 20.5]} />
        </mesh>

        {/* Natural Warm Stone Coping Shoreline Perimeter */}
        <mesh position={[0, 0.08, 10.4]} material={warmStoneMaterial}>
          <boxGeometry args={[37.5, 0.14, 0.6]} />
        </mesh>
        <mesh position={[0, 0.08, -10.4]} material={warmStoneMaterial}>
          <boxGeometry args={[37.5, 0.14, 0.6]} />
        </mesh>
        <mesh position={[-18.4, 0.08, 0]} material={warmStoneMaterial}>
          <boxGeometry args={[0.6, 0.14, 21.2]} />
        </mesh>
        <mesh position={[18.4, 0.08, 0]} material={warmStoneMaterial}>
          <boxGeometry args={[0.6, 0.14, 21.2]} />
        </mesh>

        {/* Kinetic Aerated Fountain Spray Jets */}
        <group ref={fountainsRef} position={[0, 0.05, 0]}>
          {fountainPositions.map(([fx, , fz], fIdx) => (
            <group key={`fountain-jet-${fIdx}`} position={[fx, 0, fz]}>
              {/* Fountain Nozzle Base */}
              <mesh position={[0, 0.15, 0]} material={darkTitaniumMaterial}>
                <cylinderGeometry args={[0.5, 0.6, 0.3, 8]} />
              </mesh>
              {/* Vertical Aerated Spray Column */}
              <mesh position={[0, 1.8, 0]}>
                <cylinderGeometry args={[0.08, 0.26, 3.2, 8]} />
                <meshStandardMaterial
                  color="#dbeafe"
                  roughness={0.18}
                  metalness={0.04}
                  transparent
                  opacity={0.80}
                />
              </mesh>
              {/* Aerated Water Plume Crown */}
              <mesh position={[0, 3.4, 0]}>
                <sphereGeometry args={[0.42, 8, 8]} />
                <meshStandardMaterial
                  color="#eff6ff"
                  roughness={0.12}
                  metalness={0.02}
                  transparent
                  opacity={0.88}
                />
              </mesh>
            </group>
          ))}
        </group>

        {/* Teak Timber Lake Boardwalk Pier (Extends out into water from south shore) */}
        <group position={[8, 0.15, 6]}>
          <mesh material={teakTimberMaterial} receiveShadow>
            <boxGeometry args={[4.5, 0.2, 8.5]} />
          </mesh>
          {/* Glass Safety Railings on Boardwalk */}
          <mesh position={[-2.2, 0.45, 0]} material={clearGlassMaterial}>
            <boxGeometry args={[0.06, 0.7, 8.4]} />
          </mesh>
          <mesh position={[2.2, 0.45, 0]} material={clearGlassMaterial}>
            <boxGeometry args={[0.06, 0.7, 8.4]} />
          </mesh>
          <mesh position={[0, 0.45, -4.2]} material={clearGlassMaterial}>
            <boxGeometry args={[4.4, 0.7, 0.06]} />
          </mesh>
          {/* Boardwalk Viewing Benches in Teak Timber */}
          <mesh position={[0, 0.35, -3.2]} material={teakTimberMaterial}>
            <boxGeometry args={[2.5, 0.35, 0.5]} />
          </mesh>
        </group>

        {/* Lakeside Terraced Amphitheater Tiers (North Shore Bank) in Warm Stone */}
        <group position={[0, 0.1, -11.5]}>
          {[0, 1, 2].map((tier) => (
            <mesh
              key={`lake-tier-${tier}`}
              position={[0, tier * 0.35, -tier * 1.1]}
              material={warmStoneMaterial}
              receiveShadow
            >
              <boxGeometry args={[26 - tier * 3, 0.35, 1.2]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          2. SPORTS COMPLEX & MULTI-SPORT ARENA
          Location: [18, 0.9, 4]
          Warm stone & ivory massing, curved roof, teak entrance
      ══════════════════════════════════════════════════════════════ */}
      <group position={[18, 0.9, 4]}>
        {/* Foundation Plinth */}
        <mesh position={[0, 0.35, 0]} material={warmStoneMaterial} receiveShadow castShadow>
          <boxGeometry args={[22, 0.7, 18]} />
        </mesh>

        {/* Main Vaulted Arena Massing in Warm Stone */}
        <mesh position={[0, 6.5, 0]} material={warmStoneMaterial} receiveShadow castShadow>
          <boxGeometry args={[20.5, 11.5, 16.5]} />
        </mesh>

        {/* Aerodynamic Sweeping Curved Roof Barrel Structure */}
        <mesh
          position={[0, 12.8, 0]}
          rotation={[0, 0, Math.PI / 2]}
          material={satinTitaniumMaterial}
          castShadow
        >
          <cylinderGeometry args={[8.5, 8.5, 21, 24, 1, false, 0, Math.PI]} />
        </mesh>
        <mesh position={[0, 13.8, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[20.8, 0.1, 0.2]} />
        </mesh>

        {/* Clear Glazed Clerestory Ribbon */}
        <mesh position={[0, 10.5, 8.3]} material={glassCurtainMaterial}>
          <boxGeometry args={[18.5, 2.2, 0.15]} />
        </mesh>
        <mesh position={[0, 10.5, -8.3]} material={glassCurtainMaterial}>
          <boxGeometry args={[18.5, 2.2, 0.15]} />
        </mesh>

        {/* Grand Sports Complex Entrance Portico (West facing lake) */}
        <mesh position={[-10.4, 3.8, 0]} material={clearGlassMaterial}>
          <boxGeometry args={[0.2, 6.5, 8]} />
        </mesh>
        <mesh position={[-11.2, 7.2, 0]} material={teakTimberMaterial} castShadow>
          <boxGeometry args={[2.5, 0.5, 10]} />
        </mesh>
        <mesh position={[-11.2, 7.5, 0]} material={whiteGlowMaterial}>
          <boxGeometry args={[0.2, 0.6, 7.5]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          3. OUTDOOR ATHLETIC COURTS (BASKETBALL / TENNIS)
          Location: [16, 0.5, -12]
      ══════════════════════════════════════════════════════════════ */}
      <group position={[16, 0.5, -12]}>
        {/* Court Foundation Bed */}
        <mesh material={darkTitaniumMaterial} receiveShadow>
          <boxGeometry args={[18, 0.18, 14]} />
        </mesh>

        {/* High-Performance All-Weather Resilient Athletic Court Surface (Electric Cyan/Blue) */}
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[17.2, 13.2]} />
          <meshStandardMaterial
            color="#1e3a8a"
            roughness={0.7}
            metalness={0.15}
          />
        </mesh>

        {/* Court Boundary Lines (Painted Regulation White Lines) */}
        <mesh position={[0, 0.11, 0]} material={crosswalkMarkingMaterial}>
          <boxGeometry args={[16.0, 0.02, 0.12]} />
        </mesh>
        <mesh position={[0, 0.11, 0]} material={crosswalkMarkingMaterial}>
          <boxGeometry args={[0.12, 0.02, 12.0]} />
        </mesh>
        <mesh position={[0, 0.11, 5.8]} material={crosswalkMarkingMaterial}>
          <boxGeometry args={[16.0, 0.02, 0.08]} />
        </mesh>
        <mesh position={[0, 0.11, -5.8]} material={crosswalkMarkingMaterial}>
          <boxGeometry args={[16.0, 0.02, 0.08]} />
        </mesh>

        {/* Center Court Ring */}
        <mesh position={[0, 0.115, 0]} rotation={[-Math.PI / 2, 0, 0]} material={crosswalkMarkingMaterial}>
          <ringGeometry args={[2.0, 2.15, 24]} />
        </mesh>

        {/* Basketball Hoops / Stanchions */}
        {[-7.8, 7.8].map((hx, hIdx) => (
          <group key={`court-hoop-${hIdx}`} position={[hx, 0.1, 0]}>
            {/* Stanchion Pole */}
            <mesh position={[0, 2.2, 0]} material={darkTitaniumMaterial}>
              <cylinderGeometry args={[0.08, 0.1, 4.2, 8]} />
            </mesh>
            {/* Arm & Backboard */}
            <mesh position={[hx > 0 ? -0.4 : 0.4, 3.8, 0]} material={clearGlassMaterial}>
              <boxGeometry args={[0.08, 1.1, 1.8]} />
            </mesh>
            {/* Rim */}
            <mesh position={[hx > 0 ? -0.9 : 0.9, 3.5, 0]} material={cyanGlowMaterial}>
              <boxGeometry args={[0.5, 0.05, 0.5]} />
            </mesh>
          </group>
        ))}

        {/* Spectator Court Teak Benches */}
        <mesh position={[0, 0.28, 7.4]} material={teakTimberMaterial} castShadow={shouldCastShadow}>
          <boxGeometry args={[10, 0.35, 0.6]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          4. BOTANICAL GREEN LAWNS & PROMENADE TREES
          Location: [-14, 0.5, 13]
          Campus turf, flower borders & teak promenade benches
      ══════════════════════════════════════════════════════════════ */}
      <group position={[-14, 0.5, 13]}>
        <mesh material={campusTurfMaterial} receiveShadow>
          <boxGeometry args={[36, 0.12, 6]} />
        </mesh>
        <mesh position={[0, 0.08, 0]} material={warmPlazaPavingMaterial}>
          <boxGeometry args={[36.4, 0.05, 6.4]} />
        </mesh>

        {/* Botanical Flower Borders (Gold Marigold & Magenta Azaleas) */}
        <mesh position={[0, 0.22, 2.6]} material={floweringGoldMaterial}>
          <boxGeometry args={[35, 0.25, 0.6]} />
        </mesh>
        <mesh position={[0, 0.22, -2.6]} material={floweringMagentaMaterial}>
          <boxGeometry args={[35, 0.25, 0.6]} />
        </mesh>

        {/* Shaded Promenade Teak Benches */}
        {[-12, -4, 4, 12].map((bx, bIdx) => (
          <mesh
            key={`lakeside-bench-${bIdx}`}
            position={[bx, 0.22, 0]}
            material={teakTimberMaterial}
            castShadow={shouldCastShadow}
          >
            <boxGeometry args={[2.4, 0.35, 0.6]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default RecreationDistrict;
