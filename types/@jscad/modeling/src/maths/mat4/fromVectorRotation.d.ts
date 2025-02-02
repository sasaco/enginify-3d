export = fromVectorRotation;
/**
 * Create a matrix that rotates the given source to the given target vector.
 *
 * Each vector must be a directional vector with a length greater than zero.
 * @see https://gist.github.com/kevinmoran/b45980723e53edeb8a5a43c49f134724
 * @param {mat4} out - receiving matrix
 * @param {vec3} source - source vector
 * @param {vec3} target - target vector
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromVectorRotation
 * @example
 * let matrix = fromVectorRotation(mat4.create(), [1, 2, 2], [-3, 3, 12])
 */
declare function fromVectorRotation(out: typeof mat4, source: typeof vec3, target: typeof vec3): typeof mat4;
import vec3 = require("../vec3");
