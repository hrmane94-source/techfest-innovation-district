import { useState, useCallback, useMemo, type ReactNode } from 'react';
import type { DistrictId } from '../types/district';
import { DISTRICT_ORDER, DISTRICT_DATA } from './districtData';
import { DistrictContext } from './districtContextInstance';

export function DistrictProvider({ children }: { children: ReactNode }) {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictId>('overview');
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictId | null>(null);
  const [isTourActive, setIsTourActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const selectedDetails = useMemo(() => DISTRICT_DATA[selectedDistrict], [selectedDistrict]);

  const selectDistrict = useCallback((id: DistrictId) => {
    setSelectedDistrict(id);
    setIsTransitioning(true);
  }, []);

  const resetToOverview = useCallback(() => {
    setSelectedDistrict('overview');
    setIsTourActive(false);
    setIsTransitioning(true);
  }, []);

  const tourStep = useMemo(
    () => DISTRICT_ORDER.indexOf(selectedDistrict),
    [selectedDistrict]
  );

  const nextDistrict = useCallback(() => {
    const nextIdx = (tourStep + 1) % DISTRICT_ORDER.length;
    setSelectedDistrict(DISTRICT_ORDER[nextIdx]);
    setIsTransitioning(true);
  }, [tourStep]);

  const prevDistrict = useCallback(() => {
    const prevIdx = (tourStep - 1 + DISTRICT_ORDER.length) % DISTRICT_ORDER.length;
    setSelectedDistrict(DISTRICT_ORDER[prevIdx]);
    setIsTransitioning(true);
  }, [tourStep]);

  const toggleTour = useCallback((active?: boolean) => {
    setIsTourActive((prev) => {
      const nextVal = active !== undefined ? active : !prev;
      if (nextVal && selectedDistrict === 'overview') {
        setSelectedDistrict('core');
        setIsTransitioning(true);
      }
      return nextVal;
    });
  }, [selectedDistrict]);

  const value = useMemo(
    () => ({
      selectedDistrict,
      hoveredDistrict,
      selectedDetails,
      isTourActive,
      isTransitioning,
      tourStep,
      selectDistrict,
      setHoveredDistrict,
      resetToOverview,
      nextDistrict,
      prevDistrict,
      toggleTour,
      setTransitioning: setIsTransitioning,
    }),
    [
      selectedDistrict,
      hoveredDistrict,
      selectedDetails,
      isTourActive,
      isTransitioning,
      tourStep,
      selectDistrict,
      resetToOverview,
      nextDistrict,
      prevDistrict,
      toggleTour,
    ]
  );

  return <DistrictContext.Provider value={value}>{children}</DistrictContext.Provider>;
}
