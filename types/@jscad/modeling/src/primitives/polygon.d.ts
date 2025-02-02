export = polygon;
/**
 * Construct a polygon in two dimensional space from a list of points, or a list of points and paths.
 *
 * NOTE: The ordering of points is important, and must define a counter clockwise rotation of points.
 *
 * @param {Object} options - options for construction
 * @param {Array} options.points - points of the polygon : either flat or nested array of 2D points
 * @param {Array} [options.paths] - paths of the polygon : either flat or nested array of point indexes
 * @param {String} [options.orientation='counterclockwise'] - orientation of points
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.polygon
 *
 * @example
 * let roof = [[10,11], [0,11], [5,20]]
 * let wall = [[0,0], [10,0], [10,10], [0,10]]
 *
 * let poly = polygon({ points: roof })
 * or
 * let poly = polygon({ points: [roof, wall] })
 * or
 * let poly = polygon({ points: roof, paths: [0, 1, 2] })
 * or
 * let poly = polygon({ points: [roof, wall], paths: [[0, 1, 2], [3, 4, 5, 6]] })
 */
declare function polygon(options: {
    points: any[];
    paths?: any[];
    orientation?: string;
}): typeof geom2;
import geom2 = require("../geometries/geom2");
