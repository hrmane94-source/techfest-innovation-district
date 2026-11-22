import * as THREE from 'three';

/**
 * Shared Architectural Materials & Procedural Facade Textures (Milestone 4: Architectural Realism)
 * Direction: Professional Architectural Visualization & Authentic Futuristic University Campus
 *
 * Enhancements:
 * - Differentiated architectural facade systems: Curtain walls, academic ribbon windows, industrial clerestory glazing
 * - Physically grounded materials: Matte precast architectural concrete, satin titanium, brushed aluminium, transparent lobby glazing
 * - Reduced emissive glare: Ambient and directional sunlight now create real depth, shadows, and contact reveals
 * - Realistic glass reflection and transparency
 */

export const CITY_COLORS = {
  bgPrimary: '#070E1C',         // Luminous deep space navy
  bgSecondary: '#0E1A2E',       // Raised podium fill
  metalDark: '#1E293B',         // Architectural slate titanium
  metalTitanium: '#475569',     // Sculpted titanium with crisp diffuse readability
  metalSteelBlue: '#334155',    // Structural steel with subtle navy tint
  metalAccent: '#94A3B8',       // Mechanical brackets & mullions
  metalExoskeleton: '#60A5FA',  // Exposed diagrids & external trusses
  metalBrushed: '#CBD5E1',      // Polished structural alloy
  pearlWhite: '#F8FAFC',        // Pearl white architectural precast concrete
  softSilver: '#E2E8F0',        // Satin metallic silver accents
  lightTitanium: '#CBD5E1',     // Light titanium alloy
  glassFacade: '#1E3A5F',       // Tinted architectural curtain glazing
  glassReflective: '#1E40AF',   // High-reflectance sky-deck glass
  glassClear: '#93C5FD',        // Clear transparent observation & lobby glass
  primaryBlue: '#246BFD',       // Techfest signature electric blue
  electricCyan: '#00E5FF',      // Luminous cyan accent
  accentOrange: '#FF7A00',      // Industrial / telemetry amber
  accentWarm: '#FFD8A8',        // Warm architectural interior accent
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
// 1. PROCEDURAL ARCHITECTURAL CURTAIN WALL (Offices, Atriums, Towers)
// ─────────────────────────────────────────────────────────────────────────────

function createProceduralWindowTextures() {
  const width = 128;
  const height = 128;
  const diffuseData = new Uint8Array(width * height * 4);
  const emissiveData = new Uint8Array(width * height * 4);

  // 8 distinct architectural floors (16 pixels per floor)
  // Each floor: 3px horizontal spandrel beam, 13px glazed window zone
  // 4 bays per floor (32px per bay), separated by 2px vertical mullion columns
  const floorHeight = 16;
  const spandrelHeight = 3;
  const bayWidth = 32;
  const mullionWidth = 2;

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
        // Architectural dark slate aluminium spandrel beam & mullion column
        diffuseData[pixelIndex] = 45;
        diffuseData[pixelIndex + 1] = 55;
        diffuseData[pixelIndex + 2] = 75;
        diffuseData[pixelIndex + 3] = 255;

        emissiveData[pixelIndex] = 0;
        emissiveData[pixelIndex + 1] = 0;
        emissiveData[pixelIndex + 2] = 0;
        emissiveData[pixelIndex + 3] = 255;
      } else {
        // Window pane interior: State determined per floor and bay
        const floorHash = (floorIndex * 37 + bayIndex * 19 + 7) % 100;
        const normalizedYInPane = (yInFloor - spandrelHeight) / (floorHeight - spandrelHeight);
        const verticalGlow = 0.8 + (1 - normalizedYInPane) * 0.25;

        if (floorHash < 24) {
          // Soft cyan illuminated lab
          const r = Math.min(255, Math.floor(40 * verticalGlow));
          const g = Math.min(255, Math.floor(160 * verticalGlow));
          const b = Math.min(255, Math.floor(210 * verticalGlow));

          diffuseData[pixelIndex] = r;
          diffuseData[pixelIndex + 1] = g;
          diffuseData[pixelIndex + 2] = b;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = Math.floor(r * 0.45);
          emissiveData[pixelIndex + 1] = Math.floor(g * 0.45);
          emissiveData[pixelIndex + 2] = Math.floor(b * 0.45);
          emissiveData[pixelIndex + 3] = 255;
        } else if (floorHash < 48) {
          // Soft blue computational research floor
          const r = Math.min(255, Math.floor(35 * verticalGlow));
          const g = Math.min(255, Math.floor(85 * verticalGlow));
          const b = Math.min(255, Math.floor(175 * verticalGlow));

          diffuseData[pixelIndex] = r;
          diffuseData[pixelIndex + 1] = g;
          diffuseData[pixelIndex + 2] = b;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = Math.floor(r * 0.4);
          emissiveData[pixelIndex + 1] = Math.floor(g * 0.4);
          emissiveData[pixelIndex + 2] = Math.floor(b * 0.4);
          emissiveData[pixelIndex + 3] = 255;
        } else if (floorHash < 68) {
          // Warm ambient student study / faculty office
          const r = Math.min(255, Math.floor(210 * verticalGlow));
          const g = Math.min(255, Math.floor(165 * verticalGlow));
          const b = Math.min(255, Math.floor(115 * verticalGlow));

          diffuseData[pixelIndex] = r;
          diffuseData[pixelIndex + 1] = g;
          diffuseData[pixelIndex + 2] = b;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = Math.floor(r * 0.45);
          emissiveData[pixelIndex + 1] = Math.floor(g * 0.45);
          emissiveData[pixelIndex + 2] = Math.floor(b * 0.45);
          emissiveData[pixelIndex + 3] = 255;
        } else {
          // Highly reflective deep architectural glass
          diffuseData[pixelIndex] = 30;
          diffuseData[pixelIndex + 1] = 50;
          diffuseData[pixelIndex + 2] = 85;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = 5;
          emissiveData[pixelIndex + 1] = 10;
          emissiveData[pixelIndex + 2] = 20;
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
// 2. PROCEDURAL ACADEMIC RIBBON WINDOW TEXTURE (AI, Cyber, Library Wings)
// ─────────────────────────────────────────────────────────────────────────────

function createRibbonWindowTextures() {
  const width = 128;
  const height = 128;
  const diffuseData = new Uint8Array(width * height * 4);
  const emissiveData = new Uint8Array(width * height * 4);

  // 4 floors (32 pixels per floor)
  // Each floor: 14px precast concrete spandrel band, 18px horizontal ribbon glass
  // Vertical mullion dividing panes every 24 pixels
  const floorHeight = 32;
  const spandrelHeight = 14;
  const paneWidth = 24;
  const mullionWidth = 2;

  for (let y = 0; y < height; y++) {
    const floorIndex = Math.floor(y / floorHeight);
    const yInFloor = y % floorHeight;
    const isSpandrel = yInFloor < spandrelHeight;

    for (let x = 0; x < width; x++) {
      const xInPane = x % paneWidth;
      const isMullion = xInPane < mullionWidth;
      const pixelIndex = (y * width + x) * 4;

      if (isSpandrel) {
        // Architectural Precast Concrete Spandrel Band with Subtle Joint
        const isJoint = yInFloor === 0 || yInFloor === spandrelHeight - 1;
        const c = isJoint ? 180 : 220;
        diffuseData[pixelIndex] = c;
        diffuseData[pixelIndex + 1] = c + 5;
        diffuseData[pixelIndex + 2] = c + 10;
        diffuseData[pixelIndex + 3] = 255;

        emissiveData[pixelIndex] = 0;
        emissiveData[pixelIndex + 1] = 0;
        emissiveData[pixelIndex + 2] = 0;
        emissiveData[pixelIndex + 3] = 255;
      } else if (isMullion) {
        // Anodized dark charcoal aluminium mullion
        diffuseData[pixelIndex] = 50;
        diffuseData[pixelIndex + 1] = 58;
        diffuseData[pixelIndex + 2] = 70;
        diffuseData[pixelIndex + 3] = 255;

        emissiveData[pixelIndex] = 0;
        emissiveData[pixelIndex + 1] = 0;
        emissiveData[pixelIndex + 2] = 0;
        emissiveData[pixelIndex + 3] = 255;
      } else {
        // Recessed ribbon glazing
        const paneHash = (floorIndex * 17 + Math.floor(x / paneWidth) * 31) % 100;
        if (paneHash < 35) {
          // Soft cyan lab daylighting
          diffuseData[pixelIndex] = 40;
          diffuseData[pixelIndex + 1] = 135;
          diffuseData[pixelIndex + 2] = 190;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = 20;
          emissiveData[pixelIndex + 1] = 65;
          emissiveData[pixelIndex + 2] = 95;
          emissiveData[pixelIndex + 3] = 255;
        } else if (paneHash < 65) {
          // Warm interior study light
          diffuseData[pixelIndex] = 185;
          diffuseData[pixelIndex + 1] = 150;
          diffuseData[pixelIndex + 2] = 105;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = 80;
          emissiveData[pixelIndex + 1] = 65;
          emissiveData[pixelIndex + 2] = 45;
          emissiveData[pixelIndex + 3] = 255;
        } else {
          // Tinted solar glass
          diffuseData[pixelIndex] = 35;
          diffuseData[pixelIndex + 1] = 55;
          diffuseData[pixelIndex + 2] = 90;
          diffuseData[pixelIndex + 3] = 255;

          emissiveData[pixelIndex] = 5;
          emissiveData[pixelIndex + 1] = 10;
          emissiveData[pixelIndex + 2] = 20;
          emissiveData[pixelIndex + 3] = 255;
        }
      }
    }
  }

  const diffuseTex = new THREE.DataTexture(diffuseData, width, height, THREE.RGBAFormat);
  diffuseTex.wrapS = THREE.RepeatWrapping;
  diffuseTex.wrapT = THREE.RepeatWrapping;
  diffuseTex.repeat.set(1.0, 1.0);
  diffuseTex.needsUpdate = true;

  const emissiveTex = new THREE.DataTexture(emissiveData, width, height, THREE.RGBAFormat);
  emissiveTex.wrapS = THREE.RepeatWrapping;
  emissiveTex.wrapT = THREE.RepeatWrapping;
  emissiveTex.repeat.set(1.0, 1.0);
  emissiveTex.needsUpdate = true;

  return { diffuseTex, emissiveTex };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. PROCEDURAL INDUSTRIAL CLERESTORY TEXTURE (Robotics & Engineering Bays)
// ─────────────────────────────────────────────────────────────────────────────

function createIndustrialClerestoryTextures() {
  const width = 64;
  const height = 64;
  const diffuseData = new Uint8Array(width * height * 4);
  const emissiveData = new Uint8Array(width * height * 4);

  // Multi-pane industrial steel grid (8x8 pixel panes with 1px steel muntins)
  const paneSize = 16;
  const muntinWidth = 2;

  for (let y = 0; y < height; y++) {
    const isHorizontalMuntin = y % paneSize < muntinWidth;
    for (let x = 0; x < width; x++) {
      const isVerticalMuntin = x % paneSize < muntinWidth;
      const idx = (y * width + x) * 4;

      if (isHorizontalMuntin || isVerticalMuntin) {
        // Steel structural mullion / muntin bar
        diffuseData[idx] = 35;
        diffuseData[idx + 1] = 40;
        diffuseData[idx + 2] = 50;
        diffuseData[idx + 3] = 255;

        emissiveData[idx] = 0;
        emissiveData[idx + 1] = 0;
        emissiveData[idx + 2] = 0;
        emissiveData[idx + 3] = 255;
      } else {
        // Translucent wired glass / industrial daylighting
        diffuseData[idx] = 120;
        diffuseData[idx + 1] = 145;
        diffuseData[idx + 2] = 175;
        diffuseData[idx + 3] = 255;

        emissiveData[idx] = 35;
        emissiveData[idx + 1] = 45;
        emissiveData[idx + 2] = 60;
        emissiveData[idx + 3] = 255;
      }
    }
  }

  const diffuseTex = new THREE.DataTexture(diffuseData, width, height, THREE.RGBAFormat);
  diffuseTex.wrapS = THREE.RepeatWrapping;
  diffuseTex.wrapT = THREE.RepeatWrapping;
  diffuseTex.repeat.set(2.0, 1.0);
  diffuseTex.needsUpdate = true;

  const emissiveTex = new THREE.DataTexture(emissiveData, width, height, THREE.RGBAFormat);
  emissiveTex.wrapS = THREE.RepeatWrapping;
  emissiveTex.wrapT = THREE.RepeatWrapping;
  emissiveTex.repeat.set(2.0, 1.0);
  emissiveTex.needsUpdate = true;

  return { diffuseTex, emissiveTex };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. PROCEDURAL INDUSTRIAL HAZARD STRIPING (Robotics & Assembly)
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
        data[idx] = 255;
        data[idx + 1] = 155;
        data[idx + 2] = 40;
        data[idx + 3] = 255;
      } else {
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
// 5. PROCEDURAL PHOTOVOLTAIC / SOLAR PANEL TEXTURE (Rooftops & Energy Arrays)
// ─────────────────────────────────────────────────────────────────────────────

function createSolarPanelTexture() {
  const size = 64;
  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const isBusbar = x % 16 === 0 || y % 16 === 0;

      if (isBusbar) {
        data[idx] = 60;
        data[idx + 1] = 140;
        data[idx + 2] = 200;
        data[idx + 3] = 255;
      } else {
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

export const { diffuseTex: ribbonDiffuseTexture, emissiveTex: ribbonEmissiveTexture } =
  createRibbonWindowTextures();

export const { diffuseTex: clerestoryDiffuseTexture, emissiveTex: clerestoryEmissiveTexture } =
  createIndustrialClerestoryTextures();

export const hazardStripeTexture = createHazardStripeTexture();
export const solarPanelTexture = createSolarPanelTexture();

// ─────────────────────────────────────────────────────────────────────────────
// REFINED ARCHITECTURAL MATERIAL INSTANCES (Physically Plausible & Grounded)
// ─────────────────────────────────────────────────────────────────────────────

// Standard Window Curtain Wall Material (Vibrant Architectural Glow & Crisp Definition)
export const windowGridMaterial = new THREE.MeshStandardMaterial({
  map: windowDiffuseTexture,
  emissiveMap: windowEmissiveTexture,
  emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 0.68,
  roughness: 0.18,
  metalness: 0.78,
});

// Academic Ribbon Window Material (AI, Cyber, Library Facades)
export const ribbonWindowMaterial = new THREE.MeshStandardMaterial({
  map: ribbonDiffuseTexture,
  emissiveMap: ribbonEmissiveTexture,
  emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 0.65,
  roughness: 0.22,
  metalness: 0.65,
});

// Industrial High-Bay Clerestory Glazing (Robotics & Engineering Bay)
export const industrialWindowMaterial = new THREE.MeshStandardMaterial({
  map: clerestoryDiffuseTexture,
  emissiveMap: clerestoryEmissiveTexture,
  emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 0.60,
  roughness: 0.25,
  metalness: 0.72,
});

// Architectural Cladding: Matte Pearl-White Precast Concrete (Realistic Architectural Texture)
export const pearlWhiteMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.pearlWhite),
  roughness: 0.45,
  metalness: 0.12,
});
export const pearlWhiteConcreteMaterial = pearlWhiteMaterial;

// Light Grey Precast Structural Concrete
export const precastConcreteMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#CBD5E1'),
  roughness: 0.65,
  metalness: 0.08,
});

// Satin Architectural Aluminium Cladding
export const softSilverMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.softSilver),
  roughness: 0.32,
  metalness: 0.65,
});

