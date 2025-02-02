export = PolygonHierarchy;
declare class PolygonHierarchy {
    constructor(slice: any);
    plane: any;
    v: vec3.Vec3;
    u: vec3.Vec3;
    basisMap: Map<any, any>;
    roots: {
        solid: vec2.Vec2[];
        holes: any;
    }[];
    to2D(vector3: any): vec2.Vec2;
    to3D(vector2: any): any;
}
import vec3 = require("../../../maths/vec3");
import vec2 = require("../../../maths/vec2");
