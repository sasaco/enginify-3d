export = intersect;
/**
 * Calculate the intersect point of the two line segments (p1-p2 and p3-p4), end points included.
 * Note: If the line segments do NOT intersect then undefined is returned.
 * @see http://paulbourke.net/geometry/pointlineplane/
 * @param {vec2} p1 - first point of first line segment
 * @param {vec2} p2 - second point of first line segment
 * @param {vec2} p3 - first point of second line segment
 * @param {vec2} p4 - second point of second line segment
 * @returns {vec2} intersection point of the two line segments, or undefined
 * @alias module:modeling/maths/utils.intersect
 */
declare function intersect(p1: typeof vec2, p2: typeof vec2, p3: typeof vec2, p4: typeof vec2): typeof vec2;
