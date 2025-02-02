export = transform;
/**
 * Transform the given slice using the given matrix.
 * @param {mat4} matrix - transform matrix
 * @param {slice} slice - slice to transform
 * @returns {slice} the transformed slice
 * @alias module:modeling/extrusions/slice.transform
 *
 * @example
 * let matrix = mat4.fromTranslation([1, 2, 3])
 * let newslice = transform(matrix, oldslice)
 */
declare function transform(matrix: typeof mat4, slice: typeof slice): typeof slice;
