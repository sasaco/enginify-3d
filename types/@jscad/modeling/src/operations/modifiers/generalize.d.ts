export = generalize;
/**
 * Apply various modifications in proper order to produce a generalized geometry.
 * @param {Object} options - options for modifications
 * @param {Boolean} [options.snap=false] the geometries should be snapped to epsilons
 * @param {Boolean} [options.simplify=false] the geometries should be simplified
 * @param {Boolean} [options.triangulate=false] the geometries should be triangulated
 * @param {...Object} geometries - the geometries to generalize
 * @return {Object|Array} the modified geometry, or a list of modified geometries
 * @alias module:modeling/modifiers.generalize
 */
declare function generalize(options: {
    snap?: boolean;
    simplify?: boolean;
    triangulate?: boolean;
}, ...geometries: any[]): any | any[];
