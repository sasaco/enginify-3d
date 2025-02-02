export = HalfEdge;
declare class HalfEdge {
    constructor(vertex: any, face: any);
    vertex: any;
    face: any;
    next: any;
    prev: any;
    opposite: any;
    head(): any;
    tail(): any;
    length(): any;
    lengthSquared(): any;
    setOpposite(edge: any): void;
}
