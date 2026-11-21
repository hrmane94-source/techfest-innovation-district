# 3D Asset Integration Guide — TECHFEST Innovation District

This guide defines the standards, asset organization, optimization requirements, and coding conventions for integrating external 3D models into the TECHFEST 3D city scene.

---

## 1. Supported Formats & File Standards

| Format | Extension | Recommendation | Notes |
| :--- | :--- | :--- | :--- |
| **glTF Binary** | `.glb` | **Strongly Recommended** | Self-contained single file containing geometry, UVs, textures, and animations. Fastest network load and parse times. |
| **glTF Separate** | `.gltf` + `.bin` + images | Supported with care | Useful during active DCC export (Blender, Maya), but should be packed to `.glb` before production deployment. |

> [!IMPORTANT]
> Always prefer **Draco-compressed** or **Meshopt-compressed** `.glb` files for production to minimize network payloads and parse latency.

---

## 2. Directory Structure

Place all external 3D assets and textures in the designated folders under `public/`:

```text
public/
├── models/
│   ├── architecture/       # Unique buildings, spires, pavilions, entrance gates
│   ├── robotics/           # Robotic arms, automated vehicles, industrial gantry assets
│   ├── aerospace/          # Aircraft, satellite dishes, launch vehicles, telemetry domes
│   └── environment/        # Street furniture, bollards, skybridges, custom terrain props
└── textures/               # Standalone diffuse, roughness, normal, or emissive maps
```

- **Path Resolution**: Assets placed in `public/models/...` are served from the root URL.
  - Example: A file located at `public/models/aerospace/radar_dish.glb` is referenced as `/models/aerospace/radar_dish.glb`.

---

## 3. How to Reference Models in Scene Components

### Option A: The Declarative `<ModelLoader />` Component (Recommended)

Use the built-in `ModelLoader` component from `@/scene/models` or `@/scene`. It includes automatic `Suspense` handling, `ModelErrorBoundary` protection against 404s/parse failures, and automatic cloning:

```tsx
import { ModelLoader } from '../models';

export function AerospaceSector() {
  return (
    <group name="aerospace-assets">
      <ModelLoader
        url="/models/aerospace/radar_dish.glb"
        position={[-24, 0.9, 22]}
        rotation={[0, Math.PI / 4, 0]}
        scale={1.5}
        castShadow
        receiveShadow
        clone={true} // Set to true when rendering multiple copies of the same model
      />
    </group>
  );
}
```

### Option B: The Programmatic `useModelAsset` Hook

Use `useModelAsset` when you need direct access to specific nodes, animations, or materials:

```tsx
import { useModelAsset } from '../../hooks';

export function RoboticArmAsset() {
  const { scene, nodes, materials } = useModelAsset('/models/robotics/assembly_arm.glb');

  // Custom node inspection or material override
  return scene ? <primitive object={scene} position={[24, 0.9, -20]} scale={0.8} /> : null;
}
```

### Option C: Asset Preloading

Pre-cache assets before they enter the viewport to avoid visual pop-in:

```tsx
import { preloadModel } from '../models';

// Call at module-level or inside router prefetch
preloadModel('/models/architecture/pavilion.glb');
```

---

## 4. Transformations & Placement Coordinates

All models support standard Three.js transformation parameters:

- **Position**: `position={[x, y, z]}` (Units match the city matrix scale: $Y=0$ is ground level, central tower apex is $Y=68$, district platforms are at $Y \approx 0.9$).
- **Rotation**: `rotation={[rx, ry, rz]}` in radians (e.g. `[0, Math.PI / 2, 0]` for $90^\circ$ around the Y-axis).
- **Scale**: Uniform number `scale={1.2}` or vector `scale={[1, 1.5, 1]}`.

---

## 5. Optimization & Pre-Integration Checklist

Before adding any external asset, ensure it satisfies the following performance budgets:

### Budget & Limits for RTX 4050 & Integrated GPUs

1. **Polygon Budget**:
   - Small props (bollards, antennas, lamps): **< 1,500 triangles**
   - Medium structures (vehicles, gantry modules, radar dishes): **< 10,000 triangles**
   - Major buildings/complexes: **< 25,000 triangles**
2. **Draw Calls & Materials**:
   - Merge meshes in Blender before export to minimize draw calls (target **1–3 materials per model**).
   - Use texture atlases instead of individual material slots.
3. **Texture Resolution**:
   - Primary structures: Max **1024×1024** or **2048×2048** (PBR packed: Metallic/Roughness in one texture).
   - Auxiliary props: Max **512×512**.
4. **PBR Consistency**:
   - Adhere to the district palette: Dark navy, graphite, titanium, electric cyan (`#39DDF4`), and accent orange (`#FF9B54`).
   - Keep emissive intensities balanced to avoid blinding bloom.
5. **Licensing**:
   - Ensure the asset is licensed for permissive use (CC0, CC-BY, MIT, or original creation).
   - Keep license and attribution records in `public/models/<category>/ATTRIBUTION.md`.
