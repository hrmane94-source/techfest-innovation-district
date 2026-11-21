/**
 * Styles module exports & design token definitions
 */

export const THEME_COLORS = {
  bgPrimary: '#050A14',
  bgSecondary: '#091426',
  primaryBlue: '#246BFD',
  electricCyan: '#39DDF4',
  accentOrange: '#FF9B54',
  textPrimary: '#F4F7FC',
  textSecondary: '#8A99AD',
  textMuted: '#4A5B73',
} as const;

export type ThemeColors = typeof THEME_COLORS;
