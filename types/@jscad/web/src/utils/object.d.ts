/** returns an object with the given properties of the input object
 * filtered out
 * DO NOT USE on anything but basic data, prototype is not conserved !
 * @param  {Object} object the object you want the properties removed from
 * @param  {Array} propertiesToFilter an array of property names
 * @returns {Object} a new object
 */
export function omit(propertiesToFilter: any[], object: any): any;
/** returns an object with ONLY the given properties of the input object
 * DO NOT USE on anything but basic data, prototype is not conserved !
 * @param  {Object} object the object you want the properties removed from
 * @param  {Array} propertiesToFilter an array of property names
 * @returns {Object} a new object
 */
export function keep(propertiesToFilter: any[], object: any): any;
export function atKey(key: any, object: any): any;
