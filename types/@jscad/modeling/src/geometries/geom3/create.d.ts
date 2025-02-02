export = create;
/**
 * Represents a 3D geometry consisting of a list of polygons.
 * @typedef {Object} geom3
 * @property {Array} polygons - list of polygons, each polygon containing three or more points
 * @property {mat4} transforms - transforms to apply to the polygons, see transform()
 */
/**
 * Create a new 3D geometry composed of the given polygons.
 * @param {Array} [polygons] - list of polygons, or undefined
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.create
 */
declare function create(polygons?: any[]): geom3;
declare namespace create {
    export { geom3 };
}
/**
 * Represents a 3D geometry consisting of a list of polygons.
 */
type geom3 = {
    /**
     * - list of polygons, each polygon containing three or more points
     */
    polygons: any[];
    /**
     * - transforms to apply to the polygons, see transform()
     */
    transforms: typeof mat4;
};
import mat4 = require("../../maths/mat4");
