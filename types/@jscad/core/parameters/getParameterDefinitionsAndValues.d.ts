export = getAllParameterDefintionsAndValues;
/** given the root/main module and optional parameter value overrides,
 * returns parameterDefinitions & 'default' parameter values
 * the overrides are passed for to enable the parameter definitions to access the PREVIOUS
 * version of the parameter values
 * @param  {Module} rootModule an object with a structure like { main: function, getParameterDefinitions: function}
 * getParameterDefinitions is optional
 * @param  {Object} overrides an object containing parameter values, used as overrides
 * @returns {Object} { parameterValues, parameterDefinitions }
 */
declare function getAllParameterDefintionsAndValues(rootModule: Module, overrides: any): any;
