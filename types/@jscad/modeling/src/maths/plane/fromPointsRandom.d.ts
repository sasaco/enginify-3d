export = fromPointsRandom;
/**
 * Create a new plane from the given points like fromPoints,
 * but allow the vectors to be on one point or one line.
 * In such a case, a random plane through the given points is constructed.
 *
 * @param {plane} out - receiving plane
 * @param {vec3} a - 3D point
 * @param {vec3} b - 3D point
 * @param {vec3} c - 3D point
 * @returns {plane} out
 * @alias module:modeling/maths/plane.fromPointsRandom
 */
declare function fromPointsRandom(out: typeof plane, a: typeof vec3, b: typeof vec3, c: typeof vec3): typeof plane;
import vec3 = require("../vec3");
