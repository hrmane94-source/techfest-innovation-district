import * as THREE from 'three';

export interface PerformanceSnapshot {
  fps: number;
  frameTimeMs: number;
  minFps: number;
  maxFps: number;
  spikesCount: number; // frames taking > 33.3ms
  drawCalls: number;
  triangles: number;
  points: number;
  lines: number;
  geometries: number;
  textures: number;
  shaderPrograms: number;
  timestamp: number;
}

export interface PerformanceAggregate {
  sampleDurationSec: number;
  averageFps: number;
  minFps: number;
  maxFps: number;
  p95FrameTimeMs: number;
  spikeRatePercent: number;
  drawCalls: number;
  triangles: number;
  geometries: number;
  textures: number;
  shaderPrograms: number;
}

class PerformanceProfiler {
  private frameTimes: number[] = [];
  private totalFrames = 0;
  private lastTime = performance.now();
  private sampleStartTime = performance.now();
  private spikesCount = 0;
  private currentSnapshot: PerformanceSnapshot = {
    fps: 60,
    frameTimeMs: 16.6,
    minFps: 60,
    maxFps: 60,
    spikesCount: 0,
    drawCalls: 0,
    triangles: 0,
    points: 0,
    lines: 0,
    geometries: 0,
    textures: 0,
    shaderPrograms: 0,
    timestamp: performance.now(),
  };

  public recordFrame(gl: THREE.WebGLRenderer) {
    this.totalFrames++;
    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;

    if (delta > 0 && delta < 500) {
      this.frameTimes.push(delta);
      if (this.frameTimes.length > 300) {
        this.frameTimes.shift();
      }
      if (delta > 33.33) {
        this.spikesCount++;
      }
    }

    const info = gl.info;
    const avgDelta = this.frameTimes.length > 0
      ? this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
      : 16.6;
    const avgFps = 1000 / avgDelta;

    this.currentSnapshot = {
      fps: Math.round(avgFps * 10) / 10,
      frameTimeMs: Math.round(avgDelta * 100) / 100,
      minFps: Math.round(Math.min(...(this.frameTimes.map((d) => 1000 / d))) * 10) / 10,
      maxFps: Math.round(Math.max(...(this.frameTimes.map((d) => 1000 / d))) * 10) / 10,
      spikesCount: this.spikesCount,
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      points: info.render.points,
      lines: info.render.lines,
      geometries: info.memory.geometries,
      textures: info.memory.textures,
      shaderPrograms: info.programs?.length ?? 0,
      timestamp: now,
    };

    // Synchronize to DOM bridge for testing & telemetry
    if (typeof document !== 'undefined' && this.totalFrames % 5 === 0) {
      let el = document.getElementById('techfest-profiler-data');
      if (!el) {
        el = document.createElement('div');
        el.id = 'techfest-profiler-data';
        el.style.position = 'fixed';
        el.style.bottom = '0';
        el.style.left = '0';
        el.style.pointerEvents = 'none';
        el.style.opacity = '0';
        el.style.zIndex = '-1';
        document.body.appendChild(el);
      }
      el.setAttribute('data-fps', String(this.currentSnapshot.fps));
      el.setAttribute('data-draw-calls', String(this.currentSnapshot.drawCalls));
      el.setAttribute('data-triangles', String(this.currentSnapshot.triangles));
      el.setAttribute('data-metrics', JSON.stringify(this.currentSnapshot));
      el.setAttribute('data-aggregate', JSON.stringify(this.getAggregate()));
      el.textContent = JSON.stringify(this.currentSnapshot);
    }
  }

  public getSnapshot(): PerformanceSnapshot {
    return this.currentSnapshot;
  }

  public getAggregate(): PerformanceAggregate {
    const duration = (performance.now() - this.sampleStartTime) / 1000;
    const sortedDeltas = [...this.frameTimes].sort((a, b) => a - b);
    const p95Index = Math.floor(sortedDeltas.length * 0.95);
    const p95 = sortedDeltas[p95Index] || 16.6;
    const totalFrames = this.frameTimes.length;
    const spikeRate = totalFrames > 0 ? (this.spikesCount / totalFrames) * 100 : 0;

    return {
      sampleDurationSec: Math.round(duration * 10) / 10,
      averageFps: this.currentSnapshot.fps,
      minFps: this.currentSnapshot.minFps,
      maxFps: this.currentSnapshot.maxFps,
      p95FrameTimeMs: Math.round(p95 * 100) / 100,
      spikeRatePercent: Math.round(spikeRate * 10) / 10,
      drawCalls: this.currentSnapshot.drawCalls,
      triangles: this.currentSnapshot.triangles,
      geometries: this.currentSnapshot.geometries,
      textures: this.currentSnapshot.textures,
      shaderPrograms: this.currentSnapshot.shaderPrograms,
    };
  }

  public resetSample() {
    this.frameTimes = [];
    this.spikesCount = 0;
    this.sampleStartTime = performance.now();
    this.lastTime = performance.now();
  }
}

export const performanceProfiler = new PerformanceProfiler();

if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__TECHFEST_PROFILER__ = {
    getSnapshot: () => performanceProfiler.getSnapshot(),
    getAggregate: () => performanceProfiler.getAggregate(),
    reset: () => performanceProfiler.resetSample(),
  };
}
