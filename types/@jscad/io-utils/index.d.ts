export let convertToBlob: (input: {
    data: any[];
    mimeType: string;
}) => Blob;
export let makeBlob: () => Function;
export let BinaryReader: typeof import("@jscad/io-utils/BinaryReader");
export let Blob: typeof import("@jscad/io-utils/Blob");
export let ensureString: (stringOrArrayBuffer: any, defaultBinaryEncoding?: string) => string;
