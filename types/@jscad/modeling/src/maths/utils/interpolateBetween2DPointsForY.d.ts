export = interpolateBetween2DPointsForY;
/**
 * Get the X coordinate of a point with a certain Y coordinate, interpolated between two points.
 * Interpolation is robust even if the points have the same Y coordinate
 * @param {vec2} point1
 * @param {vec2} point2
 * @param {Number} y
 * @return {Array} X and Y of interpolated point
 * @alias module:modeling/maths/utils.interpolateBetween2DPointsForY
 */
declare function interpolateBetween2DPointsForY(point1: typeof vec2, point2: typeof vec2, y: number): any[];
