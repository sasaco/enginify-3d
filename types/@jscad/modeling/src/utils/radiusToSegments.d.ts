export = radiusToSegments;
/**
 * Calculate the number of segments from the given radius based on minimum length or angle.
 * @param {Number} radius - radius of the requested shape
 * @param {Number} minimumLength - minimum length of segments; length > 0
 * @param {Number} minimumAngle - minimum angle (radians) between segments; 0 > angle < TAU
 * @returns {Number} number of segments to complete the radius
 * @alias module:modeling/utils.radiusToSegments
 */
declare function radiusToSegments(radius: number, minimumLength: number, minimumAngle: number): number;
