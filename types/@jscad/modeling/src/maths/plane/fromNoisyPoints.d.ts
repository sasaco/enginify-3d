export = fromNoisyPoints;
/**
 * Create a best-fit plane from the given noisy vertices.
 *
 * NOTE: There are two possible orientations for every plane.
 *       This function always produces positive orientations.
 *
 * See http://www.ilikebigbits.com for the original discussion
 *
 * @param {Plane} out - receiving plane
 * @param {Array} vertices - list of vertices in any order or position
 * @returns {Plane} out
 * @alias module:modeling/maths/plane.fromNoisyPoints
 */
declare function fromNoisyPoints(out: Plane, ...vertices: any[]): Plane;
