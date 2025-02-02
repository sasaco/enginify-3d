export = aboutEqualNormals;
/**
 * Compare two normals (unit vectors) for near equality.
 * @param {vec3} a - normal a
 * @param {vec3} b - normal b
 * @returns {Boolean} true if a and b are nearly equal
 * @alias module:modeling/maths/utils.aboutEqualNormals
 */
declare function aboutEqualNormals(a: typeof vec3, b: typeof vec3): boolean;
