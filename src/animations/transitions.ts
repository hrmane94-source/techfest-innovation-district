/**
 * Motion & animation foundation for TECHFEST — The Innovation District
 */

export const EASINGS = {
  architectural: [0.16, 1, 0.3, 1] as const, // Smooth architectural ease-out
  cybernetic: [0.25, 0.1, 0.25, 1] as const,
  instant: [0, 0, 1, 1] as const,
};

export const TRANSITION_DURATIONS = {
  instant: 0,
  micro: 0.15,
  standard: 0.35,
  scenic: 0.8,
  orbital: 1.2,
} as const;

export const FADE_TRANSITION = {
  duration: TRANSITION_DURATIONS.standard,
  ease: EASINGS.architectural,
};
