export = expand;
/**
 * Expand the given geometry using the given options.
 * Both internal and external space is expanded for 2D and 3D shapes.
 *
 * Note: Contract is expand using a negative delta.
 * @param {Object} options - options for expand
 * @param {Number} [options.delta=1] - delta (+/-) of expansion
 * @param {String} [options.corners='edge'] - type of corner to create after expanding; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {...Objects} objects - the geometries to expand
 * @return {Object|Array} new geometry, or list of new geometries
 * @alias module:modeling/expansions.expand
 *
 * @example
 * let newarc = expand({delta: 5, corners: 'edge'}, arc({}))
 * let newsquare = expand({delta: 5, corners: 'chamfer'}, square({size: 30}))
 * let newcuboid = expand({delta: 2, corners: 'round'}, cuboid({size: [20, 25, 5]}))
 */
declare function expand(options: {
    delta?: number;
    corners?: string;
    segments?: Integer;
}, ...objects: Objects[]): any | any[];
