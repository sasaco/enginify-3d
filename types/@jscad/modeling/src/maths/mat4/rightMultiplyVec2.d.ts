export = rightMultiplyVec2;
/**
 * Multiply a 2D vector by a matrix (interpreted as 2 row, 1 column).
 *
 * Calculation: result = v*M, where the fourth element is set to 1.
 * @param {vec2} vector - input vector
 * @param {mat4} matrix - input matrix
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/mat4.rightMultiplyVec2
 */
declare function rightMultiplyVec2(vector: typeof vec2, matrix: typeof mat4): typeof vec2;
