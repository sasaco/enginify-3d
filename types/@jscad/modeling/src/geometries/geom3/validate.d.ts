export = validate;
/**
 * Determine if the given object is a valid 3D geometry.
 * Checks for valid data structure, convex polygon faces, and manifold edges.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/geom3.validate
 */
declare function validate(object: any): void;
