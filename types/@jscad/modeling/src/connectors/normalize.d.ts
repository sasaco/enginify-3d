export = normalize;
declare function normalize(connector: any): {
    point: vec3.Vec3;
    axis: vec3.Vec3;
    normal: vec3.Vec3;
};
import vec3 = require("../maths/vec3");
