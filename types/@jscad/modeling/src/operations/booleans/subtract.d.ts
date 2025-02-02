export = subtract;
/**
 * Return a new geometry representing space in the first geometry but
 * not in all subsequent geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {geom2|geom3} a new geometry
 * @alias module:modeling/booleans.subtract
 *
 * @example
 * let myshape = subtract(cuboid({size: 5}), cuboid({size: 5, center: [3,3,3]}))
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   A   |            |       |
 * |    +--+----+   =   |    +--+
 * +----+--+    |       +----+
 *      |   B   |
 *      |       |
 *      +-------+
 */
declare function subtract(...geometries: any[]): typeof geom2 | typeof geom3;
import geom2 = require("../../geometries/geom2");
import geom3 = require("../../geometries/geom3");
