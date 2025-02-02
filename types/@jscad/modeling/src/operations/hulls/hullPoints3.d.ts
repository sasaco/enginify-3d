export = hullPoints3;
/**
 * Create a convex hull of the given set of points, where each point is an array of [x,y,z].
 *
 * @param {Array} uniquePoints - list of UNIQUE points from which to create a hull
 * @returns {Array} a list of polygons (poly3)
 * @alias module:modeling/hulls.hullPoints3
 */
declare function hullPoints3(uniquePoints: any[]): any[];
