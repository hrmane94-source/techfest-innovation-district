import * as THREE from 'three';

/**
 * Shared Architectural Materials & Procedural Facade Textures (Milestone 2.3)
 * Direction: Premium Futuristic Architectural Visualization & Realistic Innovation District
 *
 * Enhancements:
 * - High-fidelity procedural window textures with multi-state office/lab/server interior illumination
 * - Procedural industrial hazard stripe texture for Robotics & Automation zones
 * - Procedural photovoltaic / solar panel grid texture for clean-tech rooftops
 * - Balanced physical properties (metalness, roughness, clearcoat) for daylight & night contrast
 * - Refined glass materials with believable reflectivity and depth
 */

export const CITY_COLORS = {
  bgPrimary: '#070E1C',         // Luminous deep space navy
  bgSecondary: '#0E1A2E',       // Raised podium fill
  metalDark: '#334155',         // Sleek architectural slate titanium
  metalTitanium: '#64748B',     // Sculpted titanium with crisp diffuse readability
  metalSteelBlue: '#475569',    // Structural steel with subtle navy tint
  metalAccent: '#94A3B8',       // Mechanical brackets & secondary mullions
  metalExoskeleton: '#60A5FA',  // Exposed diagrids & external trusses
  metalBrushed: '#CBD5E1',      // Polished structural alloy
  pearlWhite: '#FFFFFF',        // Pearl white architectural cladding
  softSilver: '#F1F5F9',        // Metallic silver accents
  lightTitanium: '#CBD5E1',     // Light titanium alloy
  glassFacade: '#1E3A5F',       // Tinted architectural curtain glazing
  glassReflective: '#2563EB',   // High-reflectance sky-deck glass
  glassClear: '#38BDF8',        // Clear observation glass
  primaryBlue: '#246BFD',       // Techfest signature electric blue
  electricCyan: '#00E5FF',      // Luminous cyan accent
  accentOrange: '#FF7A00',      // Industrial / telemetry amber
  accentWarm: '#FFB370',        // Warm architectural interior accent
  accentRed: '#FF4757',         // Aviation beacon / warning light
  roadSurface: '#131E32',       // Refined asphalt road with diffuse readability
  roadMarking: '#38BDF8',       // Road lane divider
  plazaPaving: '#1E293B',       // Architectural granite paving
  plazaAccent: '#334155',       // Raised terrace paving
  vegetationDark: '#0D2622',    // Bio-pod soil & planters
  vegetationNeon: '#147D75',    // Bioluminescent foliage
  vegetationCyan: '#22F4D5',    // Glowing flora tip
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
  // Each floor: 4px horizontal spandrel beam, 12px glazed window zone
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
        // Bright architectural titanium spandrel beam & mullion column
        diffuseData[pixelIndex] = 75;
        diffuseData[pixelIndex + 1] = 95;
        diffuseData[pixelIndex + 2] = 125;
        diffuseData[pixelIndex + 3] = 255;

        emissiveData[pixelIndex] = 10;
        emissiveData[pixelIndex + 1] = 15;
        emissiveData[pixelIndex + 2] = 25;
        emissiveData[pixelIndex + 3] = 255;
      } else {
        // Window pane interior: State determined per floor and bay
        const floorHash = (floorIndex * 37 + bayIndex * 19 + 7) % 100;
        const normalizedYInPane = (yInFloor - spandrelHeight) / (floorHeight - spandrelHeight);
        const verticalGlow = 0.9 + (1 - normalizedYInPane) * 0.35;

        if (floorHash < 28) {
          // Electric Cyan illuminated laboratory / cleanroom floor
          const r = Math.min(255, Math.floor(55 * verticalGlow));
          const g = Math.min(255, Math.floor(225 * verticalGlow));
          const b = Math.min(255, Math.floor(255 * verticalGlow));

          diffuseData[pixelIndex] = r;
          diffuseData[pixelIndex + 1] = g;
          diffuseData[pixelIndex + 2] = b;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = Math.floor(r * 0.95);
          emissiveData[pixelIndex + 1] = Math.floor(g * 0.95);
          emissiveData[pixelIndex + 2] = Math.floor(b * 0.95);
          emissiveData[pixelIndex + 3] = 255;
        } else if (floorHash < 54) {
          // Primary Blue illuminated computational / data centre floor
          const r = Math.min(255, Math.floor(56 * verticalGlow));
          const g = Math.min(255, Math.floor(140 * verticalGlow));
          const b = Math.min(255, Math.floor(255 * verticalGlow));

          diffuseData[pixelIndex] = r;
          diffuseData[pixelIndex + 1] = g;
          diffuseData[pixelIndex + 2] = b;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = Math.floor(r * 0.9);
          emissiveData[pixelIndex + 1] = Math.floor(g * 0.9);
          emissiveData[pixelIndex + 2] = Math.floor(b * 0.9);
          emissiveData[pixelIndex + 3] = 255;
        } else if (floorHash < 70) {
          // Warm amber executive suite / collaboration zone
          const r = Math.min(255, Math.floor(255 * verticalGlow));
          const g = Math.min(255, Math.floor(185 * verticalGlow));
          const b = Math.min(255, Math.floor(110 * verticalGlow));

          diffuseData[pixelIndex] = r;
          diffuseData[pixelIndex + 1] = g;
          diffuseData[pixelIndex + 2] = b;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = Math.floor(r * 0.88);
          emissiveData[pixelIndex + 1] = Math.floor(g * 0.88);
          emissiveData[pixelIndex + 2] = Math.floor(b * 0.88);
          emissiveData[pixelIndex + 3] = 255;
        } else if (floorHash < 86) {
          // Luminous pearl-white collaborative studio floor
          const r = Math.min(255, Math.floor(240 * verticalGlow));
          const g = Math.min(255, Math.floor(245 * verticalGlow));
          const b = Math.min(255, Math.floor(255 * verticalGlow));

          diffuseData[pixelIndex] = r;
          diffuseData[pixelIndex + 1] = g;
          diffuseData[pixelIndex + 2] = b;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = Math.floor(r * 0.85);
          emissiveData[pixelIndex + 1] = Math.floor(g * 0.85);
          emissiveData[pixelIndex + 2] = Math.floor(b * 0.85);
          emissiveData[pixelIndex + 3] = 255;
        } else {
          // Softly reflective sky-blue architectural curtain glazing
          diffuseData[pixelIndex] = 60;
          diffuseData[pixelIndex + 1] = 90;
          diffuseData[pixelIndex + 2] = 135;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = 15;
          emissiveData[pixelIndex + 1] = 25;
          emissiveData[pixelIndex + 2] = 45;
          emissiveData[pixelIndex + 3] = 255;
        }
      }
    }
  }

  const diffuseTex = new THREE.DataTexture(diffuseData, width, height, THREE.RGBAFormat);
  diffuseTex.wrapS = THREE.RepeatWrapping;
  diffuseTex.wrapT = THREE.RepeatWrapping;
  diffuseTex.repeat.set(1.5, 3.2);
  diffuseTex.needsUpdate = true;

  const emissiveTex = new THREE.DataTexture(emissiveData, width, height, THREE.RGBAFormat);
  emissiveTex.wrapS = THREE.RepeatWrapping;
  emissiveTex.wrapT = THREE.RepeatWrapping;
  emissiveTex.repeat.set(1.5, 3.2);
  emissiveTex.needsUpdate = true;

  return { diffuseTex, emissiveTex };
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCEDURAL INDUSTRIAL HAZARD STRIPING (Robotics & Assembly)
// ─────────────────────────────────────────────────────────────────────────────

