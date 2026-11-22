import { useMemo } from 'react';
import {
  pearlWhiteConcreteMaterial,
  titaniumStructuralMaterial,
  darkTitaniumMaterial,
  satinTitaniumMaterial,
  brushedAlloyMaterial,
  clearGlassMaterial,
  clearLobbyGlassMaterial,
  cyanGlowMaterial,
  warmGlowMaterial,
  whiteGlowMaterial,
  softSilverMaterial,
  louverAlloyMaterial,
  solarPanelMaterial,
} from '../materials';
import { useGraphicsQuality } from '../../context';

/**
 * CentralInnovationPavilions — Civic Architectural Pavilions flanking the Central Innovation Core:
 * 1. North Anchor: Innovation Exhibition Pavilion & Digital Experience Centre (Demo spaces & glazed showroom)
 * 2. South Anchor: Conference & Convention Building (Public event pavilion & presentation hall)
 */
export function CentralInnovationPavilions() {
  const { settings } = useGraphicsQuality();
  const shouldCastShadow = settings.shadowCasting === 'all';

  // Demo display pedestals for Exhibition Pavilion
  const demoPedestals = useMemo(
    () => [-4.5, -1.5, 1.5, 4.5],
    []
  );

  return (
    <group name="central-innovation-pavilions">
      {/* ══════════════════════════════════════════════════════════════
          1. INNOVATION EXHIBITION PAVILION & DIGITAL EXPERIENCE CENTRE
          Location: [0, 0.9, -32] (North Plaza Axial)
      ══════════════════════════════════════════════════════════════ */}
      <group position={[0, 0.9, -32]}>
        {/* Base Foundation Plinth */}
        <mesh position={[0, 0.35, 0]} material={darkTitaniumMaterial} receiveShadow castShadow>
          <boxGeometry args={[20, 0.7, 14]} />
        </mesh>
        <mesh position={[0, 0.75, 0]} material={softSilverMaterial}>
          <boxGeometry args={[20.4, 0.1, 14.4]} />
        </mesh>

        {/* Sculptural Double-Height Glazed Exhibition Hall */}
        <mesh position={[0, 4.8, 0]} material={clearLobbyGlassMaterial}>
          <boxGeometry args={[18.5, 8.2, 12.5]} />
        </mesh>

        {/* Warm Luminous Digital Experience Core */}
        <mesh position={[0, 4.2, 0]} material={warmGlowMaterial}>
          <boxGeometry args={[14, 6.5, 8]} />
        </mesh>

        {/* Structural Roof Slab with Aerodynamic Overhang */}
        <mesh position={[0, 9.2, 0]} material={titaniumStructuralMaterial} castShadow>
          <boxGeometry args={[20.5, 0.8, 14.5]} />
        </mesh>
        <mesh position={[0, 9.4, 0]} material={cyanGlowMaterial}>
          <boxGeometry args={[20.2, 0.08, 0.2]} />
        </mesh>

        {/* Architectural Portico Columns (South facing tower) */}
        {[-8, -4, 0, 4, 8].map((cx, idx) => (
          <mesh
            key={`expo-col-${idx}`}
            position={[cx, 4.4, 6.4]}
            material={brushedAlloyMaterial}
            castShadow={shouldCastShadow}
          >
            <cylinderGeometry args={[0.18, 0.24, 8.2, 12]} />
          </mesh>
        ))}

        {/* Digital Interactive Technology Demo Spaces / Showcase Pedestals */}
        {demoPedestals.map((dx, idx) => (
          <group key={`demo-pedestal-${idx}`} position={[dx, 0.75, 2.5]}>
            <mesh position={[0, 0.5, 0]} material={darkTitaniumMaterial}>
              <cylinderGeometry args={[0.55, 0.65, 1.0, 8]} />
            </mesh>
            <mesh position={[0, 1.05, 0]} material={cyanGlowMaterial}>
              <cylinderGeometry args={[0.58, 0.58, 0.06, 8]} />
            </mesh>
            <mesh position={[0, 1.45, 0]} material={clearGlassMaterial}>
              <octahedronGeometry args={[0.3, 0]} />
            </mesh>
          </group>
        ))}

        {/* Entrance Steps */}
        <mesh position={[0, 0.35, 7.8]} material={softSilverMaterial} receiveShadow>
          <boxGeometry args={[14, 0.45, 1.6]} />
        </mesh>

        {/* Pavilion Illuminated Header Sign */}
        <mesh position={[0, 8.8, 6.6]} material={darkTitaniumMaterial}>
          <boxGeometry args={[10, 0.8, 0.25]} />
        </mesh>
        <mesh position={[0, 8.8, 6.75]} material={whiteGlowMaterial}>
          <boxGeometry args={[9.4, 0.45, 0.05]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          2. CONFERENCE & CONVENTION BUILDING (Public Event Pavilion)
          Location: [0, 0.9, 32] (South Plaza Axial)
      ══════════════════════════════════════════════════════════════ */}
      <group position={[0, 0.9, 32]}>
        {/* Base Foundation Plinth */}
        <mesh position={[0, 0.35, 0]} material={darkTitaniumMaterial} receiveShadow castShadow>
          <boxGeometry args={[20, 0.7, 14]} />
        </mesh>
        <mesh position={[0, 0.75, 0]} material={softSilverMaterial}>
          <boxGeometry args={[20.4, 0.1, 14.4]} />
        </mesh>

        {/* Main Solid Precast Concrete Convention Hall (Acoustic Envelope) */}
        <mesh position={[0, 5.5, 0]} material={pearlWhiteConcreteMaterial} receiveShadow castShadow>
          <boxGeometry args={[18.5, 9.6, 12.5]} />
        </mesh>

        {/* Glazed Grand Foyer Ribbon (North facing tower) */}
        <mesh position={[0, 4.0, -6.3]} material={clearLobbyGlassMaterial}>
          <boxGeometry args={[16.5, 6.5, 0.2]} />
        </mesh>
        <mesh position={[0, 3.8, -6.2]} material={warmGlowMaterial}>
          <boxGeometry args={[12, 5.0, 0.1]} />
        </mesh>

        {/* Vertical Louvers on North Glass */}
        {[-6, -3, 0, 3, 6].map((lx, idx) => (
          <mesh key={`conv-louver-${idx}`} position={[lx, 4.0, -6.5]} material={louverAlloyMaterial}>
            <boxGeometry args={[0.08, 6.4, 0.4]} />
          </mesh>
        ))}

        {/* Cantilever Entrance Canopy */}
        <mesh position={[0, 7.5, -7.5]} material={titaniumStructuralMaterial} castShadow>
          <boxGeometry args={[17.5, 0.6, 3.2]} />
        </mesh>
        <mesh position={[0, 7.3, -7.5]} material={cyanGlowMaterial}>
          <boxGeometry args={[17.2, 0.08, 0.2]} />
        </mesh>

        {/* Rooftop Solar Pergola */}
        <mesh position={[0, 10.6, 0]} material={satinTitaniumMaterial}>
          <boxGeometry args={[19, 0.4, 13]} />
        </mesh>
        <mesh position={[0, 11.0, 0]} rotation={[-0.08, 0, 0]} material={solarPanelMaterial}>
          <boxGeometry args={[14, 0.1, 9]} />
        </mesh>

        {/* Entrance Steps */}
        <mesh position={[0, 0.35, -7.8]} material={softSilverMaterial} receiveShadow>
          <boxGeometry args={[14, 0.45, 1.6]} />
        </mesh>

        {/* Convention Center Header Sign */}
        <mesh position={[0, 8.2, -7.6]} material={whiteGlowMaterial}>
          <boxGeometry args={[9.5, 0.45, 0.05]} />
        </mesh>
      </group>
    </group>
  );
}

export default CentralInnovationPavilions;
