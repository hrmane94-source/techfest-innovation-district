import { useContext } from 'react';
import { GraphicsQualityContext } from './graphicsContextInstance';
import type { GraphicsQualityContextValue } from './graphicsTypes';

export function useGraphicsQuality(): GraphicsQualityContextValue {
  const context = useContext(GraphicsQualityContext);
  if (!context) {
    throw new Error('useGraphicsQuality must be used within a GraphicsQualityProvider');
  }
  return context;
}
