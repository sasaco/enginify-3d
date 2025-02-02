export = origin;
/**
 * Return the origin of the given line.
 * The origin is the point on the line which is closest to the origin [0, 0].
 *
 * @param {line2} line - line of reference
 * @return {vec2} the origin of the line
 * @alias module:modeling/maths/line2.origin
 */
declare function origin(line: typeof line2): typeof vec2;
import vec2 = require("../vec2");
