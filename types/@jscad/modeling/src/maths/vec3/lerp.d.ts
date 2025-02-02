export = lerp;
/**
 * Performs a linear interpolation between two vectors.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @param {Number} t - interpolant (0.0 to 1.0) applied between the two inputs
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.lerp
 */
declare function lerp(out: typeof vec3, a: typeof vec3, b: typeof vec3, t: number): typeof vec3;
