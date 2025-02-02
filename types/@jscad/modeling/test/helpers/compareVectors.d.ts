export = compareVectors;
/**
 * Compare two vectors for equality
 * @param {vec} vec1 - vector (array) of values
 * @param {vec} vec2 - vector (array) of values
 * @param {number} eps - Epsilon - the largest difference between two numbers to consider trivial
 * @returns {boolean} result of comparison
 */
declare function compareVectors(vec1: vec, vec2: vec, eps?: number): boolean;
