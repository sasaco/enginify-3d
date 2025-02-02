export = snap;
/**
 * Snap the given geometries to the precision (calculated epsilon) of the geometry.
 * @see measurements.measureEpsilon()
 * @param {...Object} geometries - the geometries to snap
 * @return {Object|Array} the snapped geometry, or a list of snapped geometries
 * @alias module:modeling/modifiers.snap
 */
declare function snap(...geometries: any[]): any | any[];
