export = invert;
/**
 * Creates a invert copy of the given matrix.
 * @author Julian Lloyd
 * code from https://github.com/jlmakes/rematrix/blob/master/src/index.js
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to invert
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.invert
 */
declare function invert(out: typeof mat4, matrix: typeof mat4): typeof mat4;
