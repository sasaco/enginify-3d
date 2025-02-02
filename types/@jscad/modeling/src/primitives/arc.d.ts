export = arc;
/**
 * Construct an arc in two dimensional space where all points are at the same distance from the center.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of arc
 * @param {Number} [options.radius=1] - radius of arc
 * @param {Number} [options.startAngle=0] - starting angle of the arc, in radians
 * @param {Number} [options.endAngle=TAU] - ending angle of the arc, in radians
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @param {Boolean} [options.makeTangent=false] - adds line segments at both ends of the arc to ensure that the gradients at the edges are tangent
 * @returns {path2} new 2D path
 * @alias module:modeling/primitives.arc
 * @example
 * let myshape = arc({ center: [-1, -1], radius: 2, endAngle: (TAU / 4)})
 */
declare function arc(options?: {
    center?: any[];
    radius?: number;
    startAngle?: number;
    endAngle?: number;
    segments?: number;
    makeTangent?: boolean;
}): typeof path2;
import path2 = require("../geometries/path2");
