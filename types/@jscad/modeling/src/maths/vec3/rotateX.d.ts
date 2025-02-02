export = rotateX;
/**
 * Rotate the given vector around the given origin, X axis only.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to rotate
 * @param {vec3} origin - origin of the rotation
 * @param {Number} radians - angle of rotation
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.rotateX
 */
declare function rotateX(out: typeof vec3, vector: typeof vec3, origin: typeof vec3, radians: number): typeof vec3;
