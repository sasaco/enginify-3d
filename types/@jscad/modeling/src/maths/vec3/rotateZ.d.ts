export = rotateZ;
/**
 * Rotate the given vector around the given origin, Z axis only.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to rotate
 * @param {vec3} origin - origin of the rotation
 * @param {Number} radians - angle of rotation in radians
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.rotateZ
 */
declare function rotateZ(out: typeof vec3, vector: typeof vec3, origin: typeof vec3, radians: number): typeof vec3;
