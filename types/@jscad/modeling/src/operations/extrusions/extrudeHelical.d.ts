export = extrudeHelical;
/**
 * Perform a helical extrude of the geometry, using the given options.
 *
 * @param {Object} options - options for extrusion
 * @param {Number} [options.angle=TAU] - angle of the extrusion (RADIANS) positive for right-hand rotation, negative for left-hand
 * @param {Number} [options.startAngle=0] - start angle of the extrusion (RADIANS)
 * @param {Number} [options.pitch=10] - elevation gain for each turn
 * @param {Number} [options.height] - total height of the helix path. Ignored if pitch is set.
 * @param {Number} [options.endOffset=0] - offset the final radius of the extrusion, allowing for tapered helix, and or spiral
 * @param {Number} [options.segmentsPerRotation=32] - number of segments per full rotation of the extrusion
 * @param {geom2} geometry - the geometry to extrude
 * @returns {geom3} the extruded geometry
 * @alias module:modeling/extrusions.extrudeHelical
 *
 * @example
 * const myshape = circle({size: 3, center: [10, 0]}) // position for extrusion about Z
 * const mycoil = extrudeHelical({angle: TAU*2, pitch: 10, segmentsPerRotation: 64}, myshape))
 */
declare function extrudeHelical(options: {
    angle?: number;
    startAngle?: number;
    pitch?: number;
    height?: number;
    endOffset?: number;
    segmentsPerRotation?: number;
}, geometry: typeof geom2): typeof geom3;
import geom2 = require("../../geometries/geom2");
