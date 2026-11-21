import * as THREE from 'three';

/**
 * Shared Architectural Materials & Color Constants
 * Optimized for performance by reusing material instances across the city
 */

export const CITY_COLORS = {
  bgPrimary: '#050A14',
  bgSecondary: '#091426',
  metalDark: '#0e1726',
  metalTitanium: '#1a2638',
  metalSteelBlue: '#162842',
  metalAccent: '#283c5a',
  glassFacade: '#0b1d33',
  glassReflective: '#102d4f',
  primaryBlue: '#246BFD',
  electricCyan: '#39DDF4',
  accentOrange: '#FF9B54',
  roadSurface: '#070d18',
  roadMarking: '#1e3a63',
  plazaPaving: '#0f1a2e',
  plazaAccent: '#162b4c',
  vegetationDark: '#0a1d1d',
  vegetationNeon: '#104d49',
} as const;

// Foundation and Ground Materials
export const groundBaseMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.bgPrimary),
  roughness: 0.9,
  metalness: 0.2,
});

export const districtPlatformMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.bgSecondary),
  roughness: 0.7,
  metalness: 0.4,
});

export const platformBorderMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalTitanium),
  roughness: 0.4,
  metalness: 0.8,
});

// Architectural Metallic Structures
export const darkTitaniumMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalDark),
  roughness: 0.35,
  metalness: 0.85,
});

export const titaniumStructuralMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalTitanium),
  roughness: 0.3,
  metalness: 0.9,
});

export const blueSteelMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.metalSteelBlue),
  roughness: 0.4,
  metalness: 0.75,
});

// Glass & Glazing Materials
export const glassCurtainMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.glassFacade),
  roughness: 0.15,
  metalness: 0.65,
});

export const reflectiveGlassMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.glassReflective),
  roughness: 0.1,
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
  emissiveIntensity: 0.4,
  roughness: 0.3,
  metalness: 0.8,
});

// Infrastructure & Road Materials
export const roadMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.roadSurface),
  roughness: 0.85,
  metalness: 0.3,
});

export const plazaMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.plazaPaving),
  roughness: 0.6,
  metalness: 0.5,
});

// Minimal Futuristic Vegetation
export const futuristicPlanterMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.vegetationDark),
  roughness: 0.8,
  metalness: 0.2,
});

export const bioluminescentFloraMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(CITY_COLORS.vegetationNeon),
  emissive: new THREE.Color('#15d4ba'),
  emissiveIntensity: 0.25,
  roughness: 0.5,
  metalness: 0.1,
});
