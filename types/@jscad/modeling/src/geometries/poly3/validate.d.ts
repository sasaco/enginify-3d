export = validate;
/**
 * Determine if the given object is a valid polygon.
 * Checks for valid data structure, convex polygons, and duplicate points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/poly3.validate
 */
declare function validate(object: any): void;
