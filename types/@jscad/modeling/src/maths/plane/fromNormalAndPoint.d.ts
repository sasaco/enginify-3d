export = fromNormalAndPoint;
/**
 * Represents a plane in 3D coordinate space as determined by a normal (perpendicular to the plane)
 * and distance from 0,0,0.
 *
 * The contents of the array are a normal [0,1,2] and a distance [3].
 * @see https://en.wikipedia.org/wiki/Hesse_normal_form
 * @typedef {Array} plane
 */
/**
 * Create a new plane from the given normal and point values.
 *
 * @param {plane} out - receiving plane
 * @param {vec3} normal - directional vector
 * @param {vec3} point - origin of plane
 * @returns {plane} out
 * @alias module:modeling/maths/plane.fromNormalAndPoint
 */
declare function fromNormalAndPoint(out: plane, normal: typeof vec3, point: typeof vec3): plane;
declare namespace fromNormalAndPoint {
    export { plane };
}
import vec3 = require("../vec3");
/**
 * Represents a plane in 3D coordinate space as determined by a normal (perpendicular to the plane)
 * and distance from 0,0,0.
 *
 * The contents of the array are a normal [0,1,2] and a distance [3].
 */
type plane = any[];
