export = distanceToPoint;
/**
 * Calculate the distance (positive) between the given point and line.
 *
 * @param {line3} line - line of reference
 * @param {vec3} point - point of reference
 * @return {Number} distance between line and point
 * @alias module:modeling/maths/line3.distanceToPoint
 */
declare function distanceToPoint(line: typeof line3, point: typeof vec3): number;
import vec3 = require("../vec3");
