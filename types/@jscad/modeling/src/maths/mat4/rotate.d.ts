export = rotate;
/**
 * Rotates a matrix by the given angle about the given axis.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to rotate
 * @param {Number} radians - angle to rotate the matrix by
 * @param {vec3} axis - axis to rotate around
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.rotate
 */
declare function rotate(out: typeof mat4, matrix: typeof mat4, radians: number, axis: typeof vec3): typeof mat4;
