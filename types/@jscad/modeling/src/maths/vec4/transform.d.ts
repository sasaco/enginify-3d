export = transform;
/**
 * Transform the given vector using the given matrix.
 *
 * @param {vec4} out - receiving vector
 * @param {vec4} vector - vector to transform
 * @param {mat4} matrix - matrix to transform with
 * @returns {vec4} out
 * @alias module:modeling/maths/vec4.transform
 */
declare function transform(out: typeof vec4, vector: typeof vec4, matrix: typeof mat4): typeof vec4;
