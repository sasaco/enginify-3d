export = create;
/**
 * Create a new connector.
 * A connector allows two objects to be connected at predefined positions.
 *
 * For example a servo motor and a servo horn can both have a connector called 'shaft'.
 * The horn can be moved and rotated to any position, and then the servo horn
 * is attached to the servo motor at the proper position, such that the two connectors match.
 * Connectors are children of the solid, transform-wise, so transformations are applied
 * to both solid and connector(s).  (parent => child relationship)
 *
 * @property {vec3} point - the position of the connector (relative to its parent)
 * @property {vec3} axis - the direction (unit vector) of the connector
 * @property {vec3} normal - the direction (unit vector) perpendicular to axis, that defines the "12 o'clock" orientation of the connector
 * @alias module:modeling/connectors.create
 *
 * @example
 * let myconnector = create()
 */
declare function create(): {
    point: vec3.Vec3;
    axis: vec3.Vec3;
    normal: vec3.Vec3;
};
import vec3 = require("../maths/vec3");
