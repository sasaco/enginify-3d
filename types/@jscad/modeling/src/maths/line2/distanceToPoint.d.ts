export = distanceToPoint;
/**
 * Calculate the distance (positive) between the given point and line.
 *
 * @param {line2} line - line of reference
 * @param {vec2} point - point of reference
 * @return {Number} distance between line and point
 * @alias module:modeling/maths/line2.distanceToPoint
 */
declare function distanceToPoint(line: typeof line2, point: typeof vec2): number;
import vec2 = require("../vec2");
