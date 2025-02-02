/**
 * Epsilon used during determination of near zero distances.
 * This should be 1 / spacialResolution.
 * @default
 * @alias module:modeling/maths.EPS
 */
export const EPS: 0.00001;
/**
 * Smaller epsilon used for measuring near zero distances.
 * @default
 * @alias module:modeling/maths.NEPS
 */
export const NEPS: 1e-13;
/**
 * The TAU property represents the ratio of the circumference of a circle to its radius.
 * Approximately 6.28318530717958647692
 * @default
 * @example
 * const { TAU } = require('@jscad/modeling').maths.constants
 */
export const TAU: number;
/**
 * The resolution of space, currently one hundred nanometers.
 * This should be 1 / EPS.
 * @alias module:modeling/maths.spatialResolution
 * @default
 */
export const spatialResolution: 100000;
