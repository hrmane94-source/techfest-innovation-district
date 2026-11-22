import { useState } from 'react';
import { useDistrict } from '../../context';
import type { DistrictId } from '../../types/district';

interface MinimapNode {
  id: DistrictId;
  code: string;
  label: string;
  x: number; // 3D X
  z: number; // 3D Z
  color: string;
}

// Spatially calibrated campus district nodes
const MINIMAP_NODES: MinimapNode[] = [
  { id: 'core', code: 'A', label: 'Central Innovation Core', x: 0, z: 0, color: '#00E5FF' },
  { id: 'academic', code: 'B', label: 'Academic & Auditorium', x: 28, z: -55, color: '#38BDF8' },
  { id: 'research', code: 'C', label: 'Advanced Research Labs', x: -24, z: 0, color: '#00E5FF' },
  { id: 'student-life', code: 'D', label: 'Student Life & Residence', x: 55, z: 20, color: '#F59E0B' },
  { id: 'knowledge', code: 'E', label: 'Knowledge & Startup District', x: -55, z: 18, color: '#38BDF8' },
  { id: 'recreation', code: 'F', label: 'Recreation & Campus Lake', x: 10, z: 65, color: '#10B981' },
];

/**
 * CampusMinimap — Compact, Spatially Calibrated 2D Radar Orientation Minimap
 * Accurately represents the 280m x 280m campus footprint, ring roads, and district positions.
 */
export function CampusMinimap() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { selectedDistrict, selectDistrict, resetToOverview } = useDistrict();

  // Map 3D coordinates [-140..140] to SVG viewBox [0..180]
  // Center is (90, 90). North (-Z) is UP (smaller V).
  const mapScale = 160 / 280; // ~0.5714 px per meter
  const toSvgX = (x: number) => 90 + x * mapScale;
  const toSvgY = (z: number) => 90 + z * mapScale;

  return (
    <div
      aria-label="Campus Orientation Minimap"
      className="pointer-events-auto fixed bottom-20 sm:bottom-8 right-3 sm:right-8 z-30 font-sans transition-all duration-300"
    >
      <div className="rounded-2xl border border-white/15 bg-[#050A14]/92 backdrop-blur-2xl p-2.5 sm:p-3 shadow-[0_8px_32px_rgba(0,0,0,0.65)]">
        {/* Minimap Header & Collapse Toggle */}
        <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/10 font-mono text-[9px] uppercase tracking-wider text-[#94A3B8]">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>CAMPUS RADAR</span>
          </div>
          <div className="flex items-center gap-1.5">
            {selectedDistrict !== 'overview' && (
              <button
                type="button"
                onClick={resetToOverview}
                className="text-cyan-400 hover:text-white transition-colors cursor-pointer text-[8px]"
                title="Reset to campus overview"
              >
                RESET
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              aria-label={isExpanded ? 'Collapse Minimap' : 'Expand Minimap'}
            >
              {isExpanded ? '−' : '+'}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="pt-2 animate-in fade-in duration-200">
            {/* SVG Radar Graphic */}
            <div className="relative h-[150px] w-[150px] sm:h-[160px] sm:w-[160px]">
              <svg
                viewBox="0 0 180 180"
                className="h-full w-full rounded-xl bg-[#081120] border border-white/10"
              >
                <defs>
                  {/* Subtle Grid Pattern */}
                  <pattern id="radarGrid" width="18" height="18" patternUnits="userSpaceOnUse">
                    <path d="M 18 0 L 0 0 0 18" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                  </pattern>
                </defs>

                {/* Subfloor Grid */}
                <rect width="180" height="180" fill="url(#radarGrid)" />

                {/* Campus Perimeter Boundary (280m equivalent) */}
                <rect
                  x="10"
                  y="10"
                  width="160"
                  height="160"
                  rx="12"
                  fill="none"
                  stroke="rgba(56,189,248,0.18)"
                  strokeWidth="1"
                />

                {/* Outer Ring Road (R=72m -> r=41.1px) */}
                <circle
                  cx="90"
                  cy="90"
                  r={72 * mapScale}
                  fill="none"
                  stroke="rgba(56,189,248,0.25)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Inner Plaza Ring Road (R=25.5m -> r=14.6px) */}
                <circle
                  cx="90"
                  cy="90"
                  r={25.5 * mapScale}
                  fill="rgba(57,221,244,0.06)"
                  stroke="rgba(0,229,255,0.4)"
                  strokeWidth="1"
                />

                {/* Cardinal Axes (N-S and E-W Arterials) */}
                <line x1="90" y1="10" x2="90" y2="170" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                <line x1="10" y1="90" x2="170" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />

                {/* Campus Lake (District F: South Water Feature) */}
                <ellipse
                  cx={toSvgX(10)}
                  cy={toSvgY(65)}
                  rx="14"
                  ry="8"
                  fill="rgba(16,185,129,0.18)"
                  stroke="rgba(16,185,129,0.5)"
                  strokeWidth="0.8"
                />

                {/* Cardinal Direction Compass Markers */}
                <text x="90" y="8" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">N</text>
                <text x="174" y="92" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">E</text>
                <text x="90" y="177" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">S</text>
                <text x="6" y="92" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">W</text>

                {/* District Nodes & Interactive Touch Targets */}
                {MINIMAP_NODES.map((node) => {
                  const cx = toSvgX(node.x);
                  const cy = toSvgY(node.z);
                  const isSelected = selectedDistrict === node.id;

                  return (
                    <g
                      key={`minimap-node-${node.id}`}
                      className="cursor-pointer transition-transform hover:scale-125"
                      onClick={() => selectDistrict(node.id)}
                    >
                      {/* Active Node Pulsing Ring */}
                      {isSelected && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="10"
                          fill="none"
                          stroke={node.color}
                          strokeWidth="1"
                          opacity="0.8"
                          className="animate-ping origin-center"
                        />
                      )}

                      {/* District Circle Marker */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? '6.5' : '5'}
                        fill={isSelected ? node.color : '#0B1628'}
                        stroke={node.color}
                        strokeWidth="1.2"
                      />

                      {/* District Letter Label */}
                      <text
                        x={cx}
                        y={cy + 2.4}
                        fill={isSelected ? '#050A14' : '#FFFFFF'}
                        fontSize="6.5"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {node.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Currently Focused District Readout */}
            <div className="mt-1.5 flex items-center justify-between font-mono text-[8px] text-[#94A3B8]">
              <span className="truncate max-w-[120px]">
                {selectedDistrict === 'overview'
                  ? 'FULL CAMPUS VISTA'
                  : MINIMAP_NODES.find((n) => n.id === selectedDistrict)?.label ?? selectedDistrict.toUpperCase()}
              </span>
              <span className="text-cyan-400 font-bold">280M</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CampusMinimap;
