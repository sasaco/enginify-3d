export = transform;
/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the points, as this function only adjusts the transforms.
 * The transforms are applied when accessing the points via toPoints().
 * @param {mat4} matrix - the matrix to transform with
 * @param {path2} geometry - the geometry to transform
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.transform
 *
 * @example
 * let newpath = transform(fromZRotation(TAU / 8), path)
 */
declare function transform(matrix: typeof mat4, geometry: typeof path2): typeof path2;
import mat4 = require("../../maths/mat4");
