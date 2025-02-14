import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Shape } from 'konva/lib/Shape';

@Injectable({
  providedIn: 'root'
})
export class KonvaService {
  public stage!: Konva.Stage; // 初期化は`konva.component.ts`で行う
  private layer: any = {};

  // レイヤの作成
  public addLayer(uuid: string): void {
    const config: Konva.LayerConfig = {

    };
    const layer = new Konva.Layer();
    this.layer[uuid]= layer;
    this.stage.add(layer);
  }

  // 任意形状の作成
  public addShape(layer_uuid: string, paths: any[]): void {

    const path = new Konva.Path({
      fill: 'blue',
      draggable: true,
    });
    path.x(50);
    path.y(50);
    path.data('M 200 100 L 50 50 L 50 100 Z');

    this.setDrag(path);

    // 図形をレイヤーに追加
    const layer = this.layer[layer_uuid];
    layer.add(path);
  }

  private setDrag(shape: Shape): void {

    // 円のクリックイベント
    shape.on('click', () => {
      shape.fill('green');
      this.layer.draw();
    });

    // マウスオーバーイベント
    shape.on('mouseover', () => {
      document.body.style.cursor = 'pointer';
      shape.opacity(0.5);
      this.layer.draw();
    });

    // マウスアウトイベント
    shape.on('mouseout', () => {
      document.body.style.cursor = 'default';
      shape.opacity(1);
      this.layer.draw();
    });

    // ドラッグ終了イベント
    shape.on('dragend', () => {
      console.log(`Circle dragged to x: ${shape.x()}, y: ${shape.y()}`);
    });
  }


  public addCircle(): void {
    // 円の作成
    const circle = new Konva.Circle({
      x: 100,
      y: 100,
      radius: 50,
      fill: 'red',
      draggable: true,
    });

    this.setDrag(circle);

    // 図形をレイヤーに追加
    this.layer.add(circle);

  }

  public addRectangle(): void {

    // 四角形の作成
    const rectangle = new Konva.Rect({
      x: 200,
      y: 200,
      width: 100,
      height: 50,
      fill: 'blue',
      draggable: true,
    });

    // 四角形のクリックイベント
    rectangle.on('click', () => {
      rectangle.fill('yellow');
      this.layer.draw();
    });

    // 図形をレイヤーに追加
    this.layer.add(rectangle);
  }
}
