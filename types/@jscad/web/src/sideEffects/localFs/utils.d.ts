/**
 * Compare the contents of the old and the new file lists.
 * @see flattenFiles() below
 * @param {Array} oldFileList - the old list of files
 * @param {Array} newFileList - the new list of files
 * @return {Array} a list of the changed files
 */
export function changedFiles(oldFileList: any[], newFileList: any[]): any[];
/**
 * Create a flattened list of files from the given file heiarchy.
 * @return {Array} a list of file entries
 */
export function flattenFiles(hierarchy: any): any[];
