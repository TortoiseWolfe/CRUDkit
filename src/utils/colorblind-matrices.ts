/**
 * Colorblind simulation matrices
 * Based on Machado et al. 2009 - scientifically validated color transformation matrices
 * These matrices are used in SVG feColorMatrix filters
 */

import { ColorblindType } from './colorblind';

/**
 * Color transformation matrix type
 * 4x5 matrix for RGBA color transformation
 */
export type ColorMatrix = [
  [number, number, number, number, number], // R' = aR + bG + cB + dA + e
  [number, number, number, number, number], // G' = fR + gG + hB + iA + j
  [number, number, number, number, number], // B' = kR + lG + mB + nA + o
  [number, number, number, number, number], // A' = pR + qG + rB + sA + t
];

/**
 * Flatten a ColorMatrix to SVG filter format
 */
export function matrixToSVGString(matrix: ColorMatrix): string {
  return matrix
    .map((row) => row.join(' '))
    .join(' ');
}

/**
 * Scientifically validated color transformation matrices
 * Source: Machado, Oliveira, and Fernandes 2009
 * "A Physiologically-based Model for Simulation of Color Vision Deficiency"
 */
export const COLORBLIND_MATRICES: Record<ColorblindType, ColorMatrix> = {
  // Normal vision - identity matrix
  [ColorblindType.NONE]: [
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
  ],

  // Protanopia - Red-blind (missing L-cones)
  [ColorblindType.PROTANOPIA]: [
    [0.567, 0.433, 0, 0, 0],
    [0.558, 0.442, 0, 0, 0],
    [0, 0.242, 0.758, 0, 0],
    [0, 0, 0, 1, 0],
  ],

  // Protanomaly - Red-weak (anomalous L-cones)
  [ColorblindType.PROTANOMALY]: [
    [0.817, 0.183, 0, 0, 0],
    [0.333, 0.667, 0, 0, 0],
    [0, 0.125, 0.875, 0, 0],
    [0, 0, 0, 1, 0],
  ],

  // Deuteranopia - Green-blind (missing M-cones)
  [ColorblindType.DEUTERANOPIA]: [
    [0.625, 0.375, 0, 0, 0],
    [0.7, 0.3, 0, 0, 0],
    [0, 0.3, 0.7, 0, 0],
    [0, 0, 0, 1, 0],
  ],

  // Deuteranomaly - Green-weak (anomalous M-cones)
  [ColorblindType.DEUTERANOMALY]: [
    [0.8, 0.2, 0, 0, 0],
    [0.258, 0.742, 0, 0, 0],
    [0, 0.142, 0.858, 0, 0],
    [0, 0, 0, 1, 0],
  ],

  // Tritanopia - Blue-blind (missing S-cones)
  [ColorblindType.TRITANOPIA]: [
    [0.95, 0.05, 0, 0, 0],
    [0, 0.433, 0.567, 0, 0],
    [0, 0.475, 0.525, 0, 0],
    [0, 0, 0, 1, 0],
  ],

  // Tritanomaly - Blue-weak (anomalous S-cones)
  [ColorblindType.TRITANOMALY]: [
    [0.967, 0.033, 0, 0, 0],
    [0, 0.733, 0.267, 0, 0],
    [0, 0.183, 0.817, 0, 0],
    [0, 0, 0, 1, 0],
  ],

  // Achromatopsia - Complete color blindness (no functioning cones)
  // Using standard luminance weights: 0.299 R + 0.587 G + 0.114 B
  [ColorblindType.ACHROMATOPSIA]: [
    [0.299, 0.587, 0.114, 0, 0],
    [0.299, 0.587, 0.114, 0, 0],
    [0.299, 0.587, 0.114, 0, 0],
    [0, 0, 0, 1, 0],
  ],

  // Achromatomaly - Partial color blindness (reduced cone function)
  // 50% desaturation towards grayscale
  [ColorblindType.ACHROMATOMALY]: [
    [0.618, 0.320, 0.062, 0, 0],
    [0.163, 0.775, 0.062, 0, 0],
    [0.163, 0.320, 0.516, 0, 0],
    [0, 0, 0, 1, 0],
  ],
};

/**
 * Get a formatted SVG filter string for a colorblind type
 */
export function getColorblindMatrixString(type: ColorblindType): string {
  const matrix = COLORBLIND_MATRICES[type];
  return matrixToSVGString(matrix);
}

/**
 * Validate that a matrix is properly formed
 */
export function isValidColorMatrix(matrix: ColorMatrix): boolean {
  if (!Array.isArray(matrix) || matrix.length !== 4) {
    return false;
  }

  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== 5) {
      return false;
    }
    for (const value of row) {
      if (typeof value !== 'number' || isNaN(value)) {
        return false;
      }
    }
  }

  // Alpha channel should be preserved (fourth row should be [0, 0, 0, 1, 0])
  const alphaRow = matrix[3];
  return (
    alphaRow[0] === 0 &&
    alphaRow[1] === 0 &&
    alphaRow[2] === 0 &&
    alphaRow[3] === 1 &&
    alphaRow[4] === 0
  );
}

/**
 * Performance metrics for filter application
 */
export interface FilterPerformance {
  type: ColorblindType;
  applicationTime: number; // milliseconds
  timestamp: number;
}

/**
 * Measure filter application performance
 */
export function measureFilterPerformance(
  type: ColorblindType,
  applyFn: () => void
): FilterPerformance {
  const start = performance.now();
  applyFn();
  const end = performance.now();

  return {
    type,
    applicationTime: end - start,
    timestamp: Date.now(),
  };
}