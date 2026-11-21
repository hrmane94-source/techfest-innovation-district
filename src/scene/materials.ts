import * as THREE from 'three';

/**
 * Shared Architectural Materials & Procedural Facade Textures (Refined Milestone 1.2)
 * Direction: Premium Futuristic Architectural Visualization
 *
 * Improvements in M1.2:
 * - Architectural window texture: Real floor-to-floor heights, horizontal spandrels, grouped office lighting
 * - Balanced metalness (0.45-0.6) and roughness (0.38-0.52) so buildings receive ambient illumination
 * - Eliminates pitch-black surfaces while preserving high-contrast futuristic mood
 */

export const CITY_COLORS = {
  bgPrimary: '#050A14',
  bgSecondary: '#091426',
  metalDark: '#141f30',         // Lifted from muddy black to rich architectural graphite
  metalTitanium: '#1d2c42',     // Sculpted titanium with diffuse readability
  metalSteelBlue: '#1f3350',    // Structural steel with subtle navy tint
  metalAccent: '#2a3f60',
  metalExoskeleton: '#2e4566',
  glassFacade: '#0b1b30',
  glassReflective: '#122c4e',
  glassClear: '#183c68',
  primaryBlue: '#246BFD',
  electricCyan: '#39DDF4',
  accentOrange: '#FF9B54',
  roadSurface: '#080e1a',
  roadMarking: '#1e385c',
  plazaPaving: '#0f1c30',
  plazaAccent: '#162844',
  vegetationDark: '#0a1e1c',
  vegetationNeon: '#125c56',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PROCEDURAL ARCHITECTURAL WINDOW TEXTURES (128x128, Clean Floor Plates)
// ─────────────────────────────────────────────────────────────────────────────

function createProceduralWindowTextures() {
  const width = 128;
  const height = 128;
  const diffuseData = new Uint8Array(width * height * 4);
  const emissiveData = new Uint8Array(width * height * 4);

  // 8 distinct architectural floors (16 pixels per floor)
  // Each floor: 4px dark horizontal spandrel beam, 12px glazed window zone
  // 4 bays per floor (32px per bay), separated by 3px vertical mullion columns
  const floorHeight = 16;
  const spandrelHeight = 4;
  const bayWidth = 32;
  const mullionWidth = 3;

  for (let y = 0; y < height; y++) {
    const floorIndex = Math.floor(y / floorHeight);
    const yInFloor = y % floorHeight;
    const isSpandrel = yInFloor < spandrelHeight;

    for (let x = 0; x < width; x++) {
      const bayIndex = Math.floor(x / bayWidth);
      const xInBay = x % bayWidth;
      const isMullion = xInBay < mullionWidth;
      const pixelIndex = (y * width + x) * 4;

      if (isSpandrel || isMullion) {
        // Dark metallic spandrel beam / vertical mullion column
        diffuseData[pixelIndex] = 18;
        diffuseData[pixelIndex + 1] = 27;
        diffuseData[pixelIndex + 2] = 40;
        diffuseData[pixelIndex + 3] = 255;

        emissiveData[pixelIndex] = 0;
        emissiveData[pixelIndex + 1] = 0;
        emissiveData[pixelIndex + 2] = 0;
        emissiveData[pixelIndex + 3] = 255;
      } else {
        // Window pane interior: State determined per floor and bay
        // Creates realistic grouped office/lab occupancy rather than random speckles
        const floorHash = (floorIndex * 37 + bayIndex * 19 + 7) % 100;
        const normalizedYInPane = (yInFloor - spandrelHeight) / (floorHeight - spandrelHeight);
        // Soft ceiling-to-sill illumination gradient
        const verticalGlow = 0.85 + (1 - normalizedYInPane) * 0.3;

        if (floorHash < 20) {
          // Electric Cyan illuminated laboratory floor
          const r = Math.min(255, Math.floor(48 * verticalGlow));
          const g = Math.min(255, Math.floor(205 * verticalGlow));
          const b = Math.min(255, Math.floor(230 * verticalGlow));

          diffuseData[pixelIndex] = r;
          diffuseData[pixelIndex + 1] = g;
          diffuseData[pixelIndex + 2] = b;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = r;
          emissiveData[pixelIndex + 1] = g;
          emissiveData[pixelIndex + 2] = b;
          emissiveData[pixelIndex + 3] = 255;
        } else if (floorHash < 32) {
          // Primary Blue illuminated office floor
          const r = Math.min(255, Math.floor(32 * verticalGlow));
          const g = Math.min(255, Math.floor(95 * verticalGlow));
          const b = Math.min(255, Math.floor(225 * verticalGlow));

          diffuseData[pixelIndex] = r;
          diffuseData[pixelIndex + 1] = g;
          diffuseData[pixelIndex + 2] = b;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = r;
          emissiveData[pixelIndex + 1] = g;
          emissiveData[pixelIndex + 2] = b;
          emissiveData[pixelIndex + 3] = 255;
        } else if (floorHash < 36) {
          // Subtle Amber executive / status suite
          const r = Math.min(255, Math.floor(235 * verticalGlow));
          const g = Math.min(255, Math.floor(140 * verticalGlow));
          const b = Math.min(255, Math.floor(75 * verticalGlow));

          diffuseData[pixelIndex] = r;
          diffuseData[pixelIndex + 1] = g;
          diffuseData[pixelIndex + 2] = b;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = r;
          emissiveData[pixelIndex + 1] = g;
          emissiveData[pixelIndex + 2] = b;
          emissiveData[pixelIndex + 3] = 255;
        } else {
          // Dark reflective unlit architectural glazing
          diffuseData[pixelIndex] = 14;
          diffuseData[pixelIndex + 1] = 24;
          diffuseData[pixelIndex + 2] = 40;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = 0;
          emissiveData[pixelIndex + 1] = 0;
          emissiveData[pixelIndex + 2] = 0;
          emissiveData[pixelIndex + 3] = 255;
        }
      }
    }
  }

  const diffuseTex = new THREE.DataTexture(diffuseData, width, height, THREE.RGBAFormat);
  diffuseTex.wrapS = THREE.RepeatWrapping;
  diffuseTex.wrapT = THREE.RepeatWrapping;
  diffuseTex.repeat.set(1.5, 3.2); // Calibrated for realistic floor-to-floor scale
  diffuseTex.needsUpdate = true;

  const emissiveTex = new THREE.DataTexture(emissiveData, width, height, THREE.RGBAFormat);
  emissiveTex.wrapS = THREE.RepeatWrapping;
  emissiveTex.wrapT = THREE.RepeatWrapping;
  emissiveTex.repeat.set(1.5, 3.2);
  emissiveTex.needsUpdate = true;

  return { diffuseTex, emissiveTex };
}

export const { diffuseTex: windowDiffuseTexture, emissiveTex: windowEmissiveTexture } =
  createProceduralWindowTextures();

// ─────────────────────────────────────────────────────────────────────────────
// REFINED ARCHITECTURAL MATERIAL INSTANCES
// ─────────────────────────────────────────────────────────────────────────────

// High-Tech Window Facade Material: Balanced emissive intensity (0.55) to prevent noisy bloom
export const windowGridMaterial = new THREE.MeshStandardMaterial({
  map: windowDiffuseTexture,
  emissiveMap: windowEmissiveTexture,
  emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 0.55,
  roughness: 0.22,
  metalness: 0.65,
});

// Foundation and Ground Materials
export const groundBaseMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.bgPrimary),
  roughness: 0.88,
  metalness: 0.2,
});

