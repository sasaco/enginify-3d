export = fromPlanes;
/**
 * Create a line the intersection of the given planes.
 *
 * @param {line3} out - receiving line
 * @param {plane} plane1 - first plane of reference
 * @param {plane} plane2 - second plane of reference
 * @returns {line3} out
 * @alias module:modeling/maths/line3.fromPlanes
 */
declare function fromPlanes(out: typeof line3, plane1: typeof plane, plane2: typeof plane): typeof line3;
