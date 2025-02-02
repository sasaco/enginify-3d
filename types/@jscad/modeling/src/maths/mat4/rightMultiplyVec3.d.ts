export = rightMultiplyVec3;
/**
 * Multiply a 3D vector by a matrix (interpreted as 3 row, 1 column)
 *
 * Calculation: result = v*M, where the fourth element is set to 1.
 * @param {vec3} vector - input vector
 * @param {mat4} matrix - input matrix
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/mat4.rightMultiplyVec3
 */
declare function rightMultiplyVec3(vector: typeof vec3, matrix: typeof mat4): typeof vec3;