function createHazardStripeTexture() {
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  const stripeWidth = 8;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const stripe = Math.floor((x + y) / stripeWidth) % 2 === 0;

      if (stripe) {
        // Warning Amber / Orange
        data[idx] = 255;
        data[idx + 1] = 155;
        data[idx + 2] = 40;
        data[idx + 3] = 255;
      } else {
        // Industrial Matte Charcoal
        data[idx] = 20;
        data[idx + 1] = 24;
        data[idx + 2] = 32;
        data[idx + 3] = 255;
      }
    }
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 1);
  tex.needsUpdate = true;
  return tex;
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCEDURAL PHOTOVOLTAIC / SOLAR PANEL TEXTURE (Rooftops & Energy Arrays)
// ─────────────────────────────────────────────────────────────────────────────

function createSolarPanelTexture() {
  const size = 64;
  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const isBusbar = x % 16 === 0 || y % 16 === 0;

      if (isBusbar) {
        // Metallic silver busbar conductor
        data[idx] = 60;
        data[idx + 1] = 140;
        data[idx + 2] = 200;
        data[idx + 3] = 255;
      } else {
        // Deep blue anti-reflective crystalline silicon cell
        data[idx] = 12;
        data[idx + 1] = 28;
        data[idx + 2] = 58;
        data[idx + 3] = 255;
      }
    }
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  tex.needsUpdate = true;
  return tex;
}

export const { diffuseTex: windowDiffuseTexture, emissiveTex: windowEmissiveTexture } =
  createProceduralWindowTextures();

export const hazardStripeTexture = createHazardStripeTexture();
export const solarPanelTexture = createSolarPanelTexture();

