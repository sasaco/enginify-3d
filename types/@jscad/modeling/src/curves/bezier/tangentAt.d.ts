export = tangentAt;
/**
 * Calculates the tangent at a specific position along a bezier easing curve.
 * For multidimensional curves, the tangent is the slope of each dimension at that point.
 * See the example called extrudeAlongPath.js
 *
 * @example
 * const b = bezier.create([[0,0,0], [0,5,10], [10,0,-5], [10,10,10]]) // a cubic 3 dimensional easing curve that can generate position arrays for modelling
 * let tangent = bezier.tangentAt(t, b)
 *
 * @param {number} t : the position of which to calculate the bezier's tangent value; 0 < t < 1
 * @param {Object} bezier : an array with at least 2 elements of either all numbers, or all arrays of numbers that are the same size.
 * @return {array | number} the tangent at the requested position.
 * @alias module:modeling/curves/bezier.tangentAt
 */
declare function tangentAt(t: number, bezier: any): any[] | number;
