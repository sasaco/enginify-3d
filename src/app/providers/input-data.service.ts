import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class InputDataService {

  // three を格納しているdevの状態
  public range: number = 0;
  public boxWidth: number = 300; // 初期幅 (px)
  public boxHeight: number = 300; // 初期高さ (px)
  public boxTop: number = 0; // 初期位置 (px)
  public boxLeft: number = 0; // 初期位置 (px)

  // 初期値
  public code = `
// ジオメトリの生成（例として立方体）
const geometry = new THREE.BoxGeometry(1, 1, 1);

// マテリアルの生成（色付きの基本マテリアル）
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// メッシュ作成：ジオメトリとマテリアルを組み合わせる
const cube = new THREE.Mesh(geometry, material);

// シーンにメッシュを追加
scene.add(cube);
`;

}
