export = scale;
/**
 * Scales the coordinates of the given vector by a scalar number.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to scale
 * @param {Number} amount - amount to scale the vector by
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.scale
 */
declare function scale(out: typeof vec3, vector: typeof vec3, amount: number): typeof vec3;
