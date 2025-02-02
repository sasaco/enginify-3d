export = rotateY;
/**
 * Rotate the given vector around the given origin, Y axis only.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to rotate
 * @param {vec3} origin - origin of the rotation
 * @param {Number} radians - angle of rotation
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.rotateY
 */
declare function rotateY(out: typeof vec3, vector: typeof vec3, origin: typeof vec3, radians: number): typeof vec3;
