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
    this.createMesh();
    // konva.js の図形を作成
    this.createShape();
  }
  
  // konva.js の図形を作成
  createShape() {
    throw new Error('Method not implemented.');
  }

  // three.js のメッシュを作成
  private createMesh(){
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
  this.scene.add( plane );
  }

}
