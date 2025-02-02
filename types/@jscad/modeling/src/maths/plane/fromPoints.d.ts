export = fromPoints;
/**
 * Create a plane from the given points.
 *
 * @param {plane} out - receiving plane
 * @param {Array} vertices - points on the plane
 * @returns {plane} out
 * @alias module:modeling/maths/plane.fromPoints
 */
declare function fromPoints(out: typeof plane, ...vertices: any[]): typeof plane;
