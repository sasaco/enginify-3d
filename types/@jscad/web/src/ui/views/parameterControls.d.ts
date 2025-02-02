/**
 * Creates a series of table row elements for the list of parameters
 * @param  {Object} prevParameterValues - Current values and state of parameters to maintain consistency
 * @param {array} parameterDefinitions - The definitions provides by the current model script
 * @param {function} rebuildSolid - The method to call when parameters change.
 * @returns {{controls: Array of DOM elements}}
 */
export function createParamControls(prevParameterValues: any, parameterDefinitions: any[], rebuildSolid: Function): {
    controls: any[];
};
