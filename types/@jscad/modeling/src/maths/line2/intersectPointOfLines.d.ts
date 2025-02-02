export = intersectToLine;
/**
 * Return the point of intersection between the given lines.
 *
 * NOTES:
 * The point will have Infinity values if the lines are parallel.
 * The point will have NaN values if the lines are the same.
 *
 * @param {line2} line1 - line of reference
 * @param {line2} line2 - line of reference
 * @return {vec2} the point of intersection
 * @alias module:modeling/maths/line2.intersectPointOfLines
 */
declare function intersectToLine(line1: typeof line2, line2: typeof line2): typeof vec2;
import vec2 = require("../vec2");
