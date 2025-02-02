export = project;
/**
 * Project the given 3D geometry on to the given plane.
 * @param {Object} options - options for project
 * @param {Array} [options.axis=[0,0,1]] the axis of the plane (default is Z axis)
 * @param {Array} [options.origin=[0,0,0]] the origin of the plane
 * @param {...Object} objects - the list of 3D geometry to project
 * @return {geom2|Array} the projected 2D geometry, or a list of 2D projected geometry
 * @alias module:modeling/extrusions.project
 *
 * @example
 * let myshape = project({}, sphere({radius: 20, segments: 5}))
 */
declare function project(options: {
    axis?: any[];
    origin?: any[];
}, ...objects: any[]): typeof geom2 | any[];
import geom2 = require("../../geometries/geom2");
