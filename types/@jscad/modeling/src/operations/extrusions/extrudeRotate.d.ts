export = extrudeRotate;
/**
 * Rotate extrude the given geometry using the given options.
 *
 * @param {Object} options - options for extrusion
 * @param {Number} [options.angle=TAU] - angle of the extrusion (RADIANS)
 * @param {Number} [options.startAngle=0] - start angle of the extrusion (RADIANS)
 * @param {String} [options.overflow='cap'] - what to do with points outside of bounds (+ / - x) :
 * defaults to capping those points to 0 (only supported behaviour for now)
 * @param {Number} [options.segments=12] - number of segments of the extrusion
 * @param {geom2} geometry - the geometry to extrude
 * @returns {geom3} the extruded geometry
 * @alias module:modeling/extrusions.extrudeRotate
 *
 * @example
 * const myshape = extrudeRotate({segments: 8, angle: TAU / 2}, circle({size: 3, center: [4, 0]}))
 */
declare function extrudeRotate(options: {
    angle?: number;
    startAngle?: number;
    overflow?: string;
    segments?: number;
}, geometry: typeof geom2): typeof geom3;
import geom2 = require("../../geometries/geom2");
