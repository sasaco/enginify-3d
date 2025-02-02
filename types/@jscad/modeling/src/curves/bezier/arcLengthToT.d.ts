export = arcLengthToT;
/**
 * Convert a given arc length along a bezier curve to a t value.
 * Useful for generating equally spaced points along a bezier curve.
 *
 * @example
 * const points = [];
 * const segments = 9; // this will generate 10 equally spaced points
 * const increment = bezier.length(100, bezierCurve) / segments;
 * for(let i = 0; i <= segments; i++) {
 *   const t = bezier.arcLengthToT({distance: i * increment}, bezierCurve);
 *   const point = bezier.valueAt(t, bezierCurve);
 *   points.push(point);
 * }
 * return points;
 *
 * @param {Object} [options] options for construction
 * @param {Number} [options.distance=0] the distance along the bezier curve for which we want to find the corresponding t value.
 * @param {Number} [options.segments=100] the number of segments to use when approximating the curve length.
 * @param {Object} bezier a bezier curve.
 * @returns a number in the [0, 1] interval or NaN if the arcLength is negative or greater than the total length of the curve.
 * @alias module:modeling/curves/bezier.arcLengthToT
 */
declare function arcLengthToT(options?: {
    distance?: number;
    segments?: number;
}, bezier: any): number;
