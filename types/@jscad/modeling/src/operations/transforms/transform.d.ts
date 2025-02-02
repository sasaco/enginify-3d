export = transform;
/**
 * Transform the given objects using the given matrix.
 * @param {mat4} matrix - a transformation matrix
 * @param {...Object} objects - the objects to transform
 * @return {Object|Array} the transformed object, or a list of transformed objects
 * @alias module:modeling/transforms.transform
 *
 * @example
 * const newsphere = transform(mat4.rotateX(TAU / 8), sphere())
 */
declare function transform(matrix: typeof mat4, ...objects: any[]): any | any[];
