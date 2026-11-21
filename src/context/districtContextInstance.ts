import { createContext } from 'react';
import type { DistrictContextValue } from './districtTypes';

export const DistrictContext = createContext<DistrictContextValue | null>(null);
