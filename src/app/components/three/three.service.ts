import { Injectable } from "@angular/core";
import { InputDataService } from "src/app/providers/input-data.service";
import { SceneService } from "./scene.service";
import * as THREE from "three";

import { DataHelperModule } from "src/app/providers/data-helper.module";
//import { DeclareFunctionStmt } from "@angular/compiler";

import { ThreeNodesService } from "./geometry/three-nodes.service";

import html2canvas from "html2canvas";

@Injectable({
  providedIn: "root",
})
export class ThreeService {

  public mode: string;
  private currentIndex: number;
  public canvasElement: HTMLCanvasElement;

  public selectedNumber: number;

  public canvasWidth: string;
  public canvasHeight: string;

  public fileName: string;

  constructor(
    public scene: SceneService,
    private node: ThreeNodesService,
    private helper: DataHelperModule,
    private InputData: InputDataService,
  ) {
  }

  //////////////////////////////////////////////////////
  // 初期化
  public OnInit(): void {
    this.node.OnInit();
  }

  //////////////////////////////////////////////////////
  // ファイルを開く処理する
  public fileload(): void {
    // ファイルを読み込んだ
    this.node.changeData();
    this.scene.render();
  }

  //////////////////////////////////////////////////////
  // データの変更通知を処理する
  public changeData(mode: string = "", index: number = 0): void {
    // 再描画
    this.scene.render();

    this.currentIndex = index;
  }

  //////////////////////////////////////////////////////
  // データの変更通知を処理する（複数行）
  public changeDataList(mode: string = "", param = {}): void {
    // 再描画
    this.scene.render();
  }

  //////////////////////////////////////////////////////
  // データの選択を処理する
  public selectChange(mode: string, index: number, index_sub: any): void {
    //console.log("selectChange", mode, index, index_sub);
    switch (mode) {
      case "nodes":
        this.node.selectChange(index);
        break;
    }
  }

  //////////////////////////////////////////////////////
  // データをクリアする
  public ClearData(): void {
    // 節点データの削除
    this.node.ClearData();
    // 再描画
    this.scene.setNewHelper(100);
    this.scene.render();
  }

  //////////////////////////////////////////////////////
  // 編集ページの変更通知を処理する
  public ChangePage(currentPage: number, option = {}): void {
    if (this.currentIndex === currentPage) {
      if (option['isContinue'] === true) {
        //Out if parent
      }
      else
        return;
    }
    this.currentIndex = currentPage;

    this.scene.render();
  }

  //////////////////////////////////////////////////////
  // 編集モードの変更通知を処理する
  public ChangeMode(ModeName: string): void {
    if (this.mode === ModeName) {
      return;
    }

    if (ModeName === "nodes") {
      this.node.visibleChange(true, true, true);
    }

    this.mode = ModeName;
    this.currentIndex = -1;

    // 再描画
    this.scene.render();
  }

  //////////////////////////////////////////////////////
  // マウス位置とぶつかったオブジェクトを検出する
  public detectObject(mouse: THREE.Vector2, action: string): void {
    const raycaster = this.scene.getRaycaster(mouse);
    switch (this.mode) {
      case "nodes": // 節点データの更新
        this.node.detectObject(raycaster, action);
        break;
    }
    // 再描画
    //this.scene.render();
  }

  // 印刷する図を収集する
  public async getCaptureImage(): Promise<any> {
    return new Promise((resolve, reject) => { });
  }

  // 印刷するケース数を返す
  private getCaptureCase(): any {
    let result: string[] = new Array();
    let title1: string = "";
    let title2: string = "";
    let title3: string[] = new Array();
    let title4: string[] = new Array();
    let title5: string[] = new Array();
    let title6: string[] = new Array();

    return {
      title1,
      title2,
      title3,
      title4,
      title5,
      captureCase: result,
    };
  }


  public getTotalCaptureImage(): any {
    let counter = 0;
    const captureInfo = this.getCaptureCase();
    const captureCase: string[] = captureInfo.captureCase;
    return counter;
  }
}
