export = create;
/**
 * Represents a two dimensional vector.
 * See fromValues().
 * @typedef {Array} vec2
 */
/**
 * Creates a new vector, initialized to [0,0].
 *
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.create
 */
declare function create(): vec2;
declare namespace create {
    export { vec2 };
}
/**
 * Represents a two dimensional vector.
 * See fromValues().
 */
type vec2 = any[];
