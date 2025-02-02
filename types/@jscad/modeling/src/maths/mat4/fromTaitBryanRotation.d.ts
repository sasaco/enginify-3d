export = fromTaitBryanRotation;
/**
 * Creates a matrix from the given Tait–Bryan angles.
 *
 * Tait-Bryan Euler angle convention using active, intrinsic rotations around the axes in the order z-y-x.
 * @see https://en.wikipedia.org/wiki/Euler_angles
 *
 * @param {mat4} out - receiving matrix
 * @param {Number} yaw - Z rotation in radians
 * @param {Number} pitch - Y rotation in radians
 * @param {Number} roll - X rotation in radians
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromTaitBryanRotation
 * @example
 * let matrix = fromTaitBryanRotation(create(), TAU / 4, 0, TAU / 2)
 */
declare function fromTaitBryanRotation(out: typeof mat4, yaw: number, pitch: number, roll: number): typeof mat4;
