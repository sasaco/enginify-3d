export = fromPointAndDirection;
/**
 * Create a line from the given point (origin) and direction.
 *
 * The point can be any random point on the line.
 * The direction must be a vector with positive or negative distance from the point.
 *
 * See the logic of fromPoints() for appropriate values.
 *
 * @param {line3} out - receiving line
 * @param {vec3} point - start point of the line segment
 * @param {vec3} direction - direction of the line segment
 * @returns {line3} out
 * @alias module:modeling/maths/line3.fromPointAndDirection
 */
declare function fromPointAndDirection(out: typeof line3, point: typeof vec3, direction: typeof vec3): typeof line3;
import vec3 = require("../vec3");
