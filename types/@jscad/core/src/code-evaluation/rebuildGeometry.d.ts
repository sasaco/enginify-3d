export = rebuildSolids;
/**
 * Rebuild JSCAD solids from the given filesAndFolders.
 * The provided filesAndFolders is expected to consist of a valid JSCAD design.
 * An array consisting of:
 * - single file or project folder from the results of walkFileTree()
 * - fake single file entry containing { name, ext, source, fullPath }
 * @param {Object} data - data (and options) required for rebuilding
 * @param {Array} data.filesAndFolders - array of files / directories
 * @param {String} [data.mainPath] - path of the file containing the main function (optional)
 * @param {Boolean} [data.serialize] - true to serialize the solids into JSON
 * @param {Object} [data.lookup] - geometry cache lookup (optional)
 * @param {Object} [data.lookupCounts] - geometry cache lookup counts (optional)
 * @param {Object} [data.parameterValues] - over-rides of parameter values (optional)
 * @param {Function} callback - function to process parameters and solids
 * @return NONE
 *
 * This function extracts the parameters first, and then generates the solids.
 * The parsed parameters (definitions and values) are passed back to the given callback function.
 * The generated solids are also passed back to the given callback function.
 * Also, all errors are caught and passed back to the given callback function.
 *
 * Everything is together in a single function, because this is usually run in the context of a web worker
 * And transfering data back & forth is both complex (see transferables) and costly (time)
 **/
declare function rebuildSolids(data: {
    filesAndFolders: any[];
    mainPath?: string;
    serialize?: boolean;
    lookup?: any;
    lookupCounts?: any;
    parameterValues?: any;
}, callback: Function): void;
