export = normal;
/**
 * Calculates the normal of the given vector.
 * The normal value is the given vector rotated 90 degrees.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - given value
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.normal
 */
declare function normal(out: typeof vec2, vector: typeof vec2): typeof vec2;
