export = projectionOfPoint;
/**
 * Project the given point on to the given plane.
 *
 * @param {plane} plane - plane of reference
 * @param {vec3} point - point of reference
 * @return {vec3} projected point on plane
 * @alias module:modeling/maths/plane.projectionOfPoint
 */
declare function projectionOfPoint(plane: typeof plane, point: typeof vec3): typeof vec3;
import vec3 = require("../vec3");
