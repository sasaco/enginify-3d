export = rotateX;
/**
 * Rotates a matrix by the given angle around the X axis.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to rotate
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.rotateX
 */
declare function rotateX(out: typeof mat4, matrix: typeof mat4, radians: number): typeof mat4;
