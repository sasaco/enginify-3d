/**
 * Rotate the given objects using the given options.
 * @param {Array} angles - angle (RADIANS) of rotations about X, Y, and Z axis
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotate
 *
 * @example
 * const newsphere = rotate([TAU / 8, 0, 0], sphere())
 */
export function rotate(angles: any[], ...objects: any[]): any | any[];
/**
 * Rotate the given objects about the X axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about X
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateX
 */
export function rotateX(angle: number, ...objects: any[]): any | any[];
/**
 * Rotate the given objects about the Y axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about Y
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateY
 */
export function rotateY(angle: number, ...objects: any[]): any | any[];
/**
 * Rotate the given objects about the Z axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about Z
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateZ
 */
export function rotateZ(angle: number, ...objects: any[]): any | any[];
