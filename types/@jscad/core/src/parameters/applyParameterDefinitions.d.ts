export = applyParameterDefinitions;
/**
 * casts the parameters/ get their correct values based on the
 * raw parameters (passed into the CLI tool for example) and the
 * parameter defintions as present in the jscad script
 * @param {Object} inputParameters: input parameter as an object {paramName: paramValue}
 * @param {Array} parameterDefinitions
 * @returns {Object} the parameter values, as an object
 */
declare function applyParameterDefinitions(inputParameters: any, parameterDefinitions: any[], throwOnNoDefinition?: boolean): any;
