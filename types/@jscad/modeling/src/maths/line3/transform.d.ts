export = transform;
/**
 * Transforms the given line using the given matrix.
 *
 * @param {line3} out - line to update
 * @param {line3} line - line to transform
 * @param {mat4} matrix - matrix to transform with
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.transform
 */
declare function transform(out: typeof line3, line: typeof line3, matrix: typeof mat4): typeof line3;
