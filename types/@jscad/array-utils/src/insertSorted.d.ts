export = insertSorted;
/**
 * Insert the given element into the give array using the compareFunction.
 * @param {Array} array - array in which to insert
 * @param {*} element - element to insert into the array
 * @param {Function} compareFunction - a function that defines the sort order of elements
 * @alias module:array-utils.insertSorted
 * @example
 * const numbers = [1, 5]
 * const result = insertSorted(numbers, 3, fnNumberSort)
 */
declare function insertSorted(array: any[], element: any, compareFunction: Function): any[];
