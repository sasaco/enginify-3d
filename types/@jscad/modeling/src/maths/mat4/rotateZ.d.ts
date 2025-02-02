export = rotateZ;
/**
 * Rotates a matrix by the given angle around the Z axis.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to rotate
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.rotateZ
 */
declare function rotateZ(out: typeof mat4, matrix: typeof mat4, radians: number): typeof mat4;
