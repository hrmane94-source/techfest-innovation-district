import { createContext } from 'react';
import type { GraphicsQualityContextValue } from './graphicsTypes';

export const GraphicsQualityContext = createContext<GraphicsQualityContextValue | null>(null);
