import { useMemo } from 'react';
import {
  pearlWhiteConcreteMaterial,
  titaniumStructuralMaterial,
  darkTitaniumMaterial,
  satinTitaniumMaterial,
  metalExoskeletonMaterial,
  brushedAlloyMaterial,
  glassCurtainMaterial,
  clearGlassMaterial,
  cyanGlowMaterial,
  warmGlowMaterial,
  whiteGlowMaterial,
  softSilverMaterial,
  solarPanelMaterial,
  louverAlloyMaterial,
  campusLawnMaterial,
  campusWoodBenchMaterial,
} from '../materials';
import { useDistrict, useGraphicsQuality } from '../../context';

export interface KnowledgeDistrictProps {
  position?: [number, number, number];
  rotation?: number;
}

/**
 * KnowledgeDistrict — District E: Knowledge & Startup Incubation District
 *
 * Architecture:
 * 1. Startup Incubation Centre & Venture Studio (3-story glass incubator with cantilevered conference cube)
 * 2. Techfest Innovation & Entrepreneurship Hub (Hardware maker lab & 3D prototyping hall)
 * 3. Open Collaborative Learning Pavilion with timber study pods and solar pergolas
 * 4. Landscaped reflection courtyard with reading terraces connecting toward the Central Library
 */
export function KnowledgeDistrict({
  position = [-55, 0, 18],
  rotation = 0,
}: KnowledgeDistrictProps) {
  const { selectedDistrict, hoveredDistrict, selectDistrict, setHoveredDistrict } = useDistrict();
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';
  const isSelected = selectedDistrict === 'knowledge';
  const isHovered = hoveredDistrict === 'knowledge';

  // Louver sunshades for Incubation Centre
  const verticalLouvers = useMemo(
    () => [-6.0, -4.5, -3.0, -1.5, 0, 1.5, 3.0, 4.5, 6.0],
    []
  );

  return (
    <group
      name="district-e-knowledge"
      position={position}
      rotation={[0, rotation, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredDistrict('knowledge');
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHoveredDistrict(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectDistrict('knowledge');
      }}
    >
      {/* ── SELECTION HOLOGRAPHIC RING ── */}
      {(isSelected || isHovered) && (
        <group position={[0, 0.98, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[26.5, 27.5, 48]} />
            <meshBasicMaterial
              color="#38BDF8"
              transparent
              opacity={isSelected ? 0.85 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[27.8, 28.2, 48]} />
            <meshBasicMaterial
              color="#00E5FF"
              transparent
              opacity={isSelected ? 0.5 : 0.25}
            />
          </mesh>
        </group>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1. STARTUP INCUBATION CENTRE & VENTURE STUDIO
          Location: [-8, 0.9, -10]
      ══════════════════════════════════════════════════════════════ */}
      <group position={[-8, 0.9, -10]}>
        {/* Foundation Plinth */}
        <mesh position={[0, 0.35, 0]} material={darkTitaniumMaterial} receiveShadow castShadow>
          <boxGeometry args={[16, 0.7, 16]} />
        </mesh>

        {/* Main 3-Story Glass Incubator Body */}
        <mesh position={[0, 7.5, 0]} material={pearlWhiteConcreteMaterial} receiveShadow castShadow>
          <boxGeometry args={[14.5, 13.5, 14.5]} />
        </mesh>
        <mesh position={[0, 7.5, 7.3]} material={glassCurtainMaterial}>
          <boxGeometry args={[13.5, 11.5, 0.15]} />
        </mesh>

        {/* Dramatic Cantilevered Glazed Pitch Cube (Projects out over plaza) */}
        <group position={[2.5, 10.5, 8.8]}>
          <mesh material={clearGlassMaterial} castShadow>
            <boxGeometry args={[6.5, 4.2, 4.5]} />
          </mesh>
          <mesh material={satinTitaniumMaterial}>
            <boxGeometry args={[6.8, 0.25, 4.8]} />
          </mesh>
          <mesh position={[0, 2.1, 0]} material={satinTitaniumMaterial}>
            <boxGeometry args={[6.8, 0.25, 4.8]} />
          </mesh>
          {/* Pitch Cube Warm Glowing Collaboration Core */}
          <mesh position={[0, 0, 0]} material={warmGlowMaterial}>
            <boxGeometry args={[4.5, 2.8, 2.5]} />
          </mesh>
        </group>

        {/* Vertical Solar Shading Louvers on East Facade */}
        {verticalLouvers.map((lvX, idx) => (
          <mesh
            key={`incubator-louver-${idx}`}
            position={[lvX, 7.5, 7.6]}
            material={louverAlloyMaterial}
          >
            <boxGeometry args={[0.08, 11, 0.45]} />
          </mesh>
        ))}

        {/* Rooftop Observation Pergola */}
        <mesh position={[0, 14.5, 0]} material={satinTitaniumMaterial}>
          <boxGeometry args={[15, 0.5, 15]} />
        </mesh>
        <mesh position={[0, 14.8, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[14.6, 0.1, 0.2]} />
        </mesh>
        <mesh position={[0, 15.2, -2]} rotation={[-0.1, 0, 0]} material={solarPanelMaterial}>
          <boxGeometry args={[10, 0.1, 8]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          2. TECHFEST INNOVATION & ENTREPRENEURSHIP HUB (Maker Lab)
          Location: [-6, 0.9, 12]
      ══════════════════════════════════════════════════════════════ */}
      <group position={[-6, 0.9, 12]}>
        {/* Foundation Plinth */}
        <mesh position={[0, 0.35, 0]} material={darkTitaniumMaterial} receiveShadow castShadow>
          <boxGeometry args={[18, 0.7, 14]} />
        </mesh>

        {/* Prototyping Hall (2 Stories, High-Bay) */}
        <mesh position={[0, 6, 0]} material={pearlWhiteConcreteMaterial} receiveShadow castShadow>
          <boxGeometry args={[16.5, 10.5, 12.5]} />
        </mesh>

        {/* Clerestory Industrial Glass Ribbon */}
        <mesh position={[0, 9.2, 6.3]} material={glassCurtainMaterial}>
          <boxGeometry args={[15, 2.2, 0.15]} />
        </mesh>
        <mesh position={[0, 9.2, -6.3]} material={glassCurtainMaterial}>
          <boxGeometry args={[15, 2.2, 0.15]} />
        </mesh>

        {/* Maker Lab Roll-Up Logistics Shutter */}
        <mesh position={[4.5, 2.2, 6.3]} material={darkTitaniumMaterial}>
          <boxGeometry args={[4.2, 3.6, 0.2]} />
        </mesh>
        <mesh position={[4.5, 4.1, 6.45]} material={cyanGlowMaterial}>
          <boxGeometry args={[3.8, 0.1, 0.05]} />
        </mesh>

        {/* Exposed Diagonal Structural Diagrid on West Facade */}
        <mesh position={[-8.3, 6, 0]} rotation={[0, 0, 0.45]} material={metalExoskeletonMaterial}>
          <boxGeometry args={[0.35, 12, 0.35]} />
        </mesh>
        <mesh position={[-8.3, 6, 0]} rotation={[0, 0, -0.45]} material={metalExoskeletonMaterial}>
          <boxGeometry args={[0.35, 12, 0.35]} />
        </mesh>

        {/* Innovation Hub Signage */}
        <mesh position={[-2.5, 8.5, 6.4]} material={whiteGlowMaterial}>
          <boxGeometry args={[6.5, 0.6, 0.05]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          3. OPEN COLLABORATIVE LEARNING PAVILION
          Location: [8, 0.5, 1]
      ══════════════════════════════════════════════════════════════ */}
      <group position={[8, 0.5, 1]}>
        {/* Timber Study Deck */}
        <mesh material={campusWoodBenchMaterial} receiveShadow>
          <boxGeometry args={[12, 0.18, 14]} />
        </mesh>
        <mesh position={[0, 0.07, 0]} material={softSilverMaterial}>
          <boxGeometry args={[12.4, 0.05, 14.4]} />
        </mesh>

        {/* Shaded Steel Pergola Canopy */}
        <mesh position={[0, 4.2, 0]} material={titaniumStructuralMaterial}>
          <boxGeometry args={[11, 0.2, 13]} />
        </mesh>
        <mesh position={[0, 4.3, 0]} material={clearGlassMaterial}>
          <boxGeometry args={[10.5, 0.08, 12.5]} />
        </mesh>

        {/* Slender Alloy Pergola Support Columns */}
        {[
          [-5, -6],
          [-5, 6],
          [5, -6],
          [5, 6],
        ].map(([cx, cz], cIdx) => (
          <mesh
            key={`pergola-col-${cIdx}`}
            position={[cx, 2.1, cz]}
            material={brushedAlloyMaterial}
            castShadow={shouldCastShadow}
          >
            <cylinderGeometry args={[0.1, 0.14, 4.2, 8]} />
          </mesh>
        ))}

        {/* Collaborative Timber Study Pods */}
        {[-3, 3].map((px, pIdx) => (
          <group key={`study-pod-${pIdx}`} position={[px, 0.2, 0]}>
            {/* Table */}
            <mesh position={[0, 0.65, 0]} material={softSilverMaterial}>
              <boxGeometry args={[2.0, 0.06, 1.2]} />
            </mesh>
            {/* Benches */}
            <mesh position={[0, 0.35, -1.1]} material={campusWoodBenchMaterial}>
              <boxGeometry args={[2.0, 0.05, 0.4]} />
            </mesh>
            <mesh position={[0, 0.35, 1.1]} material={campusWoodBenchMaterial}>
              <boxGeometry args={[2.0, 0.05, 0.4]} />
            </mesh>
            {/* Soft Warm Task Light Under Pergola */}
            <mesh position={[0, 3.8, 0]} material={warmGlowMaterial}>
              <boxGeometry args={[1.6, 0.05, 0.3]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ══════════════════════════════════════════════════════════════
          4. LANDSCAPED REFLECTION LAWN & STUDY ARBOR
          Location: [0, 0.5, -14]
      ══════════════════════════════════════════════════════════════ */}
      <group position={[0, 0.5, -14]}>
        <mesh material={campusLawnMaterial} receiveShadow>
          <boxGeometry args={[14, 0.12, 8]} />
        </mesh>
        <mesh position={[0, 0.08, 0]} material={softSilverMaterial}>
          <boxGeometry args={[14.4, 0.05, 8.4]} />
        </mesh>
        {/* Reading Loungers */}
        {[-4, 0, 4].map((lx, lIdx) => (
          <mesh
            key={`reading-lounger-${lIdx}`}
            position={[lx, 0.22, 0]}
            rotation={[-0.15, 0, 0]}
            material={campusWoodBenchMaterial}
            castShadow={shouldCastShadow}
          >
            <boxGeometry args={[1.6, 0.2, 2.2]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default KnowledgeDistrict;
