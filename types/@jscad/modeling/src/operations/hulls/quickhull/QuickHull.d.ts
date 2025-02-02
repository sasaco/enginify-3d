export = QuickHull;
declare class QuickHull {
    constructor(points: any);
    tolerance: number;
    nFaces: number;
    nPoints: number;
    faces: any[];
    newFaces: any[];
    claimed: VertexList;
    unclaimed: VertexList;
    vertices: Vertex[];
    discardedFaces: any[];
    vertexPointIndices: any[];
    addVertexToFace(vertex: any, face: any): void;
    /**
     * Removes `vertex` for the `claimed` list of vertices, it also makes sure
     * that the link from `face` to the first vertex it sees in `claimed` is
     * linked correctly after the removal
     *
     * @param {Vertex} vertex
     * @param {Face} face
     */
    removeVertexFromFace(vertex: Vertex, face: Face): void;
    /**
     * Removes all the visible vertices that `face` is able to see which are
     * stored in the `claimed` vertext list
     *
     * @param {Face} face
     * @return {Vertex|undefined} If face had visible vertices returns
     * `face.outside`, otherwise undefined
     */
    removeAllVerticesFromFace(face: Face): Vertex | undefined;
    /**
     * Removes all the visible vertices that `face` is able to see, additionally
     * checking the following:
     *
     * If `absorbingFace` doesn't exist then all the removed vertices will be
     * added to the `unclaimed` vertex list
     *
     * If `absorbingFace` exists then this method will assign all the vertices of
     * `face` that can see `absorbingFace`, if a vertex cannot see `absorbingFace`
     * it's added to the `unclaimed` vertex list
     *
     * @param {Face} face
     * @param {Face} [absorbingFace]
     */
    deleteFaceVertices(face: Face, absorbingFace?: Face): void;
    /**
     * Reassigns as many vertices as possible from the unclaimed list to the new
     * faces
     *
     * @param {Faces[]} newFaces
     */
    resolveUnclaimedPoints(newFaces: Faces[]): void;
    /**
     * Computes the extremes of a tetrahedron which will be the initial hull
     *
     * @return {number[]} The min/max vertices in the x,y,z directions
     */
    computeExtremes(): number[];
    /**
     * Compues the initial tetrahedron assigning to its faces all the points that
     * are candidates to form part of the hull
     */
    createInitialSimplex(): void;
    reindexFaceAndVertices(): void;
    collectFaces(skipTriangulation: any): any[];
    /**
     * Finds the next vertex to make faces with the current hull
     *
     * - let `face` be the first face existing in the `claimed` vertex list
     *  - if `face` doesn't exist then return since there're no vertices left
     *  - otherwise for each `vertex` that face sees find the one furthest away
     *  from `face`
     *
     * @return {Vertex|undefined} Returns undefined when there're no more
     * visible vertices
     */
    nextVertexToAdd(): Vertex | undefined;
    /**
     * Computes a chain of half edges in ccw order called the `horizon`, for an
     * edge to be part of the horizon it must join a face that can see
     * `eyePoint` and a face that cannot see `eyePoint`
     *
     * @param {number[]} eyePoint - The coordinates of a point
     * @param {HalfEdge} crossEdge - The edge used to jump to the current `face`
     * @param {Face} face - The current face being tested
     * @param {HalfEdge[]} horizon - The edges that form part of the horizon in
     * ccw order
     */
    computeHorizon(eyePoint: number[], crossEdge: HalfEdge, face: Face, horizon: HalfEdge[]): void;
    /**
     * Creates a face with the points `eyeVertex.point`, `horizonEdge.tail` and
     * `horizonEdge.tail` in ccw order
     *
     * @param {Vertex} eyeVertex
     * @param {HalfEdge} horizonEdge
     * @return {HalfEdge} The half edge whose vertex is the eyeVertex
     */
    addAdjoiningFace(eyeVertex: Vertex, horizonEdge: HalfEdge): HalfEdge;
    /**
     * Adds horizon.length faces to the hull, each face will be 'linked' with the
     * horizon opposite face and the face on the left/right
     *
     * @param {Vertex} eyeVertex
     * @param {HalfEdge[]} horizon - A chain of half edges in ccw order
     */
    addNewFaces(eyeVertex: Vertex, horizon: HalfEdge[]): void;
    /**
     * Computes the distance from `edge` opposite face's centroid to
     * `edge.face`
     *
     * @param {HalfEdge} edge
     * @return {number}
     * - A positive number when the centroid of the opposite face is above the
     *   face i.e. when the faces are concave
     * - A negative number when the centroid of the opposite face is below the
     *   face i.e. when the faces are convex
     */
    oppositeFaceDistance(edge: HalfEdge): number;
    /**
     * Merges a face with none/any/all its neighbors according to the strategy
     * used
     *
     * if `mergeType` is MERGE_NON_CONVEX_WRT_LARGER_FACE then the merge will be
     * decided based on the face with the larger area, the centroid of the face
     * with the smaller area will be checked against the one with the larger area
     * to see if it's in the merge range [tolerance, -tolerance] i.e.
     *
     *    dot(centroid smaller face, larger face normal) - larger face offset > -tolerance
     *
     * Note that the first check (with +tolerance) was done on `computeHorizon`
     *
     * If the above is not true then the check is done with respect to the smaller
     * face i.e.
     *
     *    dot(centroid larger face, smaller face normal) - smaller face offset > -tolerance
     *
     * If true then it means that two faces are non convex (concave), even if the
     * dot(...) - offset value is > 0 (that's the point of doing the merge in the
     * first place)
     *
     * If two faces are concave then the check must also be done on the other face
     * but this is done in another merge pass, for this to happen the face is
     * marked in a temporal NON_CONVEX state
     *
     * if `mergeType` is MERGE_NON_CONVEX then two faces will be merged only if
     * they pass the following conditions
     *
     *    dot(centroid smaller face, larger face normal) - larger face offset > -tolerance
     *    dot(centroid larger face, smaller face normal) - smaller face offset > -tolerance
     *
     * @param {Face} face
     * @param {number} mergeType - Either MERGE_NON_CONVEX_WRT_LARGER_FACE or
     * MERGE_NON_CONVEX
     */
    doAdjacentMerge(face: Face, mergeType: number): boolean;
    /**
     * Adds a vertex to the hull with the following algorithm
     *
     * - Compute the `horizon` which is a chain of half edges, for an edge to
     *   belong to this group it must be the edge connecting a face that can
     *   see `eyeVertex` and a face which cannot see `eyeVertex`
     * - All the faces that can see `eyeVertex` have its visible vertices removed
     *   from the claimed VertexList
     * - A new set of faces is created with each edge of the `horizon` and
     *   `eyeVertex`, each face is connected with the opposite horizon face and
     *   the face on the left/right
     * - The new faces are merged if possible with the opposite horizon face first
     *   and then the faces on the right/left
     * - The vertices removed from all the visible faces are assigned to the new
     *   faces if possible
     *
     * @param {Vertex} eyeVertex
     */
    addVertexToHull(eyeVertex: Vertex): void;
    build(): void;
}
import VertexList = require("@jscad/modeling/src/operations/hulls/quickhull/VertexList");
import Vertex = require("@jscad/modeling/src/operations/hulls/quickhull/Vertex");
import { Face } from "@jscad/modeling/src/operations/hulls/quickhull/Face";
