export = signedDistanceToPoint;
/**
 * Calculate the distance to the given point.
 *
 * @param {plane} plane - plane of reference
 * @param {vec3} point - point of reference
 * @return {Number} signed distance to point
 * @alias module:modeling/maths/plane.signedDistanceToPoint
 */
declare function signedDistanceToPoint(plane: typeof plane, point: typeof vec3): number;
import vec3 = require("../vec3");
