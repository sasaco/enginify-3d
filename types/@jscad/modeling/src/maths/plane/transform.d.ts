export = transform;
/**
 * Transform the given plane using the given matrix
 *
 * @param {plane} out - receiving plane
 * @param {plane} plane - plane to transform
 * @param {mat4} matrix - matrix to transform with
 * @return {plane} out
 * @alias module:modeling/maths/plane.transform
 */
declare function transform(out: typeof plane, plane: typeof plane, matrix: typeof mat4): typeof plane;
import mat4 = require("../mat4");
