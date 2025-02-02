export function availableExportFormatsFromSolids(solids: any): {
    exportFormat: any;
    availableExportFormats: {
        name: string;
        displayName: any;
    }[];
};
export function exportFilePathFromFormatAndDesign(design: any, exportFormat: any): {
    exportFilePath: string;
};
