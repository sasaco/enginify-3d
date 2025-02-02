export = hullPoints2;
/**
 * Create a convex hull of the given set of points, where each point is an array of [x,y].
 * @see https://en.wikipedia.org/wiki/Graham_scan
 *
 * @param {Array} uniquePoints - list of UNIQUE points from which to create a hull
 * @returns {Array} a list of points that form the hull
 * @alias module:modeling/hulls.hullPoints2
 */
declare function hullPoints2(uniquePoints: any[]): any[];
