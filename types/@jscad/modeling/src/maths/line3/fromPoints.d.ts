export = fromPoints;
/**
 * Create a line that passes through the given points.
 *
 * @param {line3} out - receiving line
 * @param {vec3} point1 - start point of the line segment
 * @param {vec3} point2 - end point of the line segment
 * @returns {line3} out
 * @alias module:modeling/maths/line3.fromPoints
 */
declare function fromPoints(out: typeof line3, point1: typeof vec3, point2: typeof vec3): typeof line3;
import vec3 = require("../vec3");
