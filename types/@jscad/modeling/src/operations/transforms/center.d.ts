/**
 * Center the given objects using the given options.
 * @param {Object} options - options for centering
 * @param {Array} [options.axes=[true,true,true]] - axis of which to center, true or false
 * @param {Array} [options.relativeTo=[0,0,0]] - relative point of which to center the objects
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.center
 *
 * @example
 * let myshape = center({axes: [true,false,false]}, sphere()) // center about the X axis
 */
export function center(options: {
    axes?: any[];
    relativeTo?: any[];
}, ...objects: any[]): any | any[];
/**
 * Center the given objects about the X axis.
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.centerX
 */
export function centerX(...objects: any[]): any | any[];
/**
 * Center the given objects about the Y axis.
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.centerY
 */
export function centerY(...objects: any[]): any | any[];
/**
 * Center the given objects about the Z axis.
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.centerZ
 */
export function centerZ(...objects: any[]): any | any[];
