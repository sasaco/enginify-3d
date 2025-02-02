export = fromXRotation;
/**
 * Creates a matrix from the given angle around the X axis.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateX(dest, dest, radians)
 *
 * @param {mat4} out - receiving matrix
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromXRotation
 * @example
 * let matrix = fromXRotation(create(), TAU / 4)
 */
declare function fromXRotation(out: typeof mat4, radians: number): typeof mat4;
