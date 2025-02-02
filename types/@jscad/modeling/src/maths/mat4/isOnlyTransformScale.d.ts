export = isOnlyTransformScale;
/**
 * Determine whether the given matrix is only translate and/or scale.
 * This code returns true for TAU / 2 rotation as it can be interpreted as scale.
 *
 * @param {mat4} matrix - the matrix
 * @returns {Boolean} true if matrix is for translate and/or scale
 * @alias module:modeling/maths/mat4.isOnlyTransformScale
 */
declare function isOnlyTransformScale(matrix: typeof mat4): boolean;
