export = xAtY;
/**
 * Determine the X coordinate of the given line at the Y coordinate.
 *
 * The X coordinate will be Infinity if the line is parallel to the X axis.
 *
 * @param {line2} line - line of reference
 * @param {Number} y - Y coordinate on the line
 * @return {Number} the X coordinate on the line
 * @alias module:modeling/maths/line2.xAtY
 */
declare function xAtY(line: typeof line2, y: number): number;
