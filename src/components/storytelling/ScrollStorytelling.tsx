import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDistrict } from '../../context';
import type { DistrictId } from '../../types/district';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollStorytellingProps {
  onEnterExploreMode: () => void;
  visible?: boolean;
}

interface StoryAct {
  actNumber: string;
  actTitle: string;
  headline: string;
  description: string;
  districtId: DistrictId;
  highlights: string[];
  ctaLabel?: string;
  isFinale?: boolean;
}

const STORY_ACTS: StoryAct[] = [
  {
    actNumber: 'ACT 01',
    actTitle: 'THE ARRIVAL',
    headline: 'THE UNIVERSITY OF TOMORROW.',
    description:
      'Welcome to Techfest IIT Bombay’s visionary campus — where academic excellence meets futuristic research. Explore interconnected departmental facilities, landscaped courtyards, student commons, and open research pavilions designed for the next generation of engineers and scientists.',
    districtId: 'overview',
    highlights: ['Next-Gen Academic Campus', 'Connected Pedestrian Network', 'Techfest IIT Bombay Vision'],
  },
  {
    actNumber: 'ACT 02',
    actTitle: 'THE CENTRAL PLAZA & TOWER',
    headline: 'THE ACADEMIC EPICENTER.',
    description:
      'Rising 68 meters above the central plaza, the Central Innovation Tower anchors the university campus. Surrounded by a shaded colonnade, student gathering amphitheater, landscaped green spaces, and a circular reflecting basin, it symbolizes the beacon of innovation at IIT Bombay.',
    districtId: 'core',
    highlights: ['68.0m Innovation Landmark', 'Student Amphitheater & Commons', 'Shaded Titanium Colonnade', 'Campus Gathering Plaza'],
    ctaLabel: 'Inspect Tower & Plaza',
  },
  {
    actNumber: 'ACT 03',
    actTitle: 'RESEARCH DEPARTMENTS',
    headline: 'FOUR DEPARTMENTAL CENTRES.',
    description:
      'Four specialized academic research centres branch out from the central plaza: SEC-01 AI & Computational Sciences, SEC-02 Robotics & Autonomous Systems, SEC-03 Aerospace & Space Research, and SEC-04 Cybersecurity & Digital Infrastructure.',
    districtId: 'ai',
    highlights: ['SEC-01 AI & Computing', 'SEC-02 Robotics & Automation', 'SEC-03 Aerospace Engineering', 'SEC-04 Cybersecurity Institute'],
    ctaLabel: 'Explore Research Centres',
  },
  {
    actNumber: 'ACT 04',
    actTitle: 'SCIENTIFIC FRONTIER',
    headline: 'NASA RESEARCH EXHIBITS.',
    description:
      'Integrated directly into departmental courtyards, authentic NASA space exploration assets serve as live academic testbeds: the Mars 2020 Perseverance Rover on an analog basalt testbed, the steerable 70-Meter Deep Space Network dish, and the James Webb Space Telescope levitation pavilion.',
    districtId: 'nasa-jwst',
    highlights: ['Mars 2020 Rover Test Arena', '70M Deep Space Network Dish', 'JWST Research Pavilion', 'Public Domain NASA Models'],
    ctaLabel: 'Inspect NASA Assets',
  },
  {
    actNumber: 'ACT 05',
    actTitle: 'CAMPUS LIFE & COMMONS',
    headline: 'STUDENT LIFE & COLLABORATION.',
    description:
      'Beyond laboratories, the campus fosters cross-disciplinary dialogue with student commons, shaded study colonnades, open-air discussion steps, landscaped courtyards, and solar trees providing sustainable energy and community spaces.',
    districtId: 'aerospace',
    highlights: ['Student Commons & Lounges', 'Collaborative Study Spaces', 'Eco-Canopy Solar Trees', 'Continuous Pedestrian Spine'],
    ctaLabel: 'Explore Student Commons',
  },
  {
    actNumber: 'ACT 06',
    actTitle: 'THE FINALE',
    headline: 'SHAPE THE FUTURE AT TECHFEST.',
    description:
      'The Futuristic University Campus brings together technology, engineering, and student ambition. Enter the interactive 3D mode to explore every department in detail, inspect facilities, and register for Techfest 2026 at IIT Bombay.',
    districtId: 'overview',
    highlights: ['Techfest 2026 at IIT Bombay', 'Interactive 3D Exploration', 'Open for Registration'],
    isFinale: true,
  },
];

