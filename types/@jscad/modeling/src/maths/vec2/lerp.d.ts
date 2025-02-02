export = lerp;
/**
 * Performs a linear interpolation between two vectors.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @param {Number} t - interpolation amount between the two vectors
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.lerp
 */
declare function lerp(out: typeof vec2, a: typeof vec2, b: typeof vec2, t: number): typeof vec2;
