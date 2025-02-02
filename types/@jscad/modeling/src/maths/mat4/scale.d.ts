export = scale;
/**
 * Scales the matrix by the given dimensions.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to scale
 * @param {vec3} dimensions - dimensions to scale the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.scale
 */
declare function scale(out: typeof mat4, matrix: typeof mat4, dimensions: typeof vec3): typeof mat4;
