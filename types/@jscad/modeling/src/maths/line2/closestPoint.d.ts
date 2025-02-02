export = closestPoint;
/**
 * Determine the closest point on the given line to the given point.
 *
 * @param {line2} line - line of reference
 * @param {vec2} point - point of reference
 * @returns {vec2} closest point
 * @alias module:modeling/maths/line2.closestPoint
 */
declare function closestPoint(line: typeof line2, point: typeof vec2): typeof vec2;
import vec2 = require("../vec2");