// Light Titanium Alloy
export const lightTitaniumMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.lightTitanium),
  roughness: 0.28,
  metalness: 0.58,
});

// Foundation and Ground Materials
export const groundBaseMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.bgPrimary),
  roughness: 0.75,
  metalness: 0.28,
});

export const districtPlatformMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.bgSecondary),
  roughness: 0.48,
  metalness: 0.45,
});

export const platformBorderMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalTitanium),
  roughness: 0.28,
  metalness: 0.75,
});

// Architectural Metallic Structures
export const darkTitaniumMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalDark),
  roughness: 0.38,
  metalness: 0.55,
});

export const titaniumStructuralMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalTitanium),
  roughness: 0.32,
  metalness: 0.72,
});

export const satinTitaniumMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#64748B'),
  roughness: 0.30,
  metalness: 0.70,
});

export const blueSteelMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalSteelBlue),
  roughness: 0.32,
  metalness: 0.65,
});

export const metalExoskeletonMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalExoskeleton),
  roughness: 0.35,
  metalness: 0.68,
});

export const brushedAlloyMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalBrushed),
  roughness: 0.26,
  metalness: 0.82,
});

export const louverAlloyMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalAccent),
  roughness: 0.35,
  metalness: 0.65,
});

export const carbonFiberMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#0c131d'),
  roughness: 0.6,
  metalness: 0.25,
});

