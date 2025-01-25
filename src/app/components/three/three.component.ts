import { AfterViewInit, Component, ElementRef, ViewChild, HostListener, NgZone, OnDestroy } from "@angular/core";
import * as THREE from "three";

import { ThreeService } from "./three.service";

@Component({
  selector: "app-three",
  templateUrl: "./three.component.html"
})
export class ThreeComponent implements AfterViewInit, OnDestroy {
  @ViewChild("myCanvas", { static: true }) private canvasRef: ElementRef;

  constructor(
    private ngZone: NgZone,
    private three: ThreeService
  ) {
    THREE.Object3D.DEFAULT_UP.set(0, 0, 1);
  }

  ngAfterViewInit() {
    this.three.OnInit(
      this.getAspectRatio(),
      this.canvas,
      devicePixelRatio,
      window.innerWidth,
      window.innerHeight
    );

    // ラベルを表示する用のレンダラーを HTML に配置する
    const element = this.three.labelRendererDomElement();
    const div = document.getElementById("myCanvas"); // ボタンを置きたい場所の手前の要素を取得
    if (div && div.parentNode) {
      div.parentNode.insertBefore(element, div.nextSibling); // ボタンを置きたい場所にaタグを追加
      // レンダリングする
      this.animate();
    } else {
      console.error('Element or parentNode is null');
    }
  }

  ngOnDestroy() {}

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener("DOMContentLoaded", () => {
        this.three.render();
      });
    });
  }

  // マウスクリック時のイベント
  @HostListener("pointerdown", ["$event"])
  public onMouseDown(event: MouseEvent) {
    const mouse: THREE.Vector2 = this.getMousePosition(event);
    this.three.detectObject(mouse, "click");
  }

  // マウスクリック時のイベント
  // @HostListener("pointerup", ["$event"])
  public onMouseUp(event: MouseEvent) {
    const mouse: THREE.Vector2 = this.getMousePosition(event);
    this.three.detectObject(mouse, "select");
  }

  // マウス移動時のイベント
  // @HostListener("mousemove", ["$event"])
  public onMouseMove(event: MouseEvent) {
    const mouse: THREE.Vector2 = this.getMousePosition(event);
    this.three.detectObject(mouse, "hover");
  }

  // マウス位置とぶつかったオブジェクトを検出する
  private getMousePosition(event: MouseEvent): THREE.Vector2 {
    event.preventDefault();
    const rect = this.three.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    return mouse;
  }

  // ウインドウがリサイズした時のイベント処理
  @HostListener("window:resize", ["$event"])
  public onResize(event: Event) {
    this.three.onResize(
      this.getAspectRatio(),
      window.innerWidth,
      window.innerHeight
    );
  }

  private getAspectRatio(): number {
    if (this.canvas.clientHeight === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

}