// ─────────────────────────────────────────────────────────────────────────────
// REFINED ARCHITECTURAL MATERIAL INSTANCES
// ─────────────────────────────────────────────────────────────────────────────

// High-Tech Window Facade Material (Bright Futurism Luminous Elevation)
export const windowGridMaterial = new THREE.MeshStandardMaterial({
  map: windowDiffuseTexture,
  emissiveMap: windowEmissiveTexture,
  emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 0.95,
  roughness: 0.16,
  metalness: 0.52,
});

// Pearl White, Soft Silver & Light Titanium Cladding
export const pearlWhiteMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.pearlWhite),
  roughness: 0.15,
  metalness: 0.35,
});

export const softSilverMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.softSilver),
  roughness: 0.18,
  metalness: 0.58,
});

export const lightTitaniumMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.lightTitanium),
  roughness: 0.24,
  metalness: 0.52,
});

// Foundation and Ground Materials
export const groundBaseMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.bgPrimary),
  roughness: 0.75,
  metalness: 0.28,
});

export const districtPlatformMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.bgSecondary),
  roughness: 0.42,
  metalness: 0.55,
});

export const platformBorderMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalTitanium),
  roughness: 0.25,
  metalness: 0.78,
});

// Architectural Metallic Structures
export const darkTitaniumMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalDark),
  roughness: 0.32,
  metalness: 0.65,
});

export const titaniumStructuralMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalTitanium),
  roughness: 0.28,
  metalness: 0.70,
});

export const blueSteelMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalSteelBlue),
  roughness: 0.30,
  metalness: 0.68,
});

export const metalExoskeletonMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalExoskeleton),
  roughness: 0.32,
  metalness: 0.72,
});

export const brushedAlloyMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalBrushed),
  roughness: 0.28,
  metalness: 0.8,
});

export const carbonFiberMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#0c131d'),
  roughness: 0.6,
  metalness: 0.25,
});

// Glass & Glazing Materials
export const glassCurtainMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.glassFacade),
  roughness: 0.1,
  metalness: 0.8,
  transparent: true,
  opacity: 0.85,
});

export const reflectiveGlassMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.glassReflective),
  roughness: 0.05,
  metalness: 0.95,
});

export const clearGlassMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.glassClear),
  roughness: 0.06,
  metalness: 0.88,
  transparent: true,
  opacity: 0.72,
});

export const structuralGlassMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#1c426e'),
  roughness: 0.08,
  metalness: 0.85,
  transparent: true,
  opacity: 0.6,
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

export const whiteGlowMaterial = new THREE.MeshBasicMaterial({
  color: new THREE.Color('#ffffff'),
});

export const warmGlowMaterial = new THREE.MeshBasicMaterial({
  color: new THREE.Color(CITY_COLORS.accentWarm),
});

export const redBeaconMaterial = new THREE.MeshBasicMaterial({
  color: new THREE.Color(CITY_COLORS.accentRed),
});

export const subtleCyanEmissiveMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalDark),
  emissive: new THREE.Color(CITY_COLORS.electricCyan),
  emissiveIntensity: 0.45,
  roughness: 0.3,
  metalness: 0.7,
});

export const subtleOrangeEmissiveMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalDark),
  emissive: new THREE.Color(CITY_COLORS.accentOrange),
  emissiveIntensity: 0.45,
  roughness: 0.3,
  metalness: 0.7,
});

// Infrastructure & Road Materials
export const roadMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.roadSurface),
  roughness: 0.75,
  metalness: 0.35,
});

export const plazaMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.plazaPaving),
  roughness: 0.48,
  metalness: 0.52,
});

export const plazaAccentMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.plazaAccent),
  roughness: 0.4,
  metalness: 0.58,
});

export const hazardStripeMaterial = new THREE.MeshStandardMaterial({
  map: hazardStripeTexture,
  roughness: 0.4,
  metalness: 0.5,
});

export const solarPanelMaterial = new THREE.MeshStandardMaterial({
  map: solarPanelTexture,
  roughness: 0.12,
  metalness: 0.88,
});

// Minimal Futuristic Vegetation & Campus Landscape
export const campusLawnMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#163c2c'),
  roughness: 0.85,
  metalness: 0.1,
});

export const campusWoodBenchMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#8b5a2b'),
  roughness: 0.7,
  metalness: 0.15,
});

export const futuristicPlanterMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.vegetationDark),
  roughness: 0.65,
  metalness: 0.3,
});

export const bioluminescentFloraMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.vegetationNeon),
  emissive: new THREE.Color(CITY_COLORS.vegetationCyan),
  emissiveIntensity: 0.35,
  roughness: 0.4,
  metalness: 0.2,
});