// Glass & Glazing Materials (Believable Reflections, Clean Transparency)
export const glassCurtainMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.glassFacade),
  roughness: 0.08,
  metalness: 0.85,
  transparent: true,
  opacity: 0.82,
});

export const reflectiveGlassMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.glassReflective),
  roughness: 0.04,
  metalness: 0.94,
});

export const clearGlassMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.glassClear),
  roughness: 0.05,
  metalness: 0.30,
  transparent: true,
  opacity: 0.60,
});

export const clearLobbyGlassMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#BFDBFE'),
  roughness: 0.04,
  metalness: 0.15,
  transparent: true,
  opacity: 0.42,
  depthWrite: false,
});

export const structuralGlassMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#1c426e'),
  roughness: 0.08,
  metalness: 0.80,
  transparent: true,
  opacity: 0.68,
});

// Emissive Illumination Materials (Architectural Accents)
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
  emissiveIntensity: 0.40,
  roughness: 0.32,
  metalness: 0.65,
});

export const subtleOrangeEmissiveMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalDark),
  emissive: new THREE.Color(CITY_COLORS.accentOrange),
  emissiveIntensity: 0.40,
  roughness: 0.32,
  metalness: 0.65,
});

// Infrastructure & Road Materials
export const roadMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.roadSurface),
  roughness: 0.78,
  metalness: 0.28,
});

export const plazaMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.plazaPaving),
  roughness: 0.52,
  metalness: 0.48,
});

export const plazaAccentMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.plazaAccent),
  roughness: 0.44,
  metalness: 0.54,
});

export const hazardStripeMaterial = new THREE.MeshStandardMaterial({
  map: hazardStripeTexture,
  roughness: 0.42,
  metalness: 0.48,
});

export const solarPanelMaterial = new THREE.MeshStandardMaterial({
  map: solarPanelTexture,
  roughness: 0.15,
  metalness: 0.85,
});

// Campus Landscape & Turf
export const campusLawnMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#163c2c'),
  roughness: 0.88,
  metalness: 0.08,
});

export const campusWoodBenchMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#8b5a2b'),
  roughness: 0.72,
  metalness: 0.12,
});

export const futuristicPlanterMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.vegetationDark),
  roughness: 0.65,
  metalness: 0.28,
});

export const bioluminescentFloraMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.vegetationNeon),
  emissive: new THREE.Color(CITY_COLORS.vegetationCyan),
  emissiveIntensity: 0.32,
  roughness: 0.45,
  metalness: 0.18,
});
