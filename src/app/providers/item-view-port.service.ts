import { Injectable } from '@angular/core';
import { SceneService } from '../components/three/scene.service';
import * as THREE from "three";

@Injectable({
  providedIn: 'root'
})
export class ItemViewPortService {

  constructor( private scene: SceneService) { }

  public createItem() {
    // three.js のメッシュを作成
    var plane = this.createMesh();
    // ViewPort に表示するアイテムを作成
    this.setinViewPort(plane);
    // konva.js の図形を作成
    this.createShape();
  }

  ////////////////////////////////////////////////////////////////////
  // ViewPort に表示するアイテムを作成
  private setinViewPort(ViewPortPlane: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) {

    const lineSegmentsList: THREE.LineSegments[] = [];
    // 赤い線用のマテリアル
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    // 投影対象となる現在シーンに登録されているオブジェクト
    let objList = this.scene.get();
    // ワールド空間での Plane の法線を取得（通常、PlaneGeometry は XY 平面や XZ 平面に配置されているので注意）
    const planeNormal = ViewPortPlane.getWorldDirection(new THREE.Vector3());

    // 例外処理（ViewPortに反映しないものはスキップ）
    objList = objList.filter(obj => obj.type == 'Mesh');
    objList = objList.filter(obj => obj.name !== 'view port');

    for (const obj of objList) {

      // まず、ジオメトリから面情報（頂点インデックスや法線）を取得
      const geometry: any = (obj as THREE.Mesh).geometry;
      const faces = this.getFacesFromBufferGeometry(geometry);

      // 大まかにMashと衝突するか判定
      const enableFaces1 = [];
      for(const face of faces){
        if(this.isEdgeVisible(face.center, planeNormal, face, objList)){
          enableFaces1.push(face);
        }
      }
      if(enableFaces1.length == 0){
        continue;
      }
      // 面の中心が隠れているか判定
      const objList2 = enableFaces1.map(face => face.mesh);
      const enableFaces = [];
      for(const face of enableFaces1){
        if(this.isEdgeVisible(face.center, planeNormal, face, objList2)){
          if(face.secter === face.mesh){
            enableFaces.push(face);
          }
        }
      }
      if(enableFaces.length == 0){
        continue;
      }

      // エッジとそれに接する面の組を保持するマップ
      const edgeFaceMap = new Map();
      // 各面について辺を登録する（辺のキーは「小さい方の頂点インデックス_大きい方の頂点インデックス」とする）
      enableFaces.forEach(face => {
        const indices = [ face.a, face.b, face.c ];
        for (let i = 0; i < 3; i++) {
          const i1 = indices[i];
          const i2 = indices[(i + 1) % 3];
          const key = i1 < i2 ? `${i1}_${i2}` : `${i2}_${i1}`;
          if (!edgeFaceMap.has(key)) {
            edgeFaceMap.set(key, []);
          }
          edgeFaceMap.get(key).push(face);
        }
      }); 


      // シルエットエッジのリスト
      const silhouetteEdges: any[] = [];
      // 各エッジについて、隣接する面のうち一方だけがビューポートに向いているかをチェック
      edgeFaceMap.forEach((adjacentFaces, edgeKey) => {
        if (adjacentFaces.length !== 2) {
          // 例えばメッシュの境界エッジの場合は、片側だけの場合もあります
          silhouetteEdges.push(edgeKey);
        } else {
          const face1 = adjacentFaces[0];
          const face2 = adjacentFaces[1];
          // 各面の法線と plane の法線との内積を計算
          const dot1 = face1.normal.dot(planeNormal);
          const dot2 = face2.normal.dot(planeNormal);
          // 片方のみ正面（＝内積が正）であればシルエットエッジ
          if ((dot1 > 0 && dot2 <= 0) || (dot1 <= 0 && dot2 > 0)) {
            silhouetteEdges.push(edgeKey);
          }
        }
      });
      
      // silhouetteEdges を赤い線で描画するコード
      // 元のジオメトリから position 属性を取得
      const posAttr = geometry.attributes.position;
      // silhouetteEdges の各エッジごとに、2頂点の座標を取得して配列に追加
      const linePositions: number[] = [];
      silhouetteEdges.forEach(edgeKey => {
        // 例: edgeKey は "0_1" のような文字列
        const indices = edgeKey.split('_').map((str: string) => parseInt(str));
        const i1 = indices[0];
        const i2 = indices[1];

        // THREE.BufferAttribute の getX, getY, getZ を利用して頂点座標を取得
        const v1 = new THREE.Vector3(
          (posAttr as THREE.BufferAttribute).getX(i1),
          (posAttr as THREE.BufferAttribute).getY(i1),
          (posAttr as THREE.BufferAttribute).getZ(i1)
        );
        const v2 = new THREE.Vector3(
          (posAttr as THREE.BufferAttribute).getX(i2),
          (posAttr as THREE.BufferAttribute).getY(i2),
          (posAttr as THREE.BufferAttribute).getZ(i2)
        );

        // 2頂点の座標を linePositions 配列に追加
        linePositions.push(v1.x, v1.y, v1.z);
        linePositions.push(v2.x, v2.y, v2.z);
      });

      // linePositions から BufferGeometry を作成
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      // LineSegments オブジェクトを作成してシーンに追加
      const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      lineSegmentsList.push(lineSegments);
      
    }
    // シーンに追加
    for(const lineSegments of lineSegmentsList){
      this.scene.add(lineSegments);
    }
  }

