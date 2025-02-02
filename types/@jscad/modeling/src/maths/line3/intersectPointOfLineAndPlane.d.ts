export = intersectToPlane;
/**
 * Determine the closest point on the given plane to the given line.
 *
 * NOTES:
 * The point of intersection will be invalid if the line is parallel to the plane, e.g. NaN.
 *
 * @param {line3} line - line of reference
 * @param {plane} plane - plane of reference
 * @returns {vec3} a point on the line
 * @alias module:modeling/maths/line3.intersectPointOfLineAndPlane
 */
declare function intersectToPlane(line: typeof line3, plane: typeof plane): typeof vec3;
import vec3 = require("../vec3");