export const districtPlatformMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.bgSecondary),
  roughness: 0.6,
  metalness: 0.45,
});

export const platformBorderMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalTitanium),
  roughness: 0.38,
  metalness: 0.75,
});

// Architectural Metallic Structures (Balanced metalness/roughness for diffuse legibility)
export const darkTitaniumMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalDark),
  roughness: 0.45,
  metalness: 0.55,
});

export const titaniumStructuralMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalTitanium),
  roughness: 0.4,
  metalness: 0.6,
});

export const blueSteelMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalSteelBlue),
  roughness: 0.42,
  metalness: 0.58,
});

export const metalExoskeletonMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalExoskeleton),
  roughness: 0.35,
  metalness: 0.68,
});

// Glass & Glazing Materials
export const glassCurtainMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.glassFacade),
  roughness: 0.15,
  metalness: 0.6,
});

export const reflectiveGlassMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.glassReflective),
  roughness: 0.1,
  metalness: 0.75,
});

export const clearGlassMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.glassClear),
  roughness: 0.08,
  metalness: 0.8,
});

// Emissive Illumination Materials
export const cyanGlowMaterial = new THREE.MeshBasicMaterial({
  color: new THREE.Color(CITY_COLORS.electricCyan),
});

export const blueGlowMaterial = new THREE.MeshBasicMaterial({
  color: new THREE.Color(CITY_COLORS.primaryBlue),
});

export const orangeGlowMaterial = new THREE.MeshBasicMaterial({
  color: new THREE.Color(CITY_COLORS.accentOrange),
});

export const subtleCyanEmissiveMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalDark),
  emissive: new THREE.Color(CITY_COLORS.electricCyan),
  emissiveIntensity: 0.45,
  roughness: 0.32,
  metalness: 0.65,
});

export const subtleOrangeEmissiveMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalDark),
  emissive: new THREE.Color(CITY_COLORS.accentOrange),
  emissiveIntensity: 0.45,
  roughness: 0.32,
  metalness: 0.65,
});

// Infrastructure & Road Materials
export const roadMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.roadSurface),
  roughness: 0.78,
  metalness: 0.3,
});

export const plazaMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.plazaPaving),
  roughness: 0.5,
  metalness: 0.5,
});

export const plazaAccentMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.plazaAccent),
  roughness: 0.42,
  metalness: 0.55,
});

// Minimal Futuristic Vegetation
export const futuristicPlanterMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.vegetationDark),
  roughness: 0.7,
  metalness: 0.25,
});

export const bioluminescentFloraMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.vegetationNeon),
  emissive: new THREE.Color('#15d4ba'),
  emissiveIntensity: 0.3,
  roughness: 0.45,
  metalness: 0.15,
});
