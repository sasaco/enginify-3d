export = closestPoint;
/**
 * Determine the closest point on the given line to the given point.
 *
 * @param {line3} line - line of reference
 * @param {vec3} point - point of reference
 * @returns {vec3} a point
 * @alias module:modeling/maths/line3.closestPoint
 */
declare function closestPoint(line: typeof line3, point: typeof vec3): typeof vec3;
import vec3 = require("../vec3");
