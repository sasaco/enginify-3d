export = validate;
/**
 * Determine if the given object is a valid geom2.
 * Checks for closedness, self-edges, and valid data points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/geom2.validate
 */
declare function validate(object: any): void;
