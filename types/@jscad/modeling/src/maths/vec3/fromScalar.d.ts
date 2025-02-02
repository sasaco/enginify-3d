export = fromScalar;
/**
 * Creates a vector from a single scalar value.
 * All components of the resulting vector have the given value.
 *
 * @param {vec3} out - receiving vector
 * @param {Number} scalar
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.fromScalar
 */
declare function fromScalar(out: typeof vec3, scalar: number): typeof vec3;
