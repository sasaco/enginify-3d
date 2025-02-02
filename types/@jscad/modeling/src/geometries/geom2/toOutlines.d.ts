export = toOutlines;
/**
 * Create the outline(s) of the given geometry.
 * @param {geom2} geometry - geometry to create outlines from
 * @returns {Array} an array of outlines, where each outline is an array of ordered points
 * @alias module:modeling/geometries/geom2.toOutlines
 *
 * @example
 * let geometry = subtract(rectangle({size: [5, 5]}), rectangle({size: [3, 3]}))
 * let outlines = toOutlines(geometry) // returns two outlines
 */
declare function toOutlines(geometry: typeof geom2): any[];
