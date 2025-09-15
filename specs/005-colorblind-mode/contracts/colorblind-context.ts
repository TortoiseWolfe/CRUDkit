/**
 * Contract for Colorblind Context API
 * This defines the public interface for colorblind mode functionality
 */

import {
  ColorblindType,
  ColorblindFilter,
  ColorblindSettings,
} from '../data-model';

/**
 * Colorblind Context Value Interface
 */
export interface ColorblindContextValue {
  // Current state
  settings: ColorblindSettings;
  isActive: boolean;

  // Actions
  setColorblindMode: (mode: ColorblindType) => void;
  togglePatterns: () => void;
  toggleSimulation: () => void;
  resetColorblind: () => void;

  // Utilities
  getFilterInfo: (type: ColorblindType) => ColorblindFilter;
  getSupportedModes: () => ColorblindType[];
}

/**
 * Colorblind Provider Props
 */
export interface ColorblindProviderProps {
  children: React.ReactNode;
  defaultMode?: ColorblindType;
  defaultPatterns?: boolean;
  onModeChange?: (mode: ColorblindType) => void;
}

/**
 * Storage Contract
 */
export interface ColorblindStorage {
  getMode: () => ColorblindType | null;
  setMode: (mode: ColorblindType) => void;
  getPatterns: () => boolean;
  setPatterns: (enabled: boolean) => void;
  getSimulation: () => boolean;
  setSimulation: (enabled: boolean) => void;
  clear: () => void;
}

/**
 * Event Contract
 */
export interface ColorblindChangeEvent {
  previousMode: ColorblindType;
  newMode: ColorblindType;
  patterns: boolean;
  simulation: boolean;
  timestamp: Date;
  source: 'user' | 'system' | 'storage';
}

/**
 * Hook Contract
 */
export interface UseColorblindModeReturn {
  mode: ColorblindType;
  patterns: boolean;
  simulation: boolean;
  setMode: (mode: ColorblindType) => void;
  togglePatterns: () => void;
  toggleSimulation: () => void;
  reset: () => void;
  isActive: boolean;
  filterInfo: ColorblindFilter | null;
}
