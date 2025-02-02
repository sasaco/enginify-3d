export = transform;
/**
 * Transforms the given line using the given matrix.
 *
 * @param {line2} out - receiving line
 * @param {line2} line - line to transform
 * @param {mat4} matrix - matrix to transform with
 * @returns {line2} out
 * @alias module:modeling/maths/line2.transform
 */
declare function transform(out: typeof line2, line: typeof line2, matrix: typeof mat4): typeof line2;
