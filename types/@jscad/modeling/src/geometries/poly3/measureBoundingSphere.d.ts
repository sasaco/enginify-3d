export = measureBoundingSphere;
/**
 * Measure the bounding sphere of the given polygon.
 * @param {poly3} polygon - the polygon to measure
 * @returns {vec4} the computed bounding sphere; center point (3D) and radius
 * @alias module:modeling/geometries/poly3.measureBoundingSphere
 */
declare function measureBoundingSphere(polygon: typeof poly3): typeof vec4;
import vec4 = require("../../maths/vec4");
