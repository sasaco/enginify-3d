export = loadDesign;
/**
 * load a jscad script, injecting the basic dependencies if necessary
 * @param source the source code
 * @param {String} mainPath - file or directory path
 * @param {String} apiMainPath - path to main API module, i.e. '@jscad/modeling'
 * @param {Array} filesAndFolders - array of files and folders to use
 * @param {Object} parameterValuesOverride - the values to use to override the defaults for the current design
 */
declare function loadDesign(mainPath: string, apiMainPath: string, filesAndFolders: any[], parameterValuesOverride: any): any;
