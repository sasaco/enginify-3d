export = lengths;
/**
 * Divides the bezier curve into line segments and returns the cumulative length of those segments as an array.
 * Utility function used to calculate the curve's approximate length and determine the equivalence between arc length and time.
 *
 * @example
 * const b = bezier.create([[0, 0], [0, 10]]);
 * const totalLength = lengths(100, b).pop(); // the last element of the array is the curve's approximate length
 *
 * @param {Number} segments the number of segments to use when approximating the curve length.
 * @param {Object} bezier a bezier curve.
 * @returns an array containing the cumulative length of the segments.
 */
declare function lengths(segments: number, bezier: any): number[];
