export = transform;
/**
 * Transform the given polygon using the given matrix.
 * @param {mat4} matrix - the matrix to transform with
 * @param {poly3} polygon - the polygon to transform
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometries/poly3.transform
 */
declare function transform(matrix: typeof mat4, polygon: typeof poly3): typeof poly3;
import mat4 = require("../../maths/mat4");
