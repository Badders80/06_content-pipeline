/**
 * Clamp a value between min and max.
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Map a value from one range to another.
 */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number => {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
};

/**
 * Ease-in-out cubic for smooth animation curves.
 */
export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};