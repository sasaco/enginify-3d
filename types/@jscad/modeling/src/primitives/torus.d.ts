export = torus;
/**
 * Construct a torus by revolving a small circle (inner) about the circumference of a large (outer) circle.
 * @param {Object} [options] - options for construction
 * @param {Number} [options.innerRadius=1] - radius of small (inner) circle
 * @param {Number} [options.outerRadius=4] - radius of large (outer) circle
 * @param {Integer} [options.innerSegments=32] - number of segments to create per rotation
 * @param {Integer} [options.outerSegments=32] - number of segments to create per rotation
 * @param {Integer} [options.innerRotation=0] - rotation of small (inner) circle in radians
 * @param {Number} [options.outerRotation=TAU] - rotation (outer) of the torus (RADIANS)
 * @param {Number} [options.startAngle=0] - start angle of the torus (RADIANS)
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.torus
 *
 * @example
 * let myshape = torus({ innerRadius: 10, outerRadius: 100 })
 */
declare function torus(options?: {
    innerRadius?: number;
    outerRadius?: number;
    innerSegments?: Integer;
    outerSegments?: Integer;
    innerRotation?: Integer;
    outerRotation?: number;
    startAngle?: number;
}): typeof geom3;
