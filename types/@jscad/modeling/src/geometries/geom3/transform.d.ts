export = transform;
/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the polygons, as this function only adjusts the transforms.
 * See applyTransforms() for the actual application of the transforms to the polygons.
 * @param {mat4} matrix - the matrix to transform with
 * @param {geom3} geometry - the geometry to transform
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.transform
 *
 * @example
 * let newgeometry = transform(fromXRotation(degToRad(90)), geometry)
 */
declare function transform(matrix: typeof mat4, geometry: typeof geom3): typeof geom3;
import mat4 = require("../../maths/mat4");
