/**
 * Contract for Colorblind UI Components
 * Defines props and interfaces for all colorblind-related components
 */

import { ColorblindType } from '../data-model';

/**
 * ColorblindToggle Component Contract
 */
export interface ColorblindToggleProps {
  /** Additional CSS classes */
  className?: string;

  /** Show text label alongside icon */
  showLabel?: boolean;

  /** Show description text */
  showDescription?: boolean;

  /** Use compact layout */
  compact?: boolean;

  /** Callback when mode changes */
  onModeChange?: (mode: ColorblindType) => void;

  /** Disabled state */
  disabled?: boolean;

  /** ARIA label override */
  ariaLabel?: string;

  /** Test ID for testing */
  testId?: string;
}

/**
 * ColorblindFilters Component Contract
 */
export interface ColorblindFiltersProps {
  /** Custom ID for filter references */
  id?: string;

  /** Hide from screen readers */
  ariaHidden?: boolean;
}

/**
 * ColorblindSimulator Component Contract
 */
export interface ColorblindSimulatorProps {
  /** Content to simulate */
  children: React.ReactNode;

  /** Simulation type */
  simulationType: ColorblindType;

  /** Enable/disable simulation */
  enabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * ColorblindPatternOverlay Component Contract
 */
export interface ColorblindPatternOverlayProps {
  /** Pattern type to apply */
  pattern: 'stripes' | 'dots' | 'cross' | 'lines';

  /** UI element type */
  element: 'button' | 'badge' | 'alert' | 'input';

  /** Variant */
  variant: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

  /** Opacity of pattern */
  opacity?: number;

  /** Additional CSS classes */
  className?: string;
}

/**
 * ColorblindModeSelector Component Contract
 */
export interface ColorblindModeSelectorProps {
  /** Current selected mode */
  value: ColorblindType;

  /** Change handler */
  onChange: (mode: ColorblindType) => void;

  /** Available modes to show */
  modes?: ColorblindType[];

  /** Show prevalence info */
  showPrevalence?: boolean;

  /** Show description */
  showDescription?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * ColorblindPreview Component Contract
 */
export interface ColorblindPreviewProps {
  /** Preview content */
  children: React.ReactNode;

  /** Mode to preview */
  mode: ColorblindType;

  /** Show patterns */
  showPatterns?: boolean;

  /** Side-by-side comparison */
  showComparison?: boolean;

  /** Additional CSS classes */
  className?: string;
}
