export = Blob;
/**
 * The Blob object represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Blob
 */
declare class Blob {
    /**
     * Returns a newly created Blob object which contains a concatenation of all of the data in the given contents.
     * @param {Array} contents - an array of ArrayBuffer, or String objects that will be put inside the Blob.
     */
    constructor(contents: any[], options: any);
    size: number;
    type: any;
    isClosed: boolean;
    encoding: any;
    buffer: Buffer;
    length: any;
    asBuffer(): Buffer;
    arrayBuffer(): Buffer;
    slice(start: any, end: any, type: any): Blob;
    stream(): any;
    text(): string;
    close(): void;
    toString(): string;
}
