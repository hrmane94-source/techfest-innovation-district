import { useState, useCallback } from 'react';
import type { DistrictSectionId, DistrictState, DistrictCoordinates } from '../types/district';

const DEFAULT_COORDINATES: DistrictCoordinates = { x: 0, y: 15, z: 30 };

const INITIAL_STATE: DistrictState = {
  currentSection: 'arrival',
  isTransitioning: false,
  activeLandmark: null,
  coordinates: DEFAULT_COORDINATES,
};

/**
 * State hook to manage active district section and transition telemetry
 */
export function useDistrictState() {
  const [state, setState] = useState<DistrictState>(INITIAL_STATE);

  const setSection = useCallback((section: DistrictSectionId) => {
    setState((prev) => ({
      ...prev,
      currentSection: section,
      isTransitioning: true,
    }));
  }, []);

  const completeTransition = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isTransitioning: false,
    }));
  }, []);

  const setActiveLandmark = useCallback((landmark: string | null) => {
    setState((prev) => ({
      ...prev,
      activeLandmark: landmark,
    }));
  }, []);

  return {
    districtState: state,
    setSection,
    completeTransition,
    setActiveLandmark,
  };
}