export function ScrollStorytelling({
  onEnterExploreMode,
  visible = true,
}: ScrollStorytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeActIndex, setActiveActIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const { selectDistrict, setTransitioning } = useDistrict();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Handle ScrollTrigger narrative camera & story step synchronization
  useEffect(() => {
    if (!visible || !containerRef.current) return;

    const scrollerEl = containerRef.current.closest('.overflow-y-auto') as HTMLElement | null;
    const sections = containerRef.current.querySelectorAll('.story-section');
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section, index) => {
      const act = STORY_ACTS[index];
      if (!act) return;

      const triggerAction = () => {
        if (activeIndexRef.current !== index) {
          activeIndexRef.current = index;
          setActiveActIndex(index);
          selectDistrict(act.districtId);
        }
      };

      const st = ScrollTrigger.create({
        trigger: section,
        scroller: scrollerEl || undefined,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: triggerAction,
        onEnterBack: triggerAction,
      });

      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [visible, selectDistrict]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setTransitioning(false);
    };
  }, [setTransitioning]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none relative z-20 w-full font-sans"
      aria-label="Cinematic Scroll Storytelling"
    >
      {/* ── FLOATING CHAPTER STEPPER / PROGRESS PILL (Top Right / Desktop) ── */}
      <aside
        aria-label="Story Progress"
        className="pointer-events-auto fixed top-20 sm:top-24 right-4 sm:right-8 z-30 hidden md:flex items-center gap-3 rounded-full border border-white/15 bg-[#050A14]/85 px-4 py-2 backdrop-blur-2xl shadow-xl font-mono text-[11px]"
      >
        <span className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase tracking-wider">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          {STORY_ACTS[activeActIndex].actNumber}: {STORY_ACTS[activeActIndex].actTitle}
        </span>
        <span className="text-white/20">|</span>
        <div className="flex items-center gap-1.5">
          {STORY_ACTS.map((act, idx) => (
            <button
              key={`story-step-${act.actNumber}`}
              type="button"
              onClick={() => {
                const el = containerRef.current?.querySelectorAll('.story-section')[idx];
                el?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
              }}
              title={act.actTitle}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeActIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        <span className="text-white/20">|</span>
        <button
          type="button"
          onClick={onEnterExploreMode}
          className="text-white hover:text-cyan-300 font-semibold transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>EXPLORE 3D</span>
          <span>→</span>
        </button>
      </aside>

      {/* ── 6 STORY ACT SECTIONS ── */}
      {STORY_ACTS.map((act, index) => {
        const isActive = index === activeActIndex;
        return (
          <section
            key={`act-${act.actNumber}`}
            className="story-section min-h-screen w-full flex items-center px-4 sm:px-8 lg:px-16 py-24 sm:py-32"
          >
            {/* Story Editorial Card (Glassmorphic, Left-Aligned with Breathing Room) */}
            <div
              className={`pointer-events-auto max-w-lg rounded-3xl border border-white/20 bg-[#050A14]/85 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] transition-all duration-500 ${
                isActive
                  ? 'opacity-100 translate-y-0 scale-100 border-cyan-400/40 shadow-cyan-950/30'
                  : 'opacity-40 translate-y-4 scale-98 border-white/10'
              }`}
            >
              {/* Act Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {act.actNumber} • {act.actTitle}
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  STEP 0{index + 1} / 0{STORY_ACTS.length}
                </span>
              </div>

              {/* Act Headline */}
              <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                {act.headline}
              </h2>

              {/* Act Description */}
              <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
                {act.description}
              </p>

              {/* Highlights Pill Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {act.highlights.map((highlight) => (
                  <span
                    key={`hl-${highlight}`}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-[#94A3B8]"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
                {act.isFinale ? (
                  <>
                    <button
                      type="button"
                      onClick={onEnterExploreMode}
                      className="rounded-xl border border-cyan-400/50 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(0,229,255,0.4)] hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>ENTER INTERACTIVE 3D CITY</span>
                      <span>→</span>
                    </button>
                    <a
                      href="https://techfest.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    >
                      REGISTER FOR TECHFEST
                    </a>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={onEnterExploreMode}
                      className="rounded-xl border border-cyan-400/40 bg-cyan-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 hover:bg-cyan-500/30 hover:text-white transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>{act.ctaLabel ?? 'Inspect In 3D'}</span>
                      <span>→</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const nextIndex = Math.min(index + 1, STORY_ACTS.length - 1);
                        const el = containerRef.current?.querySelectorAll('.story-section')[nextIndex];
                        el?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                      }}
                      className="font-mono text-[11px] text-[#94A3B8] hover:text-white transition-colors cursor-pointer px-2 py-1"
                    >
                      Next Act ↓
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
