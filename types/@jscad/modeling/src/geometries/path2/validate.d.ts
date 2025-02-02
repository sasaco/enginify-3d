export = validate;
/**
 * Determine if the given object is a valid path2.
 * Checks for valid data points, and duplicate points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/path2.validate
 */
declare function validate(object: any): void;
