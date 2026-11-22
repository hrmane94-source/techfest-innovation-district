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
    actTitle: 'THE MASTER PLAN',
    headline: 'THE UNIVERSITY OF TOMORROW.',
    description:
      'Welcome to Techfest IIT Bombay’s visionary campus — an expansive 280-meter innovation city where academic excellence meets futuristic research. Explore six interconnected districts, landscaped courtyards, student residential life, and authentic space exploration assets.',
    districtId: 'overview',
    highlights: ['280m Master-Planned Campus', 'Six Connected Districts', 'Techfest IIT Bombay Vision'],
  },
  {
    actNumber: 'ACT 02',
    actTitle: 'DISTRICT A: CENTRAL INNOVATION',
    headline: 'THE CIVIC & ARCHITECTURAL EPICENTER.',
    description:
      'Rising 68 meters above the central academic plaza, the Central Innovation Tower anchors the university city. Flanked by the Innovation Exhibition Pavilion, Digital Experience Centre, Convention Hall, and an outdoor student amphitheater with reflecting basins.',
    districtId: 'core',
    highlights: ['68.0m Innovation Apex Tower', 'Innovation Exhibition Pavilion', 'Convention & Event Center', 'Central Reflecting Basin'],
    ctaLabel: 'Inspect Innovation Tower',
  },
  {
    actNumber: 'ACT 03',
    actTitle: 'DISTRICT B: ACADEMIC DISTRICT',
    headline: 'FACULTY & GRAND AUDITORIUM.',
    description:
      'The academic heart featuring the Grand Academic Auditorium (1200 seats) with sculptural acoustic envelope, tiered multi-level lecture complexes with louvered facades, faculty towers A & B, and colonnaded study quadrangles.',
    districtId: 'academic',
    highlights: ['Grand Academic Auditorium', 'Tiered Lecture Complex', 'Twin Faculty Wings & Skybridge', 'Colonnaded Quadrangle'],
    ctaLabel: 'Explore Academic District',
  },
  {
    actNumber: 'ACT 04',
    actTitle: 'DISTRICT C: ADVANCED RESEARCH',
    headline: 'FOUR INSTITUTES & NASA MISSIONS.',
    description:
      'Four premier research facilities: SEC-01 AI, SEC-02 Robotics, SEC-03 Aerospace, and SEC-04 Cybersecurity, integrated with three authentic NASA assets: Mars 2020 Rover testbed, 70M Deep Space Network dish, and the James Webb Space Telescope pavilion.',
    districtId: 'research',
    highlights: ['AI & Neural Computing', 'Robotics High-Bay & Rover', 'Aerospace & NASA 70m Dish', 'JWST Flagship Pavilion'],
    ctaLabel: 'Inspect Research Labs',
  },
  {
    actNumber: 'ACT 05',
    actTitle: 'DISTRICT D: STUDENT LIFE',
    headline: 'RESIDENTIAL LIVING & DINING COMMONS.',
    description:
      'The vibrant home of university student life. Features modern residential towers with modular balconies, a double-height glazed Dining Commons with outdoor dining deck, Techfest Student Club headquarters, and recreation courtyards.',
    districtId: 'student-life',
    highlights: ['Twin Residential Living Towers', 'Campus Dining Commons & Patio', 'Techfest Club Headquarters', 'Social Recreation Lawn'],
    ctaLabel: 'Explore Student Life',
  },
  {
    actNumber: 'ACT 06',
    actTitle: 'DISTRICT E: KNOWLEDGE & INCUBATION',
    headline: 'CENTRAL LIBRARY & VENTURE HUB.',
    description:
      'Anchored by the iconic Central University Library with transparent reading atrium, accompanied by the Startup Incubation Centre, Techfest Innovation Hub with hardware prototyping labs, and open collaborative study pergolas.',
    districtId: 'knowledge',
    highlights: ['Central University Library', 'Startup Incubation Studio', 'Hardware Maker Lab', 'Collaborative Study Pergola'],
    ctaLabel: 'Explore Knowledge Hub',
  },
  {
    actNumber: 'ACT 07',
    actTitle: 'DISTRICT F: RECREATION & GREEN BELT',
    headline: 'CAMPUS LAKE & SPORTS ARENA.',
    description:
      'The ecological sanctuary of the campus. Features the serene Campus Lake with illuminated fountains and shoreline boardwalk, the aerodynamic Sports Complex Arena, all-weather athletic courts, and botanical jogging tracks.',
    districtId: 'recreation',
    highlights: ['Campus Lake & Promenade', 'Kinetic Illuminated Fountains', 'Vaulted Sports Arena', 'All-Weather Athletic Courts'],
    ctaLabel: 'Explore Campus Lake',
  },
  {
    actNumber: 'ACT 08',
    actTitle: 'THE FINALE',
    headline: 'SHAPE THE FUTURE AT TECHFEST 2026.',
    description:
      'The Living Innovation City is alive with over 160 active students, autonomous electric shuttles, and cutting-edge research. Switch into free 3D exploration mode to navigate anywhere, inspect facilities, and register for Techfest at IIT Bombay.',
    districtId: 'overview',
    highlights: ['Techfest 2026 at IIT Bombay', 'Interactive 3D Navigation', 'Living Populated Campus'],
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
