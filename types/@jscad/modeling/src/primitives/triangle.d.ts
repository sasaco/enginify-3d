export = triangle;
/**
 * Construct a triangle in two dimensional space from the given options.
 * The triangle is always constructed CCW from the origin, [0, 0, 0].
 * @see https://www.mathsisfun.com/algebra/trig-solving-triangles.html
 * @param {Object} [options] - options for construction
 * @param {String} [options.type='SSS'] - type of triangle to construct; A ~ angle, S ~ side
 * @param {Array} [options.values=[1,1,1]] - angle (radians) of corners or length of sides
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.triangle
 *
 * @example
 * let myshape = triangle({type: 'AAS', values: [degToRad(62), degToRad(35), 7]})
 */
declare function triangle(options?: {
    type?: string;
    values?: any[];
}): typeof geom2;
import geom2 = require("../geometries/geom2");
