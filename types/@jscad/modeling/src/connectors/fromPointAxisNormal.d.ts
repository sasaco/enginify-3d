export = fromPointAxisNormal;
/**
 * Create a connector from the given point, axis and normal.
 * @param {vec3} point - the point of the connector, relative to the parent geometry
 * @param {vec3} axis - the axis (directional vector) of the connector
 * @param {vec3} normal - the normal (directional vector) of the connector, perpendicular to the axis
 * @returns {connector} a new connector
 * @alias module:modeling/connectors.fromPointsAxisNormal
 */
declare function fromPointAxisNormal(point: typeof vec3, axis: typeof vec3, normal: typeof vec3): {
    point: vec3.Vec3;
    axis: vec3.Vec3;
    normal: vec3.Vec3;
};
import vec3 = require("../maths/vec3");
