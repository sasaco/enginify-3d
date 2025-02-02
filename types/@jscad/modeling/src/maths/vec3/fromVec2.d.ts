export = fromVector2;
/**
 * Create a new vector by extending a 2D vector with a Z value.
 *
 * @param {vec3} out - receiving vector
 * @param {Array} vector - 2D vector of values
 * @param {Number} [z=0] - Z value
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.fromVec2
 */
declare function fromVector2(out: typeof vec3, vector: any[], z?: number): typeof vec3;