  // ヒットテスト用の関数：エッジの中点が隠れていないかチェックする
  private isEdgeVisible(
    midpoint: THREE.Vector3, 
    planeNormal: THREE.Vector3, 
    face: any, 
    objList: THREE.Object3D<THREE.Event>[],
    tolerance = 0.001) {


    // 中点からplateに投影する位置へ向かう方向を求める
    const direction = planeNormal.clone();
    // レイキャスターの設定
    const raycaster = new THREE.Raycaster(midpoint, direction);
    // ※ここではシーン内のすべてのオブジェクトを対象にしていますが、必要に応じて対象を絞ってください
    const intersects = raycaster.intersectObjects(objList, true);

    // intersects が空の場合は、交差しているオブジェクトがないので face.secter を null にして処理を続ける
    if(intersects.length === 0) {
      face.secter = null;
      return true;
    }
    
    // 交差したオブジェクトのうち、自分自身以外の面と交差しているものがあれば隠れていると判定
    if(intersects.length > 1) {
      return false;
    }

    const secter = intersects[0];
    if(secter.object != null){
      face.secter = secter['object'];
    }else{
      face.secter = null;
    }
    return true;
  }

  // BufferGeometry から index と position 属性を用いて、各三角形（面）の情報（頂点インデックス、面の中心、面法線）を生成する例です。
  // ジオメトリがインデックス付きの場合と、インデックスが存在しない場合の両方に対応しています。
  private getFacesFromBufferGeometry(geometry: THREE.BufferGeometry)
    : { a: number; b: number; c: number; mesh: THREE.Mesh; center: THREE.Vector3; normal: THREE.Vector3; secter: THREE.Mesh | null;  }[] 
  {
    // MeshBasicMaterial を利用して半透明のマテリアルを作成
    const faceMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
  
    // 必要な属性を取得
    const positionAttribute = geometry.attributes.position;
    const positions = (positionAttribute as THREE.BufferAttribute).array;
    const faces = [];
  
    if (geometry.index) {
      // インデックス付きの場合
      const indices = geometry.index.array;
      for (let i = 0; i < indices.length; i += 3) {
        const a = indices[i];
        const b = indices[i + 1];
        const c = indices[i + 2];
        faces.push(this.getFace(positions, a, b, c));
      }
    } else {
      // インデックスなしの場合は、position 属性の順番で3頂点ずつが1面となる
      const vertexCount = positionAttribute.count;
      for (let i = 0; i < vertexCount; i += 3) {
        const a = i;
        const b = i + 1;
        const c = i + 2;
        faces.push(this.getFace(positions, a, b, c));
      }
    }
  
    return faces;
  }
  
  private getFace(positions: ArrayLike<number>, a: number, b: number, c: number)
    : { a: number; b: number; c: number; mesh: THREE.Mesh; center: THREE.Vector3, normal: THREE.Vector3; secter: THREE.Mesh | null; }
  {
    // MeshBasicMaterial を利用して半透明のマテリアルを作成
    const faceMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });

    // 各頂点の座標を取得
    const vA = new THREE.Vector3(
      positions[a * 3],
      positions[a * 3 + 1],
      positions[a * 3 + 2]
    );
    const vB = new THREE.Vector3(
      positions[b * 3],
      positions[b * 3 + 1],
      positions[b * 3 + 2]
    );
    const vC = new THREE.Vector3(
      positions[c * 3],
      positions[c * 3 + 1],
      positions[c * 3 + 2]
    );
    const vertices = new Float32Array([
      vA.x, vA.y, vA.z,
      vB.x, vB.y, vB.z,
      vC.x, vC.y, vC.z
    ]);
    const faceGeometry = new THREE.BufferGeometry();
    faceGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    faceGeometry.computeVertexNormals();
    const mesh = new THREE.Mesh(faceGeometry, faceMaterial);

    const center = new THREE.Vector3()
      .addVectors(vA, vB)
      .add(vC)
      .divideScalar(3);

    const cb = new THREE.Vector3().subVectors(vC, vB);
    const ab = new THREE.Vector3().subVectors(vA, vB);
    const normal = new THREE.Vector3().crossVectors(cb, ab).normalize();

    const secter = null;

    return { a, b, c, mesh, center, normal, secter};
  }
 
  ////////////////////////////////////////////////////////////////////
  // konva.js の図形を作成
  createShape() {
  }


  ////////////////////////////////////////////////////////////////////
  // three.js のメッシュを作成
  private createMesh(): THREE.Mesh{
  // 1. 平面のジオメトリを作成
  const planeGeometry = new THREE.PlaneGeometry(40, 30);

  // 2. 半透明マテリアル
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.1
  });

  // 3. メッシュを作成してシーンに追加
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(5, 10, 10);

  // --- 枠線（エッジ）を作成する ---
  // EdgesGeometry はジオメトリのエッジを抽出したジオメトリを返す
  const edgesGeometry = new THREE.EdgesGeometry(planeGeometry);

  // LineBasicMaterial で線の色などを設定
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0x0000ff // 白い枠線
  });

  // エッジジオメトリを使って LineSegments を作成
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

  // 枠線オブジェクトを plane に子オブジェクトとして追加
  // ※位置を合わせたい場合は plane の子にすると楽です
  plane.add(edges);

  plane.name = 'view port';
  // シーンに登録する
  this.scene.add( plane );

  return plane;
  }

}
