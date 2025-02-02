export = fromPoints;
/**
 * Create a new line that passes through the given points.
 *
 * @param {line2} out - receiving line
 * @param {vec2} point1 - start point of the line
 * @param {vec2} point2 - end point of the line
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.fromPoints
 */
declare function fromPoints(out: typeof line2, point1: typeof vec2, point2: typeof vec2): typeof line2;
import vec2 = require("../vec2");
