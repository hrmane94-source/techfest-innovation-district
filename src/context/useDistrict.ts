import { useContext } from 'react';
import { DistrictContext } from './districtContextInstance';

export function useDistrict() {
  const ctx = useContext(DistrictContext);
  if (!ctx) {
    throw new Error('useDistrict must be used within a DistrictProvider');
  }
  return ctx;
}
