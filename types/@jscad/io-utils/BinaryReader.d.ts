export = BinaryReader;
declare class BinaryReader {
    constructor(data: any);
    _buffer: any;
    _pos: number;
    readInt8(): number;
    readUInt8(): number;
    readInt16(): number;
    readUInt16(): number;
    readInt32(): number;
    readUInt32(): number;
    readFloat(): number;
    readDouble(): number;
    readChar(): any;
    readString(length: any): any;
    seek(pos: any): void;
    getPosition(): number;
    getSize(): any;
    _decodeFloat(precisionBits: any, exponentBits: any): number;
    _decodeInt(bits: any, signed: any): number;
    _shl(a: any, b: any): any;
    _readByte(i: any, size: any): number;
    _readBits(start: any, length: any, size: any): number;
    _checkSize(neededBits: any): void;
}
