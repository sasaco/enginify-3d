export = measureCenterOfMass;
/**
 * Measure the center of mass for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the center of mass for each geometry, i.e. [X, Y, Z]
 * @alias module:modeling/measurements.measureCenterOfMass
 *
 * @example
 * let center = measureCenterOfMass(sphere())
 */
declare function measureCenterOfMass(...geometries: any[]): any[];
