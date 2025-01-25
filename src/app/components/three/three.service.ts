import { Injectable } from "@angular/core";
import { SceneService } from "./scene.service";
import { InputDataService } from "src/app/providers/input-data.service";
import * as THREE from "three";


@Injectable({
  providedIn: "root"
})
export class ThreeService {

  constructor(public scene: SceneService) { }

  //////////////////////////////////////////////////////
  // 初期化
  public OnInit(
          aspectRatio: number,
          canvasElement: HTMLCanvasElement,
          deviceRatio: number,
          Width: number,
          Height: number
        ): void {
    this.scene.OnInit(
      aspectRatio,
      canvasElement,
      deviceRatio,
      Width,
      Height
    );
  }
  
  public labelRendererDomElement(): Node {
    return this.scene.labelRendererDomElement();
  }
  
  public getBoundingClientRect(): ClientRect | DOMRect {
    return this.scene.getBoundingClientRect();
  }

  public onResize(AspectRatio: number, Width: number, Height: number): void {
    this.scene.onResize(AspectRatio, Width, Height);
  }

  public gui_open() {
    this.scene.gui.open();
  }
  public gui_close() {
    this.scene.gui.close();
  }
  //////////////////////////////////////////////////////
  // ファイルを開く処理する
  public loadInputData(InputData: InputDataService): void {
    this.scene.render();
  }

  //////////////////////////////////////////////////////
  // データの変更通知を処理する
  public render(): void {
    // 再描画
    this.scene.render();
  }

  //////////////////////////////////////////////////////
  // データをクリアする
  public ClearData(): void {
    // データの削除
    // 再描画
    this.scene.render();
  }

  //////////////////////////////////////////////////////
  // マウス位置とぶつかったオブジェクトを検出する
  public detectObject(mouse: THREE.Vector2, action: string): void {
    const raycaster = this.scene.getRaycaster(mouse);
  }


}
